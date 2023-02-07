/**
 * @method 对象合并
 * @param {Object} obj1 将被合并的对象
 * @param {Object} obj2 将要合并的对象
 * @return {Object} obj3 合并完成后的对象
 */
export function mergeObject(obj1: any, obj2: any) {
  var obj3 = {};
  for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
  return obj3;
}
