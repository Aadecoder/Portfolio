import React,{useState} from 'react';
import Homepage from './pages/Homepage.jsx';
import Skills from "./pages/Skills.jsx";
import Projects from './pages/Projects.jsx';
import AboutMe from './pages/AboutMe.jsx';
import Navbar from './components/Navbar.jsx';
import {Routes, Route, useNavigate, useParams} from 'react-router';
import LiquidEther from './pages/LiquidEther.jsx';
import Dock from './components/Dock.jsx';
import {VscHome, VscAccount, VscTerminal, VscChecklist, VscCode } from "react-icons/vsc";

const App = () => {
    const navigate = useNavigate()
    const [path, setPath] = useState("Home")

    console.log(path);

    const dockItems = [
      { icon: <VscHome size={18} />, label: 'Home', onClick: () => {navigate('/'); setPath("Home")}},
      { icon: <VscAccount size={18} />, label: 'About Me', onClick: () => {navigate('/about-me'); setPath("About Me")} },
      { icon: <VscCode size={18} />, label: 'Projects', onClick: () => {navigate('/projects') ; setPath("Projects")} },
      { icon: <VscChecklist size={18} />, label: 'Skills', onClick: () => {navigate('/skills') ; setPath("Skills")} },
      { icon: <VscTerminal size={18} />, label: 'Terminal', onClick: () => {alert('Terminal!') ; setPath("Terminal")}},
  ];

  return (
    <div className='relative h-lvh w-lvw overflow-hidden p-4'>
      <div className='absolute top-0 left-0 h-full w-full z-0'>
        <LiquidEther
          colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      <Navbar path={path} />
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/skills' element={<Skills />}></Route>
        <Route path='/projects' element={<Projects />}></Route>
        <Route path='/about-me' element={<AboutMe />}></Route>
      </Routes>
        <Dock 
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
          className='m-5 bg-transparent backdrop-blur-md hover:cursor-pointer'
        />
    </div>
  )
}

export default App