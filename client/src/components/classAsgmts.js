import React from "react";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import "./classAsgmts.css";

//Not sure how this will work yet, 
function loadAsgmt(name, terms) {};

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
            <Card
              onClick={() => {loadAsgmt(asgmt.name, asgmt.terms)}}
              text="white"
              style={{ cursor: "pointer" }}
              className="custom-card"
            >
              <Card.Body>
                <Card.Title>{asgmt.name}</Card.Title>
                <Card.Text className="termCount">{asgmt.termCount} terms</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
