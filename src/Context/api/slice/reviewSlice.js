import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const reviewsAdapter = createEntityAdapter({});

const initialState = reviewsAdapter.getInitialState();

export const reviewsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

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

        // @Server review route no. 3
        // @crud d1
        // @desc Delete review
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewReview: builder.mutation({
            query: ({ id }) => ({
                url: `reviews/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Review', id: id}
            ]
        }),
    }),   
});

export const {
    useGetReviewsQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    reviewDeleteReviewMutation,
} = reviewsSlice;

// returns the query result object
export const selectReviewsResult = reviewSlice.endpoints.getReviews.select();

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