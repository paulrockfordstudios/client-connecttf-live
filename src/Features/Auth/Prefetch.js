import react, { useEffect } from 'react';
import { store } from "../../App/store";
import { Outlet } from 'react-router-dom';
import { usersSlice } from '../../Context/api/slice/userSlice';


function Prefetch() {

    useEffect(() => {
        console.log('subscribing');
        const users = store.dispatch(usersSlice.endpoints.getUsers.initiate());

        return () => {
            console.log('unsubscribing');
            users.unsubscribe();
        }
    }, []);

    return <Outlet />;
};

export default Prefetch;