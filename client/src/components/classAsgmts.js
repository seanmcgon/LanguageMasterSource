import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./classAsgmts.css";

export default function ClassAsgmts({ className, asgmts }) {
  return (
    // Probably put Suhani's navbar here
    <div id="classAsgmtsBody">
      <div id="classHeading">
        <h1 id="nameOfClass">{className}</h1>
      </div>
      <br />
      <h2 id="asgmtsHeader">Assignments:</h2>
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
  );
}
