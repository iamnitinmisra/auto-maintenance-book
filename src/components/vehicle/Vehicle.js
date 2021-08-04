import "./Vehicle.css";

const Vehicle = (props) => {
  const { make, model, year, vin } = props.vehicles;
  return (
    <div className="vehicle wFont">
      <span>{year}</span>
      <span>{make}</span>
      <span>{model}</span>
      <span>{vin}</span>
    </div>
  );
};

export default Vehicle;
