import axios from "axios";
import { useEffect, useState } from "react";
import NewRecord from "../new-record/NewRecord";

const Log = (props) => {
  const [carRecords, setCarRecords] = useState([]);
  const { vin } = props.match.params;

  useEffect(() => {
    async function getData() {
      const details = await axios.get(`/garage/records?vin=${vin}`);
      setCarRecords(details.data);
    }
    getData();
  }, [vin]);

  // add the new record to the database
  const addRecord = async (e, workType, part, mileage, notes) => {
    e.preventDefault();
    const details = { vin, workType, part, mileage, notes };
    const newRecord = await axios.post("/garage/record", details);
    console.log(newRecord.data);
    setCarRecords(newRecord.data);
  };
  // map over the list of records for a specific vehicle
  const mappedLog = carRecords.map((entry) => {
    return (
      <div className="vehicle">
        <div>Work: {entry.work_type}</div>
        <div>Category: {entry.category}</div>
        <div>Part: {entry.name}</div>
        <div>Miles: {entry.miles}</div>
        <div>Notes: {entry.notes}</div>
      </div>
    );
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
