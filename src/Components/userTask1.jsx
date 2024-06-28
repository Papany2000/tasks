import React from "react";
import Button from "@mui/material/Button";
import BasicModal from "./ui/modal";
import TaskForm from "./ui/forms/taskForm";
import DataTable from "./ui/dataTable";
import { getTask } from "./api/apiTask";

const UserTask = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = React.useState("");
  const [task, setTask] = React.useState([]);

  React.useEffect(() => {
    setError(""); // очистка ошибки при вторичной загрузке
    getTask()
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
      <p>
        <Button onClick={handleOpen}>Поставить задачу</Button>
      </p>
      <h3 style={{ width: "100%", textAlign: "center" }}>Список задач</h3>
      <DataTable rows={rows} columns={columns} />
      <BasicModal
        open={open}
        handleClose={handleClose}
        children={<TaskForm setTask={setTask} handleClose={handleClose} />}
      />
    </div>
  );
};

export default UserTask;
