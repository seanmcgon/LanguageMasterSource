import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import ClassAsgmts from "./components/classAsgmts";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/class-asgmts"
          element={
            <ClassAsgmts
              className={"Test Class"}
              asgmts={[
                { name: "Assignment 1", termCount: 15, terms: {} },
                { name: "Assignment 2", termCount: 10, terms: {} },
                { name: "Assignment 3", termCount: 20, terms: {} },
                { name: "Assignment 4", termCount: 17, terms: {} },
                { name: "Assignment 5", termCount: 29, terms: {} },
                { name: "Assignment 6", termCount: 21, terms: {} },
                { name: "Assignment 7", termCount: 12, terms: {} },
              ]}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
