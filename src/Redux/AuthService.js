//import axios from "axios";
import { axiosReq } from "../Utils/axiosConfig";


// Register user
const register = async (userData) => {
    try {
        const res = await axiosReq("POST", "/auth/registration", userData);
        if(res.data) {
            localStorage.setItem("user", JSON.stringify(res.data))
        }
        return res.data;
    } catch(err) {console.log(err)}
};

// login user
const login = async (userData) => {
    try {
        const res = await axiosReq("POST", "/auth/login", userData);
        let res2 = {};
        if (res.data) {
            console.log(res.data)
            if (res.data.user.blacklist === false && res.data.user.suspended === false) {
                localStorage.setItem("flame", JSON.stringify(res.data.user));
                localStorage.setItem("user", JSON.stringify(res.data.user));
                if (res.data.user.unionAccount) {
                    res2 = await axiosReq("GET", `/unions?unionId=${res.data.user.unionId}`);
                    if (res2.data) {
                        localStorage.setItem("union", JSON.stringify(res2.data));
                    }
                }
            }

        }
        return { flame: res.data.user, union: res2.data };
    } catch(err) {console.log(err)}
};

// Logout user
const logout = () => {
    localStorage.removeItem("flame");
    localStorage.removeItem("union");
    localStorage.removeItem("user");
};


const authService = {
    register,
    login,
    logout,
}

export default authService;