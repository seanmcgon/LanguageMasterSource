import React from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./classAsgmts.css";
import ViewAssignment from "./viewAssignments.js";

export default function ClassAsgmts({ className, asgmts }) {
  return (
    
    <div id="classAsgmtsBody">
      <div id="classHeading">
        <h1 id="nameOfClass">{className}</h1>
      </div>
      <br />
      <div id="asgmtsHeaderContainer">
        <h3 id="asgmtsHeader">Assignments:</h3>
        <Link to="/createAssignment" className="btn btn-primary">
          Create Assignment
        </Link>
      </div>
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
