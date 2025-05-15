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
        <input ref={ref} {...rest} placeholder=" " value={rest.value ?? ''} className={error ? s.error : ''} />
        {label && <label>{label}</label>}
      </div>
    );
  }
);