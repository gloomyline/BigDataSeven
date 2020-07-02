export function currency(value) {
  if(Number.isNaN(Number(value))) {
    throw new TypeError('This value is NaN');
    return value
  }else {
    return `${(Number(value)/10000).toFixed(2)}`;
  }
}
