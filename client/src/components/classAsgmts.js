import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./classAsgmts.css";

//To see what this page looks like, just visit 'http://localhost:3000/class-asgmts'
//I used routing in index.js to do that, see that file for additional comments
//Feel free to ignore that stuff when integrating this component, I just did it so I could easily see what it looked like

export default function ClassAsgmts({ className, asgmts }) {
  return (
    // Probably put Suhani's navbar here
    <div id="classAsgmtsBody">
      <div id="classHeading">
        <h1 id="nameOfClass">{className}</h1>
      </div>
      <br />
      <h3 id="asgmtsHeader">Assignments:</h3>
      <div id="asgmtsBody">
        {asgmts.length > 0 ? (
          <div id="asgmtsGrid">
            <Row xs={1} md={3} className="g-4">
              {asgmts.map((asgmt, idx) => (
                <Col key={idx}>
                  <Link
                    className="custom-link"
                    to={{
                      pathname: `/asgmtPage/${asgmt.name}`,
                    }}
                  >
                    <Card
                      text="white"
                      style={{ cursor: "pointer" }}
                      className="custom-card"
                    >
                      <Card.Body>
                        <Card.Title>{asgmt.name}</Card.Title>
                        <Card.Text className="termCount">
                          {asgmt.termCount} terms
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <div>
            <br />
            <p>No current assignments</p>
          </div>
        )}
      </div>
    </div>
  );
}
