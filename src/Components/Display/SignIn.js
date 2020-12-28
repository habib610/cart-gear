import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
      e.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            required
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </div>
        <div>
            <label />
            <button className="primary" type="submit">Submit</button>
        </div>
        <div>
            <label />
           <div>
               Don't have Account ? {" "}
               <Link to="/register">Create an Account</Link>
           </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
