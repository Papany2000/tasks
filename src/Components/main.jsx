import React from "react";
import Button from "@mui/material/Button";
import DataTable from "./ui/dataTable";
import { getTaskList } from "./api/apiTask";
import TaskForm from "./ui/forms/taskForm";
import ReportForm from "./ui/forms/reportForm";
import BasicModal from "./ui/modal";


const Main = () => {

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");
  const [task, setTask] = React.useState([]);
  const [swith, setSwith] = React.useState(false)
  const handleOpenTask = () => {
    setSwith(true)
    setOpen(true)
  }
  const handleOpenReport = () => {
    setSwith(false)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
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
      width: 60,
      headerName: "id",
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
      minWidth: 490,
      flex: 1,
      headerName: "Постановка задачи",
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "taskEndDate",
      headerName: "Дата выполнения",
      editable: true,
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "executorDescription",
      headerName: "Доклад исполнителя",
      editable: true,
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "statusId",
      headerName: "Статус",
      editable: true,
      width: 100,
      headerAlign: "center",
      align: "center",
    },
  ];
  return (
    <div className={"main"}>
      <p>
        <Button onClick={handleOpenTask}>Поставить задачу</Button>
      </p>
      <p>
        <Button onClick={handleOpenReport}>Доложить о выполнении</Button>
      </p>
      <h3 style={{ width: "100%", textAlign: "center" }}>Список задач</h3>
      <DataTable rows={rows} columns={columns} />
      <BasicModal
        open={open}
        handleClose={handleClose}
        children={swith ? <TaskForm setTask={setTask} handleClose={handleClose} /> : <ReportForm setTask={setTask} handleClose={handleClose} />}
      />
    </div>
  );
};

export default Main