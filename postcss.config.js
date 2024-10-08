import postcss100vhFix from "postcss-100vh-fix";
import postcssPxtorem from "postcss-pxtorem";
import autoprefixer from "autoprefixer";
export default {
  plugins: [postcss100vhFix(),autoprefixer(), postcssPxtorem({
    rootValue({ file }) {
      // 判断是否是vant的文件 如果是就使用 37.5为根节点字体大小
      // 否则使用75 因为vant使用的设计标准为375 但是市场现在的主流设置尺寸是750
      return file.indexOf("vant") !== -1 ? 37.5 : 75;
    },
    // 配置哪些文件中的尺寸需要转化为rem *表示所有的都要转化
    propList: ["*"],
  })],
};