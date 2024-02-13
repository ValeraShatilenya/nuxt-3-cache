export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("test", (params) => {
    console.log(params);
  });
});
