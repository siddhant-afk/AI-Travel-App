"use client";
import axios from "axios";
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUI from "./GroupSizeUI";
import BudgetUI from "./BudgetUI";
import TripDuration from "./TripDurationUI";
import FinalUI from "./FinalUI";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTripDetail, useUserDetail } from "@/app/provider";
import { v4 as uuidv4 } from 'uuid';


type Message = {
 role : string,
 content : string
 ui?: string
}

export type TripInfo ={

    budget : string,
    destination : string,
    duration : string,
    group_size : string,
    origin : string,
    hotels : Hotel[],
    itinerary : Itinerary
}


export type Hotel = {
    hotel_name : string;
    hotel_address : string;
    price_per_night : string;
    hotel_image_url : string;
    geo_coordinates : {
        latitude : number;
        longitude : number;
    };
    rating : number;
    description : string;


}

export type Activity = {
    place_name : string;
    place_details : string;
    place_image_url : string;
    geo_coordinates : {
        latitude : number;
        longitude : number;
    };
    place_address : string;
    ticket_pricing : string;
    time_travel_each_location : string;
    best_time_to_visit : string;
};

export type Itinerary = {
    day : number,
    day_plan : string;
    best_time_to_visit_day: string;
    activities : Activity[];
};

function ChatBox() {

    const [messages,setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState<string>();

    const [loading,setLoading] = useState(false);

    const [isFinal,setIsFinal] = useState(false);
    const [triggerSend, setTriggerSend] = useState(false);

    const [tripDetails,setTripDetails] = useState<TripInfo>();

    const saveTripDetail = useMutation(api.tripDetail.CreateTripDetail);

    const {userDetails,setUserDetails} = useUserDetail();
    
    // @ts-ignore
    const {tripDetailsInfo, setTripDetailsInfo} = useTripDetail();

    
    const onSend = async () =>{
      
        if(!userInput?.trim()) return;


        setLoading(true);

        setUserInput('');

        const newMessage:Message = {
            role : 'user',
            content : userInput
        }


        setMessages((prev:Message[]) => [...prev, newMessage]);

        const result = await axios.post('api/aimodel', {
            messages : [...messages,newMessage],
            isFinal : isFinal
        });

        console.log("TRIP" ,result.data);

       !isFinal && setMessages((prev : Message[]) => [...prev, {
            role : 'assistant',
            content : result?.data?.resp,
            ui : result?.data?.ui
        }])

        if(isFinal){
    
            
            setTripDetails(result?.data?.trip_plan);
            setTripDetailsInfo(result?.data?.trip_plan)
            const tripId = uuidv4();
            await saveTripDetail({
                tripDetail :result?.data?.trip_plan,
                tripId : tripId,
                uid:userDetails?._id
            })
        }
        

        setLoading(false);

    }

    useEffect(() => {
  if (triggerSend && userInput && !loading) {
    onSend();
    setTriggerSend(false); // reset
  }
}, [triggerSend, userInput, loading]);

const handleUIOptionSelect = (v: string) => {
  setUserInput(v);
  setTriggerSend(true);
};


    const RenderGenerativeUI = (ui : string) => {

        if (ui == 'budget'){
            // Budget  UI Component
            return <BudgetUI onSelectedOption = {handleUIOptionSelect} />
        }
        else if(ui == 'groupSize'){
            // Group Size UI Component
            return <GroupSizeUI onSelectedOption = {handleUIOptionSelect} />
        }
        else if(ui == "tripDuration"){
            // Trip Duration UI Component
            return <TripDuration onSelectedOption = {handleUIOptionSelect} />
        }
        else if(ui =="final"){
            // Group Size UI Component
            return <FinalUI viewTrip = {() => console.log()} disable = {!tripDetails} />
        }


        return null
    }

    useEffect(() => {

        const lastMessage = messages[messages.length-1];
        if(lastMessage?.ui=='final'){
            setIsFinal(true);
            setUserInput('Ok, Great!');
            
        }
    },[messages]);



    useEffect(() =>{
        if(isFinal && userInput){
            onSend();
        }
    }, [isFinal]);

  return (
    <div className='h-[85vh] flex flex-col'>
        { messages?.length === 0 && 
        <EmptyBoxState onSelectOption = {handleUIOptionSelect}/>

        
    }

        {/* Display Messages  */}
      <section className='flex-1 overflow-y-auto p-4'>
        {messages.map((msg:Message, index) => (
            msg.role == 'user' ?
<div className='flex justify-end mt-2' key={index}>
    <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
{msg.content}
    </div>
</div> :
<div className='flex justify-start mt-2' key={index}>
    <div className='max-w-lg bg-gray-100  px-4 py-2 rounded-lg'>
  {msg.content}
  {RenderGenerativeUI(msg.ui ?? '')}
    </div>
</div>

        ))}

       {loading && <div className='flex justify-start mt-2'>
    <div className='max-w-lg bg-gray-100  px-4 py-2 rounded-lg'>
<Loader className="animate-spin" />
    </div>
</div> }

      </section>

      {/* User Input  */}
      <section>
<div className='border rounded-2xl p-4 relative'>
            <Textarea placeholder='Start typing here...' className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
            onChange={(event) => setUserInput(event.target.value)}
            value={userInput}/>
            <Button size={"icon"} className='absolute bottom-6 right-6' onClick={onSend}>
                <Send  className='h-4 w-4'/>
            </Button>
        </div>

      </section>
    </div>
  )
}

export default ChatBox
