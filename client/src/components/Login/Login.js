// Subcomponents
import LoginForm from "./LoginForm.js";
// CSS file
import "./Login.css";

// Button for opening Login Modal
let openButton = (
  <button
    type="button"
    class="login-button"
    data-bs-toggle="modal"
    // ModalForm is the id of the popup
    data-bs-target="#LoginForm"
  >
    Login
  </button>
);

// Main Function
function LoginModal() {
  return (
    <>
      {openButton}
      <div
        class="modal fade"
        id="LoginForm"
        tabindex="-1"
        aria-labelledby="ModalFormLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-center modal-fullscreen">
          <div class="modal-content">
            <div class="modal-body">
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
