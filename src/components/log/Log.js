import axios from "axios";
import { useEffect, useState } from "react";
import NewRecord from "../new-record/NewRecord";

const Log = (props) => {
  const [carRecords, setCarRecords] = useState([]);
  const { id: vid } = props.match.params;

  useEffect(() => {
    async function getData() {
      const details = await axios.get(`/garage/records?vid=${vid}`);
      setCarRecords(details.data);
    }
    getData();
  }, [vid]);

  // add the new record to the database
  const addRecord = async (e, workType, part, mileage) => {
    e.preventDefault();
    console.log(workType);
    const details = { vid, workType, part, mileage };
    const newRecord = await axios.post("/garage/record", details);
    setCarRecords(newRecord);
  };

  // map over the list of records for a specific vehicle
  const mappedLog = carRecords.map((entry) => {
    return <div></div>;
  });

  return (
    <div>
      <div>
        <div>Add a Record</div>
        <NewRecord addRecord={addRecord} />
      </div>
      <div>Maintenance Log</div>
      {mappedLog}
    </div>
  );
};

export default Log;
