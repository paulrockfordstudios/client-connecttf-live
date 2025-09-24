import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const questionsAdapter = createEntityAdapter({});

const initialState = questionsAdapter.getInitialState();

export const questionsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server question route no. 5
        // @crud r2
        // @desc Get all questions
        // @method Query/GET
        // @route /all
        // @access Private
        getQuestions: builder.query({
            query: () => '/questions/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedQuestions = responseData.map(question => {
                    question.id = question._id
                    return question;
                });
                return questionsAdapter.setAll(initialState, loadedQuestions)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Question', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Question', id }))
                    ]
                } else return [{ type: 'Question', id: 'LIST' }];
            }
        }),

        // @Server question route no. 1
        // @crud c1
        // @desc Create question
        // @method Mutation/POST
        // @route /
        // @access Private
        createQuestion: builder.mutation({
            query: initialQuestionData => ({
                url: '/questions',
                method: 'POST',
                body: {...initialQuestionData,}
            }),
            invalidateTags: [
                {type: 'Question', id: "LIST"}
            ]
        }),

        // @Server question route no. 2
        // @crud u1
        // @desc Update question
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @Server question route no. 3
        // @crud d1
        // @desc Delete question
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewQuestion: builder.mutation({
            query: ({ id }) => ({
                url: `questions/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),
    }),   
});

export const {
    useGetQuestionsQuery,
    useCreateQuestionMutation,
    useUpdateQuestionMutation,
    questionDeleteQuestionMutation,
} = questionsSlice;

// returns the query result object
export const selectQuestionsResult = questionSlice.endpoints.getQuestions.select();

// creates memoized selector
const selectQuestionsData = createSelector(
    selectQuestionsResult,
    questionsResult => questionsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllQuestions,
    selectById: selectByQuestionId,
    selectIds: selectQuestionIds,
    // Pass in memoized selector that returns questions slice state
} = questionsAdapter.getSelectors(state => selectQuestionsData(state) ?? initialState);