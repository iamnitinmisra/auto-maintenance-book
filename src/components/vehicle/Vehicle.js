import "./Vehicle.css";

const Vehicle = (props) => {
  const { make, model, year, vin } = props.vehicles;
  return (
    <div className="vehicle">
      <div>{make}</div>
      <div>{model}</div>
      <div>{year}</div>
      <div>{vin}</div>
    </div>
  );
};

export default Vehicle;
