export function makeJson(arry) {
  // expects shape :
  // [
  //     ["key", "value"],
  //     ["key", "value"],
  // ]

  let json = {};
  let i = 0;
  for (let i = 0; i < arry.length; i++) {
    json[arry[0]] = arry[1];
  }
  return json;
}
