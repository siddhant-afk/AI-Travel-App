import React from 'react'
import ChatBox from './_components/ChatBox'

function page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-10'>

<div>
  {/* Chatbox  */}
  <ChatBox />
</div>
<div>
  {/* Map & Itinerary  */}
Map & Stuff
</div>
    </div>
  )
}

export default page
