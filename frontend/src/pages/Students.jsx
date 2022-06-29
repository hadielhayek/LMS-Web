import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddStudentPopup from "../components/AddStudentPopup";
import EditStudentPopup from "../components/EditStudentPopup";
import StudentCard from "../components/StudentCard";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Box } from "@mui/material";
import Header from "../components/Header";
import { useConfirm } from "material-ui-confirm";
import Cookies from "universal-cookie";
import styled from "styled-components";

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StudentsContainer = styled.div`
  height: 70vh;
  overflow-y: auto;
  /* height: inherit; */
`;
const ButtonsContainer = styled.div`
  /* padding: 20px 40px; */
  margin: 10px 40px;
  display: flex;
  justify-content: space-between;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const GridContainer = styled.div`
  /* overflow-y: auto;
  height: inherit; */
`;

const StudentCell = styled.div`
  display: flex;
  align-items: center;
`;

const StudentImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const StudentsCardsContainer = styled.div`
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 30px;
  @media only screen and (max-width: 568px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Students = () => {
  const confirm = useConfirm();
  toast.configure();
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [students, setStudents] = useState([]);
  const [classStudents, setClassStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [class_id, setClass_id] = useState();
  const [sections, setSections] = useState([]);
  const [section_id, setSection_id] = useState();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState();
  const [showGrid, setShowGrid] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/student`, headers).then((res) => {
      if (res.status === 200) {
        setAllStudents(res.data.data);
        setStudents(res.data.data);
      }
    });
  }, []);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/class`, headers);
        if (res.status === 200) {
          setClasses(res.data.data);
          setClass_id("all");
          setSection_id("all");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  const handleChangeClass = (e) => {
    let class_id = e.target.value;
    setClass_id(class_id);
    if (class_id === "all") {
      setStudents(allStudents);
      setSection_id("all");
    } else {
      let sections = [];
      sections = classes.find((c) => c.id === class_id).sections;
      setSections(sections);
      let classStudents = [];
      sections.map((section) => {
        allStudents.map((student) => {
          if (student.section_id === section.id) classStudents.push(student);
        });
      });
      setClassStudents(classStudents);
      setStudents(classStudents);
      setSection_id("all");
    }
  };

  const handleChangeSection = (e) => {
    let section_id = e.target.value;
    setSection_id(section_id);
    if (section_id === "all") {
      setStudents(classStudents);
    } else {
      let students = classStudents.filter(
        (student) => student.section_id === section_id
      );
      setStudents(students);
    }
  };

  const filter = (students) => {
    setAllStudents(students);
    let classStudents = [];
    sections.map((section) => {
      students.map((student) => {
        if (student.section_id === section.id) classStudents.push(student);
      });
    });
    setClassStudents(classStudents);
    if (class_id === "all") setStudents(students);
    else if (section_id === "all") {
      setStudents(classStudents);
    } else {
      let sectionStudents = classStudents.filter(
        (student) => student.section_id === section_id
      );
      setStudents(sectionStudents);
    }
  };

  const handleDelete = async (id) => {
    let res;
    try {
      res = await axios.delete(
        `http://localhost:8000/api/student/${id}`,
        headers
      );
      toast.success(res.data.message);
      filter(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "Student ID", width: 90 },
    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      renderCell: (params) => {
        return (
          <StudentCell>
            <StudentImg src={params.row.image} alt="" />
            {params.row.first_name}
          </StudentCell>
        );
      },
    },
    { field: "last_name", headerName: "Last Name", width: 110 },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 140,
    },
    {
      field: "class",
      headerName: "Class",
      width: 90,
      renderCell: (params) => {
        return params.row.std__class.name;
      },
    },
    {
      field: "section",
      headerName: "Section",
      width: 90,
      renderCell: (params) => {
        return params.row.section.name;
      },
    },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 220,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="success"
              size="small"
              style={{ marginRight: "8px" }}
              onClick={() => {
                setEditOpen(true);
                setId(params.row.id);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              size="small"
              onClick={() => {
                confirm({
                  description: `This will permanently delete student #${params.row.id}`,
                }).then(() => handleDelete(params.row.id));
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <RightContainer>
      <Header
        icon={
          <PersonOutlineIcon
            style={{
              fontSize: "55px",
              color: "#204B64",
            }}
          />
        }
        title="Students"
        subTitle="In this page you can manage Students add, update, or delete) "
      />
      <ButtonsContainer>
        <Button
          variant="contained"
          onClick={() => setShowGrid(!showGrid)}
          sx={{
            marginRight: "15px",
          }}
        >
          {showGrid ? <ViewListIcon /> : <GridViewIcon />}
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddOpen(true)}
        >
          Add Student
        </Button>
      </ButtonsContainer>
      <StudentsContainer>
        <FilterContainer>
          <div>
            <FormControl
              variant="standard"
              sx={{
                minWidth: "130px",
                marginRight: "20px",
                "& .MuiInput-root div[role-button]": {
                  fontSize: "12px",
                },
              }}
              size="small"
            >
              <InputLabel>Class</InputLabel>
              <Select
                label="Class"
                onChange={handleChangeClass}
                value={class_id || ""}
                name="std__class_id"
                required
              >
                <ListSubheader>Choose a class</ListSubheader>
                <MenuItem value="all">All Classes</MenuItem>
                {classes.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ minWidth: "130px", fontSize: "12px" }}
              size="small"
            >
              <InputLabel>Section</InputLabel>
              <Select
                label="Section"
                onChange={handleChangeSection}
                value={section_id || ""}
                name="section_id"
                required
                disabled={class_id === "all"}
              >
                <ListSubheader>Choose a section</ListSubheader>
                <MenuItem value="all">All Sections</MenuItem>
                {sections.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </FilterContainer>
        {showGrid && (
          <GridContainer>
            <DataGrid
              rowHeight={75}
              rows={students}
              disableSelectionOnClick
              columns={columns}
              autoPageSize
              components={{
                Toolbar: GridToolbar,
              }}
              checkboxSelection
              sx={{
                height: 600,
                "& .MuiDataGrid-cell:hover": {
                  color: "#000000",
                  cursor: "pointer",
                },
                fontSize: 14,
                "& div[data-rowIndex]:nth-of-type(2n+1)": {
                  background: "#7879F1",
                },
              }}
            />
          </GridContainer>
        )}
        {!showGrid && (
          <StudentsCardsContainer>
            {students.map((student) => (
              <StudentCard
                student={student}
                setId={(e) => setId(e)}
                open={(e) => setEditOpen(e)}
                setStudents={(e) => {
                  setStudents(e);
                }}
                deleteStudent={(e) => handleDelete(e)}
              />
            ))}
          </StudentsCardsContainer>
        )}
        <Dialog open={addOpen} fullWidth maxWidth="md">
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Here you can add a student to the list of students. Please make
              sure to include all the data because all the fields are required
            </DialogContentText>
            <AddStudentPopup
              open={(e) => setAddOpen(e)}
              filter={(e) => filter(e)}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={editOpen} fullWidth maxWidth="md">
          <DialogTitle>Edit Student #{id}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Here you can edit a student from the list of students. Please make
              sure to include all the data because all the fields are required
            </DialogContentText>
            <EditStudentPopup
              open={(e) => setEditOpen(e)}
              id={id}
              setStudents={(e) => setStudents(e)}
              filter={(e) => filter(e)}
            />
          </DialogContent>
        </Dialog>
      </StudentsContainer>
    </RightContainer>
  );
};

export default Students;
