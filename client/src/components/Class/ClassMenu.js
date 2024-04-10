import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import ClassCard from "./ClassCard";
import "animate.css";
import TrackVisibility from "react-on-screen";
import ClassObj from "./Class";

import "./ClassMenu.css";

function ClassMenu(props) {
  const { classes } = props;
  // const ClassObj = () => {
  //   return [
  //     {
  //       title: "Arabic for Business",
  //       link: null,
  //       //   imgDir: "Class/class-bg.jpg",
  //     },
  //     {
  //       title: "LATIN100",
  //       link: null,
  //     },
  //     {
  //       title: "Classical Chinese",
  //       link: null,
  //     },
  //   ];
  // };
  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Enrolled Classes</h2>
                  {/* <p>Enrolled classes</p> */}
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >

                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <Row className = "ClassCard">
                          {classes.map((cl, index) => {
                            return <ClassCard key={index} {...cl} />;
                          })}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ClassMenu;
