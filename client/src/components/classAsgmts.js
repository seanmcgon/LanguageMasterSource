import React from "react";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "./classAsgmts.css";

export default function ClassAsgmts() {
  return (
    <div id="classAsgmtsBody">
      <div id="classHeading">
        <h1 id="nameOfClass">Name of Class</h1>
      </div>
      <br />
      <h2 id="asgmtsHeader">Assignments:</h2>
      <Row xs={1} md={3} className="g-4">
        {Array.from({ length: 7 }).map((_, idx) => (
          <Col key={idx}>
            <Card
              onClick={() => {}}
              text="white"
              style={{ cursor: "pointer" }}
              className="custom-card"
            >
              <Card.Body>
                <Card.Title>Primary Card Title</Card.Title>
                <Card.Text className="termCount">25 terms</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
