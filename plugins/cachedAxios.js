import axios from "axios";

/**
 *
 * Пример:
 * Вход: 'catalog', 'menu'
 * Выход: tag_catalog;tag_menu;
 */
const generateTagString = (tags) => {
  const notEmptyTags = tags.filter((tag) => tag);
  if (!notEmptyTags.length) {
    return "";
  }
  return `tag_${notEmptyTags.join(`;tag_`)};`;
};

const getAdapterFunction = (client) => {
  const createKey = async (config, tags) => {
    const { md5 } = await import("js-md5");

    const prefix = process.env.AXIOS_CACHE_PREFIX;
    const tagsString = generateTagString(tags);
    const configString = md5(JSON.stringify(config));

    return `${prefix}:${tagsString}${configString}`;
  };

  const fetch = async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axios
      .create(Object.assign(config, { adapter: axios.defaults.adapter }))
      .request(config);

    return { data: response.data };
  };

  const getCache = async (key) => {
    let data = await client.get(key);

    if (!data) {
      return data;
    }

    return JSON.parse(data);
  };

  const setCache = async (key, data) => {
    const stringifyData = JSON.stringify(data);

    client.set(key, stringifyData, "EX", 60 * 10);
  };

  return async (config, tags) => {
    try {
      const key = await createKey(config, tags);

      let response = await getCache(key);

      if (response) {
        return response;
      }

      response = await fetch(config);

      setCache(key, response);

      return response;
    } catch (error) {
      if (error.isAxiosError) {
        throw error;
      }

      const response = await fetch(config);

      return response;
    }
  };
};

export default defineNuxtPlugin(async () => {
  const baseURL = useRuntimeConfig().public.BASE_URL;

  if (process.server) {
    const { createClient } = await import("redis");

    const client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    await client.connect();

    const adapterFunction = getAdapterFunction(client);

    return {
      provide: {
        cachedAxios: (...tags) =>
          axios.create({
            baseURL,
            adapter: (config) => adapterFunction(config, tags),
          }),
      },
    };
  }

  return {
    provide: {
      cachedAxios: () => axios.create({ baseURL }),
    },
  };
});
