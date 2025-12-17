import React from 'react';
import ChessAdvisorLogo from '../assets/chess_advisor_logo.png';
import STM32F411Logo from '../assets/STM32F411-img.png';
import ProjectCarousel from '../components/ProjectCarousel';

const Projects = () => {
    const [hovered, setHovered] = React.useState(false);
    const projects = [
        {
        title: 'Chess Advisor',
        description: `A computer vision-based chess assistant that detects chessboard using YOLO, 
                      converts the board state into a FEN string, 
                      and then uses the Stockfish chess engine to suggest the top moves with 
                      visual arrows overlayed on the board.\n
                      skills i learned : 
                      Python
                      OpenCV
                      YOLO
                      Machine Learning
                      Nerual Networks\n`,
        image: ChessAdvisorLogo,
        repo: 'https://github.com/Aadecoder/Chess_Advisor',
        },
        {
        title: 'STM32F411 Project',
        description: `Bare-metal driver implementations for STM32F411xx series microcontrollers.\n
                    skills i learned :
                    C Programming Language
                    Bare Metal Programming\n`,
        image: STM32F411Logo,
        repo: 'https://github.com/Aadecoder/STM32F411xx-Drivers', 
        },
    ];


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