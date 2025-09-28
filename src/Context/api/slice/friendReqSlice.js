import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const friendReqsAdapter = createEntityAdapter({});

const initialState = friendReqsAdapter.getInitialState();

export const friendReqsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server friendReq route no. 6
        // @crud r1
        // @desc Get flame user friend request
        // @method GET
        // @route /flame/:userId/befriend
        // @access private
        getFlameRequestee: builder.query({
            query: ({ userId }) => `/friendReqs/flame/${userId}/befriend`,
        }),

        // @query 2
        // @server friendReq route no. 7
        // @crud r2
        // @desc Get union user friend request
        // @method GET
        // @route /union/:unionId/befriend
        // @access private
        getUnionRequestee: builder.query({
            query: ({ unionId }) => `/friendReqs/union/${unionId}/befriend`,
        }),

        // @query 3
        // @server friendReq route no. 8
        // @crud r3
        // @desc Get flame user friend request accepted
        // @method GET
        // @route /flame/:userId/accepted
        // @access private
        flameFRAccepted: builder.query({
            query: ({ userId }) => `/friendReqs/flame/${userId}/accepted`,
        }),

        // @query 4
        // @server friendReq route no. 9
        // @crud r4
        // @desc Get union user friend request accepted
        // @method GET
        // @route /union/:unionId/accepted
        // @access private
        unionFRAccepted: builder.query({
            query: ({ unionId }) => `/friendReqs/union/${unionId}/accepted`,
        }),

        // @query 5
        // @server friendReq route no. 10
        // @crud r5
        // @desc Get flame to flame friend request (two ids required)
        // @method GET
        // @route /find/flame-flame/:firstUserId/:secondUserId
        // @access private
        f2fFriendReq: builder.query({
            query: ({ firstUserId, secondUserId }) => `/friendReqs/find/flame-flame/${firstUserId}/${secondUserId}`,
        }),

        // @query 6
        // @server friendReq route no. 11
        // @crud r6
        // @desc Get flame to union friend request (two ids required)
        // @method GET
        // @route /find/flame-union/:userId/:unionId
        // @access private
        f2uFriendReq: builder.query({
            query: ({ userId, unionId }) => `/friendReqs/find/flame-union/${userId}/${unionId}`,
        }),

        // @query 7
        // @server friendReq route no. 12
        // @crud r7
        // @desc Get union to union friend request (two ids required)
        // @method GET
        // @route /find/union-union/:firstUnionId/:secondUnionId
        // @access private
        u2uFriendReq: builder.query({
            query: ({ firstUnionId, secondUnionId }) => `/friendReqs/find/union-union/${firstUnionId}/${secondUnionId}`,
        }),

        // Mutations

        // @mutation 1
        // @Server friendReq route no. 1
        // @crud c1
        // @desc Create friend request
        // @method Mutation/POST
        // @route /
        // @access Private
        createFriendRequest: builder.mutation({
            query: initialFriendReqData => ({
                url: '/friendReqs',
                method: 'POST',
                body: {...initialFriendReqData,}
            }),
            invalidateTags: [
                {type: 'FriendReq', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server friendReq route no. 2
        // @crud u1
        // @desc Update initial seen friend request
        // @method PATCH
        // @route /:id/initialSeen
        // @access private
        friendReqSeen: builder.mutation({
            query: ({ id }) => ({
                url: `friendReqs/${id}/initialSeen`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'FriendReq', id: id}
            ]
        }),

        // @mutation 3
        // @Server friendReq route no. 3
        // @crud u2
        // @desc Update accepted seen friend request
        // @method PATCH
        // @route /:id/acceptedSeen
        // @access private
        friendReqAcceptedSeen: builder.mutation({
            query: ({ id }) => ({
                url: `friendReqs/${id}/acceptedSeen`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'FriendReq', id: id}
            ]
        }),

        // @mutation 4
        // @Server friendReq route no. 4
        // @crud u3
        // @desc Update request accepted friend request
        // @method PATCH
        // @route /:id/requestAccepted
        // @access private
        friendReqAccepted: builder.mutation({
            query: ({ id }) => ({
                url: `friendReqs/${id}/requestAccepted`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'FriendReq', id: id}
            ]
        }),

        // @mutation 5
        // @Server friendReq route no. 5
        // @crud u4
        // @desc Update request rejected friend request
        // @method PATCH
        // @route /:id/requestRejected
        // @access private
        friendReqRejected: builder.mutation({
            query: ({ id }) => ({
                url: `friendReqs/${id}/requestRejected`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'FriendReq', id: id}
            ]
        }),

    }),   
});

export const {

    // Queries

    useGetFlameRequesteeQuery,
    useGetUnionRequesteeQuery,
    useFlameFRAcceptedQuery,
    useUnionFRAcceptedQuery,
    useF2fFriendReqQuery,
    useF2uFriendReqQuery,
    useU2uFriendReqQuery,

    // Mutations

    useCreateFriendRequestMutation,
    useFriendReqSeenMutation,
    useFriendReqAcceptedSeenMutation,
    useFriendReqAcceptedMutation,
    useFriendReqRejectedMutation,
    
} = friendReqsSlice;

// returns the query result object
export const selectFriendReqsResult = friendReqsSlice.endpoints.getFriendReqs.select();

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