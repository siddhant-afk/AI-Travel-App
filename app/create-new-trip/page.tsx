import React from 'react'
import ChatBox from './_components/ChatBox'
import Itinerary from './_components/Itinerary'

function page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>

<div>
  {/* Chatbox  */}
  <ChatBox />
</div>
<div className='col-span-2'>
  {/* Map & Itinerary  */}
<Itinerary />
</div>
    </div>
  )
}

export default page
