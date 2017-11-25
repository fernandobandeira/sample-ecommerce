export const getDifferences = (oValues, nValues) => {
  return Object.keys(nValues).reduce((r, val) => {
    if (nValues[val] !== oValues[val]) {
      r[val] = nValues[val];
    }

    return r;
  }, {});
}
