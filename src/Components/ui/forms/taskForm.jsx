import { Button, TextField } from "@mui/material";
import { Controller, useForm, useFormState } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import React from "react";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { postTask, getTask } from "../../api/apiTask";
import { UserContext } from "../../context/authContext";
import DatePicker from "react-multi-date-picker";
import { Language } from "@mui/icons-material";

function TaskForm({ setTask }) {
  const currentUser = React.useContext(UserContext);
  const { handleSubmit, control } = useForm();
  const { errors } = useFormState({
    control,
  });
  const onSubmit = async (data) => {
    const authorId = currentUser.id;
    const result = { ...data, authorId };
    try {
      await postTask(result);
      Swal.fire({
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        width: 200,
        position: "top-start",
        title: "info!",
        text: "Успешно",
        timer: 1500,
      });
      setTask((await getTask()).data.data);
    } catch (e) {
      Swal.fire({
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        width: 200,
        position: "top-end",
        title: "Error!",
        text: "Do you want to continue",
        timer: 1500,
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Box mr={3} style={{ width: "50%", borderright: "25%" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ borderright: "25%" }}>
          <Controller
            control={control}
            name="taskExecutorId"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                style={{ marginTop: "10%" }}
                autoFocus
                margin="dense"
                name="taskExecutorId"
                label="идентификатор исполнителя"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ""}
                error={!!errors.taskExecutorId?.message}
                helperText={errors.taskExecutorId?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="taskDescription"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <TextField
                autoFocus
                margin="dense"
                name="taskDescription"
                label="Описание задачи"
                type="text"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value || ""}
                error={!!errors.taskDescription?.message}
                helperText={errors.taskDescription?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="taskEndDate"
            rules={{ required: true }} //optional
            render={({
              field: { onChange, name, value },
              fieldState: { invalid, isDirty }, //optional
              formState: { errors }, //optional, but necessary if you want to show an error message
            }) => (
              <>
                <label>дата выполнения</label>
                <DatePicker
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    height: "56px"
                  }}
                  value={value || "2024/07/11"}
                  onChange={(taskEndDate) => {
                    onChange(taskEndDate?.isValid ? taskEndDate : "");
                  }}
                  format={Language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                />
                {errors && errors[name] && errors[name].type === "required" && (
                  //if you want to show an error message
                  <span>your error message !</span>
                )}
              </>
            )}
          />
          <Controller
            style={{ marginTop: "10%" }}
            control={control}
            name="statusId"
            rules={{ required: "обязательно к заполнению" }}
            render={({ field }) => (
              <div>
                <InputLabel style={{ paddingLeft: "1rem", fontSize: "0.9rem" }}>
                  Id статус
                </InputLabel>
                <Select
                  autoFocus
                  marginBotton="dense"
                  name="statusId"
                  label="statusId"
                  type="select"
                  fullWidth={true}
                  onChange={(e) => field.onChange(e)}
                  value={field.value || ""}
                >
                  <MenuItem value={1}>создано</MenuItem>
                  <MenuItem value={2}>выполняется</MenuItem>
                  <MenuItem value={3}>остановлено</MenuItem>
                  <MenuItem value={4}>завершено</MenuItem>
                  <MenuItem value={5}>отложено</MenuItem>
                  <MenuItem value={6}>закрыто</MenuItem>
                </Select>
              </div>
            )}
          />
          <Button type="submit" fullWidth={true} variant="contained">
            поставить задачу
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default TaskForm;
