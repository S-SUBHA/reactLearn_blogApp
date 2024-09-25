/* eslint-disable react/prop-types */
import { forwardRef, useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} className={`${className}`} ref={ref} {...props}>
        {Array.isArray(options) &&
          options.map((option) => (
            <option key={option} value={option} className="text-[#00000080]">
              {option}
            </option>
          ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
