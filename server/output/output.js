function yarra (ar) {
  const len = ar.length;
  for (let i = 0; i < len / 2; i++) {
    [ar[i], ar[len - i - 1]] = [ar[len - i - 1], ar[i]];
  }
  return ar;
}

yarra([1,2,3,4,5,6]);