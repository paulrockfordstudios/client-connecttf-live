import { axiosReq } from '../../Utils/axiosConfig';

// Function to check if corresponding user is actively viewing messenger or messenger chatbox
const activelyViewingMsgrCheck = async (user1, user2, onlineFlames, onlineUnions) => {
    try {
        const res = user2.unionName
            ? await axiosReq("GET", `/unions/${user2._id}/messaging`)
            : await axiosReq("GET", `/users/${user2._id}/messaging`)
        const friendChannels = res.data;
        if (user1.unionName) {
            if (onlineUnions.includes(user2._id)) {
                if ((friendChannels?.conversation1?.convo?.unionMembers?.includes(user1._id) && friendChannels?.conversation1?.openActive === true) ||
                (friendChannels?.conversation2?.convo?.unionMembers?.includes(user1._id) && friendChannels?.conversation2?.openActive === true) ||
                (friendChannels?.conversation3?.convo?.unionMembers?.includes(user1._id) && friendChannels?.conversation3?.openActive === true) ||
                friendChannels?.messenger?.convo?.unionMembers?.includes(user1._id)) { 
                    return true;
                }
                return false;
            }
            return false;
        } else {
            if (onlineFlames.includes(user2._id)) {
                if ((friendChannels?.conversation1?.convo?.flameMembers?.includes(user1._id) && friendChannels?.conversation1?.openActive === true) ||
                (friendChannels?.conversation2?.convo?.flameMembers?.includes(user1._id) && friendChannels?.conversation2?.openActive === true) ||
                (friendChannels?.conversation3?.convo?.flameMembers?.includes(user1._id) && friendChannels?.conversation3?.openActive === true) ||
                friendChannels?.messenger?.convo?.flameMembers?.includes(user1._id)) { 
                    return true;
                }
                return false;
            }
            return false;
        }
    } catch(err) {}
}

export default activelyViewingMsgrCheck;