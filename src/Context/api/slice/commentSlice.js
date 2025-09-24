import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const commentsAdapter = createEntityAdapter({});

const initialState = commentsAdapter.getInitialState();

export const commentsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

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

        // @Server comment route no. 3
        // @crud d1
        // @desc Delete comment
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewComment: builder.mutation({
            query: ({ id }) => ({
                url: `comments/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Comment', id: id}
            ]
        }),
    }),   
});

export const {
    useGetCommentsQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    commentDeleteCommentMutation,
} = commentsSlice;

// returns the query result object
export const selectCommentsResult = commentSlice.endpoints.getComments.select();

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