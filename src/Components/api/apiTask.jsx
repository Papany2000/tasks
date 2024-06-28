import { axiosClient } from "../../utils/axiosClient";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";



export const getTask = async function (rowsId) {
  if (rowsId) {
    return axiosClient.get(
      `/task-service/task ${rowsId && "?contractId=" + rowsId}`
    );
  } else {
    return axiosClient.get(`/task-service/task`);
  }
};

export const getTaskId = function (id) {
  return axiosClient.get(`/task-service/task/${id}`);
};

export const updateTaskId = async (task, id) =>
  axiosClient.patch(`/task-service/task/${id}`, task);

export const postTask = async (task) =>
  axiosClient.post(`/task-service/task`, task);

export const getTaskList = async function () {
  const token = Cookies.get(); 
  const myDecodedToken = decodeToken(token.auth_token);
  return axiosClient.get(`/task-service/task?filters[authorId]=${myDecodedToken.id}`);
};
