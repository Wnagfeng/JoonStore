// 目的是确保obj不是 null 或 undefined，并将其转换为布尔值以进行最终的判断。
function isObject(obj) {
  var type = typeof obj;
  return type === 'object' && !!obj;
}

module.exports = {
  isObject,
};
