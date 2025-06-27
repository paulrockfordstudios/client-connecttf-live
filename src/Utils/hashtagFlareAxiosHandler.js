import { axiosReq } from "./axiosConfig";

// Posts hashtag document if no existing document in database
// or
// Updates hashtag document with count if existing document in database
export const hashtagFlareAxiosHandler = async (hashArr, flareId, flareType) => {
    const addedArr = hashArr.filter((ah) => ah.added === true);
    const notAddedArr = hashArr.filter((nah) => nah.added === false);
    for (let i = 0; i < notAddedArr.length; i++) {
        let naaObj = notAddedArr[i];
        if (naaObj.exists) {
            await axiosReq("PUT", `/${naaObj.value}/${flareId}/${flareType}/add`);
        } else {
            const naaObjLC = {...naaObj, value: naaObj.value.toLowerCase()};
            await axiosReq("POST", `/hashtags`, naaObjLC);
            naaObj = {...uah, exists: true, added: true};
        }
    }
    return notAddedArr.concat(addedArr);
};