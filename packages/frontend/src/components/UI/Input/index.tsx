import s from './Input.module.scss';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <div className={s.inputWrapper}>
        <input ref={ref} {...rest} placeholder=" " />
        {label && <label>{label}</label>}
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    );
  }
);