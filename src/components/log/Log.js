import axios from "axios";
import { useEffect, useState } from "react";
import NewRecord from "../new-record/NewRecord";

const Log = (props) => {
  const [carRecords, setCarRecords] = useState([]);
  const { id: vid } = props.match.params;

  useEffect(() => {
    async function getData() {
      const details = await axios.get(`/garage/records?vid=${vid}`);
      console.log(details.data);
      setCarRecords(details.data);
    }
    getData();
  }, [vid]);

  const addRecord = async (workType, part, mileage) => {
    const details = { vid, workType, part, mileage };
    const newRecord = await axios.post("/garage/record", details);
    setCarRecords(newRecord);
  };

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
