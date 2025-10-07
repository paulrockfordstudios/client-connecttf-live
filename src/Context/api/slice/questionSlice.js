import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const questionsAdapter = createEntityAdapter({});

const initialState = questionsAdapter.getInitialState();

export const questionsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server question route no. 5
        // @crud r1
        // @desc Get question
        // @method Query/GET
        // @route /:id
        // @access Private
        getQuestion: builder.query({
            query: ({ id }) => `/questions/${id}`,
        }),

        // @Server question route no. 6
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

        // @query 3
        // @server question route no. 7
        // @crud r3
        // @desc Get all of flame's questions
        // @method Query/GET
        // @route /flame-profile/:username
        // @access private
        getFlameQuestions: builder.query({
            query: ({ username }) => `/questions/flame-profile/${username}`,
        }),

        // @query 4
        // @server question route no. 8
        // @crud r4
        // @desc Get all of union's questions
        // @method Query/GET
        // @route /union-profile/:unionName
        // @access private
        getUnionQuestions: builder.query({
            query: ({ unionName }) => `/questions/union-profile/${unionName}`,
        }),

        // @query 5
        // @server question route no. 9
        // @crud r5
        // @desc Get user's journey questions
        // @method Query/GET
        // @route /flame-profile/:id/journey/:pgCnt
        // @access private
        userJourneyQuestions: builder.query({
            query: ({ id, pgCnt }) => `/questions/flame-profile/${id}/journey/${pgCnt}`,
        }),

        // @query 6
        // @server question route no. 10
        // @crud r6
        // @desc Get user's group questions
        // @method Query/GET
        // @route /flame-profile/:id/group/:pgCnt
        // @access private
        userGroupQuestions: builder.query({
            query: ({ id, pgCnt }) => `/questions/flame-profile/${id}/group/${pgCnt}`,
        }),

        // @query 7
        // @server question route no. 11
        // @crud r7
        // @desc Get user's coaching questions
        // @method Query/GET
        // @route /flame-profile/:id/coaching/:pgCnt
        // @access private
        userCoachingQuestions: builder.query({
            query: ({ id, pgCnt }) => `/questions/flame-profile/${id}/coaching/${pgCnt}`,
        }),

        // @query 8
        // @server question route no. 12
        // @crud r8
        // @desc Get user's feed questions
        // @method Query/GET
        // @route /flame-profile/:id/feed/:groupQuestion/:pgCnt
        // @access private
        userFeedQuestions: builder.query({
            query: ({ id, feed, groupQuestion, pgCnt }) => `/questions/flame-profile/${id}/${feed}/${groupQuestion}/${pgCnt}`,
        }),

        // @query 9
        // @server question route no. 13
        // @crud r9
        // @desc Get union's journey questions
        // @method Query/GET
        // @route /union-profile/:id/journey/:pgCnt
        // @access private
        unionJourneyQuestions: builder.query({
            query: ({ id, pgCnt }) => `/questions/union-profile/${id}/journey/${pgCnt}`,
        }),

        // @query 10
        // @server question route no. 14
        // @crud r10
        // @desc Get union's group questions
        // @method Query/GET
        // @route /union-profile/:id/group/:pgCnt
        // @access private
        unionGroupQuestions: builder.query({
            query: ({ id, pgCnt }) => `/questions/union-profile/${id}/group/${pgCnt}`,
        }),

        // @query 11
        // @server question route no. 15
        // @crud r11
        // @desc Get union's coaching questions
        // @method Query/GET
        // @route /union-profile/:id/coaching/:pgCnt
        // @access private
        unionCoachingQuestions: builder.query({
            query: ({ id, pgCnt }) => `/questions/union-profile/${id}/coaching/${pgCnt}`,
        }),

        // @query 12
        // @server question route no. 16
        // @crud r12
        // @desc Get flame-timeline questions
        // @method Query/GET
        // @route /flame-timeline/:userId
        // @access private
        flameTimelineQuestions: builder.query({
            query: ({ userId }) => `/questions/flame-timeline/${userId}`,
        }),

        // @query 13
        // @server question route no. 17
        // @crud r13
        // @desc Get union-timeline questions
        // @method Query/GET
        // @route /union-timeline/:unionId
        // @access private
        unionTimelineQuestions: builder.query({
            query: ({ unionId }) => `/questions/union-timeline/${unionId}`,
        }),

        // @query 14
        // @server question route no. 31
        // @crud r14
        // @desc Get all journey questions
        // @method Query/GET
        // @route /feed/journey/:pgCnt
        // @access private
        getJourneyQuestions: builder.query({
            query: ({ pgCnt }) => `/questions/feed/journey/${pgCnt}`,
        }),

        // @query 15
        // @server question route no. 32
        // @crud r15
        // @desc Get all group questions
        // @method Query/GET
        // @route /feed/group/:pgCnt
        // @access private
        getGroupQuestions: builder.query({
            query: ({ pgCnt }) => `/questions/feed/group/${pgCnt}`,
        }),

        // @query 16
        // @server question route no. 33
        // @crud r16
        // @desc Get all coaching questions
        // @method Query/GET
        // @route /feed/coaching/:pgCnt
        // @access private
        getCoachingQuestions: builder.query({
            query: ({ pgCnt }) => `/questions/feed/coaching/${pgCnt}`,
        }),

        // @query 17
        // @server question route no. 34
        // @crud r17
        // @desc Get question feed count
        // @method Query/GET
        // @route /:feed/:access/:groupQuestion/count/:userId/:userBlocks
        // @access private
        questionFeedCnt: builder.query({
            query: ({ feed, access, groupQuestion, userId, userBlocks }) => ({
                url: `/questions/${feed}/${access}/${groupQuestion}/count/${userId}/${userBlocks}`
            }),
        }),

        // @query 18
        // @server question route no. 35
        // @crud r18
        // Get question feed paginate
        // @method Query/GET
        // @route /:feed/:access/:groupQuestion/paginate/:pgCnt/:userId/:userBlocks
        // @access private
        questionFeedPaginate: builder.query({
            query: ({ feed, access, groupQuestion, userId, userBlocks }) => ({
                url: `/questions/${feed}/${access}/${groupQuestion}/paginate/${userId}/${userBlocks}`,
            }),
        }),

        // Mutations

        // @mutation 1
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

        // @mutation 2
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

        // @mutation 3
        // @Server question route no. 3
        // @crud d1
        // @desc Delete question
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteQuestion: builder.mutation({
            query: ({ id }) => ({
                url: `questions/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 4
        // @Server question route no. 4
        // @crud d2
        // @desc Delete question (verified)
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteQuestion: builder.mutation({
            query: ({ id }) => ({
                url: `questions/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 5
        // @Server question route no. 18
        // @crud u2
        // @desc Add flame view
        // @method Mutation/PATCH
        // @route /:id/flameView
        // @access Private
        flameViewQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/flameView`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 6
        // @Server question route no. 19
        // @crud u3
        // @desc Add union views
        // @method Mutation/PATCH
        // @route /:id/unionView
        // @access Private
        unionViewQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/unionView`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 7
        // @Server question route no. 20
        // @crud u4
        // @desc Add flame Comments
        // @method Mutation/PATCH
        // @route /:id/flameComment
        // @access Private
        flameCommentQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/flameComment`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 8
        // @Server question route no. 21
        // @crud u5
        // @desc Add union Comments
        // @method Mutation/PATCH
        // @route /:id/unionComment
        // @access Private
        unionCommentQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/unionComment`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 9
        // @Server question route no. 22
        // @crud u6
        // @desc Add flame shares
        // @method Mutation/PATCH
        // @route /:id/flameShare
        // @access Private
        flameShareQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/flameShare`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 10
        // @Server question route no. 23
        // @crud u7
        // @desc Add union shares
        // @method Mutation/PATCH
        // @route /:id/unionShare
        // @access Private
        unionShareQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/unionShare`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 11
        // @Server question route no. 24
        // @crud u8
        // @desc Add flame like/unlike question
        // @method Mutation/PATCH
        // @route /:id/flameLike
        // @access Private
        flameLikeQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/flameLike`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 12
        // @Server question route no. 25
        // @crud u9
        // @desc Add union like/unlike question
        // @method Mutation/PATCH
        // @route /:id/unionLike
        // @access Private
        unionLikeQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/unionLike`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 13
        // @Server question route no. 26
        // @crud u10
        // @desc Add flame love/unlove question
        // @method Mutation/PATCH
        // @route /:id/flameLove
        // @access Private
        flameLoveQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/flameLove`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 13
        // @Server question route no. 27
        // @crud u11
        // @desc Add union love/unlove question
        // @method Mutation/PATCH
        // @route /:id/unionLove
        // @access Private
        unionLoveQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/unionLove`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 14
        // @Server question route no. 28
        // @crud u12
        // @desc Add flame flag/unflag question
        // @method Mutation/PATCH
        // @route /:id/flameFlag
        // @access Private
        flameFlagQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/flameFlag`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 15
        // @Server question route no. 29
        // @crud u13
        // @desc Add union flag/unflag question
        // @method Mutation/PATCH
        // @route /:id/unionFlag
        // @access Private
        unionFlagQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/unionFlag`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

        // @mutation 16
        // @Server question route no. 30
        // @crud u14
        // @desc report question
        // @method PATCH
        // @route /:id/report
        // @access private
        reportQuestion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `questions/${id}/report`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Question', id: id}
            ]
        }),

    }),   
});

export const {

    // Queries

    useGetQuestionQuery,
    useGetQuestionsQuery,
    useGetFlameQuestionsQuery,
    useGetUnionQuestionsQuery,
    useUserJourneyQuestionsQuery,
    useUserGroupQuestionsQuery,
    useUserCoachingQuestionsQuery,
    useUserFeedQuestionsQuery,
    useUnionJourneyQuestionsQuery,
    useUnionGroupQuestionsQuery,
    useUnionCoachingQuestionsQuery,
    useFlameTimelineQuestionsQuery,
    useUnionTimelineQuestionsQuery,

    // Mutations

    useCreateQuestionMutation,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation,
    useFlameViewMutation,
    useUnionViewMutation,
    useFlameAnswerQuestionMutation,
    useUnionAnswerQuestionMutation,
    useFlameShareQuestionMutation,
    useUnionShareQuestionMutation,
    useFlameLikeQuestionMutation,
    useUnionLikeQuestionMutation,
    useFlameLoveQuestionMutation,
    useUnionLoveQuestionMutation,
    useFlameFlagQuestionMutation,
    useUnionFlagQuestionMutation,
    useReportQuestionMutation,

} = questionsSlice;

// returns the query result object
export const selectQuestionsResult = questionsSlice.endpoints.getQuestions.select();

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