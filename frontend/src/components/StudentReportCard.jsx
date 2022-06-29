import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, ButtonBase } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { Box } from "@mui/system";
import { CanvasJSChart } from "canvasjs-react-charts";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useState } from "react";
import { useEffect } from "react";

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
const ViewChangeContainer = styled.div`
  background: #151414;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const WhiteDiv = styled.div`
  /* position: absolute;
  width: 100%;
  bottom: 0;
  background: white;
  height: 18.5px;
  z-index: 2; */
`;
const StudentReportCard = ({ student }) => {
  const [showPie, setShowPie] = useState(false);
  const [showBar, setShowBar] = useState(true);
  const [pieData, setpieData] = useState([]);
  const [chartType, setChartType] = useState("column");
  return (
    <Card
      sx={{
        width: 230,
        height: 345,
        textAlign: "center",
        background: "#b7bdff",
        position: "relative",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          //   gap: "6px",
          padding: "20px 0",
          cursor: "pointer",
        }}
      >
        <StudentImg src={student.image} alt="" />
        <div>
          <FullName>{student.name}</FullName>
          <Id>#{student.id}</Id>
        </div>
        <ViewChangeContainer>
          <Button
            onClick={() => {
              setChartType("doughnut");
            }}
          >
            <DonutLargeIcon />
          </Button>
          <Button
            onClick={() => {
              setChartType("column");
            }}
          >
            <BarChartIcon />
          </Button>
        </ViewChangeContainer>
        {chartType === "column" && (
          <CanvasJSChart
            options={{
              animationEnabled: true,
              theme: "light2",
              height: 170,
              width: 230,
              axisX: {
                title: "Status",
                reversed: true,
              },
              axisY: {
                includeZero: true,
                labelFormatter: (e) => e.value + "%",
              },
              data: [
                {
                  indexLabelPlacement: "outside",
                  indexLabel: "{y}%",
                  type: "column",
                  dataPoints: [
                    {
                      y: student.attendance.present,
                      label: "present",
                      color: "green",
                    },
                    {
                      y: student.attendance.late,
                      label: "late",
                      color: "yellow",
                    },
                    {
                      y: student.attendance.absent,
                      label: "absent",
                      color: "red",
                    },
                  ],
                },
              ],
            }}
          />
        )}
        {chartType === "doughnut" && (
          <CanvasJSChart
            options={{
              animationEnabled: true,
              theme: "light2",
              height: 170,
              width: 230,
              axisX: {
                title: "Status",
                reversed: true,
              },
              axisY: {
                includeZero: true,
                labelFormatter: (e) => e.value + "%",
              },
              data: [
                {
                  indexLabelPlacement: "inside",
                  startAngle: 90,

                  indexLabel: "{label}: {y}%",
                  indexLabelFontColor: "#222222",
                  type: "doughnut",
                  dataPoints: [
                    {
                      y: student.attendance.present,
                      label: "present",
                      color: "green",
                    },
                    {
                      y: student.attendance.late,
                      label: "late",
                      color: "yellow",
                    },
                    {
                      y: student.attendance.absent,
                      label: "absent",
                      color: "red",
                    },
                  ],
                },
              ],
            }}
          />
        )}
        <WhiteDiv />
      </CardContent>
    </Card>
  );
};

export default StudentReportCard;
