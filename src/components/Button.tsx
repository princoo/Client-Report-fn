import React from 'react';
import loader from '/svgs/spinner.svg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
  color?: string;
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  loading_state?: boolean;
}
export const Button: React.FC<ButtonProps> = (props) => {
  const { size, color, text, onClick, type, loading_state, ...restProps } = props;
  const buttonSize = `w-${size || 'full'}`;
  const buttonColor = `bg-${color || 'blue'}-500`;

  return (
    <button
      className={`p-2 rounded-xl text-white font-medium ${buttonSize} ${buttonColor}`}
      onClick={onClick}
      type={type || 'submit'}
      disabled={loading_state}
      {...restProps}
    >
      {loading_state ? (
        <img src={loader} style={{ height: '25px', margin: 'auto' }} alt="loader" />
      ) : (
        text
      )}
    </button>
  );
};