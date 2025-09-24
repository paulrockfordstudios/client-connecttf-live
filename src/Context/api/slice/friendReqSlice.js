import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const friendReqsAdapter = createEntityAdapter({});

const initialState = friendReqsAdapter.getInitialState();

export const friendReqsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server friendReq route no. 5
        // @crud r2
        // @desc Get all friendReqs
        // @method Query/GET
        // @route /all
        // @access Private
        getFriendReqs: builder.query({
            query: () => '/friendReqs/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedFriendReqs = responseData.map(friendReq => {
                    friendReq.id = friendReq._id
                    return friendReq;
                });
                return friendReqsAdapter.setAll(initialState, loadedFriendReqs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'FriendReq', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'FriendReq', id }))
                    ]
                } else return [{ type: 'FriendReq', id: 'LIST' }];
            }
        }),

        // @Server friendReq route no. 1
        // @crud c1
        // @desc Create friendReq
        // @method Mutation/POST
        // @route /
        // @access Private
        createFriendReq: builder.mutation({
            query: initialFriendReqData => ({
                url: '/friendReqs',
                method: 'POST',
                body: {...initialFriendReqData,}
            }),
            invalidateTags: [
                {type: 'FriendReq', id: "LIST"}
            ]
        }),

        // @Server friendReq route no. 2
        // @crud u1
        // @desc Update friendReq
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateFriendReq: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `friendReqs/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'FriendReq', id: id}
            ]
        }),

        // @Server friendReq route no. 3
        // @crud d1
        // @desc Delete friendReq
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewFriendReq: builder.mutation({
            query: ({ id }) => ({
                url: `friendReqs/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'FriendReq', id: id}
            ]
        }),
    }),   
});

export const {
    useGetFriendReqsQuery,
    useCreateFriendReqMutation,
    useUpdateFriendReqMutation,
    friendReqDeleteFriendReqMutation,
} = friendReqsSlice;

// returns the query result object
export const selectFriendReqsResult = friendReqSlice.endpoints.getFriendReqs.select();

// creates memoized selector
const selectFriendReqsData = createSelector(
    selectFriendReqsResult,
    friendReqsResult => friendReqsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllFriendReqs,
    selectById: selectByFriendReqId,
    selectIds: selectFriendReqIds,
    // Pass in memoized selector that returns friendReqs slice state
} = friendReqsAdapter.getSelectors(state => selectFriendReqsData(state) ?? initialState);