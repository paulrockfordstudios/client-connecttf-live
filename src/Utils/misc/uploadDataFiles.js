import { axiosReq } from '../../Utils/axiosConfig';

// function to upload data files to database
const uploadDataFiles = async (dataFiles) => {
    if (dataFiles.length > 0) {
        try {
            await Promise.all(
                dataFiles.map((df) => axiosReq("POST", "/upload", df))
            )
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    return false;
};

export default uploadDataFiles;