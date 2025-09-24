import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const blogsAdapter = createEntityAdapter({});

const initialState = blogsAdapter.getInitialState();

export const blogsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

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

        // @Server blog route no. 3
        // @crud d1
        // @desc Delete blog
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewBlog: builder.mutation({
            query: ({ id }) => ({
                url: `blogs/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Blog', id: id}
            ]
        }),
    }),   
});

export const {
    useGetBlogsQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    blogDeleteBlogMutation,
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