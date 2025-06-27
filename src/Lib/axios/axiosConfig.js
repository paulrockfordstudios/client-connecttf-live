import axios from "axios";

const protocol = window.location.protocol;

const createAxiosInstance = (props) => {
    return axios.create({
        baseURL: props.type === "local"
            ? ""
            : protocol === "https:" 
                ? "https://server-connecttf-live.herokuapp.com/api/" 
                : "http://localhost:8800/api/"
    });
};

const axiosInstanceReq = async (props) => {
    const axiosInstance = createAxiosInstance(props);
    const controller = new AbortController();
    const updatedProps = {...props, signal: controller.signal};
    const res = await axiosInstance(updatedProps)
    .catch(err => {
        if(err.name === "AbortError") return;
        console.log(err);
    })
    return {controllerInstance: controller, responce: res};
};

const abortCleanUp = (controller) => {
    return controller.abort();
};

export const axiosReq = async (props) => {
    const result = await axiosInstanceReq(props, {
        validateStatus: function(status) {
            return status === 0 || (status >= 200 && status < 300);
        }
    });
    abortCleanUp(result.controllerInstance);
    return result.responce;
};