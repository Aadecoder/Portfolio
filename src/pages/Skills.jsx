import React from 'react'
import LogoLoop from '../components/LogoLoop'
import {VscHome, VscAccount, VscTerminal, VscCode, VscGithubInverted } from "react-icons/vsc";

const Skills = () => {
    
    const techLogos = [
        { href: "https://www.w3.org/2000/svg", Title: "React", href: "https://react.dev" },
        { node: <VscAccount />, alt: "Next.js", href: "https://nextjs.org" },
        { node: <VscTerminal />, alt: "TypeScript", href: "https://www.typescriptlang.org" },
        { node: <VscCode />, alt: "Tailwind CSS", href: "https://tailwindcss.com" },
    ];

  return (
    <div>
        <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#0d132a"
            ariaLabel="Technology partners"
        /> 
    </div>
  )
}

export default Skills