"use client"
import React, { useState } from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'
import GlobalMap from './_components/GlobalMap';
import { Button } from '@/components/ui/button';
import { Globe2, Plane } from 'lucide-react';

function page() {

  const [activeIndex,setActiveIndex] = useState(1);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>

<div>
  {/* Chatbox  */}
  <ChatBox />
</div>
<div className='col-span-2 relative'>
  {/* Map & Itinerary  */}
{ activeIndex == 0 ? <Itinerary /> : <GlobalMap/> }

<Button size={'lg'}
className='absolute bottom-10 right-[5%]' >
{activeIndex == 0 ? <Plane/> :  <Globe2 />}
</Button>
</div>
    </div>
  )
}

export default page
