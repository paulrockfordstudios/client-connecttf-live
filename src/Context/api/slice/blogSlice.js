import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const blogsAdapter = createEntityAdapter({});

const initialState = blogsAdapter.getInitialState();

export const blogsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server blog route no. 4
        // @crud r1
        // @desc Get blog
        // @method Query/GET
        // @route /:id
        // @access Private
        getBlog: builder.query({
            query: ({ id }) => `/blogs/${id}`,
        }),

        // @Query 2
        // @Server blog route no. 5
        // @crud r2
        // @desc Get all blogs
        // @method Query/GET
        // @route /all
        // @access Private
        getBlogs: builder.query({
            query: () => '/blogs/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedBlogs = responseData.map(blog => {
                    blog.id = blog._id
                    return blog;
                });
                return blogsAdapter.setAll(initialState, loadedBlogs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Blog', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Blog', id }))
                    ]
                } else return [{ type: 'Blog', id: 'LIST' }];
            }
        }),

        // @query 3
        // @server blog route no. 7
        // @crud r3
        // @desc Get question blogs
        // @method Query/GET
        // @route/question/:questionId
        // @access Private
        getQuestionBlogs: builder.query({
            query: ({ questionId }) => `blogs/question/${questionId}`,
        }),

        // @query 4
        // @server blog route no. 8
        // @crud r4
        // @desc Get flame's blogs
        // @method Query/GET
        // @route/flame-profile/:username
        // @access Private
        getFlameBlogs: builder.query({
            query: ({ username }) => `blogs/flame-profile/${username}`,
        }),

        // @query 5
        // @server blog route no. 8
        // @crud r4
        // @desc Get union's blogs
        // @method Query/GET
        // @route/union-profile/:unionName
        // @access Private
        getUnionBlogs: builder.query({
            query: ({ unionName }) => `blogs/union-profile/${unionName}`,
        }),

        // @query 6
        // @server blog route no. 10
        // @crud r6
        // @desc Get flame's timeline blogs
        // @method Query/GET
        // @route/flame-timeline/:userId
        // @access Private
        getFlameTimelineBlogs: builder.query({
            query: ({ userId }) => `blogs/flame-timeline/${userId}`,
        }),

        // @query 7
        // @server blog route no. 11
        // @crud r7
        // @desc Get union's timeline blogs
        // @method Query/GET
        // @route/union-timeline/:unionId
        // @access Private
        getUnionTimelineBlogs: builder.query({
            query: ({ unionId }) => `blogs/union-timeline/${unionId}`,
        }),

        // @query 8
        // @server blog route no. 20
        // @crud r8
        // @desc Get flare blogs count
        // @method Query/GET
        // @route /:flareType/:flareId/count/:entityId/:userBlocks
        // @access private
        getBlogCnt: builder.query({
            query: ({ flareType, flareId, entityId, userBlocks }) => ({
                url: `blogs/${flareType}/${flareId}/count/${entityId}/${userBlocks}`,
                method: 'GET',
            })
        }),

        // @query 9
        // @server blog route no. 21
        // @crud r9
        // @desc Get flare blogs paginate
        // @method Query/GET
        // @route /:flareType/:flareId/paginate/:pgCnt/:entityId/:userBlocks/:count
        // @access private
        paginateBlogs: builder.query({
            query: ({ flareType, flareId, entityId, userBlocks, pgCnt }) => ({
                url: `blogs/${flareType}/${flareId}/paginate/${pgCnt}/${entityId}/${userBlocks}`,
                method: 'GET',
            })
        }),

        // Mutations

        // @Mutation 1
        // @Server blog route no. 1
        // @crud c1
        // @desc Create blog
        // @method Mutation/POST
        // @route /
        // @access Private
        createBlog: builder.mutation({
            query: initialBlogData => ({
                url: '/blogs',
                method: 'POST',
                body: {...initialBlogData,}
            }),
            invalidateTags: [
                {type: 'Blog', id: "LIST"}
            ]
        }),

        // @Mutation 2
        // @Server blog route no. 2
        // @crud u1
        // @desc Update blog
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateBlog: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `blogs/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 3
        // @Server blog route no. 3
        // @crud d1
        // @desc Delete blog
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 4
        // @Server blog route no. 4
        // @crud d2
        // @desc Delete blog (verified)
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteBlogVerified: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 5
        // @Server blog route no. 12
        // @crud u2
        // @desc flame like/unlike blog
        // @method Mutation/PATCH
        // @route /:id/flameLike"
        // @access private
        flameLikeBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/flameLike`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 6
        // @Server blog route no. 13
        // @crud u3
        // @desc flame like/unlike blog
        // @method Mutation/PATCH
        // @route /:id/unionLike"
        // @access private
        unionLikeBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/unionLike`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 7
        // @Server blog route no. 14
        // @crud u4
        // @desc flame love/unlove blog
        // @method Mutation/PATCH
        // @route /:id/flameLove"
        // @access private
        flameLoveBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/flameLove`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 8
        // @Server blog route no. 15
        // @crud u5
        // @desc flame love/unlove blog
        // @method Mutation/PATCH
        // @route /:id/unionLove"
        // @access private
        unionLoveBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/unionLove`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 9
        // @Server blog route no. 16
        // @crud u6
        // @desc flame flag/unflag blog
        // @method Mutation/PATCH
        // @route /:id/flameFlag"
        // @access private
        flameFlagBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/flameFlag`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 10
        // @Server blog route no. 17
        // @crud u7
        // @desc flame flag/unflag blog
        // @method Mutation/PATCH
        // @route /:id/unionFlag"
        // @access private
        unionFlagBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/unionFlag`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }), 

        // @Mutation 11
        // @Server blog route no. 18
        // @crud u8
        // @desc flame comment/uncomment blog
        // @method Mutation/PATCH
        // @route /:id/flameComment"
        // @access private
        flameCommentBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/flameComment`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 12
        // @Server blog route no. 19
        // @crud u9
        // @desc flame comment/uncomment blog
        // @method Mutation/PATCH
        // @route /:id/unionComment"
        // @access private
        unionCommentBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/unionComment`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }), 

        // @Mutation 11
        // @Server blog route no. 18
        // @crud u8
        // @desc flame answer/unanswer blog
        // @method Mutation/PATCH
        // @route /:id/flameAnswer"
        // @access private
        flameAnswerBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/flameAnswer`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 12
        // @Server blog route no. 19
        // @crud u9
        // @desc flame answer/unanswer blog
        // @method Mutation/PATCH
        // @route /:id/unionAnswer"
        // @access private
        unionAnswerBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/unionAnswer`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }), 

        // @Mutation 11
        // @Server blog route no. 18
        // @crud u8
        // @desc flame review/unreview blog
        // @method Mutation/PATCH
        // @route /:id/flameReview"
        // @access private
        flameReviewBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/flameReview`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 12
        // @Server blog route no. 19
        // @crud u9
        // @desc flame review/unreview blog
        // @method Mutation/PATCH
        // @route /:id/unionReview"
        // @access private
        unionReviewBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/unionReview`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),
        
        // @Mutation 11
        // @Server blog route no. 18
        // @crud u8
        // @desc flame report/unreport blog
        // @method Mutation/PATCH
        // @route /:id/flameReport"
        // @access private
        flameReportBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/flameReport`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 12
        // @Server blog route no. 19
        // @crud u9
        // @desc flame report/unreport blog
        // @method Mutation/PATCH
        // @route /:id/unionReport"
        // @access private
        unionReportBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/unionReport`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 11
        // @Server blog route no. 18
        // @crud u8
        // @desc flame share/unshare blog
        // @method Mutation/PATCH
        // @route /:id/flameShare"
        // @access private
        flameShareBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/flameShare`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),

        // @Mutation 12
        // @Server blog route no. 19
        // @crud u9
        // @desc flame share/unshare blog
        // @method Mutation/PATCH
        // @route /:id/unionShare"
        // @access private
        unionShareBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}/unionShare`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }), 

    }),   
});

export const {

    // Queries

    useGetBlogQuery,
    useGetBlogsQuery,
    useGetQuestionBlogsQuery,
    useGetFlameBlogsQuery,
    useGetUnionBlogsQuery,
    useGetFlameTimelineBlogsQuery,
    useGetUnionTimelineBlogsQuery,
    useGetBlogCntQuery,
    useGetInitialBlogCntQuery,
    usePaginateBlogsQuery,

    // Mutations

    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useDeleteBlogVerifiedMutation,
    useFlameLikeBlogMutation,
    useUnionLikeBlogMutation,
    useFlameLoveBlogMutation,
    useUnionLoveBlogMutation,
    useFlameFlagBlogMutation,
    useUnionFlagBlogMutation,
    useFlameCommentBlogMutation,
    useUnionCommentBlogMutation,
    useFlameAnswerBlogMutation,
    useUnionAnswerBlogMutation,
    useFlameReviewBlogMutation,
    useUnionReviewBlogMutation,
    useFlameReportBlogMutation,
    useUnionReportBlogMutation,
    useFlameShareBlogMutation,
    useUnionShareBlogMutation,

} = blogsSlice;

// returns the query result object
export const selectBlogsResult = blogSlice.endpoints.getBlogs.select();

// creates memoized selector
const selectBlogsData = createSelector(
    selectBlogsResult,
    blogsResult => blogsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllBlogs,
    selectById: selectByBlogId,
    selectIds: selectBlogIds,
    // Pass in memoized selector that returns blogs slice state
} = blogsAdapter.getSelectors(state => selectBlogsData(state) ?? initialState);