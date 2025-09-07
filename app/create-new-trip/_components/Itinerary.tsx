"use client";
import React, { useEffect, useState } from 'react';
import { Timeline } from "@/components/ui/timeline";
import Image from 'next/image';
import { Clock, ExternalLink, Star, Ticket, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';



// export const TRIP_DATA = {
    
//         "destination": "Pune",
//         "duration": "2 Days",
//         "origin": "Mumbai",
//         "budget": "Luxury",
//         "group_size": "1",
//         "hotels": [
//             {
//                 "hotel_name": "JW Marriott Hotel Pune",
//                 "hotel_address": "Senapati Bapat Road, Pune 411053, India",
//                 "price_per_night": "₹15,000+",
//                 "hotel_image_url": "https://www.marriott.com/hotels/hotel-photos/pnqmc-jw-marriott-hotel-pune/",
//                 "geo_coordinates": {
//                     "latitude": 18.5307,
//                     "longitude": 73.829
//                 },
//                 "rating": 4.7,
//                 "description": "JW Marriott Hotel Pune features luxury accommodations, renowned restaurants, a rooftop bar, full-service spa, infinity pool, and top-tier amenities, making it one of Pune’s most prestigious properties."
//             },
//             {
//                 "hotel_name": "Conrad Pune",
//                 "hotel_address": "7 Mangaldas Road, Pune 411001, India",
//                 "price_per_night": "₹13,000+",
//                 "hotel_image_url": "https://media.hilton.com/en/hotels/India/pune/conrad-pune/7127602_ext_01.jpg",
//                 "geo_coordinates": {
//                     "latitude": 18.5361,
//                     "longitude": 73.8857
//                 },
//                 "rating": 4.6,
//                 "description": "A luxury 5-star hotel with elegant rooms and suites. Features multiple fine-dining restaurants, a rooftop pool, and proximity to Koregaon Park and business hubs."
//             },
//             {
//                 "hotel_name": "The Ritz-Carlton, Pune",
//                 "hotel_address": "Golf Course Square, Airport Road, Yerawada, Pune 411006, India",
//                 "price_per_night": "₹22,000+",
//                 "hotel_image_url": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/7e/d7/ed/the-ritz-carlton-pune.jpg",
//                 "geo_coordinates": {
//                     "latitude": 18.5569,
//                     "longitude": 73.9013
//                 },
//                 "rating": 4.8,
//                 "description": "Renowned for exceptional hospitality, the Ritz-Carlton Pune offers lavish accommodation, a spa, world-class restaurants, and views of the Pune Golf Course."
//             }
//         ],
//         "itinerary": [
//             {
//                 "day": 1,
//                 "day_plan": "Arrival from Mumbai, explore Pune’s rich cultural heritage and indulge in luxury amenities.",
//                 "best_time_to_visit_day": "Morning until early evening",
//                 "activities": [
//                     {
//                         "place_name": "Shaniwar Wada",
//                         "place_details": "A historical 18th-century fortification in the heart of Pune, filled with Maratha history and legends.",
//                         "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Shaniwar_wada.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5195,
//                             "longitude": 73.8554
//                         },
//                         "place_address": "Shaniwar Peth, Pune 411030, India",
//                         "ticket_pricing": "₹25 (Indian), ₹125 (Foreigner)",
//                         "time_travel_each_location": "Approximately 20-30 min from hotel",
//                         "best_time_to_visit": "8:00 am – 11:00 am"
//                     },
//                     {
//                         "place_name": "Lunchtime at Paasha, JW Marriott Roof-top",
//                         "place_details": "Treat yourself to an exquisite lunch with panoramic views of Pune.",
//                         "place_image_url": "https://assets.vogue.in/photos/5ce41c5a60ea2fed30ef5e38/master/w_1600%2Cc_limit/PaashaJWMarriottPune-1366x768.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5307,
//                             "longitude": 73.829
//                         },
//                         "place_address": "JW Marriott, Senapati Bapat Road, Pune",
//                         "ticket_pricing": "₹2000-4000 for one",
//                         "time_travel_each_location": "10 min from Shaniwar Wada",
//                         "best_time_to_visit": "12:30 pm – 2:00 pm"
//                     },
//                     {
//                         "place_name": "Aga Khan Palace",
//                         "place_details": "A majestic palace known for its architectural beauty and its role in India’s freedom movement.",
//                         "place_image_url": "https://upload.wikimedia.org/wikipedia/commons/5/59/Aga_Khan_Palace_front_view.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5521,
//                             "longitude": 73.9017
//                         },
//                         "place_address": "Samrat Ashok Road, Pune 411006, India",
//                         "ticket_pricing": "₹25 (Indian), ₹100 (Foreigner)",
//                         "time_travel_each_location": "20 min from hotel",
//                         "best_time_to_visit": "2:30 pm – 4:00 pm"
//                     },
//                     {
//                         "place_name": "Evening Spa at O2 Spa, Ritz-Carlton",
//                         "place_details": "Unwind with a luxury spa treatment at the renowned Ritz-Carlton Spa.",
//                         "place_image_url": "https://www.ritz-carlton.com/content/dam/the-ritz-carlton/hotels/asia/india/pune/amenities/o2-spa/ritz-carlton-pune-spa-000.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5569,
//                             "longitude": 73.9013
//                         },
//                         "place_address": "The Ritz-Carlton, Golf Course Square, Pune",
//                         "ticket_pricing": "₹5000+ for luxury spa treatments",
//                         "time_travel_each_location": "15 min from Aga Khan Palace",
//                         "best_time_to_visit": "5:00 pm – 7:00 pm"
//                     }
//                 ]
//             },
//             {
//                 "day": 2,
//                 "day_plan": "Nature, shopping and exclusive culinary experiences.",
//                 "best_time_to_visit_day": "Morning until late evening",
//                 "activities": [
//                     {
//                         "place_name": "Breakfast at Conrad Pune",
//                         "place_details": "Start your day with an exclusive breakfast buffet offering global and local delicacies.",
//                         "place_image_url": "https://cdn.bluebags.in/media/4590/conrad-breakfast.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5361,
//                             "longitude": 73.8857
//                         },
//                         "place_address": "7 Mangaldas Road, Pune 411001, India",
//                         "ticket_pricing": "₹1200+ per person",
//                         "time_travel_each_location": "Depends on accommodation; within 15 min from most luxury hotels",
//                         "best_time_to_visit": "8:00 am – 9:30 am"
//                     },
//                     {
//                         "place_name": "Osho Teerth Park Walk (Koregaon Park)",
//                         "place_details": "A serene landscaped park, perfect for a mindful morning stroll among nature and beautifully curated gardens.",
//                         "place_image_url": "https://www.osho.com/sites/default/files/styles/wide/public/inline-images/gardens_0.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5376,
//                             "longitude": 73.8937
//                         },
//                         "place_address": "North Main Road, Koregaon Park, Pune",
//                         "ticket_pricing": "Free",
//                         "time_travel_each_location": "7 min from Conrad Pune",
//                         "best_time_to_visit": "9:30 am – 10:30 am"
//                     },
//                     {
//                         "place_name": "Shopping at Phoenix Marketcity Pune",
//                         "place_details": "Indulge in luxury and designer shopping at Pune’s premier mall. Relax at a gourmet cafe or enjoy a bit of entertainment.",
//                         "place_image_url": "https://www.phoenixmarketcity.com/pune/assets/img/photo-gallery/pmc-outdoor3.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5637,
//                             "longitude": 73.9188
//                         },
//                         "place_address": "Viman Nagar Road, Pune 411014, India",
//                         "ticket_pricing": "Shopping dependent on personal spend",
//                         "time_travel_each_location": "20 min from Koregaon Park",
//                         "best_time_to_visit": "11:00 am – 2:00 pm"
//                     },
//                     {
//                         "place_name": "Lunch at The Flour Works",
//                         "place_details": "A chic European bistro in Kalyani Nagar known for artisanal breads and gourmet fare.",
//                         "place_image_url": "https://cdn.grabon.in/gograbon/images/merchant/1674900535394.jpeg",
//                         "geo_coordinates": {
//                             "latitude": 18.5447,
//                             "longitude": 73.901
//                         },
//                         "place_address": "East Ave, Kalyani Nagar, Pune",
//                         "ticket_pricing": "₹900 - ₹1500 per person",
//                         "time_travel_each_location": "10 min from Phoenix Marketcity",
//                         "best_time_to_visit": "2:00 pm – 3:30 pm"
//                     },
//                     {
//                         "place_name": "Evening at Pune Okayama Friendship Garden",
//                         "place_details": "A lush, Japanese-themed garden ideal for a peaceful stroll and some photography.",
//                         "place_image_url": "https://www.holidify.com/images/cmsuploads/compressed/1743_20190228150659.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5074,
//                             "longitude": 73.8317
//                         },
//                         "place_address": "Sinhagad Road, Pune",
//                         "ticket_pricing": "₹10 (Indian), ₹100 (Foreigner)",
//                         "time_travel_each_location": "30 min from Kalyani Nagar",
//                         "best_time_to_visit": "4:30 pm – 6:00 pm"
//                     },
//                     {
//                         "place_name": "Dinner at Baan Tao - Hyatt Pune",
//                         "place_details": "Experience award-winning pan-Asian cuisine in a beautiful alfresco and indoor setting.",
//                         "place_image_url": "https://media-cdn.tripadvisor.com/media/photo-s/1b/b8/c6/9b/20191220-190534-largejpg.jpg",
//                         "geo_coordinates": {
//                             "latitude": 18.5512,
//                             "longitude": 73.9132
//                         },
//                         "place_address": "Hyatt Pune, 88 Nagar Road, Kalyani Nagar, Pune",
//                         "ticket_pricing": "₹2500–4000 for one",
//                         "time_travel_each_location": "15 min from Friendship Garden",
//                         "best_time_to_visit": "7:00 pm onwards"
//                     }
//                 ]
//             }
//         ]
    
// }

function Itinerary() {

    // @ts-ignore
        const {tripDetailsInfo, setTripDetailsInfo} = useTripDetail();

        const [tripData, setTripData] = useState<TripInfo | null>(null)

        useEffect(() => {
            tripDetailsInfo && setTripData(tripDetailsInfo);
        },[tripDetailsInfo])
 const data = tripData ?  [
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {tripData?.hotels.map((hotel,index) => (
<HotelCardItem hotel = {hotel}  key={index}/>
      ))}
        </div>
      ),
    },
    // @ts-ignore
   ...tripData?.itinerary.map((dayData) => ({
    title : `Day ${dayData?.day}`,
    content : (
        <div>
            <p> Best Time : {dayData?.best_time_to_visit_day}</p>

<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
         
         
            { // @ts-ignore
            dayData?.activities.map((activity,index) => (
             <PlaceCardItem activity={activity} key={index} />
            ))}
            </div>
        </div>
    )
   }))
  ] : [];
  return (
    <div className="relative w-full  h-[85vh] overflow-auto">
    { tripData &&  <Timeline data={data} tripData = {tripData}/> }
    </div>
  );

}

export default Itinerary
