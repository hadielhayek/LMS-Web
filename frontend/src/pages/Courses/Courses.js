import "./Courses.css";
// import { useMatch } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { DataGrid } from "@mui/x-data-grid";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import axios from "axios";
import Cookies from "universal-cookie";
import CubeLoader from "../../components/Cube Loader/CubeLoader";
import Header from "../../components/Header";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const CardsList = styled.div`
  padding-top: 20px;
  padding-bottom: 80px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 25px;
  margin: 0 auto;
  overflow-y: auto;
  height: inherit;
`;

const Courses = () => {
  // get id from use navigation
  // const {
  //   params: { id },
  // } = useMatch(`courses/:id`);

  toast.configure();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState(undefined);
  const [classID, setClassID] = useState(undefined);
  const [courseID, setCourseID] = useState(undefined);
  const [courseName, setCourseName] = useState(undefined);
  const [addID, setAddID] = useState(undefined);
  const [newCourse, setNewCourse] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  // add Cookies and get token
  const cookies = new Cookies();
  const token = cookies.get("TOKEN", { path: "/" });
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    // get id from url
    const id = document.URL.split("/")[5];
    if (id) {
      axios
        .get(`http://localhost:8000/api/class/${id}`, headers)
        .then((res) => {
          if (res.status === 200) {
            setClassID(res.data.data.id);
            setClassName(res.data.data.name);
            setCourses(res.data.data.courses);
            setLoading(false);
          }
        })
        .catch((err) => console.log(`Error: ${err.message}`));
    } else {
      axios
        .get(`http://localhost:8000/api/course`, headers)
        .then((res) => {
          if (res.status === 200) {
            setCourses(res.data.data);
          }
        })
        .catch((err) => console.log(`Error: ${err.message}`));

      axios
        .get(`http://localhost:8000/api/class`, headers)
        .then((res) => {
          if (res.status === 200) {
            setClasses(res.data.data);
            setLoading(false);
          }
        })
        .catch((err) => console.log(`Error: ${err.message}`));
    }
  }, []);

  // Add course
  const handleAdd = () => {
    const courseInfo = {
      name: newCourse,
      class: addID || classID,
    };
    axios
      .post(`http://localhost:8000/api/course`, courseInfo, headers)
      .then((res) => {
        if (res.status === 200) {
          setOpen(false);
          setInterval(() => {
            window.location.reload(false);
          }, 500);
          clearInterval();
          toast.success(res.data.message);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  // Delete course
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/course/${id}`, headers)
      .then((res) => {
        if (res.status === 200) {
          setInterval(() => {
            window.location.reload(false);
          }, 500);
          clearInterval();
          toast.success(res.data.message);
        }
      });
  };

  // detach course from class
  const handleDetach = (id) => {
    const classInfo = {
      class: classID,
    };
    axios
      .post(`http://localhost:8000/api/course/detach/${id}`, classInfo, headers)
      .then((res) => {
        if (res.status === 200) {
          setInterval(() => {
            window.location.reload(false);
          }, 500);
          clearInterval();
          toast.success(res.data.message);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  // update course globally
  const handleEdit = () => {
    const courseInfo = {
      name: courseName,
    };
    axios
      .put(`http://localhost:8000/api/course/${courseID}`, courseInfo, headers)
      .then((res) => {
        if (res.status === 200) {
          setEdit(false);
          setInterval(() => {
            window.location.reload(false);
          }, 500);
          clearInterval();
          toast.success(res.data.message);
        }
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const handleChangeInput = (e) => {
    setCourseName(e.target.value);
  };
  const handleChangeSelect = (e) => {
    setAddID(e.target.value);
  };
  const handleChangeAddSection = (e) => {
    setNewCourse(e.target.value);
  };

  // to open/close add section popup
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // to open/close edit course popup
  const handleClickEdit = (courseID, name) => {
    setCourseID(courseID);
    setCourseName(name);
    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };

  // columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Course name", width: 150 },
    {
      field: "",
      headerName: "Class name",
      width: 200,
      valueGetter: (params) => {
        return (
          className ||
          params.row.std__class.map((classe) => {
            return " " + classe.name;
          })
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip
              title="Edit Course"
              placement="top"
              TransitionComponent={Zoom}
              enterDelay={500}
              leaveDelay={200}
              arrow
            >
              <Button
                variant="contained"
                size="small"
                color="success"
                startIcon={<ModeEditOutlineIcon />}
                style={{ marginRight: "10px" }}
                onClick={() => {
                  handleClickEdit(params.row.id, params.row.name);
                }}
              >
                Edit
              </Button>
            </Tooltip>
            <Tooltip
              title="Delete Course"
              placement="top"
              TransitionComponent={Zoom}
              enterDelay={500}
              leaveDelay={200}
              arrow
            >
              <Button
                variant="contained"
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                style={{ marginRight: "10px" }}
                onClick={() => {
                  handleDelete(params.row.id);
                }}
              >
                Delete
              </Button>
            </Tooltip>

            <Tooltip
              title="Detach Course from Class"
              placement="top"
              TransitionComponent={Zoom}
              enterDelay={500}
              leaveDelay={200}
              arrow
            >
              <Button
                variant="contained"
                size="small"
                color="secondary"
                startIcon={<LinkOffIcon />}
                style={{ marginRight: "10px" }}
                onClick={() => {
                  handleDetach(params.row.id);
                }}
              >
                Detach
              </Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <RightContainer>
        <Header
          icon={
            <MenuBookIcon
              style={{
                fontSize: "50px",
                color: "#204B64",
              }}
            />
          }
          title="Courses"
          subTitle="In this page you can manage courses (add, delete, edit) and you can detach course from one class or from all classes"
        />
        {loading ? (
          <CubeLoader />
        ) : (
          <div className="courses__container">
            <div className="add_course">
              <Button
                variant="contained"
                onClick={() => {
                  setShowGrid(!showGrid);
                }}
              >
                {showGrid ? <GridViewIcon /> : <ViewListIcon />}
              </Button>
              <Tooltip
                title="Add New Course"
                placement="top"
                TransitionComponent={Zoom}
                enterDelay={500}
                leaveDelay={200}
                arrow
              >
                <Button
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  onClick={handleClickOpen}
                >
                  Add course
                </Button>
              </Tooltip>
            </div>

            {showGrid ? (
              <CardsList>
                {courses.map((course, index) => {
                  return (
                    <CardContent
                      style={{
                        minWidth: 250,
                        height: 200,
                        backgroundColor: "#ddd",
                        borderRadius: 15,
                        margin: "0px auto",
                        overflow: "hidden",
                      }}
                      key={index}
                    >
                      <Typography
                        variant="h6"
                        align="center"
                        style={{ color: "green" }}
                      >
                        {course.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} align="center">
                        <b>Course ID </b> #{course.id}
                      </Typography>
                      {className ? (
                        <Typography sx={{ mb: 1.5 }} align="center">
                          <b>Classes:</b> {className}
                        </Typography>
                      ) : (
                        <span>
                          <b style={{ color: "	#DC143C" }}>Classes: </b>
                          {course.std__class.map((classe) => {
                            return <> {classe.name},</>;
                          })}
                        </span>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          height: 70,
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          onClick={() => {
                            handleClickEdit(course.id, course.name);
                          }}
                        >
                          <ModeEditOutlineIcon />
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={() => {
                            handleDelete(course.id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="secondary"
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            handleDetach(course.id);
                          }}
                        >
                          <LinkOffIcon />
                        </Button>
                      </Box>
                    </CardContent>
                  );
                })}
              </CardsList>
            ) : (
              <div style={{ height: 423, width: "90%", margin: '0px auto' }}>
                <DataGrid
                  rows={courses}
                  columns={columns}
                  pageSize={6}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            )}

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add new course to system, please enter the name of course
                  and select the class that you want add to it.
                  <br />
                  <div style={{ color: "#D8000C" }}>
                    Name of course and class required
                  </div>
                </DialogContentText>
                <FormControl
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    id="outlined-required"
                    color="success"
                    helperText="Please enter the name of course"
                    required
                    size="small"
                    margin="normal"
                    type="text"
                    label="Name of course"
                    variant="outlined"
                    autoFocus
                    name="newCourse"
                    onChange={handleChangeAddSection}
                    defaultValue={undefined}
                  />
                  <div style={{ marginTop: "8px" }}>
                    <Select
                      size="small"
                      color="success"
                      style={{ minWidth: 230 }}
                      name="className"
                      onChange={handleChangeSelect}
                      displayEmpty
                    >
                      (className)? return (<MenuItem>{className}</MenuItem>) :{" "}
                      {classes.map((classe, index) => {
                        return (
                          <MenuItem key={index} value={classe.id}>
                            {classe.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>Choose class</FormHelperText>
                  </div>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={handleAdd}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog open={edit} onClose={handleCloseEdit}>
              <DialogTitle>Edit Course</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter the new name of course.
                </DialogContentText>
                <FormControl>
                  <TextField
                    id="outlined-required"
                    color="success"
                    size="small"
                    margin="normal"
                    type="text"
                    label="Name of course"
                    variant="outlined"
                    name="courseName"
                    autoFocus
                    onChange={handleChangeInput}
                    defaultValue={courseName}
                  />
                  {/* <div style={{ marginTop: "8px" }}>
              <Select
                size="small"
                color="success"
                style={{ minWidth: 250 }}
                name="courseName"
                onChange={handleChangeSelect}
              >
                <MenuItem value={undefined}>
                  <em>None</em>
                </MenuItem>
                {classes.map((course, index) => {
                  return (
                    <MenuItem key={index} value={course.id}>
                      {course.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Choose class</FormHelperText>
            </div> */}
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={handleCloseEdit}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  startIcon={<SaveIcon />}
                  onClick={handleEdit}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </RightContainer>
    </>
  );
};
export default Courses;
