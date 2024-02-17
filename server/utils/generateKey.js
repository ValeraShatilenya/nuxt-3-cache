import { md5 } from "js-md5";

export default (url) => {
  const urlArr = url.split("?");
  const params = urlArr.slice(1).join("?");
  return `test_${urlArr[0]}_${params ? md5(params) : ""}`;
};
