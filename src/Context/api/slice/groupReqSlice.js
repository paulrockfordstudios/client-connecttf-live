import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const groupReqsAdapter = createEntityAdapter({});

const initialState = groupReqsAdapter.getInitialState();

export const groupReqsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server groupReq route no. 5
        // @crud r2
        // @desc Get all groupReqs
        // @method Query/GET
        // @route /all
        // @access Private
        getGroupReqs: builder.query({
            query: () => '/groupReqs/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedGroupReqs = responseData.map(groupReq => {
                    groupReq.id = groupReq._id
                    return groupReq;
                });
                return groupReqsAdapter.setAll(initialState, loadedGroupReqs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'GroupReq', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'GroupReq', id }))
                    ]
                } else return [{ type: 'GroupReq', id: 'LIST' }];
            }
        }),

        // @Server groupReq route no. 1
        // @crud c1
        // @desc Create groupReq
        // @method Mutation/POST
        // @route /
        // @access Private
        createGroupReq: builder.mutation({
            query: initialGroupReqData => ({
                url: '/groupReqs',
                method: 'POST',
                body: {...initialGroupReqData,}
            }),
            invalidateTags: [
                {type: 'GroupReq', id: "LIST"}
            ]
        }),

        // @Server groupReq route no. 2
        // @crud u1
        // @desc Update groupReq
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateGroupReq: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `groupReqs/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'GroupReq', id: id}
            ]
        }),

        // @Server groupReq route no. 3
        // @crud d1
        // @desc Delete groupReq
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewGroupReq: builder.mutation({
            query: ({ id }) => ({
                url: `groupReqs/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'GroupReq', id: id}
            ]
        }),
    }),   
});

export const {
    useGetGroupReqsQuery,
    useCreateGroupReqMutation,
    useUpdateGroupReqMutation,
    groupReqDeleteGroupReqMutation,
} = groupReqsSlice;

// returns the query result object
export const selectGroupReqsResult = groupReqSlice.endpoints.getGroupReqs.select();

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