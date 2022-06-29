import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { Box } from "@mui/system";

const StudentImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
`;
const FullName = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

const Id = styled.h4`
  font-size: 0.9rem;
  margin: 0;
  margin-bottom: 6px;
`;
const Email = styled.div``;
const Phone = styled.div``;
const DetailsText = styled.h4`
  font-size: 0.9rem;
  margin: 0;
  margin-left: 3px;
  display: inline-block;
  font-weight: normal;
`;

const Class = styled.h4`
  font-size: 0.9rem;
  margin: 0;
  font-weight: normal;
  text-transform: uppercase;
  color: #1a237e;
`;

const Section = styled.h4`
  font-size: 1rem;
  margin: 0;
  font-weight: normal;
  text-transform: uppercase;
  margin-bottom: 10px;
  color: #1a237e;
`;
const StudentCard = ({ student, setId, open, setStudents, deleteStudent }) => {
  return (
    <Card
      sx={{
        minWidth: 210,
        width: 230,
        textAlign: "center",
        background: "#dcdcdc",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          padding: "20px 0",
          cursor: "pointer",
        }}
      >
        <StudentImg src={student.image} alt="" />
        <div>
          <FullName>{student.first_name + " " + student.last_name}</FullName>
          <Id>#{student.id}</Id>
        </div>
        <Class>Class : {student.std__class.name}</Class>
        <Section>Section : {student.section.name}</Section>
        <Email>
          <EmailIcon fontSize="13px" />
          <DetailsText> {student.email}</DetailsText>
        </Email>
        <Phone>
          <PhoneIcon fontSize="13px" />
          <DetailsText> {student.phone}</DetailsText>
        </Phone>
      </CardContent>
      <Box sx={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          size="small"
          sx={{ mr: 2 }}
          onClick={() => {
            open(true);
            setId(student.id);
          }}
        >
          <EditIcon />
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure that you want to delete this student"
              )
            )
              deleteStudent(student.id);
          }}
        >
          <DeleteIcon />
        </Button>
      </Box>
    </Card>
  );
};

export default StudentCard;
