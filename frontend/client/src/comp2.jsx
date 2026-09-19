const Comp2 = (props) => {
    console.log("Comp2 Rendered");
  return (
    <div style={{  fontWeight: "bold" , backgroundColor: "yellow"}}>
      <h2>Hello from Comp2, {props.name}!</h2>
    </div>
  );
};

export default Comp2;