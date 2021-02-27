import { useState } from "react";

//input box hook, see auth.js for usage
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
