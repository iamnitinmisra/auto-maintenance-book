import { useState } from "react";

//input box hook, see auth.js for usage
//requires input type, placeholder
//optional className as cName
export function useInput({ type, ph, cName }) {
  const [value, setValue] = useState("");

  const input = (
    <div className={cName}>
      <input
        id={"input-a"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        min="1"
      />
      <label for="input-a"> {ph} </label>
    </div>
  );
  return [value, input];
}

// Select tag hook requires a default option and an array parameter with each dropdown option
export function useSelect(defaultMessage, selection) {
  const [option, setOption] = useState("");
  const options = selection.map((options, i) => {
    return <option key={i}>{options}</option>;
  });

  const select = (
    <select
      defaultValue={defaultMessage}
      onChange={(e) => {
        setOption(e.target.selectedIndex);
      }}
    >
      <option value="" selected disabled hidden>{`${defaultMessage}`}</option>
      {options}
    </select>
  );
  return [option, select];
}
