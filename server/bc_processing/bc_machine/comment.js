function getDest(arg) {
	return arg.match(/(\d+)\)$/)[1];
}

// NOTE prints array in between []
Array.prototype.toString = function () {
	return `[${this.join(',')}]`;
};

function getComment (op, ...args) {
	// NOTE handle jump modifiers
	if (args[0] === 'Wide' || args[0] === 'ExtraWide') {
		args = args.slice(1);
	}

	switch (op) {
		case 'LdaZero':
			return '; a = 0';

		case 'LdaSmi':
			return `; a = ${this.acc}`;

		case 'LdaConstant':
			return `; a = ${this.acc} (pool property ${args[0]})`;

		case 'LdaUndefined':
			return `; a = undefined`;

		case 'LdaNull':
			return `; a = null`;

		case 'LdaTheHole':
			return `; a = TheHole`;

		case 'LdaTrue':
			return `; a = true`;

		case 'LdaFalse':
			return `; a = false`;

		case 'Ldar':
			return `; a = ${this.acc} (${args[0]})`;

		case 'Star':
			return `; ${args[0]} = ${this.acc} (a)`;

		// case Star0 - StarN:

		case 'Mov':
			return `; ${args[1]} = ${this.store[args[0]]} (${args[0]})`;

		// case 'LdaGlobal':

		// case 'LdaGlobalInsideTypeof':

		// case 'StaGlobal':

		// case 'LdaContextSlot':

		// case 'LdaImmutableContextSlot':

		// case 'LdaCurrentContextSlot':

		// case 'LdaImmutableCurrentContextSlot':

		// case 'StaContextSlot':

		// case 'StaCurrentContextSlot':

		// case 'LdaLookupSlot':

		// case 'LdaLookupSlotInsideTypeof':

		// case 'LdaLookupContextSlot':

		// case 'LdaLookupContextSlotInsideTypeof':

		// case 'LdaLookupGlobalSlot':

		// case 'LdaLookupGlobalSlotInsideTypeof':

		// case 'StaLookupSlot':

		case 'LdaNamedProperty':
			return `; a = ${this.acc} (${args[0]}.${this.constantPool[args[1]]})`;

		// case 'LdaNamedPropertyFromSuper':

		case 'LdaKeyedProperty':
			return `; a = ${this.acc} (${args[0]}[${this.prev}])`;

		// case 'StaNamedProperty':

		// case 'StaNamedOwnProperty':

		case 'StaKeyedProperty':
			return `; ${args[0]}[${this.store[args[1]]} (${args[1]})] = ${this.acc} (a)`;

		// case 'StaKeyedPropertyAsDefine':

		case 'StaInArrayLiteral':
			return `; ${args[0]}[${this.store[args[1]]} (${args[1]})] = ${this.prev} (a)`;

		// case 'StaDataPropertyInLiteral':

		// case 'LdaModuleVariable':

		// case 'StaModuleVariable':

		// case 'PushContext':

		// case 'PopContext':

		// case 'Add':

		case 'Sub':
			return `; a = ${this.acc} (${this.store[args[0]]} - ${this.prev} (${args[0]}, a))`;

		// case 'Mul':

		// case 'Div':

		// case 'Mod':

		// case 'Sub':

		case 'AddSmi':
			return `; a = ${this.acc} (a += ${args[0]})`;

		case 'SubSmi':
			return `; a = ${this.acc} (a -= ${args[0]})`;

		// case 'MulSmi':

		case 'DivSmi':
			return `; a = ${this.acc} (a /= ${args[0]})`;

		// case 'ModSmi':

		// case 'ExpSmi':

		// case 'BitwiseOr':

		case 'BitwiseXor':
			return `; a = ${this.acc} (${this.prev} ^= ${this.store[args[0]]} (${args[0]}))`;

		// case 'BitwiseAnd':

		// case 'ShiftLeft':

		// case 'ShiftRight':

		// case 'ShiftRightLogical':

		// case 'BitwiseOrSmi':

		// case 'BitwiseXorSmi':

		// case 'BitwiseAndSmi':

		// case 'BitwiseNot':

		// case 'ShiftLeftSmi':

		// case 'ShiftRightSmi':

		// case 'ShiftRightLogicalSmi':

		// case 'Negate':

		// case 'ToName':

		// case 'ToNumber':

		// case 'ToNumeric':

		// case 'ToString':

		case 'Inc':
			return `; a = ${this.acc} (a += 1)`;

		case 'Dec':
			return `; a = ${this.acc} (a -= 1)`;

		// case 'ToBooleanLogicalNot':

		// case 'LogicalNot':

		// case 'TypeOf':

		// case 'DeletePropertyStrict':

		// case 'DeletePropertySloppy':

		// case 'GetSuperConstructor':

		// case 'Call':

		case 'CallProperty0':
			if (this.acc !== undefined) {
				return `; a = ${this.acc} (${this.store[args[1]]}.${this.store[args[0]]})`;
			}
			return `; a = undefined (property undefined)`;
		
		case 'CallProperty1':
			if (this.acc !== undefined) {
				const fnName = String(this.store[args[0]]).match(/(\w+)\(\)/)[1];
				return `; a = ${this.acc} (${this.store[args[1]]}.${fnName}(${this.store[args[2]]}))`;
			}
			return `; a = undefined (property undefined)`;

			case 'CallProperty2':
				if (this.acc !== undefined) {
					const fnName = String(this.store[args[0]]).match(/(\w+)\(\)/)[1];
					return `; a = ${this.acc} (${this.store[args[1]]}.${fnName}(${this.store[args[2]]}, ${this.store[args[3]]}))`;
				}
				return `; a = undefined (property undefined)`;

		case 'CallRuntime':
			return `; ${args[0]}()`;

		// case 'InvokeIntrinsic':

		// case 'CallRuntimeForPair':

		// case 'CallJSRuntime':

		// case 'CallWithSpread':

		// case 'ConstructWithSpread':

		// case 'Construct':

		case 'TestEqual':
		case 'TestEqualStrict':
			return `; ${this.test} (a === ${this.store[args[0]]} (${args[0]}) ?)`;

		case 'TestReferenceEqual':
			return `; ${this.test} (a === ${this.store[args[0]]} (${args[0]}) ?)`;

		case 'TestLessThan':
			return `; ${this.test} (${this.store[args[0]]} < ${this.acc}, ${args[0]} < a ?)`;

		// case 'TestGreaterThan':

		// case 'TestLessThanOrEqual':

		// case 'TestGreaterThanOrEqual':

		// case 'TestIn':

		// case 'TestInstanceOf':

		// case 'TestUndetectable':

		// case 'TestNull':

		// case 'TestUndefined':

		// case 'TestTypeOf':

		case 'Jump': {
			const dest = getDest(args[1]);
			return `; jump to ${dest}`;
		}

		// case 'JumpConstant':

		case 'JumpIfTrue': {
			const dest = getDest(args[1]);
			return `; ${this.test ? `jump to ${dest}` : "don't jump"}`;
		}

		// case 'JumpIfTrueConstant':

		case 'JumpIfFalse': {
			const dest = getDest(args[1]);
			return `; ${this.test === false ? `jump to ${dest}` : "don't jump"}`;
		}

		// case 'JumpIfFalseConstant':

		case 'JumpIfToBooleanTrue': {
			const dest = getDest(args[1]);
			return `; ${this.test ? `jump to ${dest}` : "don't jump"}`;
		}

		// case 'JumpIfToBooleanTrueConstant':

		// case 'JumpIfToBooleanFalse':

		// case 'JumpIfToBooleanFalseConstant':

		// case 'JumpIfNull':

		// case 'JumpIfNullConstant':

		// case 'JumpIfNotNull':

		// case 'JumpIfNotNullConstant':

		// case 'JumpIfUndefined':

		// case 'JumpIfUndefinedConstant':

		// case 'JumpIfNotUndefined':

		// case 'JumpIfNotUndefinedConstant':

		case 'JumpIfUndefinedOrNull':
			const dest = getDest(args[1]);
			return `; ${this.test ? `jump to ${dest}` : "don't jump"}`;

		// case 'JumpIfUndefinedOrNullConstant':

		case 'JumpIfJSReceiver': {
			const dest = getDest(args[1]);
			return `; ${this.test ? `jump to ${dest}` : "don't jump"}`;
		}

		// case 'JumpIfJSReceiverConstant':

		case 'JumpLoop': {
			const dest = getDest(args[2]);
			return `; jump back to ${dest}`;
		}

		// case 'SwitchOnSmiNoFeedback':

		case 'CreateRegExpLiteral':
			return `; a = ${this.acc}`;

		case 'CreateEmptyArrayLiteral':
		case 'CreateArrayLiteral':
			return `; a = []`;

		// case 'CreateArrayFromIterable':

		// case 'CreateObjectLiteral':

		// case 'CreateEmptyObjectLiteral':

		// case 'CloneObject':

		// case 'GetTemplateObject':

		// case 'CreateClosure':

		// case 'CreateBlockContext':

		// case 'CreateCatchContext':

		// case 'CreateFunctionContext':

		// case 'CreateEvalContext':

		// case 'CreateWithContext':

		// case 'CreateMappedArguments':

		// case 'CreateUnmappedArguments':

		// case 'CreateRestParameter':

		case 'SetPendingMessage':
			return `; a = ${this.acc} (prev msg); msg = ${this.pendingMsg}`;

		// case 'Throw':

		// case 'ReThrow':

		// case 'Abort':

		case 'Return':
			return `; return ${this.acc} (a)`;

		// case 'ThrowReferenceErrorIfHole':

		// case 'ThrowSuperNotCalledIfHole':

		// case 'ThrowSuperAlreadyCalledIfNotHole':

		// case 'ThrowIfNotSuperConstructor':

		// case 'Debugger':

		// case 'DebugBreak':

		// case 'IncBlockCounter':

		// case 'ForInEnumerate':

		// case 'ForInPrepare':

		// case 'ForInNext':

		// case 'ForInContinue':

		// case 'ForInStep':

		case 'GetIterator':
			return `; a = ${this.acc} (${args[0]}[Symbol.iterator]())`;

		// case 'Illegal':

		// case 'SuspendGenerator':

		// case 'SwitchOnGeneratorState':

		// case 'ResumeGenerator':

		default:
			break;
	}
}

module.exports = function (code, op, ...args) {
	const comment = getComment.call(this, op, ...args);
	return `${code}${' '.repeat(55 - code.length)}${comment}`;
};
