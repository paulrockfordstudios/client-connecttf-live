import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const reviewsAdapter = createEntityAdapter({});

const initialState = reviewsAdapter.getInitialState();

export const reviewsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server review route no. 5
        // @crud r1
        // @desc Get review
        // @method Query/GET
        // @route /:id
        // @access Private
        getReview: builder.query({
            query: ({ id }) => `/reviews/${id}`,
        }),

        // @query 2
        // @Server review route no. 5
        // @crud r2
        // @desc Get all reviews
        // @method Query/GET
        // @route /all
        // @access Private
        getReviews: builder.query({
            query: () => '/reviews/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedReviews = responseData.map(review => {
                    review.id = review._id
                    return review;
                });
                return reviewsAdapter.setAll(initialState, loadedReviews)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Review', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Review', id }))
                    ]
                } else return [{ type: 'Review', id: 'LIST' }];
            }
        }),

        // @query 3
        // @server review route no. 7
        // @crud r3
        // @desc Get flame user's reviews
        // @method Query/GET
        // @route /flame/:userId
        // @access private
        getFlameReviews: builder.query({
            query: ({ userId }) => `/reviews/flame/${userId}`,
        }),

        // @query 4
        // @server review route no. 8
        // @crud r4
        // @desc Get flame union's reviews
        // @method Query/GET
        // @route /union/:unionId
        // @access private
        getUnionReviews: builder.query({
            query: ({ unionId }) => `/reviews/union/${unionId}`,
        }),

        // Mutations

        // @mutation 1
        // @Server review route no. 1
        // @crud c1
        // @desc Create review
        // @method Mutation/POST
        // @route /
        // @access Private
        createReview: builder.mutation({
            query: initialReviewData => ({
                url: '/reviews',
                method: 'POST',
                body: {...initialReviewData,}
            }),
            invalidateTags: [
                {type: 'Review', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server review route no. 2
        // @crud u1
        // @desc Update review
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateReview: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `reviews/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Review', id: id}
            ]
        }),

        // @mutation 3
        // @Server review route no. 3
        // @crud d1
        // @desc Delete review
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteReview: builder.mutation({
            query: ({ id }) => ({
                url: `reviews/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Review', id: id}
            ]
        }),

        // @mutation 4
        // @Server review route no. 4
        // @crud d2
        // @desc Delete review (verified)
        // @method Mutation/DELETE
        // @route /:id/verified
        // @access Private
        deleteReviewVeridied: builder.mutation({
            query: ({ id }) => ({
                url: `reviews/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Review', id: id}
            ]
        }),

        // @mutation 5
        // @Server review route no. 9
        // @crud u2
        // @desc Add flame Comment
        // @method Mutation/PATCH
        // @route /:id/flameComment
        // @access private
        flameCommentReview: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `reviews/${id}/flameComment`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Review', id: id}
            ]
        }),

        // @mutation 6
        // @Server review route no. 10
        // @crud u3
        // @desc Add union Comment
        // @method Mutation/PATCH
        // @route /:id/unionComment
        // @access Private
        unionCommentReview: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `reviews/${id}/unionComment`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Review', id: id}
            ]
        }),
    }),   
});

export const {

    // Queries

    useGetReviewQuery,
    useGetReviewsQuery,
    useGetFlameReviewsQuery,
    useGetUnionReviewsQuery,

    // Mutations
     
    useCreateReviewMutation,
    useUpdateReviewMutation,
    reviewDeleteReviewMutation,
    reviewDeleteReviewVerifiedMutation,
    useFlameCommentReviewMutation,
    useUnionCommentReviewMutation,

} = reviewsSlice;

// returns the query result object
export const selectReviewsResult = reviewsSlice.endpoints.getReviews.select();

// creates memoized selector
const selectReviewsData = createSelector(
    selectReviewsResult,
    reviewsResult => reviewsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllReviews,
    selectById: selectByReviewId,
    selectIds: selectReviewIds,
    // Pass in memoized selector that returns reviews slice state
} = reviewsAdapter.getSelectors(state => selectReviewsData(state) ?? initialState);