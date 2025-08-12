"use client";
import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
    const CreateUser = useMutation(api.user.CreateNewUser)
const [userDetails,setUserDetails] = useState<any>();
    const {user} = useUser();

    useEffect(() => {
        user && CreatNewUser();
    }, [user])

    const CreatNewUser = async () =>{

        if(user){
        const result = await CreateUser({
            email: user?.primaryEmailAddress?.emailAddress ?? '',
            imageUrl : user?.imageUrl,
            name : user?.fullName ?? ''


        })
        setUserDetails(result);
    }

    }
  return (
    <UserDetailContext.Provider value={{userDetails,setUserDetails}}>

    <div>
        <Header />
      {children}
    </div>
    </UserDetailContext.Provider>
  )
}

export default Provider;


export const useUserDetail = () =>{
    return useContext(UserDetailContext);
}