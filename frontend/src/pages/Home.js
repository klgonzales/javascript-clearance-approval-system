import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // redirect when login is successful
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/student");
    }
  }, [isLoggedIn, navigate]);

  function signUp(e) {
    e.preventDefault();
    // form validation goes here
    fetch("http://localhost:3001/signup-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: document.getElementById("s-fname").value,
        middle_name: document.getElementById("s-mname").value,
        last_name: document.getElementById("s-lname").value,
        student_number: document.getElementById("s-sno").value,
        email: document.getElementById("s-email").value,
        password: document.getElementById("s-password").value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          alert("SUCCESS: You have successfully signed up!");
        } else {
          alert("ERROR: Failed to sign up.");
        }
      });
  }

  function logInStudent(e) {
    e.preventDefault();

    // form validation goes here

    fetch("http://localhost:3001/login-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("ls-email").value,
        password: document.getElementById("ls-password").value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          setIsLoggedIn(true);
          // successful log in. store the token as a cookie
          const cookies = new Cookies();
          cookies.set("authToken", body.token, {
            path: "localhost:3001/",
            age: 60 * 60,
            sameSite: false,
          });

          localStorage.setItem("username", body.username);
        } else {
          alert("Log in failed");
        }
      });
  }

  function logInApprover(e) {
    e.preventDefault();

    // form validation goes here

    fetch("http://localhost:3001/login-approver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("la-email").value,
        password: document.getElementById("la-password").value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          setIsLoggedIn(true);
          // successful log in. store the token as a cookie
          const cookies = new Cookies();
          cookies.set("authToken", body.token, {
            path: "localhost:3001/",
            age: 60 * 60,
            sameSite: false,
          });

          localStorage.setItem("username", body.username);
        } else {
          alert("Log in failed");
        }
      });
  }

  // [] @up.edu.ph email validation

  return (
    <>
      <h1>Sign Up for Students</h1>
      <form id="sign-up">
        <input id="s-fname" placeholder="First Name" required />
        <input id="s-mname" placeholder="Middle Name" />
        <input id="s-lname" placeholder="Last Name" required />
        <input id="s-sno" placeholder="Student Number" required />
        <input id="s-email" placeholder="UP Mail" required />
        <input id="s-password" type="password" placeholder="Password" required />
        <button onClick={signUp}>Sign Up</button>
      </form>

      <h1>Log In for Students</h1>
      <form id="log-in-student">
        <input id="ls-email" placeholder="Student Email" />
        <input id="ls-password" type="password" placeholder="Student Password" />
        <button onClick={logInStudent}>Log In</button>
      </form>

      <h1>Log In for Approvers</h1>
      <form id="log-in-approver">
        <input id="la-email" placeholder="Approver Email" />
        <input id="la-password" type="password" placeholder="Approver Password" />
        <button onClick={logInApprover}>Log In</button>
      </form>

      <p>Note: Coordinate with the Admin to create an Approver account.</p>
    </>
  );
}
