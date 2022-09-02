import React, { useState } from 'react'
import { loginType } from '../../Types/UserTypes';
import userAxios from '../../Axios/Interceptor';
import { useNavigate } from 'react-router-dom';

function Login() {
  const initValue: loginType = {
    username: '',
    password: '',
  };
  const [credentials, setCredentials] = useState<loginType>(initValue);
  let navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateLogin = async (evt: React.FormEvent<HTMLFormElement>) => {

    evt.preventDefault();
    console.log(credentials);
    
    let { username, password } = credentials;
    if (username && password) {
      setCredentials(initValue);
      userAxios
        .post('/auth/login', { email: username })
        .then((resp) => {
          console.log('resp data', resp);
          if (resp?.data?.status === 'Success') {
            localStorage.setItem('access_token', resp.data.token);
            localStorage.setItem('refresh_token', resp.data.refreshToken);
            navigate('/home');
          } else {
            alert('Login failed');
          }
        })
        .catch((err) => console.error(err.message));
    }else{
      console.error('password is empty');
      
    }
  };
  return (
    <div><div className="Auth-form-container">
    <form className="Auth-form" onSubmit={validateLogin}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign In</h3>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Enter email"
            name='username'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            name='password'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        
      </div>
    </form>
  </div></div>
  )
}

export default Login