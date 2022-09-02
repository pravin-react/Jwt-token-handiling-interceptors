import React, { useState } from 'react'
import { regType } from '../../Types/UserTypes';
import userAxios from '../../Axios/Interceptor';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const initValue = {
    name: '',
    email: '',
    password: '',
    newpassword: '',
  };
  const navigate = useNavigate();

  const [userDetail, setUserDetail] = useState<regType>(initValue);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  const regUser = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let { name, email, password, newpassword } = userDetail;
    if (name && email && password && password === newpassword) {
      setUserDetail(initValue);
      console.log('reg user', userDetail);
      userAxios
        .post('/auth/signup', { email, password })
        .then((res) => {
          if (res.status === 201) {
            alert('User registered successfully!!');
            navigate('/login');
          } else {
            alert('Failed to register user');
          }
        })
        .catch((err) => console.error(err.message));
    }
  };
  return (
    <div><div className="Auth-form-container">
    <form className="Auth-form" onSubmit={regUser}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Registration</h3>
        <div className="form-group mt-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Enter username" name='name'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Enter email" name='email'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password" name='password'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password" name='newpassword'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </div>
    </form>
  </div></div>
  )
}

export default Signup