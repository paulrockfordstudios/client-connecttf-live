import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const postsAdapter = createEntityAdapter({});

const initialState = postsAdapter.getInitialState();

export const postsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server post route no. 5
        // @crud r1
        // @desc Get post
        // @method Query/GET
        // @route /:id
        // @access Private
        getPost: builder.query({
            query: ({ id }) => `/posts/${id}`,
        }),

        // @Server post route no. 6
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

        // @query 3
        // @server post route no. 7
        // @crud r3
        // @desc Get all of flame's posts
        // @method Query/GET
        // @route /flame-profile/:username
        // @access private
        getFlamePosts: builder.query({
            query: ({ username }) => `/posts/flame-profile/${username}`,
        }),

        // @query 4
        // @server post route no. 8
        // @crud r4
        // @desc Get all of union's posts
        // @method Query/GET
        // @route /union-profile/:unionName
        // @access private
        getUnionPosts: builder.query({
            query: ({ unionName }) => `/posts/union-profile/${unionName}`,
        }),

        // @query 5
        // @server post route no. 9
        // @crud r5
        // @desc Get user's journey posts
        // @method Query/GET
        // @route /flame-profile/:id/journey/:pgCnt
        // @access private
        userJourneyPosts: builder.query({
            query: ({ id, pgCnt }) => `/posts/flame-profile/${id}/journey/${pgCnt}`,
        }),

        // @query 6
        // @server post route no. 10
        // @crud r6
        // @desc Get user's group posts
        // @method Query/GET
        // @route /flame-profile/:id/group/:pgCnt
        // @access private
        userGroupPosts: builder.query({
            query: ({ id, pgCnt }) => `/posts/flame-profile/${id}/group/${pgCnt}`,
        }),

        // @query 7
        // @server post route no. 11
        // @crud r7
        // @desc Get user's coaching posts
        // @method Query/GET
        // @route /flame-profile/:id/coaching/:pgCnt
        // @access private
        userCoachingPosts: builder.query({
            query: ({ id, pgCnt }) => `/posts/flame-profile/${id}/coaching/${pgCnt}`,
        }),

        // @query 8
        // @server post route no. 12
        // @crud r8
        // @desc Get user's feed posts
        // @method Query/GET
        // @route /flame-profile/:id/feed/:groupPost/:pgCnt
        // @access private
        userFeedPosts: builder.query({
            query: ({ id, feed, groupPost, pgCnt }) => `/posts/flame-profile/${id}/${feed}/${groupPost}/${pgCnt}`,
        }),

        // @query 9
        // @server post route no. 13
        // @crud r9
        // @desc Get union's journey posts
        // @method Query/GET
        // @route /union-profile/:id/journey/:pgCnt
        // @access private
        unionJourneyPosts: builder.query({
            query: ({ id, pgCnt }) => `/posts/union-profile/${id}/journey/${pgCnt}`,
        }),

        // @query 10
        // @server post route no. 14
        // @crud r10
        // @desc Get union's group posts
        // @method Query/GET
        // @route /union-profile/:id/group/:pgCnt
        // @access private
        unionGroupPosts: builder.query({
            query: ({ id, pgCnt }) => `/posts/union-profile/${id}/group/${pgCnt}`,
        }),

        // @query 11
        // @server post route no. 15
        // @crud r11
        // @desc Get union's coaching posts
        // @method Query/GET
        // @route /union-profile/:id/coaching/:pgCnt
        // @access private
        unionCoachingPosts: builder.query({
            query: ({ id, pgCnt }) => `/posts/union-profile/${id}/coaching/${pgCnt}`,
        }),

        // @query 12
        // @server post route no. 16
        // @crud r12
        // @desc Get flame-timeline posts
        // @method Query/GET
        // @route /flame-timeline/:userId
        // @access private
        flameTimelinePosts: builder.query({
            query: ({ userId }) => `/posts/flame-timeline/${userId}`,
        }),

        // @query 13
        // @server post route no. 17
        // @crud r13
        // @desc Get union-timeline posts
        // @method Query/GET
        // @route /union-timeline/:unionId
        // @access private
        unionTimelinePosts: builder.query({
            query: ({ unionId }) => `/posts/union-timeline/${unionId}`,
        }),

        // @query 14
        // @server post route no. 31
        // @crud r14
        // @desc Get all journey posts
        // @method Query/GET
        // @route /feed/journey/:pgCnt
        // @access private
        getJourneyPosts: builder.query({
            query: ({ pgCnt }) => `/posts/feed/journey/${pgCnt}`,
        }),

        // @query 15
        // @server post route no. 32
        // @crud r15
        // @desc Get all group posts
        // @method Query/GET
        // @route /feed/group/:pgCnt
        // @access private
        getGroupPosts: builder.query({
            query: ({ pgCnt }) => `/posts/feed/group/${pgCnt}`,
        }),

        // @query 16
        // @server post route no. 33
        // @crud r16
        // @desc Get all coaching posts
        // @method Query/GET
        // @route /feed/coaching/:pgCnt
        // @access private
        getCoachingPosts: builder.query({
            query: ({ pgCnt }) => `/posts/feed/coaching/${pgCnt}`,
        }),

        // @query 17
        // @server post route no. 34
        // @crud r17
        // @desc Get post feed count
        // @method Query/GET
        // @route /:feed/:access/:groupPost/count/:userId/:userBlocks
        // @access private
        postFeedCnt: builder.query({
            query: ({ feed, access, groupPost, userId, userBlocks }) => ({
                url: `/posts/${feed}/${access}/${groupPost}/count/${userId}/${userBlocks}`
            }),
        }),

        // @query 18
        // @server post route no. 35
        // @crud r18
        // Get post feed paginate
        // @method Query/GET
        // @route /:feed/:access/:groupPost/paginate/:pgCnt/:userId/:userBlocks
        // @access private
        postFeedPaginate: builder.query({
            query: ({ feed, access, groupPost, userId, userBlocks }) => ({
                url: `/posts/${feed}/${access}/${groupPost}/paginate/${userId}/${userBlocks}`,
            }),
        }),

        // Mutations

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