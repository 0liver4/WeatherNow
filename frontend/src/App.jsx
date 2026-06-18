import { useState } from 'react'
import './App.css'
import Body from './components/Body'

function App() {

  return (
    //BACKGROUND
    <div className="bg-[rgba(2,1,43,1)] h-full w-screen flex flex-col items-center justify-start">
      {/* TITLE */}
      <div className="font-BricolageGrotesque-Bold text-white text-5xl max-w-70 md:max-w-full flex items-center justify-center text-center pt-14 pb-16">
        How's the sky looking today?
      </div>
      <Body />
    </div>
  )
}

export default App
