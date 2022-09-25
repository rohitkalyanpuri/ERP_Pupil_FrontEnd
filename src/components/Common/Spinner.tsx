import spinner from "../../SquareLoading.gif";

const SpinnerLoader= () => (
    <img
      src={spinner}
      style={{ width: "100px", margin:"auto",marginTop: "200px", display: "block" }}
      alt="Loading..."
    />
);
export default SpinnerLoader;
