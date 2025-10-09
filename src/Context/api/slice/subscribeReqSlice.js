import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const subscribeReqsAdapter = createEntityAdapter({});

const initialState = subscribeReqsAdapter.getInitialState();

export const subscribeReqsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server subscribeReq route no. 6
        // @crud r1
        // @desc Get flame user subscribe request
        // @method GET
        // @route /flame/:userId/subscribe
        // @access private
        getFlameSubscribeRequestee: builder.query({
            query: ({ userId }) => `/subscribeReqs/flame/${userId}/subscribe`,
        }),

        // @query 2
        // @server subscribeReq route no. 7
        // @crud r2
        // @desc Get union user subscribe request
        // @method GET
        // @route /union/:unionId/subscribe
        // @access private
        getUnionSubscribeRequestee: builder.query({
            query: ({ unionId }) => `/subscribeReqs/union/${unionId}/subscribe`,
        }),

        // @query 3
        // @server subscribeReq route no. 8
        // @crud r3
        // @desc Get flame user subscribe request accepted
        // @method GET
        // @route /flame/:userId/accepted
        // @access private
        flameSRAccepted: builder.query({
            query: ({ userId }) => `/subscribeReqs/flame/${userId}/accepted`,
        }),

        // @query 4
        // @server subscribeReq route no. 9
        // @crud r4
        // @desc Get union user subscribe request accepted
        // @method GET
        // @route /union/:unionId/accepted
        // @access private
        unionSRAccepted: builder.query({
            query: ({ unionId }) => `/subscribeReqs/union/${unionId}/accepted`,
        }),

        // @query 5
        // @server subscribeReq route no. 10
        // @crud r5
        // @desc Get flame to flame subscribe request (two ids required)
        // @method GET
        // @route /find/flame-flame/:firstUserId/:secondUserId
        // @access private
        f2fSubscribeReq: builder.query({
            query: ({ firstUserId, secondUserId }) => `/subscribeReqs/find/flame-flame/${firstUserId}/${secondUserId}`,
        }),

        // @query 6
        // @server subscribeReq route no. 11
        // @crud r6
        // @desc Get flame to union subscribe request (two ids required)
        // @method GET
        // @route /find/flame-union/:userId/:unionId
        // @access private
        f2uSubscribeReq: builder.query({
            query: ({ userId, unionId }) => `/subscribeReqs/find/flame-union/${userId}/${unionId}`,
        }),

        // @query 7
        // @server subscribeReq route no. 12
        // @crud r7
        // @desc Get union to union subscribe request (two ids required)
        // @method GET
        // @route /find/union-union/:firstUnionId/:secondUnionId
        // @access private
        u2uSubscribeReq: builder.query({
            query: ({ firstUnionId, secondUnionId }) => `/subscribeReqs/find/union-union/${firstUnionId}/${secondUnionId}`,
        }),

        // Mutations

        // @mutation 1
        // @Server subscribeReq route no. 1
        // @crud c1
        // @desc Create subscribe request
        // @method Mutation/POST
        // @route /
        // @access Private
        createSubscribeRequest: builder.mutation({
            query: initialSubscribeReqData => ({
                url: '/subscribeReqs',
                method: 'POST',
                body: {...initialSubscribeReqData,}
            }),
            invalidateTags: [
                {type: 'SubscribeReq', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server subscribeReq route no. 2
        // @crud u1
        // @desc Update initial seen subscribe request
        // @method PATCH
        // @route /:id/initialSeen
        // @access private
        subscribeReqSeen: builder.mutation({
            query: ({ id }) => ({
                url: `subscribeReqs/${id}/initialSeen`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'SubscribeReq', id: id}
            ]
        }),

        // @mutation 3
        // @Server subscribeReq route no. 3
        // @crud u2
        // @desc Update accepted seen subscribe request
        // @method PATCH
        // @route /:id/acceptedSeen
        // @access private
        subscribeReqAcceptedSeen: builder.mutation({
            query: ({ id }) => ({
                url: `subscribeReqs/${id}/acceptedSeen`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'SubscribeReq', id: id}
            ]
        }),

        // @mutation 4
        // @Server subscribeReq route no. 4
        // @crud u3
        // @desc Update request accepted subscribe request
        // @method PATCH
        // @route /:id/requestAccepted
        // @access private
        subscribeReqAccepted: builder.mutation({
            query: ({ id }) => ({
                url: `subscribeReqs/${id}/requestAccepted`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'SubscribeReq', id: id}
            ]
        }),

        // @mutation 5
        // @Server subscribeReq route no. 5
        // @crud u4
        // @desc Update request rejected subscribe request
        // @method PATCH
        // @route /:id/requestRejected
        // @access private
        subscribeReqRejected: builder.mutation({
            query: ({ id }) => ({
                url: `subscribeReqs/${id}/requestRejected`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'SubscribeReq', id: id}
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
    useF2fSubscribeReqQuery,
    useF2uSubscribeReqQuery,
    useU2uSubscribeReqQuery,

    // Mutations

    useCreateSubscribeRequestMutation,
    useSubscribeReqSeenMutation,
    useSubscribeReqAcceptedSeenMutation,
    useSubscribeReqAcceptedMutation,
    useSubscribeReqRejectedMutation,
    
} = subscribeReqsSlice;

// returns the query result object
export const selectSubscribeReqsResult = subscribeReqsSlice.endpoints.getSubscribeReqs.select();

// creates memoized selector
const selectSubscribeReqsData = createSelector(
    selectSubscribeReqsResult,
    subscribeReqsResult => subscribeReqsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllSubscribeReqs,
    selectById: selectBySubscribeReqId,
    selectIds: selectSubscribeReqIds,
    // Pass in memoized selector that returns subscribeReqs slice state
} = subscribeReqsAdapter.getSelectors(state => selectSubscribeReqsData(state) ?? initialState);