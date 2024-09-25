/* eslint-disable react/prop-types */
import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        className={`text-black ${className}`}
        {...props}
        ref={ref}
      />
    </div>
  );
});

export default Input;
