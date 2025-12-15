import React from 'react';
import ChessAdvisorLogo from '../assets/chess_advisor_logo.png';
import STM32F411Logo from '../assets/STM32F411-img.png';
import ProjectCarousel from '../components/ProjectCarousel';

const Projects = () => {
    const [hovered, setHovered] = React.useState(false);
    const projects = [
        {
        title: 'Chess Advisor',
        description: 'A web app that suggests chess moves and analyses positions using heuristics and opening database.',
        image: ChessAdvisorLogo,
        repo: 'https://github.com/your-username/chess-advisor',
        },
        {
        title: 'STM32F411 Project',
        description: `Firmware + tooling for STM32F411-based hardware; includes UART comms and sensor drivers.`,
        image: STM32F411Logo,
        repo: 'https://github.com/your-username/stm32f411-project', 
        },
    ];

    function handleHover(e){
        e.preventDefault();
        e.autoPlay(false);
    };

  return (
    <div className='relative h-auto w-auto overflow-scroll'
            onMouseEnter={()=>{setHovered(false)}}
            onMouseLeave={()=>{setHovered(true)}}>
        <ProjectCarousel 
            projects={projects} 
            autoPlay={hovered} 
            autoPlayInterval={3000} />
    </div>
  )
}

export default Projects