import styled from "styled-components";
import Img from "../assets/images/profile.jpeg";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import MenuIcon from "@mui/icons-material/MenuOpenTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Cookies from "universal-cookie";
import axios from "axios";

const NavContainer = styled.div`
  height: 100vh;
  user-select: none;
  transition: all 0.5s ease-in-out;
  width: ${(props) => (props.Show ? "220px" : "60px")};
  padding-top: 50px;
  background: #0a182f;
  z-index: 99;
  position: relative;
  overflow: hidden;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  border-width: 0;
  box-shadow: 2px 0 12px #0a182f;
  ul {
    padding: 0;
  }
  li {
    list-style: none;
    text-decoration: none;
    padding: 0;
    margin: 0;
  }

  @media only screen and (max-width: 768px) {
    position: fixed;
  }
`;
const AdminInfo = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;
  display: ${(props) => (props.Show ? "unset" : "none")};
  &:hover {
    cursor: pointer;
  }
`;
const AdminPicContainer = styled.div`
  width: 98px;
  height: 98px;
  margin: 0 auto;
  border-radius: 50%;
  background-image: linear-gradient(
    to left bottom,
    #00a68a,
    #009d8d,
    #00948e,
    #008a8d,
    #00818a,
    #007b8c,
    #0a748c,
    #1b6d8a,
    #31668a,
    #435f86,
    #525880,
    #5e5176
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AdminPic = styled.img`
  margin: auto;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: url(${Img});
  object-fit: cover;
  background-size: cover;
  object-position: center right;
`;
const AdminName = styled.h4`
  color: #00948e;
  font-size: 1.3rem;
  margin-bottom: 0;
  margin-top: 10px;
  transition: all 0.7s ease;
`;
const LinkContainer = styled.ul`
  margin-top: 20px;
  width: 100%;
  position: relative;
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  display: ${(props) => (props.Show ? "block" : "none")};
`;
const IconsList = styled.ul`
  height: 50vh;
  display: ${(props) => (props.Show ? "none" : "flex")};
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 130px;
`;
const IconsListItem = styled(NavLink)`
  width: 100%;
  text-align: center;
  color: white;
  padding: 10px 0;
  border-radius: 12px;
  &:hover {
    background: white;
    transition: all 0.7s ease;
    cursor: pointer;
    color: black;
  }
`;
const ListItem = styled(NavLink)`
  text-decoration: none;
  list-style: none;
  color: white;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 22px;
  text-align: center;
  padding: 8px 40px;
  cursor: pointer;
  border-radius: 18px;
  &:hover {
    background: white;
    transition: all 0.7s ease;
    color: black;
  }
`;
const ToggleContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ff2d2d;
  cursor: pointer;
  &:hover {
    background-color: white;
    border-radius: 7px;
    transition: all 0.7s ease;
  }
`;
const LogoutContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  text-align: center;
  padding: 10px;
  border-radius: 12px;
  color: #ff2d2d;
  cursor: pointer;
  &:hover {
    transition: all 0.7s ease;
    background-color: white;
  }
`;

const Navbar = () => {
  let width = window.innerWidth;
  let show;
  if (width < 768) show = false;
  else show = true;
  const [showSidebar, setSowSidebar] = useState(show);
  const [adminName, setAdminName] = useState(undefined);

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  // get admin name
  useEffect(() => {
    axios.get(`http://localhost:8000/api/logeduser`, headers).then((res) => {
      setAdminName(res.data.user.name);
    });
  }, []);

  // handle logout btn
  const handleClick = () => {
    cookies.remove("TOKEN", { path: "/" });
    window.location.href = "/login";
  };

  return (
    <NavContainer Show={showSidebar}>
      <ToggleContainer
        onClick={() => {
          setSowSidebar(!showSidebar);
        }}
      >
        <MenuIcon
          style={{
            fontSize: "36px",
          }}
        />
      </ToggleContainer>
      <AdminInfo Show={showSidebar}>
        <AdminPicContainer>
          <AdminPic />
        </AdminPicContainer>
        <AdminName>{adminName}</AdminName>
      </AdminInfo>
      <LinkContainer>
        <List Show={showSidebar}>
          <ListItem to="/dashboard/maindash">
            <DashboardOutlinedIcon
              style={{
                fontSize: "28px",
              }}
            />
            Dashboard
          </ListItem>
          <ListItem to="/dashboard/classes">
            <ClassOutlinedIcon style={{ fontSize: "30px" }} />
            Classes
          </ListItem>
          <ListItem to="/dashboard/students">
            <PeopleIcon style={{ fontSize: "30px" }} />
            Students
          </ListItem>
          <ListItem to="/dashboard/reports">
            <BarChartIcon style={{ fontSize: "30px" }} />
            Reports
          </ListItem>
          <ListItem to="/dashboard/admins">
            <AdminPanelSettingsOutlinedIcon style={{ fontSize: "30px" }} />
            Admins
          </ListItem>
          <ListItem to="/dashboard/sections">
            <LibraryBooksIcon style={{ fontSize: "30px" }} />
            Sections
          </ListItem>
          <ListItem to="/dashboard/attendance">
            <CoPresentIcon style={{ fontSize: "30px" }} />
            Attendance
          </ListItem>
          <ListItem to="/dashboard/courses">
            <MenuBookIcon style={{ fontSize: "30px" }} />
            Courses
          </ListItem>
        </List>
        <IconsList Show={showSidebar}>
          <IconsListItem to="/dashboard/maindash">
            <DashboardOutlinedIcon
              style={{
                fontSize: "28px",
              }}
            />
          </IconsListItem>
          <IconsListItem to="/dashboard/classes">
            <ClassOutlinedIcon style={{ fontSize: "30px" }} />
          </IconsListItem>
          <IconsListItem to="/dashboard/students">
            <PeopleIcon style={{ fontSize: "30px" }} />
          </IconsListItem>
          <IconsListItem to="/dashboard/reports">
            <BarChartIcon style={{ fontSize: "30px" }} />
          </IconsListItem>
          <IconsListItem to="/dashboard/admins">
            <AdminPanelSettingsOutlinedIcon style={{ fontSize: "30px" }} />
          </IconsListItem>
          <IconsListItem to="/dashboard/sections">
            <LibraryBooksIcon style={{ fontSize: "30px" }} />
          </IconsListItem>
          <IconsListItem to="/dashboard/attendance">
            <CoPresentIcon style={{ fontSize: "30px" }} />
          </IconsListItem>
          <IconsListItem to="/dashboard/courses">
            <MenuBookIcon style={{ fontSize: "30px" }} />
          </IconsListItem>
        </IconsList>
        <LogoutContainer>
          <LogoutIcon style={{ fontSize: "35px" }} onClick={handleClick} />
        </LogoutContainer>
      </LinkContainer>
    </NavContainer>
  );
};

export default Navbar;
