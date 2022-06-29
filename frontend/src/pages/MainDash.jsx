import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Header from "../components/Header";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import actionImg from "../assets/images/perspective_matte-action.png";
import dashImg from "../assets/images/Dashboard_perspective_matte_s.png";
import adminImg from "../assets/images/perspective_matte.png";
import courseImg from "../assets/images/perspective_matte-homework.png";
import classImg from "../assets/images/perspective_matte-chapter.png";
import userImg from "../assets/images/User_perspective_matte_s.png";
import axios from "axios";
import Cookies from "universal-cookie";
import CubeLoader from "../components/Cube Loader/CubeLoader";

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  a:-webkit-any-link {
    color: black;
    cursor: pointer;
    list-style: none;
    text-decoration: none;
  }
`;
const MainContainer = styled.div`
  height: 47vh;
  overflow-y: auto;
  overflow-x: hidden;
`;
const Name = styled.h1`
  color: white;
  font-size: 45px;
  margin-left: 40px;
  letter-spacing: 1px;
  @media (max-width: 575px) {
    font-size: 33px;
    margin-left: 15px;
  }
`;
const theme = createTheme({
  palette: {
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      dark: "#3d0c02",
    },
  },
});

const MainDash = () => {
  const [countClass, setCountClass] = useState(undefined);
  const [countStudent, setCountStudent] = useState(undefined);
  const [countCourse, setCountCourse] = useState(undefined);
  const [countAdmin, setCountAdmin] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/class`, headers).then((res) => {
      setCountClass(res.data.count);
    });
    axios.get(`http://localhost:8000/api/student`, headers).then((res) => {
      setCountStudent(res.data.count);
    });
    axios.get(`http://localhost:8000/api/admin`, headers).then((res) => {
      setCountAdmin(res.data.count);
    });
    axios.get(`http://localhost:8000/api/course`, headers).then((res) => {
      setCountCourse(res.data.count);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <RightContainer>
        <Header
          icon={
            <DashboardIcon
              style={{
                fontSize: "55px",
                color: "#204B64",
              }}
            />
          }
          title="Main Dashboard"
          subTitle="In the main dashboard you can see the insights of admins, students, classes and courses."
        />
        {loading ? (
          <CubeLoader />
        ) : (
          <>
            <div
              style={{
                background:
                  "linear-gradient(to right top, rgba(6,41,87,1), rgba(47,128,231,1), rgba(0,212,255,1) )",
                width: "90%",
                height: "150px",
                margin: "0 auto",
                userSelect: "none",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
                marginBottom: "50px",
                boxShadow: "0px 12px 15px rgba(47,128,231,1)",
              }}
            >
              <img
                src={dashImg}
                style={{
                  maxHeight: "77%",
                  position: "absolute",
                  left: 20,
                  top: -55,
                }}
                alt="3d Dashboard"
              />
              <Name>DashBoard</Name>
              <img
                src={actionImg}
                style={{
                  maxHeight: "95%",
                  position: "absolute",
                  right: 0,
                  bottom: 55,
                }}
                alt="3d Student"
              />
            </div>
            <MainContainer>
              <ThemeProvider theme={theme}>
                <Grid
                  container
                  sx={{ width: "90%" }}
                  style={{ margin: "0 auto", userSelect: "none" }}
                >
                  <Grid
                    sx={{
                      background:
                        "linear-gradient(to right top, rgba(6,41,87,1), rgba(47,128,231,1), rgba(0,212,255,1) )",
                      boxShadow: 2,
                      borderRadius: 5,
                      p: 3.5,
                      minWidth: 220,
                      m: 2,
                      mx: "auto",
                      "&:hover": {
                        opacity: [0.9],
                      },
                      position: "relative",
                    }}
                    xs={2}
                    sm={5}
                    md={2}
                    style={{ marginBottom: 60, marginTop: 75 }}
                  >
                    <Link to={{ pathname: `/dashboard/admins` }}>
                      <img
                        src={adminImg}
                        style={{
                          maxHeight: 100,
                          position: "absolute",
                          left: 70,
                          top: -75,
                        }}
                        alt="3d Admin"
                      />
                      <Box
                        sx={{
                          color: "text.secondary",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Admins
                      </Box>
                      <Box
                        sx={{
                          color: "text.primary",
                          fontSize: 34,
                          fontWeight: "medium",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>{countAdmin}</Box>
                        <SupervisorAccountOutlinedIcon
                          style={{
                            fontSize: "52px",
                            color: "#fff",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          color: "success.dark",
                          display: "inline",
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        Total Admins
                      </Box>
                    </Link>
                  </Grid>
                  <Grid
                    fullWidth
                    sx={{
                      background:
                        "linear-gradient(to right top, rgba(11,180,70,1), rgba(26,198,42,1) ,rgba(1,208,43,1)  )",
                      boxShadow: 2,
                      borderRadius: 5,
                      p: 3.5,
                      minWidth: 220,
                      m: 2,
                      mx: "auto",
                      "&:hover": {
                        opacity: [0.9],
                      },
                      position: "relative",
                    }}
                    xs={2}
                    sm={5}
                    md={2}
                    style={{ marginBottom: 60, marginTop: 75 }}
                  >
                    <Link to={{ pathname: `/dashboard/students` }}>
                      <img
                        src={userImg}
                        style={{
                          maxHeight: 100,
                          position: "absolute",
                          left: 60,
                          top: -75,
                        }}
                        alt="3d Admin"
                      />
                      <Box
                        sx={{
                          color: "text.secondary",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Students
                      </Box>
                      <Box
                        sx={{
                          color: "text.primary",
                          fontSize: 34,
                          fontWeight: "medium",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>{countStudent}</Box>
                        <SupervisedUserCircleOutlinedIcon
                          style={{
                            fontSize: "52px",
                            color: "#fff",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          color: "success.dark",
                          display: "inline",
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        Total Students
                      </Box>
                    </Link>
                  </Grid>
                  <Grid
                    fullWidth
                    sx={{
                      background:
                        "linear-gradient(to right top, rgba(187,61,85,1), rgba(222,44,101,1), rgba(255,83,83,1) )",
                      boxShadow: 2,
                      borderRadius: 5,
                      p: 3.5,
                      minWidth: 220,
                      m: 2,
                      mx: "auto",
                      "&:hover": {
                        opacity: [0.9],
                      },
                      position: "relative",
                    }}
                    xs={2}
                    sm={5}
                    md={2}
                    style={{ marginBottom: 60, marginTop: 75 }}
                  >
                    <Link to={{ pathname: `/dashboard/classes` }}>
                      <img
                        src={classImg}
                        style={{
                          maxHeight: 100,
                          position: "absolute",
                          left: 60,
                          top: -75,
                        }}
                        alt="3d Admin"
                      />
                      <Box
                        sx={{
                          color: "text.secondary",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Classes
                      </Box>
                      <Box
                        sx={{
                          color: "text.primary",
                          fontSize: 34,
                          fontWeight: "medium",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>{countClass}</Box>
                        <ClassOutlinedIcon
                          style={{
                            fontSize: "50px",
                            color: "#fff",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          color: "success.dark",
                          display: "inline",
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        Total Classes
                      </Box>
                    </Link>
                  </Grid>
                  <Grid
                    fullWidth
                    sx={{
                      background:
                        "linear-gradient(to right top, rgba(33,166,145,1) , rgba(44,200,222,1), rgba(4,143,176,1) )",
                      boxShadow: 2,
                      borderRadius: 5,
                      p: 3.5,
                      minWidth: 220,
                      m: 2,
                      mx: "auto",
                      "&:hover": {
                        opacity: [0.9],
                      },
                      position: "relative",
                    }}
                    xs={2}
                    sm={5}
                    md={2}
                    style={{ marginBottom: 60, marginTop: 75 }}
                  >
                    <Link to={{ pathname: `/dashboard/courses` }}>
                      <img
                        src={courseImg}
                        style={{
                          maxHeight: 100,
                          position: "absolute",
                          left: 60,
                          top: -75,
                        }}
                        alt="3d Admin"
                      />
                      <Box
                        sx={{
                          color: "text.secondary",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Courses
                      </Box>
                      <Box
                        sx={{
                          color: "text.primary",
                          fontSize: 34,
                          fontWeight: "medium",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>{countCourse}</Box>
                        <MenuBookIcon
                          style={{
                            fontSize: "50px",
                            color: "#fff",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          color: "success.dark",
                          display: "inline",
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        Total Courses
                      </Box>
                    </Link>
                  </Grid>
                </Grid>
              </ThemeProvider>
            </MainContainer>
          </>
        )}
      </RightContainer>
    </>
  );
};

export default MainDash;
