import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const tfReqsAdapter = createEntityAdapter({});

const initialState = tfReqsAdapter.getInitialState();

export const tfReqsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server tfReq route no. 6
        // @crud r1
        // @desc Get flame user tf request
        // @method GET
        // @route /flame/:userId/tf
        // @access private
        getTFRequestee: builder.query({
            query: ({ userId }) => `/tfRequests/flame/${userId}/tf`,
        }),

        // @query 2
        // @server tfReq route no. 7
        // @crud r2
        // @desc Get flame user tf request accepted
        // @method GET
        // @route /flame/:userId/accepted
        // @access private
        getAcceptedTFRequest: builder.query({
            query: ({ userId }) => `/tfRequests/flame/${userId}/accepted`,
        }),

        // @query 3
        // @server tfReq route no. 8
        // @crud r3
        // @desc Get flame to flame tf request (two ids required)
        // @method GET
        // @route /find/flame-flame/:firstUserId/:secondUserId
        // @access private
        getF2FTFRequest: builder.query({
            query: ({ firstUserId, secondUserId }) => `/tfRequests/find/flame-flame/${firstUserId}/${secondUserId}`,
        }),

        // Mutations

        // @mutation 1
        // @Server tfReq route no. 1
        // @crud c1
        // @desc Create tf request
        // @method Mutation/POST
        // @route /
        // @access Private
        createTfRequest: builder.mutation({
            query: initialTfReqData => ({
                url: '/tfReqests',
                method: 'POST',
                body: {...initialTfReqData,}
            }),
            invalidateTags: [
                {type: 'TfReq', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server tfReq route no. 2
        // @crud u1
        // @desc Update initial seen tf request
        // @method PATCH
        // @route /:id/initialSeen
        // @access private
        tfReqSeen: builder.mutation({
            query: ({ id }) => ({
                url: `tfRequests/${id}/initialSeen`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'TfReq', id: id}
            ]
        }),

        // @mutation 3
        // @Server tfReq route no. 3
        // @crud u2
        // @desc Update accepted seen tf request
        // @method PATCH
        // @route /:id/acceptedSeen
        // @access private
        tfReqAcceptedSeen: builder.mutation({
            query: ({ id }) => ({
                url: `tfRequests/${id}/acceptedSeen`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'TfReq', id: id}
            ]
        }),

        // @mutation 4
        // @Server tfReq route no. 4
        // @crud u3
        // @desc Update request accepted tf request
        // @method PATCH
        // @route /:id/requestAccepted
        // @access private
        tfReqAccepted: builder.mutation({
            query: ({ id }) => ({
                url: `tfRequests/${id}/requestAccepted`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'TfReq', id: id}
            ]
        }),

        // @mutation 5
        // @Server tfReq route no. 5
        // @crud u4
        // @desc Update request rejected tf request
        // @method PATCH
        // @route /:id/requestRejected
        // @access private
        tfReqRejected: builder.mutation({
            query: ({ id }) => ({
                url: `tfRequests/${id}/requestRejected`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'TfReq', id: id}
            ]
        }),

    }),   
});

export const {

    // Queries

    useGetFlameRequesteeQuery,
    useGerAcceptedTFRequestQuery,
    useGetF2FTTRequestQuery,

    // Mutations

    useCreateTfRequestMutation,
    useTfReqSeenMutation,
    useTfReqAcceptedSeenMutation,
    useTfReqAcceptedMutation,
    useTfReqRejectedMutation,
    
} = tfReqsSlice;

// returns the query result object
export const selectTfReqsResult = tfReqsSlice.endpoints.getTfReqs.select();

// creates memoized selector
const selectTfReqsData = createSelector(
    selectTfReqsResult,
    tfReqsResult => tfReqsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllTfReqs,
    selectById: selectByTfReqId,
    selectIds: selectTfReqIds,
    // Pass in memoized selector that returns tfReqs slice state
} = tfReqsAdapter.getSelectors(state => selectTfReqsData(state) ?? initialState);