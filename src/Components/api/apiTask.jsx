import { axiosClient } from '../../utils/axiosClient';

export const getTask = async function (rowsId) {
    if (rowsId) {
        return axiosClient.get(`/task-service/task ${rowsId && '?contractId=' + rowsId}`)
    } else {
        return axiosClient.get(`/task-service/task`)
    }
}

export const getTaskId = function (id) {
    return axiosClient.get(`/task-service/task/${id}`)
}

export const updateTaskId = async (task, id) => axiosClient.update(`/task-service/id/ ${task}, ${id}`)

export const postTask = async (task) => axiosClient.post(`/task-service/task`, task) 