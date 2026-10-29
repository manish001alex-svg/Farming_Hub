import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

const Protected = ({children}) => {
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    console.log("Hello", loading);
    console.log("Hello", user);

    if(loading){
        return <div>Loading....</div>
    }

    if(!user){
        console.log("Use: ",user);
        return <Navigate to={"/login"} />
    }

    if(user.role !== "USER"){
        return <Navigate to={"/admin/dashboard"} />
    }

   

    
  return children;
}

export default Protected