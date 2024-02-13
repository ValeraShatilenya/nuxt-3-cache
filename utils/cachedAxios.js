import { createClient } from "redis";
import axios from "axios";
import dotenv from "dotenv";
import md5 from "js-md5";
import { promisify } from "util";
import * as flatted from "flatted";
import { brotliCompress, brotliDecompress } from "zlib";

const compressAsync = promisify(brotliCompress);
const decompressAsync = promisify(brotliDecompress);

const { REDIS_HOST, REDIS_PORT } = dotenv.config().parsed;

async function compress(data) {
  const compressedData = await compressAsync(data);

  return compressedData.toString("base64");
}

async function decompress(data) {
  const decompressedData = await decompressAsync(Buffer.from(data, "base64"));

  return decompressedData.toString();
}

class AxiosRedis {
  createKey(config) {
    return md5(JSON.stringify(config));
  }

  fetch(config) {
    return axios
      .create(Object.assign(config, { adapter: axios.defaults.adapter }))
      .request(config);
  }

  async getRedisClient() {
    const client = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` });

    await client.connect();

    return client;
  }

  async getCache(key) {
    const redisClient = await this.getRedisClient();
    let data = await redisClient.get(key);

    if (!data) {
      return data;
    }

    data = await decompress(data);

    return flatted.parse(data);
  }

  async setCache(key, data) {
    const compressedData = await compress(flatted.stringify(data));

    const redisClient = await this.getRedisClient();

    return await redisClient.set(key, compressedData, "EX", 60 * 10);
  }

  async adapter(config) {
    let response = null;
    try {
      const key = this.createKey(config);

      const data = await this.getCache(key);

      if (data) {
        return data;
      }

      response = await this.fetch(config);

      await this.setCache(key, response);

      return response;
    } catch (error) {
      if (error.isAxiosError) {
        throw error;
      }

      return this.fetch(config);
    }
  }
}

export default axios.create({
  baseURL: "https://dummyjson.com",
  adapter: (config) => new AxiosRedis().adapter(config),
});

// const start = new Date().getTime();

// let data = await axios
//   .create({
//     baseURL: dotenv.config().parsed.BACK_URL,
//     adapter: (config) => new AxiosRedis().adapter(config),
//   })
//   .get("/products?limit=2");

// data = await axios
//   .create({
//     baseURL: dotenv.config().parsed.BACK_URL,
//     adapter: (config) => new AxiosRedis().adapter(config),
//   })
//   .get("/products?limit=2");

// data = await axios
//   .create({
//     baseURL: dotenv.config().parsed.BACK_URL,
//     adapter: (config) => new AxiosRedis().adapter(config),
//   })
//   .get("/products?limit=2");

// // console.log(data);
// console.log(start - new Date().getTime());
