import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const subscribeReqsAdapter = createEntityAdapter({});

const initialState = subscribeReqsAdapter.getInitialState();

export const subscribeReqsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server subscribeReq route no. 5
        // @crud r2
        // @desc Get all subscribeReqs
        // @method Query/GET
        // @route /all
        // @access Private
        getSubscribeReqs: builder.query({
            query: () => '/subscribeReqs/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedSubscribeReqs = responseData.map(subscribeReq => {
                    subscribeReq.id = subscribeReq._id
                    return subscribeReq;
                });
                return subscribeReqsAdapter.setAll(initialState, loadedSubscribeReqs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'SubscribeReq', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'SubscribeReq', id }))
                    ]
                } else return [{ type: 'SubscribeReq', id: 'LIST' }];
            }
        }),

        // @Server subscribeReq route no. 1
        // @crud c1
        // @desc Create subscribeReq
        // @method Mutation/POST
        // @route /
        // @access Private
        createSubscribeReq: builder.mutation({
            query: initialSubscribeReqData => ({
                url: '/subscribeReqs',
                method: 'POST',
                body: {...initialSubscribeReqData,}
            }),
            invalidateTags: [
                {type: 'SubscribeReq', id: "LIST"}
            ]
        }),

        // @Server subscribeReq route no. 2
        // @crud u1
        // @desc Update subscribeReq
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateSubscribeReq: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `subscribeReqs/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'SubscribeReq', id: id}
            ]
        }),

        // @Server subscribeReq route no. 3
        // @crud d1
        // @desc Delete subscribeReq
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewSubscribeReq: builder.mutation({
            query: ({ id }) => ({
                url: `subscribeReqs/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'SubscribeReq', id: id}
            ]
        }),
    }),   
});

export const {
    useGetSubscribeReqsQuery,
    useCreateSubscribeReqMutation,
    useUpdateSubscribeReqMutation,
    subscribeReqDeleteSubscribeReqMutation,
} = subscribeReqsSlice;

// returns the query result object
export const selectSubscribeReqsResult = subscribeReqSlice.endpoints.getSubscribeReqs.select();

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