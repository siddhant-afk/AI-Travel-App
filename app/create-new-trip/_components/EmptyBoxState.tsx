import { suggestions } from '@/app/_components/Hero'
import React from 'react'

function EmptyBoxState({onSelectOption}:any) {
  return (
    <div>
      <h2 className='text-3xl text-center font-bold'>Craft Your <span className='text-primary'>Next Trip</span></h2>
      <p className='text-center text-gray-400 mt-2'> AI-driven personalized recommendations intelligently curated using your preferences, browsing patterns, and interaction history, delivering content and suggestions that truly resonate with you. </p>
 
 <div className='flex flex-col gap-5 mt-7'>
         
        {suggestions.map((suggestion,index) => (
         <div key={index} className='flex items-center gap-2 border rounded-xl p-3 hover:text-primary hover:border-primary cursor-pointer'
         onClick={() => onSelectOption?.(suggestion.title)}>
             {suggestion.icon}
             <h2 className='text-sm'>{suggestion.title}</h2>
         </div>
        ))}
        </div>
      
    </div>
  )
}

export default EmptyBoxState
