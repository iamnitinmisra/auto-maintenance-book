import { useState } from "react";

//input box hook, see auth.js for usage
//requires input type and placeholder
export function useInput({ type, ph }) {
  const [value, setValue] = useState("");
  const input = (
    <input
      // style={{ width: "100%" }}
      value={value}
      placeholder={ph}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      min="1"
    />
  );
  return [value, input];
}

// Select tag hook requires a default option and an array parameter with each dropdown option
export function useSelect(defaultMessage, dropdowns) {
  const [option, setOption] = useState("");
  const options = dropdowns.map((options, i) => {
    return (
      <option key={i} value={options}>
        {options}
      </option>
    );
  });

  const select = (
    <select value={option} onChange={(e) => setOption(e.target.value)}>
      <option value="" selected disabled hidden>{`${defaultMessage}`}</option>
      {options}
    </select>
  );
  return [option, select];
}
