import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const userNotsAdapter = createEntityAdapter({});

const initialState = userNotsAdapter.getInitialState();

export const userNotsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server userNot route no. 5
        // @crud r2
        // @desc Get all userNots
        // @method Query/GET
        // @route /all
        // @access Private
        getUserNots: builder.query({
            query: () => '/userNots/all',
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

        // @Server userNot route no. 1
        // @crud c1
        // @desc Create userNot
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

        // @Server userNot route no. 2
        // @crud u1
        // @desc Update userNot
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateUserNot: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `userNots/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'UserNot', id: id}
            ]
        }),

        // @Server userNot route no. 3
        // @crud d1
        // @desc Delete userNot
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewUserNot: builder.mutation({
            query: ({ id }) => ({
                url: `userNots/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'UserNot', id: id}
            ]
        }),
    }),   
});

export const {
    useGetUserNotsQuery,
    useCreateUserNotMutation,
    useUpdateUserNotMutation,
    userNotDeleteUserNotMutation,
} = userNotsSlice;

// returns the query result object
export const selectUserNotsResult = userNotSlice.endpoints.getUserNots.select();

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