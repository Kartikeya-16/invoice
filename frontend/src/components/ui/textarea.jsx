import React from 'react';

export function Textarea({ value, onChange, label, name, rows, placeholder }) {
  return (
    <div className="textarea-wrapper">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows || 4}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}
