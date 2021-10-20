module.exports = (code) => {
  const propsIndex = code.findIndex((line) => line.startsWith('  '));
  const propsLen = Number(code[propsIndex - 1].match(/(\d+)\s*$/)[1])
  
  // TODO make this work even for non-string prop names
  return Object.fromEntries(Array.from({length: propsLen}, (_, i) => {
    const propName = code[propsIndex + i].match(/(\w+)>\s*$/)[1];
    
    return [i, propName];
  }));
};