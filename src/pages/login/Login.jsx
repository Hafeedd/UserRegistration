import axios from 'axios';
import "./login.css"
import React, { useContext, useState } from 'react'
import { Link , useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import CryptoJS  from 'crypto-js';

export const Login = () => {

  var key = 'gzLxc16cnBhScdScGijOEXdAyv2XkgR5TRqYPK5FH7Q='
  
  const [newlogin , setNewLogin] = useState({
    name: '',
    password: '',
  });

  const { /* user ,*/error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()
  
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    dispatch({type: "LOGIN_START" });
    try {
      const res = await axios.post('http://localhost:8800/api/auth/login',{
      username:newlogin.name,
      password:newlogin.password,
    },{withCredentials: true});
    dispatch({type: "LOGIN_SUCCESS", payload: res.data.token })
    const users = res.data.token
      const data = CryptoJS.AES.decrypt(users,key);
      var token = JSON.parse(data.toString(CryptoJS.enc.Utf8));
      if( token.type.isUser ){
      navigate("/user")}
        else{
          navigate("/user");
        }
    }catch (err) {
        console.log(err)
      dispatch({type: "LOGIN_FAILURE", payload:  err.response.data });
      // return null;
    }
  }
    const handleChange = (e) => {
      setNewLogin({...newlogin, [e.target.name]: e.target.value});
    }

  return (
    <div className="loginContainer">
      <div className="loginContainer2">
        <div className="simpleContainer">
        <img src='/images/user.jpg' className="imageContainer"/>
        <form action="POST" className="loginForm">
        <p className="loginText">Login</p>
            <input type="text" className="userInput" onChange={e=>{handleChange(e)}}/>
            <input type="password" className="userInput" onChange={e=>{handleChange(e)}}/>
          <input type="button" onClick={e=>{handleSubmit(e)}} value="Login" className="loginButton"/>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Login;