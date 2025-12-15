import React from 'react'

const Navbar = ({path}) => {

  return (
    <div className="navbar h-35">
        <div className="navbar-start">
            <span className="text-5xl">
                Aditya<br/><span className='font-bold text-cyan-400'>Rajput</span>
            </span>
        </div>
        <div className='navbar-center'>
            <span className='text-5xl'>
                {path}
            </span>
        </div>
    </div>
  )
}

export default Navbar