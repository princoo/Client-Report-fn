import React, { ChangeEvent } from 'react';

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  label: string;
  value?: string;
  placeholder?: string;
  name?: string;
  id?: string;
  mode?: 'email' | 'numeric' | 'decimal'; // you may add more here
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputWithLabel: React.FC<InputWithLabelProps> = (props) => {
  const { type, label, value, onChange, name, id, placeholder, ...restProps } = props;

  return (
    <div className="flex flex-col gap-2">
      <label className="mt-3 text-sm font-medium">{label}</label>
      <input
        type={type || 'text'}
        name={name || 'field'}
        id={name || id || 'field'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...restProps}
        className="border font-thin border-gray-300 p-3 rounded-xl focus:outline-none  focus:border-blue-500"
      />
    </div>
  );
};
