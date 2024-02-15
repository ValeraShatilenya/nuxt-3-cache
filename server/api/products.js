// import cachedAxios from "~/utils/cachedAxios";
import axios from "axios";

const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { data } = await axios
    .create({
      baseURL: "https://dummyjson.com",
    })
    .get("/products?limit=2");

  return { data };
};

const cachedGetProducts = cachedFunction(getProducts, {
  maxAge: 60 * 60, // subsequent calls will be cached for 1 hour
  base: "redis",
  group: "test",
  name: "products",
  getKey: (tag) => `tag_${tag}_products`,
});

export default defineEventHandler(async (event) => {
  // const cacheStorage = useStorage("cache:test");
  // const cachedKeys = await cacheStorage.getKeys();
  // const { data } = await getProducts();

  // const redisStorage = useStorage("redis");
  // const redisKeys = await redisStorage.getKeys();
  // redisStorage.setItem("products", "123");
  // console.log(redisKeys);
  // console.log(await useStorage("redis").getItem("products"));
  // console.log(await redisStorage.getItem("products"));

  // await cacheStorage.removeItem("products:first_key.json");
  // await Promise.all(cachedKeys.map((key) => storage.removeItem(key)));

  // const { data } = await cachedAxios.get("/products?limit=2");

  const { data } = await cachedGetProducts("pt");

  return data.products;
});
