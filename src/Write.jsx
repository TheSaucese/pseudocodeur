import React, { useState } from 'react'

const Write = () => {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const parentDivStyle = {
    backgroundColor: '#CCCCCC',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',
    minWidth: '11rem',
    maxWidth: '22rem', 
    width: `${inputValue.length * 10 + 70}px`, // Adjust the multiplier to control how quickly the width increases
    display: 'inline-flex',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    alignItems: 'center',
  };

  const inputStyle = {
    fontSize: '0.875rem',
    borderRadius: '0.25rem',
    outline: 'none',
    height: '1.5rem',
    minWidth: '6rem',
    width: `${inputValue.length * 10 + 30}px`,
    boxSizing: 'border-box',
    textAlign: 'center',
    color: '#1e50b3',
  };

  return (
    <div style={parentDivStyle}>
      <p className='mr-2'>écrire</p>
      <input
        style={inputStyle}
        placeholder="expression"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Write