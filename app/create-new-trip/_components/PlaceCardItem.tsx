"use client";

import React, { useEffect, useState } from 'react'
import { Activity } from './ChatBox'
import Image from "next/image";
import Link from 'next/link';
import { Ticket, ExternalLink, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';


type Props = {

    activity : Activity
}
function PlaceCardItem({ activity} : Props) {

    const [photoUrl,setPhotoUrl] = useState<string>();
        useEffect(() =>{
    
            GetGooglePlaceDetail();
        }, [activity]);
    
        const GetGooglePlaceDetail = async() =>{
    
            const result = await axios.post('/api/google-place-details',{
                placeName : activity?.place_name + ":" + activity.place_address
            })
    
            if(result?.data?.e){
                return;
            }
            setPhotoUrl(result?.data);
        }
  return (
       <div>

        <div className="relative w-full  h-48">
<Image src={ photoUrl || '/placeholder.jpg'}
                  
                    alt={activity.place_name}
                    fill
                    className='object-cover rounded-xl' />
        </div>
                
                    <h2 className="font-semibold text-lg line-clamp-1">{activity?.place_name}</h2>
                    <p className='text-gray-500 line-clamp-2'>{activity?.place_details}</p>
                    <h2 className="flex gap-2 text-blue-500 line-clamp-1"> <Ticket /> {activity?.ticket_pricing}</h2>

                    <p className="flex text-orange-500 gap-2">
                        <Clock />
                        {activity?.best_time_to_visit}
                    </p>

                    <Link href={"https://www.google.com/maps/search/?api=1&query="+activity?.place_name} target='_blank'>
<Button size={'sm'} variant={'outline'} className='mt-1 w-full'> View <ExternalLink/></Button>
</Link>
                </div>
  )
}

export default PlaceCardItem
