function john (str) {
  return Array.from(str.matchAll(/\b\w/g, (match) => `${match}e`));
}

john('John fitzgerald kennedy');