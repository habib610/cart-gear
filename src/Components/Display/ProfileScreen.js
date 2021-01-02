import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../Actions/userActions';
import ErrorMessage from '../Error/ErrorMessage';
import Loading from '../Loading/Loading';

const ProfileScreen = () => {
    const singInInfo = useSelector(state => state.singInInfo);
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails
    const {userInfo} = singInInfo;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(detailsUser(userInfo._id))
    },[dispatch, userInfo]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile

      };
    return (
        <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <Loading/>
        ) : error ? (
          <ErrorMessage variant="danger">{error}</ErrorMessage>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={user.name}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={user.email}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
    );
};

export default ProfileScreen;