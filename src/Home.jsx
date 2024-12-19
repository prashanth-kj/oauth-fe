import React, { useEffect, useState } from 'react'
import AxiosService from './common/Apiservice'
import {useNavigate } from 'react-router-dom'

function Home() {
  let [user,setUser]=useState(null)
  let navigate=useNavigate()

 const getdata=async()=>{  
    try {
      let res= await AxiosService.get('/auth/currentuser',{withCredentials:true})
      // console.log(res.data)
      setUser(res.data)
    } catch (error) {
      console.log(error);

    }
 }

const  getNormaldata=async()=>{
   try {
      let res = await AxiosService.get('/customer/user')
      setUser(res.data.user)
   } catch (error) {
      console.log(error)
   }
 }

 const handlelogout =async()=>{
   let res= await AxiosService.get('/auth/logout',{withCredentials:true})
  //  console.log(res)
   sessionStorage.clear()
   if(res.status==200){
    navigate('/login')
   }
  
 }

 useEffect(()=>{
   let user = JSON.parse(sessionStorage.getItem('user')) 
  //  console.log(user)
   if(user){
     getNormaldata()
   }else{
      getdata()
   }
   

 },[])

  return (
    <div className='container' style={{height:'100vh'}}>
         <h2 className='text-center m-5 p-5'>Welcome to the Page🙏</h2>
        {
          user? (
              <div className='m-5 p-5 text-center'>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p>
                  <strong>Provider:</strong> 
                  {user.provider.includes("google") && <span>Google </span>}
                  {user.provider.includes("github") && <span>GitHub</span>}
                  {user.provider.includes("local") && <span>Local</span>}
                </p>
                <button className='btn btn-secondary ' onClick={handlelogout}>Logout</button>
              </div>  
          ):
          (
            <div>
              <p>user not found</p>
            </div>  
          )
        }
    </div>
  )
}

export default Home