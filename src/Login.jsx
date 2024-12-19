import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import AxiosService from './common/Apiservice';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function Login() {
    let [email,setEmail]=useState();
    let [password,setpassword]=useState();

    let navigate=useNavigate();
    
     let handleLogin=async()=>{
          try {
              let res=await AxiosService.post('/customer/login', {
                 email,
                 password
              })
             
              if(res.status==201){
                sessionStorage.setItem('token',res.data.token)
                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                  navigate('/home')
              }
          } catch (error) {
             console.log(error)
          }
     }

     const handleGoogleLogin = () => {
        // Redirect to the backend's Google OAuth route
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
      };
    
    const handleGithubLogin=()=>{
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
    }
  return (
   <>
     <div className='container' style={{height:'100vh'}}>
        <div className='d-flex flex-column  justify-content-center align-items-center' style={{height:'100%'}}>
            <div className='container-fluid shadow rounded-4 p-4'  style={{maxWidth:'400px'}}>
                    <div className='text-center '>
                    <h5 style={{color:'darkgreen'}}>Login here!</h5>
                    </div>

                <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control type="email" className="form-control" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control type="email" className="form-control" placeholder="name@example.com" onChange={(e)=>setpassword(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3 text-center">
                    <Form.Label className="form-label">Don't have an account? <Link to={'/register'} style={{textDecoration:'none',color:'green'}}> Register</Link> </Form.Label>
                 </Form.Group>

                <Button variant="success" className='w-100' onClick={()=>handleLogin()}>Login</Button>&nbsp;
                 
                </Form>
                <Button onClick={handleGoogleLogin} className='btn-light  shadow w-100' ><FcGoogle  size={25} className='mx-3'/>Login with Google</Button> &nbsp;
                <Button onClick={handleGithubLogin} className='btn-light  shadow w-100'><FaGithub size={25} className='mx-3'/>Login with Github </Button>
            </div>
        </div>

     </div>


   </>
  )
}

export default Login