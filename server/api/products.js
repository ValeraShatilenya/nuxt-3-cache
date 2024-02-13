import cachedAxios from "~/utils/cachedAxios";
// import axios from "axios";

export default defineEventHandler(async (event) => {
  const { data } = await cachedAxios.get("/products?limit=2");
  // const { data } = await axios
  //   .create({
  //     baseURL: "https://dummyjson.com",
  //   })
  //   [event.method](event.query);

  return data.products;
  return [];
});
