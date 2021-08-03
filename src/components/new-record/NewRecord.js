import axios from "axios";
import { useEffect, useState } from "react";
import { useInput, useSelect } from "../../Hooks";
import "./NewRecord.css";

const NewRecord = (props) => {
  const [mileage, mileageInput] = useInput({ type: "number", ph: "mileage" });
  const [notes, notesInput] = useInput({ type: "text", ph: "notes" });
  const [workTypeOptions, setWorkTypeOptions] = useState([]);
  const [partOptions, setPartOptions] = useState([]);
  const [work, workSelect] = useSelect("Type of Work", workTypeOptions);
  const [part, partInput] = useSelect("Part", partOptions);

  // get the list of all drop down options relevent to this component
  useEffect(() => {
    axios.get("/dropdowns").then((lists) => {
      const partOptions = lists.data.partOptions.map((options) => {
        return `${options.category}: ${options.name}`;
      });
      const workOptions = lists.data.workTypeOptions.map((options) => {
        return options.work_type;
      });
      setPartOptions(partOptions);
      setWorkTypeOptions(workOptions);
    });
  }, []);

  return (
    <form onSubmit={(e) => props.addRecord(e, work, part, mileage, notes)}>
      <ul>
        <li>{workSelect}</li>
        <li>{partInput}</li>
        <li>{mileageInput}</li>
        <li>{notesInput}</li>
      </ul>
      <input id="submit-button" type="submit" value="Submit" />
    </form>
  );
};

export default NewRecord;
