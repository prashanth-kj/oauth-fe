import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AxiosService from './common/Apiservice';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function Register() {
   
     let [name,setName]=useState();
     let [email,setEmail]=useState();
     let [password,setpassword]=useState();

     let navigate=useNavigate()

    let handleRegister=async()=>{

        try {
            
             let res= await AxiosService.post('/customer/register',{
                 name,       
                 email,
                 password
   
             })
             console.log(res)
             if(res.status==201){
                  navigate('/login')
             }
             
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleGoogleLogin = () => {
        // Redirect to the backend's Google OAuth route
        window.location.href = "https://oauth-be-ull5.onrender.com/auth/google";
      };
    
    const handleGithubLogin=()=>{
        window.location.href = "https://oauth-be-ull5.onrender.com/auth/github";
    }
  return (
   <>
      <div className='container' style={{height:'100vh'}}>
          <div className='d-flex justify-content-center align-items-center' style={{height:'100%'}}>
               <div className='container-fluid shadow rounded-4 p-4' style={{maxWidth:'400px'}}>
                <div className='text-center'>
                    <h5 style={{color:'darkgreen'}}>Register here!</h5>
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="form-label">Name</Form.Label>
                        <Form.Control type="text" className="form-control"  placeholder="enter firstname" onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control type="email" className="form-control" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className="form-label">Password</Form.Label>
                        <Form.Control type="text" className="form-control" placeholder="Enter password" onChange={(e)=>setpassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="success" className='w-100' onClick={()=>handleRegister()}>Register</Button>&nbsp;
                </Form>
                <Button onClick={handleGoogleLogin} className='btn-light  shadow w-100' ><FcGoogle  size={25} className='mx-3'/>Signin with Google</Button> &nbsp;
                <Button onClick={handleGithubLogin} className='btn-light  shadow w-100'><FaGithub size={25} className='mx-3'/>Signin with Github </Button>
               </div>
          </div>
      </div>
   </>
  )
}

export default Register