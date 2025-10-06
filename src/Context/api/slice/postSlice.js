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

        // @mutation 1
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

        // @mutation 2
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

        // @mutation 3
        // @Server post route no. 3
        // @crud d1
        // @desc Delete post
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `posts/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 4
        // @Server post route no. 4
        // @crud d2
        // @desc Delete post (verified)
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `posts/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 5
        // @Server post route no. 18
        // @crud u2
        // @desc Add flame view
        // @method Mutation/PATCH
        // @route /:id/flameView
        // @access Private
        flameViewPost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/flameView`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 6
        // @Server post route no. 19
        // @crud u3
        // @desc Add union views
        // @method Mutation/PATCH
        // @route /:id/unionView
        // @access Private
        unionViewPost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/unionView`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 7
        // @Server post route no. 20
        // @crud u4
        // @desc Add flame Comments
        // @method Mutation/PATCH
        // @route /:id/flameComment
        // @access Private
        flameCommentPost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/flameComment`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 8
        // @Server post route no. 21
        // @crud u5
        // @desc Add union Comments
        // @method Mutation/PATCH
        // @route /:id/unionComment
        // @access Private
        unionCommentPost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/unionComment`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 9
        // @Server post route no. 22
        // @crud u6
        // @desc Add flame shares
        // @method Mutation/PATCH
        // @route /:id/flameShare
        // @access Private
        flameSharePost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/flameShare`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 10
        // @Server post route no. 23
        // @crud u7
        // @desc Add union shares
        // @method Mutation/PATCH
        // @route /:id/unionShare
        // @access Private
        unionSharePost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/unionShare`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 11
        // @Server post route no. 24
        // @crud u8
        // @desc Add flame like/unlike post
        // @method Mutation/PATCH
        // @route /:id/flameLike
        // @access Private
        flameLikePost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/flameLike`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 12
        // @Server post route no. 25
        // @crud u9
        // @desc Add union like/unlike post
        // @method Mutation/PATCH
        // @route /:id/unionLike
        // @access Private
        unionLikePost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/unionLike`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 13
        // @Server post route no. 26
        // @crud u10
        // @desc Add flame love/unlove post
        // @method Mutation/PATCH
        // @route /:id/flameLove
        // @access Private
        flameLovePost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/flameLove`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 13
        // @Server post route no. 27
        // @crud u11
        // @desc Add union love/unlove post
        // @method Mutation/PATCH
        // @route /:id/unionLove
        // @access Private
        unionLovePost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/unionLove`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 14
        // @Server post route no. 28
        // @crud u12
        // @desc Add flame flag/unflag post
        // @method Mutation/PATCH
        // @route /:id/flameFlag
        // @access Private
        flameFlagPost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/flameFlag`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 15
        // @Server post route no. 29
        // @crud u13
        // @desc Add union flag/unflag post
        // @method Mutation/PATCH
        // @route /:id/unionFlag
        // @access Private
        unionFlagPost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/unionFlag`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

        // @mutation 16
        // @Server post route no. 30
        // @crud u14
        // @desc report post
        // @method PATCH
        // @route /:id/report
        // @access private
        reportPost: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `posts/${id}/report`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Post', id: id}
            ]
        }),

    }),   
});

export const {

    // Queries

    useGetPostQuery,
    useGetPostsQuery,
    useGetFlamePostsQuery,
    useGetUnionPostsQuery,
    useUserJourneyPostsQuery,
    useUserGroupPostsQuery,
    useUserCoachingPostsQuery,
    useUserFeedPostsQuery,
    useUnionJourneyPostsQuery,
    useUnionGroupPostsQuery,
    useUnionCoachingPostsQuery,
    useFlameTimelinePostsQuery,
    useUnionTimelinePostsQuery,

    // Mutations

    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useFlameViewMutation,
    useUnionViewMutation,
    useFlameCommentMutation,
    useUnionCommentMutation,
    useFlameShareMutation,
    useUnionShareMutation,
    useFlameLikeMutation,
    useUnionLikeMutation,
    useFlameLoveMutation,
    useUnionLoveMutation,
    useFlameFlagMutation,
    useUnionFlagMutation,
    useReportPostMutation,

} = postsSlice;

// returns the query result object
export const selectPostsResult = postsSlice.endpoints.getPosts.select();

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