import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img1 from "../assets/images/profile.jpeg";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

const AddStudentContainer = styled.div`
  /* padding-top: 40px; */
  padding: 30px 10px 0px;
  @media only screen and (max-width: 768px) {
    padding-top: 10px;
  }
`;
const FormContainer = styled.form``;

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  gap: 60px;
  @media only screen and (max-width: 768px) {
    gap: 10px;
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
`;

const Input = styled.input`
  display: none;
`;

const EditStudentPopup = (props) => {
  toast.configure();
  const [student, setStudent] = useState({});
  const [classes, setClasses] = useState([]);
  const [class_id, setClass_id] = useState();
  const [sections, setSections] = useState([]);
  const [image, setImage] = useState();
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const handleImage = async (e) => {
    let img = e.target.files[0];
    if (img) {
      setImage(URL.createObjectURL(img));
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/class`, headers).then((res) => {
      if (res.status === 200) {
        let classes = res.data.data;
        setClasses(classes);
        axios
          .get(`http://localhost:8000/api/student/${props.id}`, headers)
          .then((res) => {
            if (res.status === 200) {
              let student = res.data.data;
              let class_id = student.std__class_id;
              let sections = [];
              classes.map((c) => {
                if (c.id === class_id) {
                  sections = c.sections;
                }
              });
              setSections(sections);
              setStudent(res.data.data);
            }
          });
      }
    });
  }, []);

  const handleChangeClass = (e) => {
    let class_id = e.target.value;
    let sections = [];
    classes.map((c) => {
      if (c.id === class_id) {
        sections = c.sections;
      }
    });
    setSections(sections);
    setStudent({
      ...student,
      ["std__class_id"]: class_id,
      ["section_id"]: sections[0].id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete student.id;
    try {
      const res1 = await axios.put(
        `http://localhost:8000/api/student/${props.id}`,
        student,
        headers
      );
      console.log(res1);
      toast.success(res1.data.message);
      const res2 = await axios.get(
        `http://localhost:8000/api/student`,
        headers
      );
      props.filter(res2.data.data);
      props.open(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AddStudentContainer>
      <FormContainer>
        <FormWrapper>
          <ImgContainer>
            <Img src={image || student.image} />
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                name="image"
                onChange={handleImage}
                required
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<DriveFolderUploadIcon />}
              >
                Upload
              </Button>
            </label>
          </ImgContainer>
          <Grid
            container
            spacing={{ xs: 0, md: 8 }}
            px={5}
            sx={{
              "& .MuiFormControl-root": {
                margin: "6px",
              },
            }}
          >
            <Grid item md={6} xs={12}>
              <TextField
                id="standard-basic"
                label="First Name"
                name="first_name"
                variant="standard"
                onChange={handleChange}
                value={student.first_name || ""}
                required
                fullWidth
              />
              <TextField
                id="standard-basic"
                label="Last Name"
                name="last_name"
                variant="standard"
                onChange={handleChange}
                value={student.last_name || ""}
                required
                fullWidth
              />
              <TextField
                id="standard-basic"
                label="Email"
                name="email"
                type="email"
                variant="standard"
                onChange={handleChange}
                value={student.email || ""}
                required
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                label="Phone"
                name="phone"
                variant="standard"
                onChange={handleChange}
                value={student.phone || ""}
                fullWidth
                required
              />
              <FormControl fullWidth variant="standard">
                <InputLabel>Class</InputLabel>
                <Select
                  label="Class"
                  onChange={(e) => {
                    handleChangeClass(e);
                  }}
                  value={student.std__class_id || ""}
                  name="std__class_id"
                  required
                >
                  <MenuItem value="none" hidden>
                    Choose a class
                  </MenuItem>
                  {classes.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth variant="standard">
                <InputLabel>Section</InputLabel>
                <Select
                  label="Section"
                  onChange={handleChange}
                  value={student.section_id || ""}
                  name="section_id"
                  required
                >
                  {sections.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </FormWrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "flex-end" },
            alignItems: "center",
            mt: 4,
          }}
        >
          <Button
            type="button"
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => props.open(false)}
            color="error"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ m: 1 }}
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </FormContainer>
    </AddStudentContainer>
  );
};

export default EditStudentPopup;
