/**
 * @method 对象合并
 */
export function mergeObject(obj1: any, obj2: any) {
  var obj3: any = {};
  for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
  return obj3;
}
