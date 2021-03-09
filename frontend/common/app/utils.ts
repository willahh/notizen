export const hashCode = (str) => {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// TODO: Cleanup this part
export const HOST_URL = location.host === 'willahh.github.io' ? '/notizen' : '';

export const mapOfKeyValueToArrayOfMap = (m) => {
  const acc = [];
  const array = Object.keys(m ? m : {})
    .reduce((acc, v) => {
      if (m[v]) {
        acc.push(m[v]);
      }
      return acc;
    }, acc);
  return array;
};

export const arrayOfMapToMapOfKeyValue = (arr) => {
  const acc = {};
  const map = arr.reduce((acc, v) => {
      if (v) {
        acc[v.id].push(v);
      }
      return acc;
    }, acc);
  return map;
};

