
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {Button, Col, Row, Container, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";


const SignUp = () => {
  const [newUser , setNewUser] = useState({
    name: '',
    password:'',
    address:'',
    image:'',
  });

  const navigate = useNavigate()

  const [error,setError] = useState(false);
  const [errorM,setErrorM] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:8800/api/auth/registerUser',{
      username:newUser.name,
      address:newUser.address,
      password:newUser.password,
      image:newUser.image
    })
      navigate("/login")
      console.log(res)

    }catch (err){
      console.log(err.response.data)
      setError(true)
      setErrorM(err.response.data.message)
    }
    
  }

  const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.value});
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
      let base64 = ""
      const file = e.target.files[0];
      base64 = await convertToBase64(file);
      setNewUser({...newUser, photo: base64 });
  }

  return (
    
      <div>
        
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4 shadow">
              <Card.Body>
                        
                <div className="mb-3 mt-md-4">
                {newUser.image !== '' && <div>
                <img onClick={handleFileUpload} 
                      alt='img'
                      src={newUser.image}
                      width="50px"
                      height="50px"
                      className="  shadow-sm rounded-circle align-self-center mt-0 mb-4  "
                  />
                </div>}
                {newUser.image == '' &&<div><img 
                      onClick={handleFileUpload}
                      alt='img'
                      src='images/user.jpg'
                      width="50px"
                      height="50px" 
                      className="  shadow-sm rounded-circle align-self-center mt-0 mb-4  "
                  />
                  </div>}
                  <div className="mb-3">

                    <Form onSubmit={handleSubmit}>
                    
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">User Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" className='shadow border-0'
                        onChange={handleChange} name="name" value={newUser.name} />
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label className="text-center">
                          Address
                        </Form.Label>
                        <Form.Control type="tel" placeholder="Enter address" className='shadow border-0'
                        onChange={handleChange} name="address" value={newUser.address}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" className='shadow border-0'
                        onChange={handleChange} name="password" value={newUser.password} />
                      </Form.Group>
                      {/* <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group> */}
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                      <Button style={{"background-color":"green" , border:0}} type="submit">
                          Login
                        </Button>
                       {/*  <Button variant="primary" type="submit" onClick={handlesubmit()}>
                          Create Account
                        </Button> */}
                      </div>
                    </Form>
                    <div>{error && <span>{errorM}</span>}</div>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{' '}
                        <Link to="/login">Sign in</Link>
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

export default SignUp