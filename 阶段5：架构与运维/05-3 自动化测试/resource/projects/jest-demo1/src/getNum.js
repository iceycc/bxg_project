const arr = [1, 2, 3, 4, 5, 6];

const getNum = index => {
  if (index) {
    return arr[index];
  } else {
    return arr[Math.floor(Math.random() * 6)];
  }
};

export {
  getNum
}