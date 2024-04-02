import { Col } from "react-bootstrap";
import class_bg from "./class-bg.jpg";

const ClassCard = ({ title, link }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div>
        <img
          class="class-bg"
          src={class_bg}
          alt=""
          onClick={() => window.open(link)}
        />
        <div className="class-txt">
          <h4>{title}</h4>
        </div>
      </div>
    </Col>
  );
};

export default ClassCard;
