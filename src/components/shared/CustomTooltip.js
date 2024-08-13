import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const CustomTooltip = ({ msg = "tooltip", children }) => {
  return (
    <>
      {["right"].map((placement) => (
        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={<Tooltip id={`tooltip-${placement}`}>{msg}</Tooltip>}
        >
          <Button className="border-0 bg-transparent">{children}</Button>
        </OverlayTrigger>
      ))}
    </>
  );
};

export default CustomTooltip;
