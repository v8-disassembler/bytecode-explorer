import React, { useState } from 'react';
import './App.css';

const $ = require('jquery');

interface InputProps {
  value: string,
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function Input({ value, handleChange }: InputProps) {
  return (
    <textarea className="input"
      value={value}
      spellCheck={false}
      onChange={handleChange}
    ></textarea>
  )
}

interface OutputProps {
  bytecode: string
}

function Output({ bytecode }: OutputProps) {
  return (
    <textarea className="output"
      value={bytecode}
      readOnly={true}
    ></textarea>
  )
}

function Console() {
  const [ value, setVal ] = useState('function john (str) {\n  return Array.from(str.matchAll(/\\b\\w/g, (match) => `${match}e`));\n}\n\njohn(\'John fitzgerald kennedy\');');
  const [ bytecode, setBytecode ] = useState('');

  function handleChange (e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setVal(e.target.value);
  }

  async function handleClick (e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    try { 
      const bytecode = await $.post('/submission', { value });
      setBytecode(bytecode);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="Console">
      <Input value={value} handleChange={handleChange} />
      <button onClick={handleClick}>Get Bytecode</button>
      <Output bytecode={bytecode} />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Console />
      </header>
    </div>
  );
}

export default App;
