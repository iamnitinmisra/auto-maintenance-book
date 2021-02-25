import axios from "axios";
import { useEffect, useState } from "react";
import NewRecord from "../new-record/NewRecord";

const Log = (props) => {
  const [carDetails, setCarDetails] = useState([]);

  useEffect(() => {
    async function getData() {
      const details = await axios.get(
        `/garage/records?vid=${props.match.params.id}`
      );
      console.log(details.data);
      setCarDetails(details.data);
    }
    getData();
  }, [props.match.params.id]);

  const mappedLog = carDetails.map((entry) => {
    return <div></div>;
  });

  return (
    <div>
      <div>
        <div>New Entry</div>
        <NewRecord />
      </div>
      <div>Car Maintenance Log</div>
      {mappedLog}
    </div>
  );
};

export default Log;
