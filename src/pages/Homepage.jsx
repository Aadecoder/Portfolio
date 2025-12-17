import React from 'react'
import { VscGithubInverted, VscMail, VscTwitter } from "react-icons/vsc";
import {PiXLogoBold} from "react-icons/pi"
import { BsLinkedin } from "react-icons/bs";
import { TypeAnimation } from 'react-type-animation';


const Homepage = () => {

  return (
    <div className='w-auto h-auto grid grid-cols-2 gap-4 m-10 p-10 items-center text-center'>
        <div className='text-cyan-400 flex flex-col items-center'>
            <span className='text-9xl'>Aditya<br/><span className='font-bold'>Rajput</span></span>
            <div className='w-full m-10 border-2 border-cyan-200 rounded-2xl'></div>
            <div className='grid grid-cols-4 gap-4 w-full h-auto z-50'>
              <a href='https://github.com/Aadecoder' target='_blank'><VscGithubInverted className='size-12 hover:cursor-pointer'/></a>
              <a href='mailto:adityandr8274@gmail.com' target='_blank'><VscMail className='size-12 hover:cursor-pointer' /></a>
              <a href='https://x.com/aadi_rajputr?t=_LE9oiP701BC5Nr2A7GkAA' target='_blank'><PiXLogoBold className='size-12 hover:cursor-pointer' /></a>
              <a href='https://www.linkedin.com/in/aditya-rajput-70372930a/' target='_blank'><BsLinkedin className='size-12 hover:cursor-pointer' /></a>
            </div>
        </div>
        <div>
        <span className='text-6xl'>I am a</span>
        <div className=''>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'FullStack Developer',
                1500, 
                'Embedded Software Engineer',
                1500,
              ]}
              wrapper='span' 
              speed={50}
              style={{fontSize:'3.75rem'}}
              repeat={Infinity}
            /></div>
          {/* <span className='text-7xl'>
            FullStack <br/>
            Web Developer
            <br/>
            & <br/>
            Embedded Systems Enthusiast 
          </span> */}
        </div>
    </div>
  )
}

export default Homepage