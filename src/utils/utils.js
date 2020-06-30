export const checkEmpty = strAry => {
  if (strAry.includes("")) {
    return false;
  }
  return true;
};

export const isEmpty = str => {
  if (str === "") {
    return false;
  }
  return true;
};
