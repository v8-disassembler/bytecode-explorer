function getRegex (regex, flags) {
  const res = new RegExp(regex, getFlags(Number(flags)));
  // console.log(res, flags, getFlags(flags));
  return res;
}

function getFlags (flags) {
  let res = '';
  if (flags & 1) {
    // don't return after first match
    res = `g`;
  }
  if (flags & 2) {
    // case insensitive
    res = `${res}i`;
  }
  if (flags & 4) {
    // ^ and $ match start/end of line
    res = `${res}m`;
  }
  if (flags & 16) {
    // match with full unicode
    res = `${res}u`;
  }
  if (flags & 32) {
    // dot matches newline
    res = `${res}s`;
  }

  return res;
}

module.exports =  getRegex;