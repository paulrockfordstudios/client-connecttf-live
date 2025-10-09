import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const userNotsAdapter = createEntityAdapter({});

const initialState = userNotsAdapter.getInitialState();

export const userNotsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @Server userNot route no. 2
        // @crud r2
        // @desc Get all user Notifications
        // @method Query/GET
        // @route /:currentUserId
        // @access Private
        getUserNots: builder.query({
            query: ( currentUserId ) => `/userNots/${currentUserId}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUserNots = responseData.map(userNot => {
                    userNot.id = userNot._id
                    return userNot;
                });
                return userNotsAdapter.setAll(initialState, loadedUserNots)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'UserNot', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'UserNot', id }))
                    ]
                } else return [{ type: 'UserNot', id: 'LIST' }];
            }
        }),

        // @query 2
        // @server user route no. 3
        // @crud r2
        // @desc Query whether there is a unseen user notification
        // @method GET
        // @route /:curentUserType/:currentUserId/:union/:seen
        // @access private
        checkUserNotUnseenExists: builder.query({
            query: ({ currentUserType, currentUserId, union, seen }) => ({
                url: `/${currentUserType}/${currentUserId}/${union}/${seen}`,
            }),
        }),

        // Mutations

        // @mutation 1
        // @Server userNot route no. 1
        // @crud c1
        // @desc Create user notification
        // @method Mutation/POST
        // @route /
        // @access Private
        createUserNot: builder.mutation({
            query: initialUserNotData => ({
                url: '/userNots',
                method: 'POST',
                body: {...initialUserNotData,}
            }),
            invalidateTags: [
                {type: 'UserNot', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server userNot route no. 2
        // @crud u1
        // @desc Update user notification seen
        // @method Mutation/PATCH
        // @route /:id/seen
        // @access Private
        updateUserNotSeen: builder.mutation({
            query: ({ id }) => ({
                url: `userNots/${id}/seen`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'UserNot', id: id}
            ]
        }),

        // @Server userNot route no. 2
        // @crud u1
        // @desc Update user notification seen
        // @method Mutation/PATCH
        // @route /:id/add_user
        // @access Private
        updateUserNotAddUser: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `userNots/${id}/Add_user`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'UserNot', id: id}
            ]
        }),
    }),   
});

export const {

    // Queries

    useGetUserNotsQuery,
    useCheckUserNotUnseenExists,

    // Mutations

    useCreateUserNotMutation,
    useUpdateUserNotSeenMutation,
    useUpdateUserNotAddUserMutation,

} = userNotsSlice;

// returns the query result object
export const selectUserNotsResult = userNotsSlice.endpoints.getUserNots.select();

// creates memoized selector
const selectUserNotsData = createSelector(
    selectUserNotsResult,
    userNotsResult => userNotsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllUserNots,
    selectById: selectByUserNotId,
    selectIds: selectUserNotIds,
    // Pass in memoized selector that returns userNots slice state
} = userNotsAdapter.getSelectors(state => selectUserNotsData(state) ?? initialState);