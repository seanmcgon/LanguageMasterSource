import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function create(className, setInput, submitToServer, hidePopup, showError) {
  const result = submitToServer(className);
  if (result) {
    showError(false);
    setInput("");
    hidePopup();
  } else {
    showError(true);
    setInput("");
  }
}

export default function CreateClassPopup(props) {
  const [input, setInput] = useState("");
  const [showError, setShowError] = useState(false);
  const { handleSubmission, ...restProps } = props;

  return (
    <Modal
      {...restProps}
      centered
      onEnter={() => {
        setInput("");
        setShowError(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="popupTitle" id="contained-modal-title-vcenter">
          Create New Class
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Name your class:</h5>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            create(
              input,
              setInput,
              handleSubmission,
              restProps.onHide,
              setShowError
            );
          }}
        >
          <input
            value={input}
            onInput={(e) => setInput(e.target.value)}
            name="name"
            autoComplete="off"
          />
          <Button id="formBtn" variant="primary" type="submit">
            Create
          </Button>
        </form>
        {showError && (
          <p id="invalidClass">
            Class name is invalid or already exists. Please try again
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
}
