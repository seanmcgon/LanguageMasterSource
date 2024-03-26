import React, { useState } from "react";

// Login Form within the modal
function LoginForm() {
  const [isTeach, setTeach] = useState(false);
  return (
    <div class="myform bg-dark">
      <h1 class="text-center">Welcome {isTeach ? "Teacher" : "Student"}</h1>
      <form>
        <button class="btn btn-role bg-transparent">
          I'm a {isTeach ? "Student" : "Teacher"}
        </button>
        <div class="mb-3 mt-4">
          <label for="InputEmail" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="InputEmail"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="InputPassword" class="form-label">
            Password
          </label>
          <input type="password" class="form-control" id="InputPassword" />
        </div>
        <button type="submit" class="btn btn-light mt-3">
          LOGIN
        </button>
        <p>
          Not a member? <a href="#">Signup now</a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
