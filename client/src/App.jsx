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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/projectCreation" element={<ProjectCreation />}></Route>
        <Route path="/newProject" element={<NewProject />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
