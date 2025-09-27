import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server user route no. 5
        // @crud r2
        // @desc Get all users
        // @method Query/GET
        // @route /all
        // @access Private
        getUsers: builder.query({
            query: () => '/users/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }];
            }
        }),

        // @Server user route no. 1
        // @crud c1
        // @desc Create user
        // @method Mutation/POST
        // @route /
        // @access Private
        createUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {...initialUserData,}
            }),
            invalidateTags: [
                {type: 'User', id: "LIST"}
            ]
        }),

        // @Server user route no. 2
        // @crud u1
        // @desc Update user
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateUser: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @Server user route no. 3
        // @crud d1
        // @desc Delete user
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewUser: builder.mutation({
            query: ({ id }) => ({
                url: `users/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),
    }),   
});

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    userDeleteUserMutation,
} = usersSlice;

// returns the query result object
export const selectUsersResult = userSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllUsers,
    selectById: selectByUserId,
    selectIds: selectUserIds,
    // Pass in memoized selector that returns users slice state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);