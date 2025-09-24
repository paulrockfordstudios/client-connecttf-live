import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const answersAdapter = createEntityAdapter({});

const initialState = answersAdapter.getInitialState();

export const answersSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server answer route no. 5
        // @crud r2
        // @desc Get all answers
        // @method Query/GET
        // @route /all
        // @access Private
        getAnswers: builder.query({
            query: () => '/answers/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAnswers = responseData.map(answer => {
                    answer.id = answer._id
                    return answer;
                });
                return answersAdapter.setAll(initialState, loadedAnswers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Answer', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Answer', id }))
                    ]
                } else return [{ type: 'Answer', id: 'LIST' }];
            }
        }),

        // @Server answer route no. 1
        // @crud c1
        // @desc Create answer
        // @method Mutation/POST
        // @route /
        // @access Private
        createAnswer: builder.mutation({
            query: initialAnswerData => ({
                url: '/answers',
                method: 'POST',
                body: {...initialAnswerData,}
            }),
            invalidateTags: [
                {type: 'Answer', id: "LIST"}
            ]
        }),

        // @Server answer route no. 2
        // @crud u1
        // @desc Update answer
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateAnswer: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `answers/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }),

        // @Server answer route no. 3
        // @crud d1
        // @desc Delete answer
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewAnswer: builder.mutation({
            query: ({ id }) => ({
                url: `answers/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }),
    }),   
});

export const {
    useGetAnswersQuery,
    useCreateAnswerMutation,
    useUpdateAnswerMutation,
    answerDeleteAnswerMutation,
} = answersSlice;

// returns the query result object
export const selectAnswersResult = answerSlice.endpoints.getAnswers.select();

// creates memoized selector
const selectAnswersData = createSelector(
    selectAnswersResult,
    answersResult => answersResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllAnswers,
    selectById: selectByAnswerId,
    selectIds: selectAnswerIds,
    // Pass in memoized selector that returns answers slice state
} = answersAdapter.getSelectors(state => selectAnswersData(state) ?? initialState);