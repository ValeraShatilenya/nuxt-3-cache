import generateKey from "../utils/generateKey";

export default defineEventHandler(async ({ node }) => {
  const { req, res } = node;
  const storage = useStorage("redis");
  const key = generateKey(req.url);
  const cachedRes = await storage.getItem(key);
  if (!cachedRes) {
    return;
  }
  res.writeHead(200, { ...cachedRes.headers, "x-ssr-cache": "HIT" });
  res.end(cachedRes.body);
});
