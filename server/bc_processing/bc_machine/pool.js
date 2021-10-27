module.exports = (code) => {
	// NOTE index of first pool entry
	const propsIndex = code.findIndex((line) => line.startsWith('  '));
	const propsLen = code[propsIndex - 1].match(/(\d+)\s*$/)[1];
	// console.log(code[propsIndex], propsLen)
	// TODO make this work even for non-string props
	return {
		properties: Object.fromEntries(
			Array.from({ length: propsLen }, (_, i) => {
				return handleProp(code[propsIndex + i], i);
			})
		),
		propsLen
	};
};

function handleProp (prop, i) {
	const propName = prop.match(/([^<>\s]+)>\s*$/)[1];
	if (/^.+$/.test(propName)) {
		console.log(propName);
		return [ i, propName ];
	}
	// NOTE not a property name (string)
	if (propName.includes('Array')) {
		const len = Number(propName.match(/\d+/)[0]);
		return [ i, Array(len) ];
	}
}
