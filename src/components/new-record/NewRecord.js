import axios from "axios";
import { useEffect, useState } from "react";
import { useInput } from "../../Hooks";

const NewRecord = (props) => {
  const [workType, workTypeInput] = useInput({ type: "text", ph: "Work Done" });
  const [part, partInput] = useInput({
    type: "text",
    ph: "Part # (if applicable)",
  });
  const [mileage, mileageInput] = useInput({ type: "number", ph: "mileage" });
  const [dropdowns, setDropdowns] = useState([]);

  useEffect(() => {
    axios.get("/dropdowns").then((list) => {
      setDropdowns(list.data);
    });
  });

  console.log(props);

  return (
    <form onSubmit={() => props.addRecord(workType, part, mileage)}>
      {workTypeInput}
      {partInput}
      {mileageInput}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default NewRecord;
