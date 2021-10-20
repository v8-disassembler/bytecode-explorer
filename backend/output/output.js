function foo (ar) {
  const len = ar.length;
  for (let i = 0; i < len / 2; i++) {
    const temp = ar[i];
    ar[i] = ar[len - i - 1];
    ar[len - i - 1] = temp;
  }
  return ar;
}

foo([1,2,3,4,5,6]);