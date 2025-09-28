import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const groupReqsAdapter = createEntityAdapter({});

const initialState = groupReqsAdapter.getInitialState();

export const groupReqsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server groupReq route no. 6
        // @crud r1
        // @desc Get flame user group request
        // @method GET
        // @route /flame/:userId/begroup
        // @access private
        getFlameRequestee: builder.query({
            query: ({ userId }) => `/groupReqs/flame/${userId}/begroup`,
        }),

        // @query 2
        // @server groupReq route no. 7
        // @crud r2
        // @desc Get union user group request
        // @method GET
        // @route /union/:unionId/begroup
        // @access private
        getUnionRequestee: builder.query({
            query: ({ unionId }) => `/groupReqs/union/${unionId}/begroup`,
        }),

        // @query 3
        // @server groupReq route no. 8
        // @crud r3
        // @desc Get flame user group request accepted
        // @method GET
        // @route /flame/:userId/accepted
        // @access private
        flameFRAccepted: builder.query({
            query: ({ userId }) => `/groupReqs/flame/${userId}/accepted`,
        }),

        // @query 4
        // @server groupReq route no. 9
        // @crud r4
        // @desc Get union user group request accepted
        // @method GET
        // @route /union/:unionId/accepted
        // @access private
        unionFRAccepted: builder.query({
            query: ({ unionId }) => `/groupReqs/union/${unionId}/accepted`,
        }),

        // @query 5
        // @server groupReq route no. 10
        // @crud r5
        // @desc Get flame to flame group request (two ids required)
        // @method GET
        // @route /find/flame-flame/:firstUserId/:secondUserId
        // @access private
        f2fGroupReq: builder.query({
            query: ({ firstUserId, secondUserId }) => `/groupReqs/find/flame-flame/${firstUserId}/${secondUserId}`,
        }),

        // @query 6
        // @server groupReq route no. 11
        // @crud r6
        // @desc Get flame to union group request (two ids required)
        // @method GET
        // @route /find/flame-union/:userId/:unionId
        // @access private
        f2uGroupReq: builder.query({
            query: ({ userId, unionId }) => `/groupReqs/find/flame-union/${userId}/${unionId}`,
        }),

        // @query 7
        // @server groupReq route no. 12
        // @crud r7
        // @desc Get union to union group request (two ids required)
        // @method GET
        // @route /find/union-union/:firstUnionId/:secondUnionId
        // @access private
        u2uGroupReq: builder.query({
            query: ({ firstUnionId, secondUnionId }) => `/groupReqs/find/union-union/${firstUnionId}/${secondUnionId}`,
        }),

        // Mutations

        // @mutation 1
        // @Server groupReq route no. 1
        // @crud c1
        // @desc Create group request
        // @method Mutation/POST
        // @route /
        // @access Private
        createGroupRequest: builder.mutation({
            query: initialGroupReqData => ({
                url: '/groupReqs',
                method: 'POST',
                body: {...initialGroupReqData,}
            }),
            invalidateTags: [
                {type: 'GroupReq', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server groupReq route no. 2
        // @crud u1
        // @desc Update initial seen group request
        // @method PATCH
        // @route /:id/initialSeen
        // @access private
        groupReqSeen: builder.mutation({
            query: ({ id }) => ({
                url: `groupReqs/${id}/initialSeen`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'GroupReq', id: id}
            ]
        }),

        // @mutation 3
        // @Server groupReq route no. 3
        // @crud u2
        // @desc Update accepted seen group request
        // @method PATCH
        // @route /:id/acceptedSeen
        // @access private
        groupReqAcceptedSeen: builder.mutation({
            query: ({ id }) => ({
                url: `groupReqs/${id}/acceptedSeen`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'GroupReq', id: id}
            ]
        }),

        // @mutation 4
        // @Server groupReq route no. 4
        // @crud u3
        // @desc Update request accepted group request
        // @method PATCH
        // @route /:id/requestAccepted
        // @access private
        groupReqAccepted: builder.mutation({
            query: ({ id }) => ({
                url: `groupReqs/${id}/requestAccepted`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'GroupReq', id: id}
            ]
        }),

        // @mutation 5
        // @Server groupReq route no. 5
        // @crud u4
        // @desc Update request rejected group request
        // @method PATCH
        // @route /:id/requestRejected
        // @access private
        groupReqRejected: builder.mutation({
            query: ({ id }) => ({
                url: `groupReqs/${id}/requestRejected`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'GroupReq', id: id}
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
    useF2fGroupReqQuery,
    useF2uGroupReqQuery,
    useU2uGroupReqQuery,

    // Mutations

    useCreateGroupRequestMutation,
    useGroupReqSeenMutation,
    useGroupReqAcceptedSeenMutation,
    useGroupReqAcceptedMutation,
    useGroupReqRejectedMutation,
    
} = groupReqsSlice;

// returns the query result object
export const selectGroupReqsResult = groupReqsSlice.endpoints.getGroupReqs.select();

// creates memoized selector
const selectGroupReqsData = createSelector(
    selectGroupReqsResult,
    groupReqsResult => groupReqsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllGroupReqs,
    selectById: selectByGroupReqId,
    selectIds: selectGroupReqIds,
    // Pass in memoized selector that returns groupReqs slice state
} = groupReqsAdapter.getSelectors(state => selectGroupReqsData(state) ?? initialState);