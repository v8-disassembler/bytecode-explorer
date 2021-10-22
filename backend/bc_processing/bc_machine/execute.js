module.exports = function (op, ...args) {
  this.prev = this.acc;
  switch (op) {
    case 'LdaZero':
      this.acc = 0;
      break;

    case 'LdaSmi':
      this.acc = Number(args[0]);
      break;

    // case 'LdaConstant':
    //   this.acc = 

    case 'LdaUndefined':
      this.acc = undefined;
      break;

    case 'LdaNull':
      this.acc = null;
      break;

    // case 'LdaTheHole':

    case 'LdaTrue':
      this.acc = true;
      break;
    
    case 'LdaFalse':
      this.acc = false;
      break;
      
    case 'Ldar':
      this.acc = this.store[args[0]];
      break;
    
    case 'Star':
      this.store[args[0]] = this.acc;
      break;
    
    // case Star0 - StarN:

    case 'Mov':
      this.store[args[1]] = this.store[args[0]];
      break;
    
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
      this.acc = this.store[args[0]][this.constantPool[args[1]]];
      break;

    // case 'LdaNamedPropertyFromSuper':

    case 'LdaKeyedProperty':
      this.acc = this.store[args[0]][this.acc];
      break;
    
    // case 'StaNamedProperty':

    // case 'StaNamedOwnProperty':

    case 'StaKeyedProperty':
      this.store[args[0]][this.store[args[1]]] = this.acc;
      break;

    // case 'StaKeyedPropertyAsDefine':

    case 'StaInArrayLiteral':
      this.store[args[0]][this.store[args[1]]] = this.acc;
      break;

    // case 'StaDataPropertyInLiteral':

    // case 'LdaModuleVariable':

    // case 'StaModuleVariable':

    // case 'PushContext':
    //   args[0] = this.context;
    //   this.context = this.acc;
    //   break;

    // //! should prev context be saved in acc?
    // case 'PopContext':
    //   this.context = args[0];
    //   break;

    case 'Add':
      this.acc += this.store[args[0]];
      break;

    case 'Sub':
      this.acc = this.store[args[0]] - this.acc;
      break;

    case 'Mul':
      this.acc *= this.store[args[0]];
      break;
    
    //! REVIEW integer div?
    case 'Div':
      this.acc /= this.store[args[0]];
      break;

    case 'Mod':
      this.acc %= this.store[args[0]];
      break;
    
    case 'Sub':
      this.acc = this.acc ** this.store[args[0]];
      break;

    case 'AddSmi':
      this.acc += Number(args[0]);
      break;

    case 'SubSmi':
      this.acc -= Number(args[0]);
      break;

    case 'MulSmi':
      this.acc *= Number(args[0]);
      break;

    //! REVIEW integer div?
    case 'DivSmi':
      this.acc /= Number(args[0]);
      break;

    case 'ModSmi':
      this.acc %= Number(args[0]);
      break;

    case 'ExpSmi':
      this.acc = this.acc ** Number(args[0]);
      break;

    case 'BitwiseOr':
      this.acc |= this.store[args[0]];
      break;

    case 'BitwiseXor':
      this.acc ^= this.store[args[0]];
      break;

    case 'BitwiseAnd':
      this.acc &= this.store[args[0]];
      break;

    case 'ShiftLeft':
      this.acc <<= this.store[args[0]];
      break;
    
    case 'ShiftRight':
      this.acc >>= this.store[args[0]];
      break;

    case 'ShiftRightLogical':
      this.acc >>>= this.store[args[0]];
      break;

    case 'BitwiseOrSmi':
      this.acc |= Number(args[0]);
      break;

    case 'BitwiseXorSmi':
      this.acc ^= Number(args[0]);
      break;

    case 'BitwiseAndSmi':
      this.acc &= Number(args[0]);
      break;
    
    case 'BitwiseNot':
      this.acc = ~this.acc;
      break;

    case 'ShiftLeftSmi':
      this.acc <<= Number(args[0]);
      break;
    
    case 'ShiftRightSmi':
      this.acc >>= Number(args[0]);
      break;

    case 'ShiftRightLogicalSmi':
      this.acc >>>= Number(args[0]);
      break;
    
    case 'Negate':
      this.acc = -this.acc;
      break;

    // case 'ToName':

    case 'ToNumber':
      this.acc = Number(this.acc);
      break;

    // case 'ToNumeric':

    case 'ToString':
      this.acc = `${this.acc}`;
      break;

    case 'Inc':
      this.acc += 1;
      break;

    case 'Dec':
      this.acc -= 1;
      break;

    case 'ToBooleanLogicalNot':
    case 'LogicalNot':
      this.acc = !this.acc;
      break;
    
    case 'TypeOf':
      this.acc = typeof this.acc;
      break;
    
    // case 'DeletePropertyStrict':

    // case 'DeletePropertySloppy':

    // case 'GetSuperConstructor':

    // case 'Call':

    // TODO
    case 'CallProperty0':
      // console.log(this.store[args[0]]);
      // this.acc = this.store[args[0]].call(this.store[args[1]]);
      break;

    // TODO implement? or skip
    // case 'CallRuntime':

    // case 'InvokeIntrinsic':

    // case 'CallRuntimeForPair':

    // case 'CallJSRuntime':

    // case 'CallWithSpread':

    // case 'ConstructWithSpread':

    // case 'Construct':

    case 'TestEqual':
      this.test = this.acc == this.store[args[0]];
      break;

    case 'TestEqualStrict':
    case 'TestReferenceEqual':
      this.test = this.acc === this.store[args[0]];
      break;

    case 'TestLessThan':
      this.test = this.store[args[0]] < this.acc;
      break;

    case 'TestGreaterThan':
      this.test = this.store[args[0]] > this.acc;
      break;

    case 'TestLessThanOrEqual':
      this.test = this.store[args[0]] <= this.acc;
      break;

    case 'TestGreaterThanOrEqual':
      this.test = this.store[args[0]] >= this.acc;
      break;

    // case 'TestIn':

    // case 'TestInstanceOf':

    // case 'TestUndetectable':

    case 'TestNull':
      this.test = this.acc === null;
      break;

    case 'TestUndefined':
      this.test = this.acc === undefined;
      break;

    // case 'TestTypeOf':

    // case 'Jump':

    // case 'JumpConstant':

    // case 'JumpIfTrue':

    // case 'JumpIfTrueConstant':

    // TODO handle jumps ASAP
    // case 'JumpIfFalse':

    // case 'JumpIfFalseConstant':

    case 'JumpIfToBooleanTrue':
      this.test = !!this.acc;
      break;

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

    // case 'JumpIfUndefinedOrNull':

    // case 'JumpIfUndefinedOrNullConstant':

    case 'JumpIfJSReceiver':
      this.test = typeof this.acc === 'object';
			break;

    // case 'JumpIfJSReceiverConstant':

    // case 'JumpLoop':

    // case 'SwitchOnSmiNoFeedback':

    // case 'CreateRegExpLiteral':

    case 'CreateArrayLiteral':
      this.acc = [];
      break;

    // case 'CreateEmptyArrayLiteral':

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

    // case 'SetPendingMessage':

    // case 'Throw':

    // case 'ReThrow':

    // case 'Abort':

    case 'Return':
      this.retVal = this.acc;
      break;

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
      this.acc = this.store[args[0]][Symbol.iterator]();
      break;

    // NOTE used with Jump, 例: Jump.Wide
    // case 'Wide':

    // case 'ExtraWide':

    // case 'Illegal':

    // case 'SuspendGenerator':

    // case 'SwitchOnGeneratorState':

    // case 'ResumeGenerator':

    default: 
      break;
  }
}