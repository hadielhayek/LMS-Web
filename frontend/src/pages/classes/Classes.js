import "./Classes.css";
import ClassIcon from "@mui/icons-material/Class";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { DataGrid } from "@mui/x-data-grid";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded";
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
import axios from "axios";
import Cookies from "universal-cookie";
import CubeLoader from "../../components/Cube Loader/CubeLoader";
import Header from "../../components/Header";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
//

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Classes = () => {
  toast.configure();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  // for edit form
  const [className, setClassName] = useState(undefined);
  const [classID, setClassID] = useState(undefined);
  // for edit & add form
  const [newCourseName, setNewCourseName] = useState(undefined);
  // add form
  const [newClass, setNewClass] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  // add cookies and get token
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

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

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/class`, headers)
      .then((res) => {
        setClasses(res.data.data);
      })
      .catch((err) => console.log(`Error: ${err.message}`));

    axios
      .get(`http://localhost:8000/api/course`, headers)
      .then((res) => {
        setCourses(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(`Error: ${err.message}`));
  }, []);

  // delete class
  const handleDelete = async (classID) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/class/${classID}`,
        headers
      );
      if (response.status === 200) {
        console.log(response.data.data);
        console.log(response.data.message);
        setClasses(response.data.data);
        toast.success("Class deleted successfully!");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // to update class
  const handleEdit = () => {
    const classInfo = {
      name: className,
      course: newCourseName,
    };
    axios
      .put(`http://localhost:8000/api/class/${classID}`, classInfo, headers)
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

  // to add class
  const handleAdd = () => {
    const classInfo = {
      name: newClass,
      course: newCourseName,
    };
    axios
      .post(`http://localhost:8000/api/class/`, classInfo, headers)
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

  // to open/close add class popup
  const handleClickOpen = () => {
    setNewCourseName(undefined);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // to open/close add edit class popup
  const handleClickEdit = (classID, name) => {
    setNewCourseName(undefined);
    setClassName(name);
    setClassID(classID);
    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };

  // const handleChange = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   setEditInfo((preValue) => {
  //     return {
  //       ...preValue,
  //       [name]: value,
  //     };
  //   });
  //   console.log(editInfo);
  // };

  const handleChangeInput = (e) => {
    setClassName(e.target.value);
  };
  const handleChangeSelect = (e) => {
    setNewCourseName(e.target.value);
  };
  const handleChangeAddClass = (e) => {
    setNewClass(e.target.value);
  };

  // columns
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Class name", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 500,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: `/dashboard/sections/${params.row.id}`,
              }}
            >
              <Tooltip
                title="View Sections of Class"
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
                  startIcon={<PreviewRoundedIcon />}
                  style={{ marginRight: "15px" }}
                >
                  View Sections
                </Button>
              </Tooltip>
            </Link>

            <Tooltip
              title="View Courses of Class"
              placement="top"
              TransitionComponent={Zoom}
              enterDelay={500}
              leaveDelay={200}
              arrow
            >
              <Button
                variant="contained"
                size="small"
                color="primary"
                startIcon={<PreviewRoundedIcon />}
                style={{ marginRight: "60px" }}
                onClick={() => {
                  navigate(`/dashboard/courses/${params.row.id}`);
                }}
              >
                View Courses
              </Button>
            </Tooltip>

            <Tooltip
              title="Update Class"
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
                Update
              </Button>
            </Tooltip>
            <Tooltip
              title="Delete Class"
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
          </>
        );
      },
    },
  ];

  // return
  return (
    <>
      <RightContainer>
        <Header
          icon={
            <ClassIcon
              style={{
                fontSize: "55px",
                color: "#204B64",
              }}
            />
          }
          title="Classes"
          subTitle="In this page you can manage classes (add, delete, update) and you can see the courses and sections related to each class."
        />
        {loading ? (
          <CubeLoader />
        ) : (
          <div className="classes_container">
            <div className="add_class">
              <Button
                variant="contained"
                onClick={() => {
                  setShowGrid(!showGrid);
                }}
              >
                {showGrid ? <GridViewIcon /> : <ViewListIcon />}
              </Button>
              <Tooltip
                title="Add New Class"
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
                  Add class
                </Button>
              </Tooltip>
            </div>

            {showGrid ? (
              <CardsList>
                {classes.map((classe, index) => {
                  //// (item, index) in order
                  return (
                    <CardContent
                      style={{
                        minWidth: 250,
                        height: 220,
                        backgroundColor: "#ddd",
                        borderRadius: 15,
                        margin: "0px auto",
                      }}
                      key={index}
                    >
                      <Typography
                        variant="h6"
                        align="center"
                        style={{ color: "green" }}
                      >
                        {classe.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} align="center">
                        <b>ID </b>#{classe.id}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-between",
                          height: 70,
                        }}
                      >
                        <Link
                          to={{
                            pathname: `/dashboard/sections/${classe.id}`,
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<PreviewRoundedIcon />}
                          >
                            View Sections
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          startIcon={<PreviewRoundedIcon />}
                          onClick={() => {
                            navigate(`/dashboard/courses/${classe.id}`);
                          }}
                        >
                          View Courses
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 70,
                        }}
                      >
                        <Button
                          style={{ marginRight: 10 }}
                          variant="contained"
                          size="small"
                          color="success"
                          onClick={() => {
                            handleClickEdit(classe.id, classe.name);
                          }}
                        >
                          <ModeEditOutlineIcon />
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={() => {
                            handleDelete(classe.id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </Box>
                    </CardContent>
                  );
                })}
              </CardsList>
            ) : (
              <div style={{ height: 423, width: "100%" }}>
                <DataGrid
                  rows={classes}
                  columns={columns}
                  pageSize={6}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            )}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add new class to system, please enter the name of class and
                  you can add a course to class at same time.
                  <br />
                  <div style={{ color: "#D8000C" }}>
                    Name of class required but course not.
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
                    helperText="Please enter the name of class"
                    required
                    size="small"
                    margin="normal"
                    type="text"
                    label="Name of class"
                    variant="outlined"
                    autoFocus
                    name="newClass"
                    onChange={handleChangeAddClass}
                    defaultValue={undefined}
                  />
                  <div style={{ marginTop: "8px" }}>
                    <Select
                      size="small"
                      color="success"
                      style={{ minWidth: 230 }}
                      name="courseName"
                      displayEmpty
                      onChange={handleChangeSelect}
                    >
                      <MenuItem value={undefined}>
                        <em>None</em>
                      </MenuItem>
                      {courses.map((course, index) => {
                        return (
                          <MenuItem key={index} value={course.id}>
                            {course.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>Choose course</FormHelperText>
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
              <DialogTitle>Update Class</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To update the class in system, please enter the new name of
                  class and you can add a course to class at same time.
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
                    helperText="Enter here the new name of class"
                    size="small"
                    margin="normal"
                    type="text"
                    label="Name of class"
                    variant="outlined"
                    name="className"
                    autoFocus
                    onChange={handleChangeInput}
                    defaultValue={className}
                  />
                  <div style={{ marginTop: "8px" }}>
                    <Select
                      size="small"
                      color="success"
                      style={{ minWidth: 230 }}
                      name="courseName"
                      onChange={handleChangeSelect}
                    >
                      <MenuItem value={undefined}>
                        <em>None</em>
                      </MenuItem>
                      {courses.map((course, index) => {
                        return (
                          <MenuItem key={index} value={course.id}>
                            {course.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText>Choose course</FormHelperText>
                  </div>
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

export default Classes;
