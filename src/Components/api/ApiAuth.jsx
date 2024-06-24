import {axiosClient} from '../../utils/axiosClient';

export const login = function (loginParams) {
    return axiosClient.post(`/auth/login`, loginParams)
}