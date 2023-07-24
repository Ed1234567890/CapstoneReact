
import React, {useState} from 'react';
import { Outlet } from "react-router-dom";
import test from "../images/19629.jpg"

const Welcome = () => {

  return (
    <div >
      <img src={test} alt="Welcome" className='welcome-image'/>
      <a href="https://www.freepik.com/free-vector/quiz-neon-sign_4553888.htm#query=trivia%20background&position=2&from_view=keyword&track=ais#position=2&query=trivia%20background">Image by katemangostar</a> on Freepik
    </div>
  );
};

export default Welcome;
