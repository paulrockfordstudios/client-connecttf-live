import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const repliesAdapter = createEntityAdapter({});

const initialState = repliesAdapter.getInitialState();

export const repliesSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server reply route no. 5
        // @crud r1
        // @desc Get reply
        // @method Query/GET
        // @route /:id
        // @access Private
        getReply: builder.query({
            query: ({ id }) => `/replies/${id}`,
        }),

        // @query 2
        // @Server reply route no. 6
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
                        ...result.ids.map(id => ({ type: 'Reply', id }))
                    ]
                } else return [{ type: 'Replies', id: 'LIST' }];
            }
        }),

        // @query 3
        // @server reply route no. 17
        // @crud r3
        // @desc Get flare replies
        // @method Query/GET
        // @route /:flareType/:flareId
        // @access private
        getFlareReplies: builder.query({
            query: ({ flareType, flareId }) => `/replies/${flareType}/${flareId}`,
        }),

        // @query 4
        // @server reply route no. 18
        // @crud r4
        // @desc Get flare replies count
        // @method Query/GET
        // @route /:flareType/:flareId/count/:userId/:userBlocks
        // @access private
        getRepliesCnt: builder.query({
            query: ({ flareType, flareId, userId, userBlocks }) => ({
                url: `/replies/${flareType}/${flareId}/count/${userId}/${userBlocks}`
            }),
        }),

        // @query 5
        // @server reply route no. 19
        // @crud r5
        // @desc Get first two or three flare replies
        // @method Query/GET
        // @route /:flareType/:flareId/count/:userId/:userBlocks/:count
        // @access private
        getInitialReplies: builder.query({
            query: ({ flareType, flareId, userId, userBlocks, count }) => ({
                url: `/replies/${flareType}/${flareId}/count/${userId}/${userBlocks}/${count}`,
            }),
        }),

        // @query 6
        // @server reply route no. 20
        // @crud r6
        // @desc Get first two or three flare replies
        // @method Query/GET
        // @route /:flareType/:flareId/count/:userId/:userBlocks/:count
        // @access private
        getPaginatedReplies: builder.query({
            query: ({ flareType, flareId, pgCnt, userId, userBlocks }) => ({
                url: `/replies/${flareType}/${flareId}/paginate/${pgCnt}/${userId}/${userBlocks}`
            }),
        }),

        // Mutations

        // @mutation 1
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
                {type: 'Reply', id: "LIST"}
            ]
        }),

        // @mutation 2
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
                {type: 'Reply', id: id}
            ]
        }),

        // @mutation 3
        // @Server reply route no. 3
        // @crud d1
        // @desc Delete reply
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteReply: builder.mutation({
            query: ({ id }) => ({
                url: `replies/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Reply', id: id}
            ]
        }),

        // @mutation 4
        // @Server reply route no. 3
        // @crud d1
        // @desc Delete reply (verified)
        // @method Mutation/DELETE
        // @route /:id/verified
        // @access Private
        deleteReplyVerified: builder.mutation({
            query: ({ id }) => ({
                url: `replies/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Replies', id: id}
            ]
        }),

        // @mutation 5
        // @Server reply route no. 8
        // @crud u2
        // @desc Add flame like/unlike reply
        // @method Mutation/PATCH
        // @route /:id/flameLike
        // @access Private
        flameLikeReply: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `replies/${id}/flameLike`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Reply', id: id}
            ]
        }),

        // @mutation 6
        // @Server reply route no. 9
        // @crud u3
        // @desc Add union like/unlike reply
        // @method Mutation/PATCH
        // @route /:id/unionLike
        // @access Private
        unionLikeReply: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `replies/${id}/unionLike`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Reply', id: id}
            ]
        }),

        // @mutation 7
        // @Server reply route no. 10
        // @crud u4
        // @desc Add flame love/unlove reply
        // @method Mutation/PATCH
        // @route /:id/flameLove
        // @access Private
        flameLoveReply: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `replies/${id}/flameLove`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Reply', id: id}
            ]
        }),

        // @mutation 8
        // @Server reply route no. 11
        // @crud u5
        // @desc Add union love/unlove reply
        // @method Mutation/PATCH
        // @route /:id/unionLove
        // @access Private
        unionLoveReply: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `replies/${id}/unionLove`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Reply', id: id}
            ]
        }),

        // @mutation 9
        // @Server reply route no. 12
        // @crud u6
        // @desc Add flame flag/unflag reply
        // @method Mutation/PATCH
        // @route /:id/flameFlag
        // @access Private
        flameFlagReply: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `replies/${id}/flameFlag`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Reply', id: id}
            ]
        }),

        // @mutation 10
        // @Server reply route no. 13
        // @crud u7
        // @desc Add union flag/unflag reply
        // @method Mutation/PATCH
        // @route /:id/unionFlag
        // @access Private
        unionFlagReply: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `replies/${id}/unionFlag`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Reply', id: id}
            ]
        }),

        // @mutation 11
        // @Server reply route no. 14
        // @crud u8
        // @desc report reply
        // @method PATCH
        // @route /:id/report
        // @access private
        reportReply: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `replies/${id}/report`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Reply', id: id}
            ]
        }),

        // @mutation 12
        // @Server reply route no. 15
        // @crud u9
        // @desc Add flame reply
        // @method Mutation/PATCH
        // @route /:id/flameReply
        // @access Private
        addFlameReply: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `replies/${id}/flameReply`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Reply', id: id}
            ]
        }),

        // @mutation 13
        // @Server reply route no. 16
        // @crud u10
        // @desc Add union reply
        // @method Mutation/PATCH
        // @route /:id/unionLike
        // @access Private
        addUnionReply: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `replies/${id}/unionReply`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Reply', id: id}
            ]
        }),

    }),   
});

export const {

    // Queries

    useGetReplyQuery,
    useGetRepliesQuery,
    useGetFlareRepliesQuery,
    useGetRepliesCntQuery,
    useGetInitialRepliesQuery,
    useGetPaginatedRepliesQuery,

    // Mutations

    useCreateReplyMutation,
    useUpdateReplyMutation,
    replieDeleteReplyMutation,
    replieDeleteReplyVerifiedMutation,
    useFlameLikeReplyMutation,
    useUnionLikeReplyMutation,
    useFlameLoveReplyMutation,
    useUnionLoveReplyMutation,
    useFlameFlagReplyMutation,
    useUnionFlagReplyMutation,
    useReportReplyMutation,
    addFlameReply,
    addUnionReply,

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