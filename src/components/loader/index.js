import Spinner from "react-bootstrap/Spinner";
import "./loader.css";

const Loader = () => {
  return (
    <div className="position-absolute top-0 flexGrid h-100 w-100 bg-body-secondary">
      <div className="flexCenter flex-column">
        <Spinner
          animation="border"
          role="status"
          className="mb-3 text-black"
        ></Spinner>
        <span className="text-black">Loading........</span>
      </div>
    </div>
  );
};

export default Loader;
