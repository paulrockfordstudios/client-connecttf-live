import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const answersAdapter = createEntityAdapter({});

const initialState = answersAdapter.getInitialState();

export const answersSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server answer route no. 4
        // @crud r1
        // @desc Get answer
        // @method Query/GET
        // @route /:id
        // @access Private
        getAnswer: builder.query({
            query: ({ id }) => `/answers/${id}`,
        }),

        // @Query 2
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

        // @query 3
        // @server answer route no. 7
        // @crud r3
        // @desc Get question answers
        // @method Query/GET
        // @route/question/:questionId
        // @access Private
        getQuestionAnswers: builder.query({
            query: ({ questionId }) => `answers/question/${questionId}`,
        }),

        // @query 4
        // @server answer route no. 8
        // @crud r4
        // @desc Get flame's answers
        // @method Query/GET
        // @route/flame-profile/:username
        // @access Private
        getFlameAnswers: builder.query({
            query: ({ username }) => `answers/flame-profile/${username}`,
        }),

        // @query 5
        // @server answer route no. 8
        // @crud r4
        // @desc Get union's answers
        // @method Query/GET
        // @route/union-profile/:unionName
        // @access Private
        getUnionAnswers: builder.query({
            query: ({ unionName }) => `answers/union-profile/${unionName}`,
        }),

        // @query 6
        // @server answer route no. 10
        // @crud r6
        // @desc Get flame's timeline answers
        // @method Query/GET
        // @route/flame-timeline/:userId
        // @access Private
        getFlameTimelineAnswers: builder.query({
            query: ({ userId }) => `answers/flame-timeline/${userId}`,
        }),

        // @query 7
        // @server answer route no. 11
        // @crud r7
        // @desc Get union's timeline answers
        // @method Query/GET
        // @route/union-timeline/:unionId
        // @access Private
        getUnionTimelineAnswers: builder.query({
            query: ({ unionId }) => `answers/union-timeline/${unionId}`,
        }),

        // @query 8
        // @server answer route no. 20
        // @crud r8
        // @desc Get flare answers count
        // @method Query/GET
        // @route /:flareType/:flareId/count/:entityId/:userBlocks
        // @access private
        getAnswerCnt: builder.query({
            query: ({ flareType, flareId, entityId, userBlocks }) => ({
                url: `answers/${flareType}/${flareId}/count/${entityId}/${userBlocks}`,
                method: 'GET',
            })
        }),

        // @query 9
        // @server answer route no. 21
        // @crud r9
        // @desc Get first two or three flare answers
        // @method Query/GET
        // @route /:flareType/:flareId/initial/:entityId/:userBlocks/:count
        // @access private
        getInitialAnswerCnt: builder.query({
            query: ({ flareType, flareId, entityId, userBlocks, count }) => ({
                url: `answers/${flareType}/${flareId}/initial/${entityId}/${userBlocks}/${count}`,
                method: 'GET',
            })
        }),

        // @query 10
        // @server answer route no. 22
        // @crud r10
        // @desc Get flare answers paginate
        // @method Query/GET
        // @route /:flareType/:flareId/paginate/:pgCnt/:entityId/:userBlocks/:count
        // @access private
        paginateAnswers: builder.query({
            query: ({ flareType, flareId, entityId, userBlocks, pgCnt }) => ({
                url: `answers/${flareType}/${flareId}/paginate/${pgCnt}/${entityId}/${userBlocks}`,
                method: 'GET',
            })
        }),

        // Mutations

        // @Mutation 1
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

        // @Mutation 2
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

        // @Mutation 3
        // @Server answer route no. 3
        // @crud d1
        // @desc Delete answer
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteAnswer: builder.mutation({
            query: ({ id }) => ({
                url: `answers/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }),

        // @Mutation 4
        // @Server answer route no. 4
        // @crud d2
        // @desc Delete answer (verified)
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteAnswerVerified: builder.mutation({
            query: ({ id }) => ({
                url: `answers/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }),

        // @Mutation 5
        // @Server answer route no. 12
        // @crud u2
        // @desc flame like/unlike answer
        // @method Mutation/PATCH
        // @route /:id/flameLike"
        // @access private
        flameLikeAnswer: builder.mutation({
            query: ({ id }) => ({
                url: `answers/${id}/flameLike`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }),

        // @Mutation 6
        // @Server answer route no. 13
        // @crud u3
        // @desc flame like/unlike answer
        // @method Mutation/PATCH
        // @route /:id/unionLike"
        // @access private
        unionLikeAnswer: builder.mutation({
            query: ({ id }) => ({
                url: `answers/${id}/unionLike`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }),

        // @Mutation 7
        // @Server answer route no. 14
        // @crud u4
        // @desc flame love/unlove answer
        // @method Mutation/PATCH
        // @route /:id/flameLove"
        // @access private
        flameLoveAnswer: builder.mutation({
            query: ({ id }) => ({
                url: `answers/${id}/flameLove`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }),

        // @Mutation 8
        // @Server answer route no. 15
        // @crud u5
        // @desc flame love/unlove answer
        // @method Mutation/PATCH
        // @route /:id/unionLove"
        // @access private
        unionLoveAnswer: builder.mutation({
            query: ({ id }) => ({
                url: `answers/${id}/unionLove`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }),

        // @Mutation 9
        // @Server answer route no. 16
        // @crud u6
        // @desc flame flag/unflag answer
        // @method Mutation/PATCH
        // @route /:id/flameFlag"
        // @access private
        flameFlagAnswer: builder.mutation({
            query: ({ id }) => ({
                url: `answers/${id}/flameFlag`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }),

        // @Mutation 10
        // @Server answer route no. 17
        // @crud u7
        // @desc flame flag/unflag answer
        // @method Mutation/PATCH
        // @route /:id/unionFlag"
        // @access private
        unionFlagAnswer: builder.mutation({
            query: ({ id }) => ({
                url: `answers/${id}/unionFlag`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }), 

        // @Mutation 11
        // @Server answer route no. 18
        // @crud u8
        // @desc flame reply/unreply answer
        // @method Mutation/PATCH
        // @route /:id/flameReply"
        // @access private
        flameReplyAnswer: builder.mutation({
            query: ({ id }) => ({
                url: `answers/${id}/flameReply`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }),

        // @Mutation 12
        // @Server answer route no. 19
        // @crud u9
        // @desc flame reply/unreply answer
        // @method Mutation/PATCH
        // @route /:id/unionReply"
        // @access private
        unionReplyAnswer: builder.mutation({
            query: ({ id }) => ({
                url: `answers/${id}/unionReply`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Answer', id: id}
            ]
        }), 

    }),   
});

export const {

    // Queries

    useGetAnswerQuery,
    useGetAnswersQuery,
    useGetQuestionAnswersQuery,
    useGetFlameAnswersQuery,
    useGetUnionAnswersQuery,
    useGetFlameTimelineAnswersQuery,
    useGetUnionTimelineAnswersQuery,
    useGetAnswerCntQuery,
    useGetInitialAnswerCntQuery,
    usePaginateAnswersQuery,

    // Mutations

    useCreateAnswerMutation,
    useUpdateAnswerMutation,
    useDeleteAnswerMutation,
    useDeleteAnswerVerifiedMutation,
    useFlameLikeAnswerMutation,
    useUnionLikeAnswerMutation,
    useFlameLoveAnswerMutation,
    useUnionLoveAnswerMutation,
    useFlameFlagAnswerMutation,
    useUnionFlagAnswerMutation,
    useFlameReplyAnswerMutation,
    useUnionReplyAnswerMutation,

} = answersSlice;

// returns the query result object
export const selectAnswersResult = answersSlice.endpoints.getAnswers.select();

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