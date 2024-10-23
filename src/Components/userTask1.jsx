import React from "react";
import { getTask, getTaskList, updateTaskId } from "./api/apiTask";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FullFeaturedCrudGrid from "./ui/dataGrid";

const UserTask = () => {

  const [error, setError] = React.useState("");
  const [task, setTask] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

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

  const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = id => async () => {
    const res = window.confirm("Вы уверены");
    if (!res) {
      return false;
    }
    await updateTaskId(id);
    setTask((await getTaskList()).data);
  };

  const handleCancelClick = id => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find(row => row.id === id);
    if (editedRow.isNew) {
      setTask(rows.filter(row => row.id !== id));
    }
  };

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
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            disabled={true}
          />,
        ];
      },
    },
  ];
  return (
    <div className={"main"}>
      <h2>Ваши задачи и ход их выполнения</h2>
      <FullFeaturedCrudGrid rows={rows}
        columns={columns}
        setFunction={setTask}
        setRowModesModel={setRowModesModel}
        rowModesModel={rowModesModel}
      />
    </div>
  );
};

export default UserTask;
