"use client";

import React, { useEffect, useState } from 'react'
import { Hotel } from './ChatBox'
import Image  from "next/image";
import Link from "next/link";
import { Wallet, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';


type Props = {
    hotel : Hotel
}
function HotelCardItem({ hotel } : Props ) {

const [photoUrl,setPhotoUrl] = useState<string>();
    useEffect(() =>{

        GetGooglePlaceDetail();
    }, [hotel]);

    const GetGooglePlaceDetail = async() =>{

        const result = await axios.post('/api/google-place-details',{
            placeName : hotel?.hotel_name
        })

        if(result?.data?.e){
            return;
        }
        setPhotoUrl(result?.data);
    }
  return (
    <div  className='flex flex-col gap-1'>
          <div className="relative w-full w-full h-48">
       <Image src={ photoUrl || '/placeholder.jpg'}
                         
                           alt={hotel.hotel_name}
                           fill
                           className='object-cover rounded-xl' />
               </div>
        <h2 className='font-semibold text-lg line-clamp-1'>{hotel?.hotel_name}</h2>
        <h2 className='text-gray-500 line-clamp-1'>{hotel?.hotel_address}</h2>
    
        <div className="flex justify-between">
    
        <p className="flex gap-2 text-green-500"> <Wallet /> {hotel.price_per_night}</p>
        <p className="flex text-yellow-500 gap-2"> <Star/> {hotel.rating}</p>
    
        </div>
    
        <p className="text-gray-500 line-clamp-2">{hotel.description}</p>
      <Link href={"https://www.google.com/maps/search/?api=1&query="+hotel?.hotel_name} target='_blank'>
        <Button variant={'outline'} className='mt-1 w-full'> View </Button>
        </Link>
    
    </div>
  )
}

export default HotelCardItem
