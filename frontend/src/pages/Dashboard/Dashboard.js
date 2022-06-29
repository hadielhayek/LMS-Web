import React from "react";
import MainDash from "../MainDash";
import Classes from "../classes/Classes";
import Students from "../Students";
import Sections from "../sections/Sections";
import Reports from "../Reports";
import Admins from "../Admin";
import Sidebar from "../../components/Sidebar";
import Courses from "../Courses/Courses";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";


const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;

`;

const RightContainer = styled.div`
  flex: 1;
  @media only screen and (max-width: 768px) {  
margin-left: 60px;
  }
`

const Dashboard = () => {
  return (
    <AppContainer>
      <Sidebar />
      <RightContainer>
        <Routes>
          <Route exact path="/maindash" element={<MainDash />} />
          <Route exact path="/classes" element={<Classes />} />
          <Route exact path="/students" element={<Students />} />
          <Route exact path="/sections/:id" element={<Sections />} />
          <Route exact path="/sections" element={<Sections />} />
          <Route exact path="/courses" element={<Courses />} />
          <Route exact path="/courses/:id" element={<Courses />} />
          <Route exact path="/reports" element={<Reports />} />
          <Route exact path="/admins" element={<Admins />} />
        </Routes>
      </RightContainer>
    </AppContainer>
  );
};

export default Dashboard;
