import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const postsAdapter = createEntityAdapter({});

const initialState = postsAdapter.getInitialState();

export const postsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server post route no. 5
        // @crud r2
        // @desc Get all posts
        // @method Query/GET
        // @route /all
        // @access Private
        getPosts: builder.query({
            query: () => '/posts/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedPosts = responseData.map(post => {
                    post.id = post._id
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Post', id }))
                    ]
                } else return [{ type: 'Post', id: 'LIST' }];
            }
        }),

        // @Server post route no. 1
        // @crud c1
        // @desc Create post
        // @method Mutation/POST
        // @route /
        // @access Private
        createPost: builder.mutation({
            query: initialPostData => ({
                url: '/posts',
                method: 'POST',
                body: {...initialPostData,}
            }),
            invalidateTags: [
                {type: 'Post', id: "LIST"}
            ]
        }),

        // @Server post route no. 2
        // @crud u1
        // @desc Update post
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updatePost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @Server post route no. 3
        // @crud d1
        // @desc Delete post
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewPost: builder.mutation({
            query: ({ id }) => ({
                url: `posts/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),
    }),   
});

export const {
    useGetPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    postDeletePostMutation,
} = postsSlice;

// returns the query result object
export const selectPostsResult = postSlice.endpoints.getPosts.select();

// creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllPosts,
    selectById: selectByPostId,
    selectIds: selectPostIds,
    // Pass in memoized selector that returns posts slice state
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState);