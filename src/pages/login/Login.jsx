import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
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
          navigate("/user")
        }
    }catch (err) {
        console.log(err)
      dispatch({type: "LOGIN_FAILURE", payload:  err.response.data })
      // return null;
    }
  }
    const handleChange = (e) => {
      setNewLogin({...newlogin, [e.target.name]: e.target.value});
    }

  return (

    <div>
      <Container>
        <Row  className="vh-100 d-flex justify-content-center align-items-center border-2 ">
          <Col md={8} lg={6} xs={12}>
            <Card className=" shadow-lg border-5 border-top ">
              <Card.Body>
                <div className="mb-3 mt-md-4 align-items-center">
                  <div className=' align-items-center'>
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter name"  className='shadow border-0'
                        onChange={handleChange} name="name" value={newlogin.name}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" className='shadow border-0'
                        onChange={handleChange} name="password" value={newlogin.password}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button style={{"background-color":"green" , border:0}} type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div>{error && <span>{error.message}</span>}</div>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link to="/signup">Sign up</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </div>
  )
}
export default Login