import "./Vehicle.css";

const Vehicle = (props) => {
  const { make, model, year } = props.vehicles;
  return (
    <div className="vehicle">
      <div>{make}</div>
      <div>{model}</div>
      <div>{year}</div>
    </div>
  );
};

export default Vehicle;
