import React from 'react'
import LogoLoop from '../components/LogoLoop'
import {VscVscode, VscGithubInverted, VscTerminalLinux } from "react-icons/vsc";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaJs } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { BiLogoPython } from "react-icons/bi";
import { DiMongodb } from "react-icons/di";
import AnimatedList from '../components/AnimatedList';

const Skills = () => {
    
    const techLogos = [
        { node: <GrReactjs />, alt: "React", href: "https://react.dev" },
        { node: <VscGithubInverted />, alt: "GitHub", href: "https://github.com" },
        { node: <VscVscode />, alt: "VsCode", href: "https://code.visualstudio.com" },
        { node: <VscTerminalLinux />, alt: "Linux"},
        { node: <BiLogoPython />, alt: "Python", href: "https://www.python.org" },
        { node: <RiTailwindCssFill />, alt: "Tailwind CSS", href: "https://tailwindcss.com" },
        { node: <FaJs />, alt: "Javascript"},
        { node: <DiMongodb />, alt: "MongoDb", href: "https://www.mongodb.com"}
    ];

const languages = ['C', 'C++', 'Python', 'Javascript']; 
const techonologies = ['React', 'Tailwindcss', 'Machine Learning', 'Neural Networks', 'Linux Driver Development']; 
const tools = ['VSCode', 'Linux', 'Git', 'MonogoDB', 'Figma', 'STM32CubeIDE', 'Matlab']; 

  return (
    
    <div>
       <LogoLoop
            logos={techLogos}
            speed={50}
            direction="left"
            logoHeight={48}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#0d132a"
            ariaLabel="Technology partners"
        /> 
        <div className='text-center mt-40 grid grid-cols-3 gap-2'>
          <div>
            <span className='text-2xl'>Languages</span>
            <div className='flex justify-center m-2'>
              <AnimatedList
                items={languages}
                onItemSelect={(item, index) => console.log(item, index)}
                showGradients={false}
                enableArrowNavigation={true}
                displayScrollbar={true}
              />
            </div>
          </div>

          <div>
            <span className='text-2xl'>Technologies</span>
            <div className='flex justify-center m-2'>
              <AnimatedList
                items={techonologies}
                onItemSelect={(item, index) => console.log(item, index)}
                showGradients={false}
                enableArrowNavigation={true}
                displayScrollbar={true}
              />
            </div>
          </div>

          <div>
            <span className='text-2xl'>Tools</span>
            <div className='flex justify-center m-2'>
              <AnimatedList
                items={tools}
                onItemSelect={(item, index) => console.log(item, index)}
                showGradients={false}
                enableArrowNavigation={true}
                displayScrollbar={true}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Skills