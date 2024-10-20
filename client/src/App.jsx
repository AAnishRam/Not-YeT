import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import HomePage from "./Components/HomePage/HomePage";
import ProjectCreation from "./Components/ProjectCreation/ProjectCreation";
import NewProject from "./Components/ProjectCreation/NewProject/NewProject";
import FileSharing from "./Components/FileSharing/FileSharing";
import FeedbackPage from "./Components/Feedback/FeedbackPage";
import "./index.css";
import CalendarPage from "./Components/Calendar/CalendarPage";
import CommunicationPage from "./Components/Communication/CommunicationPage";
import LandingPage from "./Components/LandingPage/LandingPage";
import ComingSoon from "./Components/ComingSoon/ComingSoon";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/projectHome" element={<HomePage />} />
        <Route path="/projectCreation" element={<ProjectCreation />}></Route>
        <Route path="/newProject" element={<NewProject />}></Route>
        <Route path="/fileSharing" element={<FileSharing />}></Route>
        <Route path="/feedback" element={<FeedbackPage />}></Route>
        <Route path="/calendar" element={<CalendarPage />}></Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projectCreation" element={<ProjectCreation />}></Route>
        <Route path="/newProject" element={<NewProject />}></Route>
        <Route path="/messages" element={<CommunicationPage />}></Route>
        <Route path="/comingsoon" element={<ComingSoon />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
