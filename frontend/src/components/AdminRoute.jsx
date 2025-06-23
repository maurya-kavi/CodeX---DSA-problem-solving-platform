import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from 'lucide-react';

const AdminRoute = () => {
    const {authUser , isCheckingAuth} = useAuthStore();

    if(isCheckingAuth){
        return <div className='flex items-center justify-center h-screen'>
            <Loader className="size-10 animate-spin"/>
            <p className="mt-4 text-white text-sm opacity-70">Checking admin access...</p>
        </div>
    }
    console.log("authUser", authUser);

    // if(!authUser || authUser.role!=="ADMIN"){
    //     return <Navigate to="/"/>
    // }


  return <Outlet/>
}

export default AdminRoute