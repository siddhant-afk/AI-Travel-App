import React, { useEffect, useRef } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useTripDetail } from '@/app/provider';
import { Activity, Itinerary } from './ChatBox';


function GlobalMap() {

    const mapContainerRef = useRef(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

        //@ts-ignore
       const {tripDetailsInfo, setTripDetailsInfo} = useTripDetail();

    useEffect(() =>{
        mapboxgl.accessToken = process?.env?.NEXT_PUBLIC_MAPBOX_API_KEY;

        if(!mapRef.current){
 mapRef.current = new mapboxgl.Map({
	container: mapContainerRef?.current??'', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [-74.5, 40], // starting position [lng, lat]
	zoom: 1.7, // starting zoom
    projection : 'globe'
});
        }


const markers : mapboxgl.Marker[] = []

tripDetailsInfo && tripDetailsInfo?.itinerary.forEach((itinerary : Itinerary,index : number) => {
    itinerary.activities.forEach((activity : Activity) => {
        if(activity?.geo_coordinates?.longitude && activity?.geo_coordinates?.latitude){

            const marker = new mapboxgl.Marker({color : 'red'})
            .setLngLat([activity?.geo_coordinates?.longitude, activity?.geo_coordinates?.latitude])
            .setPopup(
                new mapboxgl.Popup({ offset : 25}).setText(activity.place_name)
            )
            .addTo(mapRef.current!)
        
            
            markers.push(marker);
            const coordinates = [activity?.geo_coordinates?.longitude, activity?.geo_coordinates?.latitude] as [number,number]

            mapRef.current!.flyTo({
                center : coordinates ,
                zoom : 10,
                essential : true
            })
        }
    })
})

return () => {
    markers.forEach(marker => marker.remove());
};
    },[tripDetailsInfo])
  return (
    <div>
     <div ref={mapContainerRef}
     style={
        {
            widows : '95%',
            height : '85vh',
            borderRadius : 20
        }
     }
     ></div>
    </div>
  )
}

export default GlobalMap
