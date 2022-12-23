import { StyleSheet, ScrollView, View, Text } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import axios from "axios";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Colors } from "../constants/styles";
import capitalizeFirstLetter from "../util/capitalizeFirstLetter";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
} from "victory-native";

function ReportsScreen() {
  const authCtx = useContext(AuthContext);
  const [employeesList, setEmployeesList] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [reportEmployeeSkills, setReportEmployeeSkills] = useState([]);
  const [reportEmployee, setReportEmployee] = useState([]);
  const [reportEmployeeRoles, setReportEmployeeRoles] = useState([]);
  const [reportEmployeeProjects, setReportEmployeeProjects] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  /**
   * Get a single Report by SLug
   * @param email
   * @returns {Promise<void>}
   */
  const getReport = async (email) => {
    setLoadingReport(true);
    try {
      const response = await axios.get(
        `https://erp-lamp-api.herokuapp.com/api/reports/${email}`,
        {
          headers: { Authorization: `Bearer ${authCtx.token}` },
        }
      );
      const {
        data: { skills, user, roles, projects },
      } = response;
      setReportEmployeeRoles(roles);
      setReportEmployee(user);
      setReportEmployeeSkills(skills);
      setReportEmployeeProjects(projects);
    } catch (error) {
      console.log(error.message);
    }
    setLoadingReport(false);
  };

  /**
   * Get all employees
   * @returns {Promise<void>}
   */
  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      const response = await axios.get(
        `https://erp-lamp-api.herokuapp.com/api/employees`,
        {
          headers: { Authorization: `Bearer ${authCtx.token}` },
        }
      );
      const {
        data: { employees },
      } = response;
      setEmployeesList(employees);
      setLoadingEmployees(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getReportOnSelect = (value) => {
    if (value) {
      const first_name = value.title.split(" ")[0];
      const email = employeesList.find(
        (employee) => employee.first_name === first_name
      ).email;
      getReport(email);
    }
  };

  const dropdown = [];

  if (employeesList) {
    for (let i = 0; i < employeesList.length; i++) {
      dropdown.push({
        id: employeesList[i].id,
        title: `${employeesList[i].first_name} ${employeesList[i].last_name}`,
      });
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loadingEmployees || loadingReport) {
    return <LoadingOverlay message="Loading Employees" />;
  }
  const { skills } = reportEmployee;
  const progressSkills = [];
  for (let i = 0; i < reportEmployeeSkills.length; i++) {
    progressSkills.push({
      name: capitalizeFirstLetter(
        skills.find((skill) => skill.id === reportEmployeeSkills[i].skill_id)
          .name
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

  const showSkill = (single) => {
    const temp = [];
    for (let i = 0; i < skills.length; i++) {
      if (skills[i].name.toLowerCase() === single.name.toLowerCase()) {
        temp.push({
          y: skills[i].kpi.score,
          x: skills[i].kpi.created_at.split("T")[0].slice(0, 7),
        });
      }
    }
    setLineChartData(temp);
  };

  const correctRoles = [];
  for (let i = 0; i < reportEmployeeProjects.length; i++) {
    correctRoles.push(
      reportEmployeeRoles.find(
        (item) => item.id === reportEmployeeProjects[i].pivot.role_id
      ).name
    );
  }

  return (
    <>
      <View>
        <AutocompleteDropdown
          containerStyle={styles.container}
          inputContainerStyle={styles.dropdown}
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          onSelectItem={(item) => getReportOnSelect(item)}
          dataSet={dropdown}
        />
      </View>
      <ScrollView>
        {allSkills.length > 0 && (
          <VictoryChart
            width={350}
            theme={VictoryTheme.material}
            domainPadding={{ x: 30 }}
          >
            <VictoryBar
              barWidth={({ index }) => index * 2 + 20}
              data={allSkills}
              x="name"
              y="score"
              style={{ data: { fill: Colors.primaryColor } }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPressIn: () => {
                      return [
                        {
                          target: "data",
                          mutation: ({ datum }) => {
                            showSkill(datum);
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </VictoryChart>
        )}
        {lineChartData.length > 1 ? (
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: { stroke: Colors.primaryColor },
                parent: { border: "1px solid #ccc" },
              }}
              data={lineChartData}
            />
          </VictoryChart>
        ) : (
          <Text style={styles.text}>No History</Text>
        )}
        {reportEmployeeProjects.length > 0 ? (
          reportEmployeeProjects.map((project, index) => (
            <Text key={index} style={styles.project}>
              {project.name} {correctRoles[index]}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>No Projects</Text>
        )}
      </ScrollView>
    </>
  );
}

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  dropdown: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    flex: 1,
    alignSelf: "center",
    margin: 20,
  },
  project: {
    flex: 1,
    borderBottomColor: Colors.primaryColor,
    paddingBottom: 2,
    borderBottomWidth: 1,
    margin: 10,
  },
});
