const Comp1 = (props) => {
  console.log("Comp1 Rendered");
  return (
    <div style={{  fontWeight: "bold" , backgroundColor: "green"}}>
      <h2>Hello from Comp1, {props.name}!</h2>
    </div>
  );
};

export default Comp1;