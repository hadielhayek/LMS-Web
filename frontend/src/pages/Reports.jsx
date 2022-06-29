import React, { useEffect, useState } from "react";
import axios from "axios";
import { CanvasJSChart } from "canvasjs-react-charts";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import StudentReportCard from "../components/StudentReportCard";
import styled from "styled-components";
import ViewListIcon from "@mui/icons-material/ViewList";
import BarChartIcon from "@mui/icons-material/BarChart";
import GridViewIcon from "@mui/icons-material/GridView";
import Header from "../components/Header";

import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import Cookies from "universal-cookie";
import { Stack, Animation } from "@devexpress/dx-react-chart";

const Root = (props) => (
  <Legend.Root
    {...props}
    sx={{ display: "flex", margin: "auto", flexDirection: "row" }}
  />
);
const Label = (props) => (
  <Legend.Label {...props} sx={{ whiteSpace: "nowrap" }} />
);

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ReportsContainer = styled.div`
  padding: 0 40px;
  overflow-x: hidden;
  height: 80vh;
  overflow-y: auto;
`;

const AllStudensContainer = styled.div``;
const SectionsAttendance = styled.div``;
const ChartContainer = styled.div`
  margin-top: 40px;
`;
const HeaderTitle = styled.h2`
  border-bottom: 3px solid grey;
  padding: 10px 0;
`;
const FiltersContainer = styled.div`
  padding: 20px 0;
`;
const GridContainer = styled.div`
  min-height: 60vh;
`;

const StudentAttendance = styled.div``;

const SubHeaderTitle = styled.h3`
  text-align: center;
  padding: 40px 0;
  font-size: 20px;
`;

const StudentImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
const BarsContainer = styled.div``;
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

const Reports = () => {
  const [allData, setAllData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [class_id, setClass_id] = useState();
  const [class_name, setClass_name] = useState("");
  const [sections, setSections] = useState([]);
  const [section_id, setSection_id] = useState();
  const [section_name, setSection_name] = useState("");
  const [students, setStudents] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const columns = [
    { field: "id", headerName: "Student ID", width: 120, fontSize: "20px" },
    {
      field: "image",
      headerName: "Student Image",
      width: 120,
      renderCell: (params) => {
        return <StudentImg src={params.row.image} />;
      },
    },

    {
      field: "name",
      headerName: "First Name",
      width: 160,
    },

    {
      field: "percentage",
      headerName: "Percentage",
      minWidth: 400,
      flex: 1,
      renderCell: (params) => {
        return (
          <CanvasJSChart
            options={{
              animationEnabled: true,
              theme: "light2",
              height: 120,
              // width: 500,
              title: {
                // text: "Percentage of Attendance ",
              },
              axisX: {
                title: "Status",
                reversed: true,
              },
              axisY: {
                // title: "Percentage of attendance",
                includeZero: true,
                labelFormatter: (e) => e.value + "%",
              },
              data: [
                {
                  type: "bar",
                  dataPoints: [
                    {
                      y: params.row.attendance.present,
                      label: "present",
                      color: "green",
                    },
                    {
                      y: params.row.attendance.late,
                      label: "late",
                      color: "yellow",
                    },
                    {
                      y: params.row.attendance.absent,
                      label: "absent",
                      color: "red",
                    },
                  ],
                },
              ],
            }}
            /* onRef={ref => this.chart = ref} */
          />
        );
      },
    },
  ];

  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/class`, headers);
        if (res.status === 200) {
          setClasses(res.data.data);
          setClass_id(res.data.data[0].id);
          setClass_name(res.data.data[0].name);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getClasses();
  }, []);

  useEffect(() => {
    if (class_id) {
      const getSections = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/class/${class_id}`,
            headers
          );
          if (res.status === 200) {
            setSections(res.data.data.sections);
            setSection_id(res.data.data.sections[0].id);
            setClass_name(res.data.data.name);
            setSection_name(res.data.data.sections[0].name);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getSections();
    }
  }, [class_id]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/section/${section_id}`,
          headers
        );
        if (res.status === 200) {
          setSection_name(res.data.data.name);
          let studentsarray = res.data.data.students;
          let rows = [];
          studentsarray.map((student) => {
            let p = 0;
            let l = 0;
            let a = 0;
            student.attendance.map((attendance) => {
              if (attendance.status_id === 1) p++;
              if (attendance.status_id === 2) l++;
              if (attendance.status_id === 3) a++;
            });
            let t = p + l + a;
            rows = [
              ...rows,
              {
                id: student.id,
                name: student.first_name + " " + student.last_name,
                image: student.image,
                attendance: {
                  present: ~~((p / t) * 100).toFixed(2),
                  late: ~~((l / t) * 100).toFixed(2),
                  absent: ~~((a / t) * 100).toFixed(2),
                },
              },
            ];
          });
          setStudents(rows);

          //sections percentage
          let p = 0;
          let l = 0;
          let a = 0;
          studentsarray.forEach((element) => {
            element.attendance.map((attendance) => {
              if (attendance.status_id === 1) p++;
              if (attendance.status_id === 2) l++;
              if (attendance.status_id === 3) a++;
            });
          });
          let t = p + l + a;
          setSectionData([
            {
              y: ((p / t) * 100).toFixed(2),
              label: "present",
              color: "green",
            },
            {
              y: ((l / t) * 100).toFixed(2),
              label: "late",
              color: "yellow",
            },
            {
              y: ((a / t) * 100).toFixed(2),
              label: "absent",
              color: "red",
            },
          ]);
          let datesarray = [];
          studentsarray[0].attendance.slice(-10).forEach((attendance) => {
            datesarray.push(attendance["date"]);
          });
          let obj = [];
          datesarray.forEach((date, key) => {
            let attendance = [];
            studentsarray.forEach((student) => {
              attendance = [
                ...attendance,
                student.attendance.slice(-10)[key].status_id,
              ];
            });
            obj = [...obj, { ["date"]: date, attendance }];
          });
          let weekdata = [];
          obj.forEach((row) => {
            let p = 0;
            let l = 0;
            let a = 0;
            row["attendance"].map((status) => {
              if (status === 1) p++;
              if (status === 2) l++;
              if (status === 3) a++;
            });
            let total = p + l + a;
            weekdata = [
              ...weekdata,
              {
                ["date"]: row["date"],
                present: ~~((p / total) * 100).toFixed(2),
                late: ~~((l / total) * 100).toFixed(2),
                absent: ~~((a / total) * 100).toFixed(2),
              },
            ];
          });
          setWeekData(weekdata);

          // });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getStudents();
  }, [section_id]);

  const options = {
    animationEnabled: true,

    title: {
      text: "Percentage of Attendance for All Students",
      fontSize: 25,
    },
    data: [
      {
        type: "doughnut",
        innerRadius: 50,
        startAngle: 90,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: allData,
      },
    ],
  };
  const options2 = {
    exportEnabled: false,
    animationEnabled: true,
    title: {
      text: `All Time Percentage of Attendance for Class:${class_name}, Section : ${section_name} `,
      fontSize: 22,
      fontColor: "black",
    },
    data: [
      {
        type: "doughnut",
        innerRadius: 50,
        startAngle: 90,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: sectionData,
      },
    ],
  };

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/status`,
          headers
        );
        if (res.status === 200) {
          const present = res.data.data[0].attendance.length;
          const late = res.data.data[1].attendance.length;
          const absent = res.data.data[2].attendance.length;
          const total = present + late + absent;
          setAllData([
            {
              y: ((present / total) * 100).toFixed(2),
              label: res.data.data[0].name,
              color: "green",
            },
            {
              y: ((late / total) * 100).toFixed(2),
              label: res.data.data[1].name,
              color: "yellow",
            },
            {
              y: ((absent / total) * 100).toFixed(2),
              label: res.data.data[2].name,
              color: "red",
            },
          ]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getStatus();
  }, []);
  return (
    <RightContainer>
      <Header
        icon={
          <BarChartIcon
            style={{
              fontSize: "55px",
              color: "#204B64",
            }}
          />
        }
        title="Reports"
        subTitle="In this page you can find classes,sections, students reports) "
      />
      <ReportsContainer>
        <AllStudensContainer>
          <HeaderTitle>All Students Reports</HeaderTitle>
          <ChartContainer>
            <CanvasJSChart options={options} />
          </ChartContainer>
        </AllStudensContainer>
        <SectionsAttendance>
          <HeaderTitle>Sections Reports</HeaderTitle>
          <FiltersContainer>
            <FormControl
              variant="standard"
              sx={{ width: "180px", marginRight: "40px" }}
            >
              <InputLabel>Class</InputLabel>
              <Select
                label="Class"
                onChange={(e) => {
                  setClass_id(e.target.value);
                }}
                value={class_id || ""}
                name="std__class_id"
                required
                sx={{ fontSize: "16px" }}
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
            <FormControl
              variant="standard"
              sx={{ width: "180px", marginRight: "40px" }}
            >
              <InputLabel>Section</InputLabel>
              <Select
                label="Section"
                onChange={(e) => setSection_id(e.target.value)}
                value={section_id || ""}
                name="section_id"
                required
                sx={{ fontSize: "16px" }}
              >
                {sections.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FiltersContainer>
          <BarsContainer>
            <ChartContainer>
              <Chart data={weekData}>
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries
                  name="Present"
                  valueField="present"
                  argumentField="date"
                  color="green"
                />
                <BarSeries
                  name="Late"
                  valueField="late"
                  argumentField="date"
                  color="yellow"
                />
                <BarSeries
                  name="Absent"
                  valueField="absent"
                  argumentField="date"
                  color="red"
                />
                <Animation />
                <Legend
                  position="bottom"
                  rootComponent={Root}
                  labelComponent={Label}
                />
                <Title text="Last Two Week Attendance Percentage" />
                <Stack />
              </Chart>
            </ChartContainer>
          </BarsContainer>
          <ChartContainer>
            <CanvasJSChart options={options2} />
          </ChartContainer>
        </SectionsAttendance>
        <StudentAttendance>
          <SubHeaderTitle>
            All Time Students Reports of Class:{class_name} / Section :{" "}
            {section_name}
          </SubHeaderTitle>
          <GridContainer>
            <Button
              variant="contained"
              onClick={() => setShowGrid(!showGrid)}
              sx={{ marginRight: "15px" }}
            >
              {showGrid ? <ViewListIcon /> : <GridViewIcon />}
            </Button>

            {showGrid ? (
              <DataGrid
                rowHeight={99}
                rows={students}
                disableSelectionOnClick
                columns={columns}
                autoHeight
                checkboxSelection
                sx={{
                  "& .MuiDataGrid-cell:hover": {
                    cursor: "pointer",
                  },
                  fontSize: 13,
                  "& .MuiDataGrid-row:hover": {
                    background: "white",
                  },
                  marginTop: "25px",
                }}
              />
            ) : (
              <StudentsCardsContainer>
                {students.map((student) => (
                  <StudentReportCard student={student} />
                ))}
              </StudentsCardsContainer>
            )}
          </GridContainer>
        </StudentAttendance>
      </ReportsContainer>
    </RightContainer>
  );
};

export default Reports;
