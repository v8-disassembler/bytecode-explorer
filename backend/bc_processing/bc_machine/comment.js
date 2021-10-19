module.exports = function (op, ...args) {
  switch (op) {
    // case 'LdaZero':

    // case 'LdaSmi':

    // case 'LdaConstant':
    //   this.acc = 

    // case 'LdaUndefined':

    // case 'LdaNull':

    // case 'LdaTheHole':

    // case 'LdaTrue':
    
    // case 'LdaFalse':
      
    // case 'Ldar':
    
    // case 'Star':
    
    // case Star0 - StarN:

    // case 'Mov':
    
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

    // case 'LdaNamedProperty':

    // case 'LdaNamedPropertyFromSuper':

    // case 'LdaKeyedProperty':
    
    // case 'StaNamedProperty':

    // case 'StaNamedOwnProperty':

    // case 'StaKeyedProperty':

    // case 'StaKeyedPropertyAsDefine':

    // case 'StaInArrayLiteral':

    // case 'StaDataPropertyInLiteral':

    // case 'LdaModuleVariable':

    // case 'StaModuleVariable':

    // case 'PushContext':

    // case 'PopContext':

    // case 'Add':

    // case 'Sub':

    // case 'Mul':
    
    // case 'Div':

    // case 'Mod':
    
    // case 'Sub':

    // case 'AddSmi':

    // case 'SubSmi':

    // case 'MulSmi':

    // case 'DivSmi':

    // case 'ModSmi':

    // case 'ExpSmi':

    // case 'BitwiseOr':

    // case 'BitwiseXor':

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

    // case 'Inc':

    // case 'Dec':

    // case 'ToBooleanLogicalNot':

    // case 'LogicalNot':
    
    // case 'TypeOf':
    
    // case 'DeletePropertyStrict':

    // case 'DeletePropertySloppy':

    // case 'GetSuperConstructor':

    // case 'Call':

    // case 'CallRuntime':

    // case 'InvokeIntrinsic':

    // case 'CallRuntimeForPair':

    // case 'CallJSRuntime':

    // case 'CallWithSpread':

    // case 'ConstructWithSpread':

    // case 'Construct':

    // case 'TestEqual':

    // case 'TestEqualStrict':

    // case 'TestReferenceEqual':

    // case 'TestLessThan':

    // case 'TestGreaterThan':

    // case 'TestLessThanOrEqual':

    // case 'TestGreaterThanOrEqual':

    // case 'TestIn':

    // case 'TestInstanceOf':

    // case 'TestUndetectable':

    // case 'TestNull':

    // case 'TestUndefined':

    // case 'TestTypeOf':

    // case 'Jump':

    // case 'JumpConstant':

    // case 'JumpIfTrue':

    // case 'JumpIfTrueConstant':

    // case 'JumpIfFalse':

    // case 'JumpIfFalseConstant':

    // case 'JumpIfToBooleanTrue':

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

    // case 'JumpIfJSReceiver':

    // case 'JumpIfJSReceiverConstant':

    // case 'JumpLoop':

    // case 'SwitchOnSmiNoFeedback':

    // case 'CreateRegExpLiteral':

    // case 'CreateArrayLiteral':

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

    // case 'Return':

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

    // case 'GetIterator':

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