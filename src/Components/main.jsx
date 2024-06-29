import React from "react";
import Button from "@mui/material/Button";
import DataTable from "./ui/dataTable";
import { getTaskList } from "./api/apiTask";
import ReportDialog from "./ui/reportModal";
import TaskDialog from "./ui/taskModal";

const Main = () => {

  const [error, setError] = React.useState("");
  const [task, setTask] = React.useState([]);
  const [taskOpen, setTaskOpen] = React.useState(false)
  const [reportOpen, setReportOpen] = React.useState(false)
  
  const handleTask = (event) => {
    setTaskOpen(true)
  }
  
  const handleReport = (event) => {
    setReportOpen(true)
  }

  React.useEffect(() => {
    setError(""); // очистка ошибки при вторичной загрузке
    getTaskList()
      .then((result) => {
        setTask(result.data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const rows = task;
  const columns = [
    {
      field: "id",
      width: 80,
      headerName: "идентификатор",
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "authorId",
      width: 80,
      headerName: "Id автора",
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "taskExecutorId",
      headerName: "Id исполнителя ",
      editable: true,
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "taskDescription",
      width: 490,
      headerName: "Постановка задачи",
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "taskEndDate",
      headerName: "Дата выполнения",
      editable: true,
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "executorDescription",
      headerName: "Доклад исполнителя",
      editable: true,
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "statusId",
      headerName: "Статус",
      editable: true,
      width: 80,
      headerAlign: "center",
      align: "center",
    },
  ];
  return (
    <div className={"main"}>
      <Button onClick={handleTask} >
        Поставить задачу
      </Button>
      <Button onClick={handleReport} >
        Доложить о выполнении
      </Button>
      <h3 style={{ width: "100%", textAlign: "center" }}>Список задач</h3>
      <DataTable rows={rows} columns={columns} />
      <TaskDialog open={taskOpen} setTaskOpen={setTaskOpen} setReportOpen={setReportOpen} setTask={setTask} />
      <ReportDialog open={reportOpen} setTaskOpen={setTaskOpen} setReportOpen={setReportOpen} setTask={setTask} />
    </div>
  );
};

export default Main;
