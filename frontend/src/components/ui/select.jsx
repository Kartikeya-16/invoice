import React from 'react';

export function Select({ options, value, onChange, label, name }) {
  return (
    <div className="select-wrapper">
      {label && <label htmlFor={name}>{label}</label>}
      <select id={name} name={name} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
