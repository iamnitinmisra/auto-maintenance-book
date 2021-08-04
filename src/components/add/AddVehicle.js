import { useInput } from "../../Hooks";
import "./AddVehicle.scss";

const AddVehicle = (props) => {
  const [make, makeInput] = useInput({
    type: "text",
    ph: "Make",
    cName: "fancy-input",
  });
  const [model, modelInput] = useInput({
    type: "text",
    ph: "Model",
    cName: "fancy-input",
  });
  const [year, yearInput] = useInput({
    type: "text",
    ph: "Year",
    cName: "fancy-input",
  });
  const [VIN, vinInput] = useInput({
    type: "text",
    ph: "VIN",
    cName: "fancy-input",
  });

  let newCar = { make, model, year, VIN };

  return (
    <form onSubmit={(e) => props.createCar(e, newCar)} className="flex">
      <div id="new-car">
        {makeInput}
        {modelInput}
        {yearInput}
        {vinInput}
      </div>
      <input type="submit" className="submit top30" />
    </form>
  );
};

export default AddVehicle;
