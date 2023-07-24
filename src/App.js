import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Welcome from "./pages/Welcome";
import MainHeader from "./components/MainHeader";
import NoMatch from "./pages/NoMatch";
import { useState } from "react";
import React from "react";

import AddQuestion from "./pages/AddQuestion";
import ViewQuestion from "./pages/ViewQuestion";
import UpdateQuestion from "./pages/UpdateQuestion";
import Quiz from "./pages/Quiz";
import EndQuiz from "./pages/EndQuiz";
import ResultList from "./pages/ResultList";
import ViewQuiz from "./pages/ViewQuiz";
import RetakeQuiz from "./pages/RetakeQuiz"

function App() {

  return (
    <div>
      <header>
        <MainHeader />
      </header>
      {/* <h1>Let's get it Start'in</h1> */}
      <main>
        
        <Routes>
          {/* Initial route */}
          <Route path="/" element={<Navigate replace to="Welcome" />} />

          <Route path="Welcome" element={<Welcome/>} />

          <Route path="AddQuestion" element={<AddQuestion/>} />

          <Route path="ViewQuestion" element={<ViewQuestion/>} />

          <Route path="UpdateQuestion/:id" element={<UpdateQuestion/>} />

          <Route path="Quiz" element={<Quiz/>} />
          
          <Route path="EndQuiz/:mark/:total" element={<EndQuiz/>} />

          <Route path="ResultList" element={<ResultList/>} />

          <Route path="ViewQuiz/:quizID" element={<ViewQuiz/>} />

          <Route path="RetakeQuiz/:quizID" element={<RetakeQuiz/>} />

          {/* For invalid URLs */}
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
