import { axiosClient } from '../../utils/axiosClient';

export const postUser = async (user) => {
    return axiosClient.post(`/users`, user)
}

export const getUsers = async function (page, limit) {
    //throw new Error('это моя ошибка')
    if (page) {
        return axiosClient.get(`/users/list${page && '?page=' + page}${limit && '&limit=' + (limit || 10)}`)
    } else {
        return axiosClient.get(`/users/list`)
    }
}

export const getUsersId = function (id) {
    return axiosClient.get(`/users/${id}`)
}

export const removeUserId = async (id) => axiosClient.delete(`/users/${id}`)


