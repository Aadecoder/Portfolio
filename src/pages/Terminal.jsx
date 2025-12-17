import React, { useState } from 'react'

const Terminal = () => {
  const [inputValue, setInputValue] = useState("");
  const [content, setContent] = useState("");
  const [prevCmd, setPrevCmd] = useState("");
  const [isBlack, setBlack] = useState(true);
  const [isGreen, setGreen] = useState(true);


  function handleChange(e){
    setInputValue(e.target.value);
    setContent("");
  };

  const commands = `\n1. help  gives the list of commands\n
                      2. echo about-me: a brief introduction to who i am and what i love doing\n
                      3. echo skills: tells you about my skills and technologies that i am good at\n
                      4. echo projects: tells you about what projects i have made using this skills\n
                      5. toggle bg: to toggle between the background color of the terminal
                      6. toggle text: to toggle between the text color of the terminal`

  const aboutme = `Hi! Myself Aditya Rajput\n
                    I'm an aspiring engineer with a strong passion for embedded systems and web development. My work bridges the gap between hardware and software.\n
                    Driven by curiosity and hands-on problem-solving, I enjoy creating end-to-end systems where physical hardware and digital interfaces work together seamlessly.\n
                    I'm constantly learning and experimenting with new technologies to stay at the forefront of innovation.\n
                    Through my projects, I aim to build systems that are not only functional but impactful.`

  const skills = `Languages: 
                  1. C 
                  2. C++
                  3. Python
                  4. Javascript\n
                  Technologies:
                  1. React
                  2. Tailwindcss
                  3. Machine Learning
                  4. Neural Networks
                  5. Linux Driver Development\n
                  Tools:
                  1. VS Code
                  2. Linux
                  3. Git
                  4. STM32CubeIDE
                  5. MongoDB
                  6. Figma
                  `

  const projects = `1. Chess Advisor :
                      A computer vision-based chess assistant that detects chessboard using YOLO, converts the board state into a FEN string, and then uses the Stockfish chess engine to suggest the top moves with visual arrows overlayed on the board.
                      skills i learned : 
                      Python
                      OpenCV
                      YOLO\n
                    2. STM32F411 Device Drivers :
                    Bare-metal driver implementations for STM32F411xx series microcontrollers.
                    skills i learned :
                    C Programming Language
                    Bare Metal Programming\n`

  function handleSubmit(){
    if(inputValue === 'help'){
      setContent(`here are a list of commands for you to try: ${commands}`);
    }else if(inputValue === 'echo about-me'){
      setContent(aboutme);
    }else if(inputValue === 'echo skills'){
      setContent(skills);
    }else if(inputValue === 'echo projects'){
      setContent(projects);
    }else if(inputValue === 'toggle bg'){
      setBlack(!isBlack);
    }else if(inputValue === 'toggle text'){
      setGreen(!isGreen);
    }else{
      setContent("ERROR : not a valid command type 'help' to get the list of all the commands")
    }
    setPrevCmd(inputValue);
    setInputValue("");
  };



  return (
    <div className={`w-lvw h-lvh ${isBlack ? "bg-black" : "bg-white"} overflow-hidden overscroll-none`}>
        <div className={`m-10 ${isGreen ? "text-green-500" : "text-red-500"}`}>
            <h1 className='text-5xl text-center'>Terminal</h1>
            <br />
            <p className='text-xl w-full h-auto ibm-plex-mono whitespace-pre-line'>
              {content}
            </p>
              <input type="text" 
                    className='w-full h-10 outline-none text-xl' 
                    placeholder='Start Typing here...'
                    value={inputValue}
                    onKeyDown={(e)=>{
                                      if (e.key === 'Enter'){
                                        e.preventDefault(); handleSubmit()
                                      }else if(e.key === 'ArrowUp'){
                                        e.preventDefault(); setInputValue(prevCmd);
                                      }
                                    }}
                    onChange={handleChange}
              />
        </div>
    </div>
  )
}

export default Terminal