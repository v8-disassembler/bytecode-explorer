function divisors(integer) {
  const res = [...Array(integer).keys()].slice(2).filter(el => integer % el === 0);
  if (res.length === 0) {
    return `${integer} is prime`;
  }
  return res;
};

divisors(45623);