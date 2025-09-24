import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const repliesAdapter = createEntityAdapter({});

const initialState = repliesAdapter.getInitialState();

export const repliesSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server reply route no. 5
        // @crud r2
        // @desc Get all replies
        // @method Query/GET
        // @route /all
        // @access Private
        getReplies: builder.query({
            query: () => '/replies/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedReplies = responseData.map(replie => {
                    replie.id = replie._id
                    return replie;
                });
                return repliesAdapter.setAll(initialState, loadedReplies)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Replies', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Replies', id }))
                    ]
                } else return [{ type: 's', id: 'LIST' }];
            }
        }),

        // @Server reply route no. 1
        // @crud c1
        // @desc Create reply
        // @method Mutation/POST
        // @route /
        // @access Private
        createReply: builder.mutation({
            query: initialReplyData => ({
                url: '/replies',
                method: 'POST',
                body: {...initialReplyData,}
            }),
            invalidateTags: [
                {type: 'Replies', id: "LIST"}
            ]
        }),

        // @Server reply route no. 2
        // @crud u1
        // @desc Update reply
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateReply: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `replies/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Replies', id: id}
            ]
        }),

        // @Server reply route no. 3
        // @crud d1
        // @desc Delete reply
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewReply: builder.mutation({
            query: ({ id }) => ({
                url: `replies/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Replies', id: id}
            ]
        }),
    }),   
});

export const {
    useGetRepliesQuery,
    useCreateReplyMutation,
    useUpdateReplyMutation,
    replieDeleteReplyMutation,
} = repliesSlice;

// returns the query result object
export const selectRepliesResult = repliesSlice.endpoints.getReplies.select();

// creates memoized selector
const selectRepliesData = createSelector(
    selectRepliesResult,
    repliesResult => repliesResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllReplies,
    selectById: selectByReplyId,
    selectIds: selectReplyIds,
    // Pass in memoized selector that returns replies slice state
} = repliesAdapter.getSelectors(state => selectRepliesData(state) ?? initialState);