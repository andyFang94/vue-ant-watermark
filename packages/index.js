import WaterMark from './WaterMark';
// 存储组件列表
const components = [WaterMark];

const install = function (Vue) {
  if (install.installed) {
    return;
  }
  components.map(item => {
    Vue.component(item.name, item);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  install,
  WaterMark,
};
