export function toTitleCase(str) {
  return str.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}

export function timestampToDate(timestamp) {
  if (!timestamp) {
    return ``;
  }

  const date = new Date(parseInt(timestamp));
  const dd = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  const MM = date.getMonth() <= 8 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const HH = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours();
  const mm = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes();
  const ss = date.getSeconds() <= 9 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${dd}-${MM}-${date.getFullYear()} ${HH}:${mm}:${ss}`;
}

export default { toTitleCase, timestampToDate };