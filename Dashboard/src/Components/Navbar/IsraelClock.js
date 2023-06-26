import React from 'react';
import Clock from 'react-simple-clock';
import './Clock.css';

const IsraelClock = () => {
  return (
    <Clock mode={'light'} hourMarkFormat={'number'} live={true}  className="your-class" />
  )
}

export default IsraelClock