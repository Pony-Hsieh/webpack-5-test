/** 查詢 query string 中是否包含特定 name
 * @param {string} name - 要查詢的 name
 * @return {string} 如果有，則回傳該 name 對應的 value(型別必為 string)；如果沒有，則回傳 ""
 */
function getQueryString(name) {
  const res = new URL(window.location.href).searchParams.get(name);
  return res ? res : "";
}

export {
  getQueryString
};