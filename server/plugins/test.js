import generateKey from "../utils/generateKey";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:response", async (response, { event }) => {
    if (response.statusCode !== 200) {
      return;
    }
    const { req } = event;
    const storage = useStorage("redis");
    const key = generateKey(req.url);
    await storage.setItem(key, response);
  });
});
