import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const commentsAdapter = createEntityAdapter({});

const initialState = commentsAdapter.getInitialState();

export const commentsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server comment route no. 4
        // @crud r1
        // @desc Get comment
        // @method Query/GET
        // @route /:id
        // @access Private
        getComment: builder.query({
            query: ({ id }) => `/comments/${id}`,
        }),

        // @Query 2
        // @Server comment route no. 5
        // @crud r2
        // @desc Get all comments
        // @method Query/GET
        // @route /all
        // @access Private
        getComments: builder.query({
            query: () => '/comments/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedComments = responseData.map(comment => {
                    comment.id = comment._id
                    return comment;
                });
                return commentsAdapter.setAll(initialState, loadedComments)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Comment', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Comment', id }))
                    ]
                } else return [{ type: 'Comment', id: 'LIST' }];
            }
        }),

        // @query 3
        // @server comment route no. 7
        // @crud r3
        // @desc Get post comments
        // @method Query/GET
        // @route/post/:postId
        // @access Private
        getPostComments: builder.query({
            query: ({ postId }) => `comments/post/${postId}`,
        }),

        // @query 4
        // @server comment route no. 8
        // @crud r4
        // @desc Get flame's comments
        // @method Query/GET
        // @route/flame-profile/:username
        // @access Private
        getFlameComments: builder.query({
            query: ({ username }) => `comments/flame-profile/${username}`,
        }),

        // @query 5
        // @server comment route no. 8
        // @crud r4
        // @desc Get union's comments
        // @method Query/GET
        // @route/union-profile/:unionName
        // @access Private
        getUnionComments: builder.query({
            query: ({ unionName }) => `comments/union-profile/${unionName}`,
        }),

        // @query 6
        // @server comment route no. 10
        // @crud r6
        // @desc Get flame's timeline comments
        // @method Query/GET
        // @route/flame-timeline/:userId
        // @access Private
        getFlameTimelineComments: builder.query({
            query: ({ userId }) => `comments/flame-timeline/${userId}`,
        }),

        // @query 7
        // @server comment route no. 11
        // @crud r7
        // @desc Get union's timeline comments
        // @method Query/GET
        // @route/union-timeline/:unionId
        // @access Private
        getUnionTimelineComments: builder.query({
            query: ({ unionId }) => `comments/union-timeline/${unionId}`,
        }),

        // @query 8
        // @server comment route no. 20
        // @crud r8
        // @desc Get flare comments count
        // @method Query/GET
        // @route /:flareType/:flareId/count/:entityId/:userBlocks
        // @access private
        getCommentCnt: builder.query({
            query: ({ flareType, flareId, entityId, userBlocks }) => ({
                url: `comments/${flareType}/${flareId}/count/${entityId}/${userBlocks}`,
                method: 'GET',
            })
        }),

        // @query 9
        // @server comment route no. 21
        // @crud r9
        // @desc Get first two or three flare comments
        // @method Query/GET
        // @route /:flareType/:flareId/initial/:entityId/:userBlocks/:count
        // @access private
        getInitialCommentCnt: builder.query({
            query: ({ flareType, flareId, entityId, userBlocks, count }) => ({
                url: `comments/${flareType}/${flareId}/initial/${entityId}/${userBlocks}/${count}`,
                method: 'GET',
            })
        }),

        // @query 10
        // @server comment route no. 22
        // @crud r10
        // @desc Get flare comments paginate
        // @method Query/GET
        // @route /:flareType/:flareId/paginate/:pgCnt/:entityId/:userBlocks/:count
        // @access private
        paginateComments: builder.query({
            query: ({ flareType, flareId, entityId, userBlocks, pgCnt }) => ({
                url: `comments/${flareType}/${flareId}/paginate/${pgCnt}/${entityId}/${userBlocks}`,
                method: 'GET',
            })
        }),

        // Mutations

        // @Mutation 1
        // @Server comment route no. 1
        // @crud c1
        // @desc Create comment
        // @method Mutation/POST
        // @route /
        // @access Private
        createComment: builder.mutation({
            query: initialCommentData => ({
                url: '/comments',
                method: 'POST',
                body: {...initialCommentData,}
            }),
            invalidateTags: [
                {type: 'Comment', id: "LIST"}
            ]
        }),

        // @Mutation 2
        // @Server comment route no. 2
        // @crud u1
        // @desc Update comment
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateComment: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `comments/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }),

        // @Mutation 3
        // @Server comment route no. 3
        // @crud d1
        // @desc Delete comment
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteComment: builder.mutation({
            query: ({ id }) => ({
                url: `comments/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }),

        // @Mutation 4
        // @Server comment route no. 4
        // @crud d2
        // @desc Delete comment (verified)
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteCommentVerified: builder.mutation({
            query: ({ id }) => ({
                url: `comments/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }),

        // @Mutation 5
        // @Server comment route no. 12
        // @crud u2
        // @desc flame like/unlike comment
        // @method Mutation/PATCH
        // @route /:id/flameLike"
        // @access private
        flameLikeComment: builder.mutation({
            query: ({ id }) => ({
                url: `comments/${id}/flameLike`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }),

        // @Mutation 6
        // @Server comment route no. 13
        // @crud u3
        // @desc flame like/unlike comment
        // @method Mutation/PATCH
        // @route /:id/unionLike"
        // @access private
        unionLikeComment: builder.mutation({
            query: ({ id }) => ({
                url: `comments/${id}/unionLike`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }),

        // @Mutation 7
        // @Server comment route no. 14
        // @crud u4
        // @desc flame love/unlove comment
        // @method Mutation/PATCH
        // @route /:id/flameLove"
        // @access private
        flameLoveComment: builder.mutation({
            query: ({ id }) => ({
                url: `comments/${id}/flameLove`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }),

        // @Mutation 8
        // @Server comment route no. 15
        // @crud u5
        // @desc flame love/unlove comment
        // @method Mutation/PATCH
        // @route /:id/unionLove"
        // @access private
        unionLoveComment: builder.mutation({
            query: ({ id }) => ({
                url: `comments/${id}/unionLove`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }),

        // @Mutation 9
        // @Server comment route no. 16
        // @crud u6
        // @desc flame flag/unflag comment
        // @method Mutation/PATCH
        // @route /:id/flameFlag"
        // @access private
        flameFlagComment: builder.mutation({
            query: ({ id }) => ({
                url: `comments/${id}/flameFlag`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }),

        // @Mutation 10
        // @Server comment route no. 17
        // @crud u7
        // @desc flame flag/unflag comment
        // @method Mutation/PATCH
        // @route /:id/unionFlag"
        // @access private
        unionFlagComment: builder.mutation({
            query: ({ id }) => ({
                url: `comments/${id}/unionFlag`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }), 

        // @Mutation 11
        // @Server comment route no. 18
        // @crud u8
        // @desc flame reply/unreply comment
        // @method Mutation/PATCH
        // @route /:id/flameReply"
        // @access private
        flameReplyComment: builder.mutation({
            query: ({ id }) => ({
                url: `comments/${id}/flameReply`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }),

        // @Mutation 12
        // @Server comment route no. 19
        // @crud u9
        // @desc flame reply/unreply comment
        // @method Mutation/PATCH
        // @route /:id/unionReply"
        // @access private
        unionReplyComment: builder.mutation({
            query: ({ id }) => ({
                url: `comments/${id}/unionReply`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }), 

    }),   
});

export const {

    // Queries

    useGetCommentQuery,
    useGetCommentsQuery,
    useGetPostCommentsQuery,
    useGetFlameCommentsQuery,
    useGetUnionCommentsQuery,
    useGetFlameTimelineCommentsQuery,
    useGetUnionTimelineCommentsQuery,
    useGetCommentCntQuery,
    useGetInitialCommentCntQuery,
    usePaginateCommentsQuery,

    // Mutations

    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useDeleteCommentVerifiedMutation,
    useFlameLikeCommentMutation,
    useUnionLikeCommentMutation,
    useFlameLoveCommentMutation,
    useUnionLoveCommentMutation,
    useFlameFlagCommentMutation,
    useUnionFlagCommentMutation,
    useFlameReplyCommentMutation,
    useUnionReplyCommentMutation,

} = commentsSlice;

// returns the query result object
export const selectCommentsResult = commentsSlice.endpoints.getComments.select();

// creates memoized selector
const selectCommentsData = createSelector(
    selectCommentsResult,
    commentsResult => commentsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllComments,
    selectById: selectByCommentId,
    selectIds: selectCommentIds,
    // Pass in memoized selector that returns comments slice state
} = commentsAdapter.getSelectors(state => selectCommentsData(state) ?? initialState);