import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSingInAction } from "../Actions/userActions";
import ErrorMessage from "../Error/ErrorMessage";
import Loading from "../Loading/Loading";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(userSingInAction(email, password))
  }
  const singInInfo = useSelector(state => state.singInInfo);
  const {userInfo, loading, error} = singInInfo;

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
        <h1>SignIn</h1>
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
