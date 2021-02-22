const Vehicle = (props) => {
  console.log(props);
  const { make, model, year } = props.vehicles;
  return (
    <div>
      <div>{make}</div>
      <div>{model}</div>
      <div>{year}</div>
    </div>
  );
};

export default Vehicle;
