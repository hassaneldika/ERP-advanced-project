import React, { useEffect, useState } from "react";
import "./Reports.css";
import {
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line,
    Bar,
    Legend,
    ResponsiveContainer,
} from "recharts";
import LiveSearch from "../Layout/LiveSearch";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { TbReportSearch } from "react-icons/tb";
import ReportProjects from "./ReportProjects";
import { AiOutlineProject } from "react-icons/ai";

const Reports = ({
    fetchEmployees,
    loadingEmployees,
    employees,
    getReport,
    loadingReport,
    reportEmployeeSkills,
    reportEmployee,
    reportEmployeeRoles,
    reportEmployeeProjects,
}) => {
    document.title = "Reports Dashboard | ERP";
    const { skills } = reportEmployee;
    const [lineChartData, setLineChartData] = useState([]);

    const showSkill = (single) => {
        const temp = [];
        for (let i = 0; i < skills.length; i++) {
            if (skills[i].name === single.name.toLowerCase()) {
                temp.push({
                    value: skills[i].kpi.score,
                    time: skills[i].kpi.created_at.split("T")[0].slice(0, 7),
                });
            }
        }
        setLineChartData(temp);
    };

    const progressSkills = [];
    for (let i = 0; i < reportEmployeeSkills.length; i++) {
        progressSkills.push({
            name: capitalizeFirstLetter(
                skills.find(
                    (skill) => skill.id === reportEmployeeSkills[i].skill_id
                ).name
            ),
            score: reportEmployeeSkills[i].score,
        });
    }

    const uniqueIds = [];
    const allSkills = progressSkills.filter((element) => {
        const isDuplicate = uniqueIds.includes(element.name);
        if (!isDuplicate) {
            uniqueIds.push(element.name);
            return true;
        }
        return false;
    });

    const correctRoles = [];
    for (let i = 0; i < reportEmployeeProjects.length; i++) {
        correctRoles.push(
            reportEmployeeRoles.find(
                (item) => item.id === reportEmployeeProjects[i].pivot.role_id
            ).name
        );
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    return (
        <div className="reports">
            <div className="reports-head">
                <h2>
                    <TbReportSearch />
                    Reports
                </h2>
                {!loadingEmployees && (
                    <LiveSearch employees={employees} getReport={getReport} />
                )}
            </div>

            {loadingReport ? (
                <div className="no-data">
                    Select an Employee to generate reports
                </div>
            ) : (
                <>
                    {allSkills.length > 0 ? (
                        <div className="reports-container">
                            <ResponsiveContainer width={"99%"} height={300}>
                                <BarChart
                                    width="100%"
                                    height="auto"
                                    data={allSkills}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="score"
                                        fill="#0097a4"
                                        barSize={30}
                                        onClick={(value) => showSkill(value)}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                            <ResponsiveContainer width={"99%"} height={300}>
                                <LineChart data={lineChartData}>
                                    <Tooltip />
                                    <XAxis dataKey="time" />
                                    <YAxis dataKey="value" />
                                    <CartesianGrid
                                        stroke="#eee"
                                        strokeDasharray="3 3"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#0097a4"
                                    />
                                    <Legend />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="no-data"> Not Evaluated Yet</div>
                    )}
                    {reportEmployeeProjects.length > 0 ? (
                        <div className="reports-projects">
                            <h2>
                                <AiOutlineProject />
                                Projects
                            </h2>
                            <div className="reports-container-projects">
                                {reportEmployeeProjects.map(
                                    (project, index) => (
                                        <ReportProjects
                                            key={index}
                                            role={correctRoles[index]}
                                            name={project.name}
                                            slug={project.slug}
                                            created_at={
                                                project.pivot.created_at
                                            }
                                            end_date={project.pivot.end_date}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </>
            )}
        </div>
    );
};

export default Reports;
