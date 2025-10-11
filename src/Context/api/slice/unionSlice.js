import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const unionsAdapter = createEntityAdapter({});

const initialState = unionsAdapter.getInitialState();

export const unionsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server union route no. 4
        // @crud r1
        // @desc Get union
        // @method Query/GET
        // @route /:id
        // @access Private
        getUnion: builder.query({
            query: ({ id }) => `/unions/${id}`,
        }),

        // @query 2
        // @server union route no. 5
        // @crud r2
        // @desc Get all unions
        // @method Query/GET
        // @route /all
        // @access Private
        getUnions: builder.query({
            query: () => '/unions/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUnions = responseData.map(union => {
                    union.id = union._id
                    return union;
                });
                return unionsAdapter.setAll(initialState, loadedUnions)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Union', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Union', id }))
                    ]
                } else return [{ type: 'Union', id: 'LIST' }];
            }
        }),

        // @query 3
        // @server union route no. 6
        // @crud r3
        // @desc Search unions
        // @method Query/GET
        // @route /search
        // @access private
        searchUnions: builder.query({
            query: ({ q }) => '/unions/search',
        }),

        // @query 4
        // @server union route no. 7
        // @crud r4
        // @desc Get Union's messaging
        // @method Query/GET
        // @route /:unionId/messaging 
        // @access private
        getUnionMessaging: builder.query({
            query: ({ unionId }) => `/unions/${unionId}/messaging`,
        }),

        // @query 5
        // @server union route no. 8
        // @crud r5
        // @desc Get union's Introduction
        // @method Query/GET
        // @route /flame-name/:unionId
        // access private 
        getUnionIntro: builder.query({
            query: ({ unionId }) => `/unions/flame-name/${unionId}`,
        }),

        // @query 6
        // @server union route no. 12
        // @crud r6
        // @desc Get union's flame followers
        // @method Query/GET
        // @route /flame-followers/:unionId
        // @access private
        unionGetFlameFollowers: builder.query({
            query: ({ unionId }) => `/unions/flame-followers/${unionId}`,
        }),

        // @query 7
        // @server union route no. 13
        // @crud r7
        // @desc Get union's flame following
        // @method Query/GET
        // @route /flame-following/:unionId
        // @access private
        unionGetFlameFollowing: builder.query({
            query: ({ unionId }) => `/unions/flame-following/${unionId}`,
        }),

        // @query 8
        // @server union route no. 14
        // @crud r8
        // @desc Get union's union followers
        // @method Query/GET
        // @route /union-followers/:unionId
        // @access private
        unionGetUnionFollowers: builder.query({
            query: ({ unionId }) => `/unions/union-followers/${unionId}`,
        }),

        // @query 9
        // @server union route no. 15
        // @crud r9
        // @desc Get union's union following
        // @method Query/GET
        // @route /union-following/:unionId
        // @access private
        unionGetUnionFollowing: builder.query({
            query: ({ unionId }) => `/unions/union-following/${unionId}`,
        }),

        // @query 10
        // @server union route no. 23
        // @crud r10
        // @desc Get union's flame blockers
        // @method Query/GET
        // @route /flame-blockers/:unionId
        // @access private
        unionGetFlameBlockers: builder.query({
            query: ({ unionId }) => `/unions/flame-blockers/${unionId}`,
        }),

        // @query 11
        // @server union route no. 24
        // @crud r11
        // @desc Get union's flame blocking
        // @method Query/GET
        // @route /flame-blocking/:unionId
        // @access private
        unionGetFlameBlocking: builder.query({
            query: ({ unionId }) => `/unions/flame-blocking/${unionId}`,
        }),

        // @query 12
        // @server union route no. 25
        // @crud r12
        // @desc Get union's union blockers
        // @method Query/GET
        // @route /union-blockers/:unionId
        // @access private
        unionGetUnionBlockers: builder.query({
            query: ({ unionId }) => `/unions/union-blockers/${unionId}`,
        }),

        // @query 13
        // @server union route no. 26
        // @crud r13
        // @desc Get union's union blocking
        // @method Query/GET
        // @route /union-blocking/:unionId
        // @access private
        unionGetUnionBlocking: builder.query({
            query: ({ unionId }) => `/unions/union-blocking/${unionId}`,
        }),

        // @query 14
        // @server union route no. 31
        // @crud r14
        // @desc Get union's flame subscribers
        // @method Query/GET
        // @route /flame-subscribers/:unionId
        // @access private
        unionGetFlameSubscribers: builder.query({
            query: ({ unionId }) => `/unions/flame-subscribers/${unionId}`,
        }),

        // @query 15
        // @server union route no. 32
        // @crud r15
        // @desc Get union's flame subscribing
        // @method Query/GET
        // @route /flame-subscribing/:unionId
        // @access private
        unionGetFlameSubscribing: builder.query({
            query: ({ unionId }) => `/unions/flame-subscribing/${unionId}`,
        }),

        // @query 16
        // @server union route no. 33
        // @crud r16
        // @desc Get union's union subscribers
        // @method Query/GET
        // @route /union-subscribers/:unionId
        // @access private
        unionGetUnionSubscribers: builder.query({
            query: ({ unionId }) => `/unions/union-subscribers/${unionId}`,
        }),

        // @query 17
        // @server union route no. 34
        // @crud 17
        // @desc Get union's union subscribing
        // @method Query/GET
        // @route /union-subscribing/:unionId
        // @access private
        unionGetUnionSubscribing: builder.query({
            query: ({ unionId }) => `/unions/union-subscribing/${unionId}`,
        }),


        // Mutations

        // @mutation 1
        // @server union route no. 1
        // @crud c1
        // @desc Create union
        // @method Mutation/POST
        // @route /
        // @access Private
        createUnion: builder.mutation({
            query: initialUnionData => ({
                url: '/unions',
                method: 'POST',
                body: {...initialUnionData,}
            }),
            invalidateTags: [
                {type: 'Union', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @server union route no. 2
        // @crud u1
        // @desc Update union
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateUnion: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `unions/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 3
        // @server union route no. 3
        // @crud d1
        // @desc Delete union
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteUnion: builder.mutation({
            query: ({ id }) => ({
                url: `unions/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 4
        // @server union route no. 10
        // @crud u2
        // @desc Report union
        // @method Mutation/PATCH
        // @route /:id/report
        // @access private
        reportUnion: builder.mutation({
            query: ({ id, reportId }) => ({
                url: `unions/${id}/report`,
                method: 'PATCH',
                body: { reportId },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 5
        // @server union route no. 11
        // @crud u3
        // @desc Suspend union
        // @method Mutation/PATCH
        // @route /:id/suspend
        // @access private
        suspendUnion: builder.mutation({
            query: ({ id, suspensionId }) => ({
                url: `unions/${id}/suspend`,
                method: 'PATCH',
                body: { suspensionId },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 6
        // @server union route no. 12
        // @crud u4
        // @desc Blacklist union
        // @method Mutation/PATCH
        // @route /:id/blacklist
        // @access private
        blacklistUnion: builder.mutation({
            query: ({ id, revocationId }) => ({
                url: `unions/${id}/blacklist`,
                method: 'PATCH',
                body: { revocationId },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 7
        // @server union route no. 16
        // @crud u5
        // @desc Union follow union
        // @method PATCH
        // @route /:id/u-union/follow
        // Access private
        uFollowUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/u-union/follow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 8
        // @server union route no. 17
        // @crud u6
        // @desc Union unfollow union
        // @method PATCH
        // @route /:id/u-union/unfollow
        // Access private
        uUnfollowUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/u-union/unfollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 9
        // @server union route no. 18
        // @crud u7
        // @desc flame follow union
        // @method Mutation/PATCH
        // @route /:id/f-union/follow
        // @access private
        fFollowUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/f-union/follow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 10
        // @server union route no. 19
        // @crud u8
        // @desc flame unfollow union
        // @method Mutation/PATCH
        // @route /:id/f-union/unfollow
        // @access private
        fUnfollowUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/f-union/unfollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 11
        // @server union route no. 20
        // @crud u9
        // @desc union request to follow union
        // @method Mutation/PATCH
        // @route /:id/u-union/requestFollow
        // @access private
        uReqFollowunion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/u-union/requestFollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 12
        // @server union route no. 21
        // @crud u10
        // @desc union remove request to follow union
        // @method Mutation/PATCH
        // @route /:id/u-union/unrequestFollow
        // @access private
        uUnreqFollowUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/u-union/unrequestFollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 13
        // @server union route no. 22
        // @crud u11
        // @desc flame request to follow union
        // @method Mutation/PATCH
        // @route /:id/f-union/requestFollow
        // @access private
        fReqFollowUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/f-union/requestFollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 14
        // @server union route no. 23
        // @crud u12
        // @desc flame remove request to follow union
        // @method Mutation/PATCH
        // @route /:id/f-union/unrequestFollow
        // @access private
        fUnreqFollowUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/f-union/unrequestFollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 15
        // @server union route no. 27
        // @crud u13
        // @desc union block union
        // @method Mutation/PATCH
        // @route /:id/u-union/block
        // @access private
        uBlockunion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/u-union/block`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 16
        // @server union route no. 28
        // @crud u14
        // @desc union unblock union
        // @method Mutation/PATCH
        // @route /:id/u-union/unblock
        // @access private
        uUnblockUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/u-union/unblock`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 17
        // @server union route no. 29
        // @crud 15
        // @desc flame block union
        // @method Mutation/PATCH
        // @route /:id/f-union/block
        // @access private
        fBlockUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/f-union/block`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 18
        // @server union route no. 30
        // @crud 16
        // @desc flame unblock flame
        // @method Mutation/PATCH
        // @route /:id/f-union/unblock
        // @access private
        fUnblockUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/f-union/unblock`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 19
        // @server union route no. 35
        // @crud u17
        // @desc union subscribe union
        // @method Mutation/PATCH
        // @route /:id/u-union/subscribe
        // @access private
        uSubscribeUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/u-union/subscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 20
        // @server union route no. 36
        // @crud u18
        // @desc Union unsubscribe union
        // @method Mutation/PATCH
        // @route /:id/u-union/unsubscribe
        // @access private
        uUnsubscribeUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/u-union/unsubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 21
        // @server union route no. 37
        // @crud u19
        // @desc flame subscribe union
        // @method Mutation/PATCH
        // @route /:id/f-union/subscribe
        // @access private
        fSubscribeUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/f-union/subscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 22
        // @server union route no. 38
        // @crud u20
        // @desc flame unsubscribe union
        // @method Mutation/PATCH
        // @route /:id/f-union/unsubscribe
        // @access private
        fUnsubscribeUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/f-union/unsubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 23
        // @server union route no. 39
        // @crud u21
        // @desc Union request to subscribe union
        // @method Mutation/PATCH
        // @route /:id/u-union/requestSubscribe
        // @access private
        uReqSubscribeUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/u-union/requestSubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 24
        // @server union route no. 40
        // @crud u22
        // @desc Union  remove request to subscribe union
        // @method Mutation/PATCH
        // @route /:id/u-union/unrequestSubscribe
        // @access private
        uUnreqSubscribeUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/u-union/unrequestSubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 25
        // @server union route no. 41
        // @crud u23
        // @desc flame request to subscribe union
        // @method Mutation/PATCH
        // @route /:id/f-union/requestSubscribe
        // @access private
        fReqSubscribeUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/f-union/requestSubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

        // @mutation 26
        // @server union route no. 42
        // @crud u24
        // @desc flame request to subscribe union
        // @method Mutation/PATCH
        // @route /:id/f-union/unrequestSubscribe
        // @access private
        fUnreqSubscribeUnion: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `unions/${id}/f-union/unrequestSubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),

    }),   
});


export const {

    // Queries

    useGetUnionQuery,
    useGetUnionsQuery,
    useSearchUnionsQuery,
    useGetUnionMessagingQuery,
    useGetUnionIntroQuery,
    useGetBirthdaysQuery,
    useGetTwinFlameQuery,
    useUnionGetFlameFollowersQuery,
    useUnionGetFlameFollowingQuery,
    useUnionGetUnionFollowersQuery,
    useUnionGetUnionFollowingQuery,
    useUnionGetFlameBlockersQuery,
    useUnionGetFlameBlockingQuery,
    useUnionGetUnionBlockersQuery,
    useUnionGetUnionBlockingQuery, 
    useUnionGetFlameSubscribersQuery,
    useUnionGetFlameSubscribingQuery,
    useUnionGetUnionSubscribersQuery,
    useUnionGetUnionSubscribingQuery, 

    // Mutations

    useCreateUnionMutation,
    useUpdateUnionMutation,
    unionDeleteUnionMutation,
    unioneportUnionMutation,
    useSuspendUnionMutation,
    useBlacklistUnionMutation,
    useTfClaimRequestMutation,
    useUFollowUnionMutation,
    useUUnfollowUnionMutation,
    useFFollowUnionMutation,
    useFUnfollowUnionMutation,
    useUReqFollowUnionMutation,
    useUUnreqFollowUnionMutation,
    useFReqFollowUnionMutation,
    useFUnreqFollowUnionMutation,
    useUBlockUnionMutation,
    useUUnblockUnionMutation,
    useFBlockUnionMutation,
    useFUnblockUnionMutation,  
    useUSubscribeUnionMutation,
    useUUnsubscribeUnionMutation,
    useFSubscribeUnionMutation,
    useFUnsubscribeUnionMutation,
    useUReqSubscribeUnionMutation,
    useUUnreqSubscribeUnionMutation,
    useFReqSubscribeUnionMutation,
    useFUnreqSubscribeUnionMutation, 

} = unionsSlice;

// returns the query result object
export const selectUnionsResult = unionsSlice.endpoints.getUnions.select();

// creates memoized selector
const selectUnionsData = createSelector(
    selectUnionsResult,
    unionsResult => unionsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllUnions,
    selectById: selectByUnionId,
    selectIds: selectUnionIds,
    // Pass in memoized selector that returns unions slice state
} = unionsAdapter.getSelectors(state => selectUnionsData(state) ?? initialState);