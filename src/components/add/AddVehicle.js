import axios from "axios";
import e, { text } from "express";
import { createFactory } from "react";
import { useInput } from "../../Hooks";
import axios from 'axios'

const AddVehicle = (props) => {
  const [make, makeInput] = useInput({ type: text, ph: "Make" });
  const [model, modelInput] = useInput({ type: text, ph: "Model" });
  const [year, yearInput] = useInput({ type: text, ph: "Year" });
  const [VIN, vinInput] = useInput({ type: text, ph: "VIN" });

  let newCar = {make, model, year, VIN}

  return (
    <form onSubmit={e => props.createCar(e, newCar)}>
      {makeInput}
      {modelInput}
      {yearInput}
      {vinInput}
      <input type="submit" />
    </form>
  );
};

export default AddVehicle;
