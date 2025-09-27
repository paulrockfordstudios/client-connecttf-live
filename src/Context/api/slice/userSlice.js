import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server user route no. 4
        // @crud r1
        // @desc Get user
        // @method Query/GET
        // @route /:id
        // @access Private
        getUser: builder.query({
            query: ({ id }) => `/users/${id}`,
        }),

        // @query 2
        // @server user route no. 5
        // @crud r2
        // @desc Get all users
        // @method Query/GET
        // @route /all
        // @access Private
        getUsers: builder.query({
            query: () => '/users/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }];
            }
        }),

        // @query 3
        // @server user route no. 6
        // @crud r3
        // @desc Search users
        // @method Query/GET
        // @route /search
        // @access private
        searchUsers: builder.query({
            query: ({ q }) => '/users/search',
        }),

        // @query 4
        // @server user route no. 7
        // @crud r4
        // @desc Get User's messaging
        // @method Query/GET
        // @route /:userId/messaging 
        // @access private
        getUserMessaging: builder.query({
            query: ({ userId }) => `/users/${userId}/messaging`,
        }),

        // @query 5
        // @server user route no. 8
        // @crud r5
        // @desc Get user's Introduction
        // @method Query/GET
        // @route /flame-name/:userId
        // access private 
        getUserIntro: builder.query({
            query: ({ userId }) => `/users/flame-name/${userId}`,
        }),

        // @query 6
        // @server user route no. 9
        // @crud r6
        // @desc Get ALL birthdays
        // @method Query/GET
        // @route /birthdays 
        // @access private
        getBirthdays: builder.query({
            query: () => '/users/birthdays',
        }),

        // @query 7
        // @server user route no. 13
        // @crud r7
        // @desc Get twin flame
        // @method Query/GET
        // @route /twin-flame/:userId
        // @access private
        getTwinFlame: builder.query({
            query: ({ userId }) => `/users/twin-flame/${userId}`,
        }),

        // @query 8
        // @server user route no. 15
        // @crud r8
        // @desc Get user's flame followers
        // @method Query/GET
        // @route /flame-followers/:userId
        // @access private
        userGetFlameFollowers: builder.query({
            query: ({ userId }) => `/users/flame-followers/${userId}`,
        }),

        // @query 9
        // @server user route no. 16
        // @crud r9
        // @desc Get user's flame following
        // @method Query/GET
        // @route /flame-following/:userId
        // @access private
        userGetFlameFollowing: builder.query({
            query: ({ userId }) => `/users/flame-following/${userId}`,
        }),

        // @query 10
        // @server user route no. 17
        // @crud r10
        // @desc Get user's union followers
        // @method Query/GET
        // @route /union-followers/:userId
        // @access private
        userGetUnionFollowers: builder.query({
            query: ({ userId }) => `/users/union-followers/${userId}`,
        }),

        // @query 11
        // @server user route no. 18
        // @crud r11
        // @desc Get user's union following
        // @method Query/GET
        // @route /union-following/:userId
        // @access private
        userGetUnionFollowing: builder.query({
            query: ({ userId }) => `/users/union-following/${userId}`,
        }),

        // @query 12
        // @server user route no. 27
        // @crud r12
        // @desc Get user's flame blockers
        // @method Query/GET
        // @route /flame-blockers/:userId
        // @access private
        userGetFlameBlockers: builder.query({
            query: ({ userId }) => `/users/flame-blockers/${userId}`,
        }),

        // @query 13
        // @server user route no. 28
        // @crud r13
        // @desc Get user's flame blocking
        // @method Query/GET
        // @route /flame-blocking/:userId
        // @access private
        userGetFlameBlocking: builder.query({
            query: ({ userId }) => `/users/flame-blocking/${userId}`,
        }),

        // @query 14
        // @server user route no. 29
        // @crud r14
        // @desc Get user's union blockers
        // @method Query/GET
        // @route /union-blockers/:userId
        // @access private
        userGetUnionBlockers: builder.query({
            query: ({ userId }) => `/users/union-blockers/${userId}`,
        }),

        // @query 15
        // @server user route no. 30
        // @crud r15
        // @desc Get user's union blocking
        // @method Query/GET
        // @route /union-blocking/:userId
        // @access private
        userGetUnionBlocking: builder.query({
            query: ({ userId }) => `/users/union-blocking/${userId}`,
        }),

        // @query 16
        // @server user route no. 35
        // @crud r16
        // @desc Get user's flame subscribers
        // @method Query/GET
        // @route /flame-subscribers/:userId
        // @access private
        userGetFlameSubscribers: builder.query({
            query: ({ userId }) => `/users/flame-subscribers/${userId}`,
        }),

        // @query 17
        // @server user route no. 36
        // @crud r17
        // @desc Get user's flame subscribing
        // @method Query/GET
        // @route /flame-subscribing/:userId
        // @access private
        userGetFlameSubscribing: builder.query({
            query: ({ userId }) => `/users/flame-subscribing/${userId}`,
        }),

        // @query 18
        // @server user route no. 36
        // @crud r18
        // @desc Get user's union subscribers
        // @method Query/GET
        // @route /union-subscribers/:userId
        // @access private
        userGetUnionSubscribers: builder.query({
            query: ({ userId }) => `/users/union-subscribers/${userId}`,
        }),

        // @query 19
        // @server user route no. 37
        // @crud 19
        // @desc Get user's union subscribing
        // @method Query/GET
        // @route /union-subscribing/:userId
        // @access private
        userGetUnionSubscribing: builder.query({
            query: ({ userId }) => `/users/union-subscribing/${userId}`,
        }),


        // Mutations

        // @mutation 1
        // @server user route no. 1
        // @crud c1
        // @desc Create user
        // @method Mutation/POST
        // @route /
        // @access Private
        createUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {...initialUserData,}
            }),
            invalidateTags: [
                {type: 'User', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @server user route no. 2
        // @crud u1
        // @desc Update user
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateUser: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 3
        // @server user route no. 3
        // @crud d1
        // @desc Delete user
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `users/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 4
        // @server user route no. 10
        // @crud u2
        // @desc Report user
        // @method Mutation/PATCH
        // @route /:id/report
        // @access private
        reportUser: builder.mutation({
            query: ({ id, reportId }) => ({
                url: `users/${id}/report`,
                method: 'PATCH',
                body: { reportId },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 5
        // @server user route no. 11
        // @crud u3
        // @desc Suspend user
        // @method Mutation/PATCH
        // @route /:id/suspend
        // @access private
        suspendUser: builder.mutation({
            query: ({ id, suspensionId }) => ({
                url: `users/${id}/suspend`,
                method: 'PATCH',
                body: { suspensionId },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 6
        // @server user route no. 12
        // @crud u4
        // @desc Blacklist user
        // @method Mutation/PATCH
        // @route /:id/blacklist
        // @access private
        blacklistUser: builder.mutation({
            query: ({ id, revocationId }) => ({
                url: `users/${id}/blacklist`,
                method: 'PATCH',
                body: { revocationId },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 7
        // @server user route no. 14
        // @crud u5
        // @desc Twin Flame Claim Request
        // @method Mutation/PATCH
        // @route /:userId/tfClaim
        // @access private
        tfClaimRequest: builder.mutation({
            query: ({ userId, ...patch }) => ({
                url: `users/${userId}/tfClaim`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 8
        // @server user route no. 19
        // @crud u6
        // @desc Flame follow flame
        // @method Mutation/PATCH
        // @route /:id/flame-flame/follow
        // @access private
        fFollowF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/flame-flame/follow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 9
        // @server user route no. 20
        // @crud u7
        // @desc Flame unfollow flame
        // @method Mutation/PATCH
        // @route /:id/flame-flame/unfollow
        // @access private
        fUnfollowF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/flame-flame/unfollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 10
        // @server user route no. 21
        // @crud u8
        // @desc Union follow flame
        // @method Mutation/PATCH
        // @route /:id/union-flame/follow
        // @access private
        uFollowF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/union-flame/follow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 11
        // @server user route no. 22
        // @crud u9
        // @desc Union unfollow flame
        // @method Mutation/PATCH
        // @route /:id/union-flame/unfollow
        // @access private
        uUnfollowF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/union-flame/unfollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 12
        // @server user route no. 23
        // @crud u10
        // @desc Flame request to follow flame
        // @method Mutation/PATCH
        // @route /:id/flame-flame/requestFollow
        // @access private
        fReqFollowF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/flame-flame/requestFollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 13
        // @server user route no. 24
        // @crud u11
        // @desc Flame remove request to follow flame
        // @method Mutation/PATCH
        // @route /:id/flame-flame/unrequestFollow
        // @access private
        fUnreqFollowF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/flame-flame/unrequestFollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 14
        // @server user route no. 25
        // @crud u12
        // @desc Union request to follow flame
        // @method Mutation/PATCH
        // @route /:id/union-flame/requestFollow
        // @access private
        uReqFollowF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/union-flame/requestFollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 15
        // @server user route no. 26
        // @crud u13
        // @desc Union remove request to follow flame
        // @method Mutation/PATCH
        // @route /:id/union-flame/unrequestFollow
        // @access private
        uUnreqFollowF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/union-flame/unrequestFollow`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 16
        // @server user route no. 31
        // @crud u14
        // @desc Flame block flame
        // @method Mutation/PATCH
        // @route /:id/flame-flame/block
        // @access private
        fBlockF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/flame-flame/block`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 17
        // @server user route no. 32
        // @crud u15
        // @desc Flame unblock flame
        // @method Mutation/PATCH
        // @route /:id/flame-flame/unblock
        // @access private
        fUnblockF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/flame-flame/unblock`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 18
        // @server user route no. 33
        // @crud 16
        // @desc Union block flame
        // @method Mutation/PATCH
        // @route /:id/union-flame/block
        // @access private
        uBlockF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/union-flame/block`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 19
        // @server user route no. 34
        // @crud 17
        // @desc Union unblock flame
        // @method Mutation/PATCH
        // @route /:id/union-flame/unblock
        // @access private
        uUnblockF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/union-flame/unblock`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 20
        // @server user route no. 39
        // @crud u18
        // @desc Flame subscribe flame
        // @method Mutation/PATCH
        // @route /:id/flame-flame/subscribe
        // @access private
        fSubscribeF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/flame-flame/subscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 21
        // @server user route no. 40
        // @crud u19
        // @desc Flame unsubscribe flame
        // @method Mutation/PATCH
        // @route /:id/flame-flame/unsubscribe
        // @access private
        fUnsubscribeF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/flame-flame/unsubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 22
        // @server user route no. 41
        // @crud u20
        // @desc Union subscribe flame
        // @method Mutation/PATCH
        // @route /:id/union-flame/subscribe
        // @access private
        uSubscribeF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/union-flame/subscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 23
        // @server user route no. 42
        // @crud u21
        // @desc Union unsubscribe flame
        // @method Mutation/PATCH
        // @route /:id/union-flame/unsubscribe
        // @access private
        uUnsubscribeF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/union-flame/unsubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 24
        // @server user route no. 43
        // @crud u22
        // @desc Flame request to subscribe flame
        // @method Mutation/PATCH
        // @route /:id/flame-flame/requestSubscribe
        // @access private
        fReqSubscribeF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/flame-flame/requestSubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 25
        // @server user route no. 44
        // @crud u23
        // @desc Flame remove request to subscribe flame
        // @method Mutation/PATCH
        // @route /:id/flame-flame/unrequestSubscribe
        // @access private
        fUnreqSubscribeF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/flame-flame/unrequestSubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 26
        // @server user route no. 45
        // @crud u24
        // @desc Union request to subscribe flame
        // @method Mutation/PATCH
        // @route /:id/union-flame/requestSubscribe
        // @access private
        uReqSubscribeF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/union-flame/requestSubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

        // @mutation 27
        // @server user route no. 46
        // @crud u25
        // @desc Union remove request to subscribe flame
        // @method Mutation/PATCH
        // @route /:id/union-flame/unrequestSubscribe
        // @access private
        uUnreqSubscribeF: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `users/${id}/union-flame/unrequestSubscribe`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'User', id: id}
            ]
        }),

    }),   
});


export const {

    // Queries

    useGetUserQuery,
    useGetUsersQuery,
    useSearchUsersQuery,
    useGetUserMessagingQuery,
    useGetUserIntroQuery,
    useGetBirthdaysQuery,
    useGetTwinFlameQuery,
    useUserGetFlameFollowersQuery,
    useUserGetFlameFollowingQuery,
    useUserGetUnionFollowersQuery,
    useUserGetUnionFollowingQuery,
    useUserGetFlameBlockersQuery,
    useUserGetFlameBlockingQuery,
    useUserGetUnionBlockersQuery,
    useUserGetUnionBlockingQuery, 
    useUserGetFlameSubscribersQuery,
    useUserGetFlameSubscribingQuery,
    useUserGetUnionSubscribersQuery,
    useUserGetUnionSubscribingQuery, 

    // Mutations

    useCreateUserMutation,
    useUpdateUserMutation,
    userDeleteUserMutation,
    useReportUserMutation,
    useSuspendUserMutation,
    useBlacklistUserMutation,
    useTfClaimRequestMutation,
    useFFollowFMutation,
    useFUnfollowFMutation,
    useUFollowFMutation,
    useUUnfollowFMutation,
    useFReqFollowFMutation,
    useFUnreqFollowFMutation,
    useUReqFollowFMutation,
    useUUnreqFollowFMutation,
    useFBlockFMutation,
    useFUnblockFMutation,
    useUBlockFMutation,
    useUUnblockFMutation,
    useFSubscribeFMutation,
    useFUnsubscribeFMutation,
    useUSubscribeFMutation,
    useUUnsubscribeFMutation,
    useFReqSubscribeFMutation,
    useFUnreqSubscribeFMutation,
    useUReqSubscribeFMutation,
    useUUnreqSubscribeFMutation,

} = usersSlice;

// returns the query result object
export const selectUsersResult = userSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllUsers,
    selectById: selectByUserId,
    selectIds: selectUserIds,
    // Pass in memoized selector that returns users slice state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);