import axios from "axios";
import { useEffect, useState } from "react";
import { useInput, useSelect } from "../../Hooks";

const NewRecord = (props) => {
  const [mileage, mileageInput] = useInput({ type: "number", ph: "mileage" });
  const [dropdowns, setDropdowns] = useState([]);
  const [work, workSelect] = useSelect("Type of Work", dropdowns);
  const [part, partInput] = useInput({
    type: "text",
    ph: "Part # (if applicable)",
  });

  // get the list of all drop down options relevent to this component
  useEffect(() => {
    axios.get("/dropdowns").then((list) => {
      // const optionsArray = list.data.map((options) => {
      //   return options.work_type;
      // });
      // setDropdowns(optionsArray);
      setDropdowns(list.data);
    });
  }, []);

  return (
    <form onSubmit={(e) => props.addRecord(e, work, part, mileage)}>
      {workSelect}
      {partInput}
      {mileageInput}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default NewRecord;
