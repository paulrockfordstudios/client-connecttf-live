import { apiSlice } from "../apiSlice";
import { logout } from "../../redux/slice/authSlice";


export const authSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Mutations

        // @Server auth route no. 2
        // @crud c2
        // @desc LOGIN
        // @method Mutation/POST
        // @route /auth/login
        // @access public
        logIn: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials },
            }),
        }),

        // @Server auth route no. 3
        // @crud r1
        // @desc Refresh
        // @method Mutation/GET
        // @route /auth/refresh
        // @access public - *because access token expired*
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
        }),

        // @Server auth route no. 4
        // @crud c3
        // @desc Log Out
        // @method Mutation/POST
        // @route /auth/logout
        // @access public
        logOut: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled}) {
                try {
                    //const { data } =
                    await queryFulfilled;
                    //console.log(data);
                    dispatch(logout());
                    dispatch(apiSlice.util.resetApiState());
                } catch (err) {
                    console.group(err);
                }
            },
        }),

    })
});

export const {

    // Mutations

    useLogInMutation,
    useRefreshMutation,
    useLogOutMutation,
    
} = authSlice;