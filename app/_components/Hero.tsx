"use client";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@clerk/nextjs';
import { Globe2, Landmark, Plane, Send } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'


const suggestions = [
    {
        title : 'Create new trip',
        icon : <Globe2 className='text-blue-400 h-5 w-5' />
    },
    {
        title : 'Inspire me to go somewhere',
        icon : <Plane className='text-green-500 h-5 w-5 '/>
    },
    {
        title : 'Discover hidden gems',
        icon : <Landmark className='text-orange-500 h-5 w-5' />
    },
    {
        title : 'Adventure destination',
        icon : <Globe2 className='text-yellow-500 h-5 w-5' />
    }
]

function Hero() {
    const {user} = useUser();

    const router  = useRouter();
    const onSend = () =>{
        if(!user){
            router.push("/sign-in");
            return;
        }
        //Else navigate to create trip page
    }
  return (
    <div className='mt-24 flex w-full justify-center'>
       {/* Content  */}
       <div className='max-w-3xl w-full text-center space-y-6'>
        <h1 className='text-xl md:text-5xl font-bold'>Hey I'm your personal <span className='text-primary'>Trip Planner</span></h1>
        <p className='text-lg'>Your perfect getaway — Flights, Hotels, Plans, all in seconds.</p>

        {/* Input Box  */}
       <div>
        <div className='border rounded-2xl p-4 relative'>
            <Textarea placeholder='Create a trip from Mumbai to Los Angeles' className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'/>
            <Button size={"icon"} className='absolute bottom-6 right-6' onClick={onSend}>
                <Send  className='h-4 w-4'/>
            </Button>
        </div>
       </div>

       {/* Suggestion List  */}
       <div className='flex gap-3'>
        
       {suggestions.map((suggestion,index) => (
        <div key={index} className='flex items-center gap-2 border rounded-full p-2 hover:bg-primary hover:text-white cursor-pointer'>
            {suggestion.icon}
            <h2 className='text-sm'>{suggestion.title}</h2>
        </div>
       ))}
       </div>
       </div>


       
    </div>
  )
}

export default Hero
