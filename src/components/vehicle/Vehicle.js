import "./Vehicle.css";

const Vehicle = (props) => {
  const { make, model, year, vin } = props.vehicles;
  return (
    <div className="vehicle wFont">
      <span>{make}</span>
      <span>{model}</span>
      <span>{year}</span>
      <span>{vin}</span>
    </div>
  );
};

export default Vehicle;
