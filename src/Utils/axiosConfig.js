import axios from "axios";

const protocol = window.location.protocol;

export const axiosInstance = axios.create({ 
    baseURL: protocol === "https:" 
        ? "https://server-connecttf-live.herokuapp.com/api/" 
        : "http://localhost:8800/api/"
});

const axiosInstanceReq = async (req, source, payload) => {
    const controller = new AbortController();
    const res = await axiosInstance({
        method: req,
        url: source,
        data: payload? payload : null,
        signal: controller.signal, 
    })
    .catch(err => {
        if(err.name === "AbortError") return;
        console.log(err);
    })
    return {controllerInstance: controller, responce: res};
};

const abortCleanUp = (controller) => {
    return controller.abort();
}

export const axiosReq = async (req, source, payload) => {
    const result = await axiosInstanceReq(req, source, payload);
    abortCleanUp(result.controllerInstance);
    return result.responce;
};