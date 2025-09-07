"use client"
import GlobalMap from '@/app/create-new-trip/_components/GlobalMap';
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import { Trip } from '@/app/my-trips/page';
import { useTripDetail, useUserDetail } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function ViewTrip() {

    const {tripid} = useParams();
    const {userDetails, setUserDetails} = useUserDetail();
    const convex = useConvex();

    const [tripData,setTripData] = useState<Trip>()
    //@ts-ignore
   const {tripDetailsInfo, setTripDetailsInfo} = useTripDetail();


    useEffect(() =>{
userDetails && GetTrip()

    },[userDetails])
    const GetTrip = async () =>{

        const result = await convex.query(api.tripDetail.GetTripById,{
            uid : userDetails?._id,
            tripid : tripid+''
        })
       setTripData(result);
       setTripDetailsInfo(result?.tripDetail);
        console.log(result)
    }



  return (
    <div className='grid grid-cols-5'>

        <div className='col-span-3'>

     <Itinerary />
        </div>
        <div className="col-span-2">
            <GlobalMap />
        </div>
    </div>
  )
}

export default ViewTrip
