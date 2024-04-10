import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import ClassAsgmts from "./components/ClassAssignments/classAsgmts";
import TestAsgmtPage from "./components/ClassAssignments/testAsgmtPage";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          //I added this route so I could easily see what the page looks like by visiting 'http://localhost:3000/class-asgmts'
          path="/class-asgmts"
          element={
            //This is just a test class to see how the class assignments page will look.
            //I'm not sure how you would actually link to a specific class like this from teacher's main page and provide both
            //the class name and assignments list.
            //Maybe only the class name should be passed via a searchParam (like I did below for the test assignment pages) and
            //then query the backend for the actual assignments? Not sure
            <ClassAsgmts
              className={"Test Class"}
              asgmts={[
                { name: "Lesson 1: Talking in Class", termCount: 20 },
                { name: "Assignment 2", termCount: 15 },
                { name: "Assignment 3", termCount: 17 },
                { name: "Assignment 4", termCount: 25 },
                { name: "Assignment 5", termCount: 21 },
                { name: "Assignment 6", termCount: 10 },
                { name: "Assignment 7", termCount: 12 },
              ]}
            />
          }
        />
        {/* I just added these routes so I could test that my assignment buttons actually go somewhere and pass the assignment 
        name via search param */}
        <Route path="/asgmtPage/:name" element={<TestAsgmtPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
