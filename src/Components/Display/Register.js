import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRegisterAction } from "../Actions/userActions";
import ErrorMessage from "../Error/ErrorMessage";
import Loading from "../Loading/Loading";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
      e.preventDefault();
      if(password !== confirmPassword) {
        alert("Password doesn't match");
      }
      else{
        dispatch(userRegisterAction(name, email, password))
      }
  }
  const useRegister = useSelector(state => state.useRegister);
  const {userInfo, loading, error} = useRegister;

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
  useEffect(()=> {
    if(userInfo) {
          props.history.push(redirect)
    }
  }, [userInfo, props.history, redirect])
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
      <div>
        <h1>Create Account</h1>
      </div>
      <div>
        {
          loading && <Loading></Loading>
        }
        {
          error && <ErrorMessage variant="danger">{error}</ErrorMessage>
        }
      </div>
        <div>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>
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
          <label htmlFor="confirmPassword"> Confirm Password</label>
          <input
            type="password"
            required
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>
        <div>
            <label />
            <button className="primary" type="submit">Submit</button>
        </div>
        <div>
            <label />
           <div>
              Already have Account ? {" "}
               <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
           </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
