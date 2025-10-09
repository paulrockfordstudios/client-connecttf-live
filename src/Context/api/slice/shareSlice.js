import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const sharesAdapter = createEntityAdapter({});

const initialState = sharesAdapter.getInitialState();

export const sharesSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server share route no. 5
        // @crud r1
        // @desc Get share
        // @method Query/GET
        // @route /:id
        // @access Private
        getShare: builder.query({
            query: ({ id }) => `/shares/${id}`,
        }),

        // @Server share route no. 5
        // @crud r2
        // @desc Get all shares
        // @method Query/GET
        // @route /all
        // @access Private
        getShares: builder.query({
            query: () => '/shares/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedShares = responseData.map(share => {
                    share.id = share._id
                    return share;
                });
                return sharesAdapter.setAll(initialState, loadedShares)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Share', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Share', id }))
                    ]
                } else return [{ type: 'Share', id: 'LIST' }];
            }
        }),

        // @query 3
        // @server share route no. 7
        // @crud r3
        // @desc Get flame user's shares
        // @method Query/GET
        // @route /flame/:userId
        // @access private
        getFlameShares: builder.query({
            query: ({ userId }) => `/shares/flame/${userId}`,
        }),

        // @query 4
        // @server share route no. 8
        // @crud r4
        // @desc Get flame union's shares
        // @method Query/GET
        // @route /union/:unionId
        // @access private
        getUnionShares: builder.query({
            query: ({ unionId }) => `/shares/union/${unionId}`,
        }),

        // @query 12
        // @server share route no. 16
        // @crud r12
        // @desc Get flame-timeline shares
        // @method Query/GET
        // @route /flame-timeline/:userId
        // @access private
        flameTimelineShares: builder.query({
            query: ({ userId }) => `/shares/flame-timeline/${userId}`,
        }),

        // @query 13
        // @server share route no. 17
        // @crud r13
        // @desc Get union-timeline shares
        // @method Query/GET
        // @route /union-timeline/:unionId
        // @access private
        unionTimelineShares: builder.query({
            query: ({ unionId }) => `/shares/union-timeline/${unionId}`,
        }),

        // @query 4
        // @server share route no. 22
        // @crud r4
        // @desc Get flare shares count
        // @method Query/GET
        // @route /:flareType/:flareId/count/:userId/:userBlocks
        // @access private
        getSharesFeedCnt: builder.query({
            query: ({ flareType, flareId, userId, userBlocks }) => ({
                url: `/shares/${flareType}/${flareId}/count/${userId}/${userBlocks}`
            }),
        }),

        // @query 6
        // @server share route no. 23
        // @crud r6
        // @desc Get flare shares paginated
        // @method Query/GET
        // @route /:flareType/:flareId/paginate/:pgCnt/:userId/:userBlocks/
        // @access private
        getPaginatedShares: builder.query({
            query: ({ flareType, flareId, pgCnt, userId, userBlocks }) => ({
                url: `/shares/${flareType}/${flareId}/paginate/${pgCnt}/${userId}/${userBlocks}`
            }),
        }),

        // Mutations

        // @mutation 1
        // @Server share route no. 1
        // @crud c1
        // @desc Create share
        // @method Mutation/POST
        // @route /
        // @access Private
        createShare: builder.mutation({
            query: initialShareData => ({
                url: '/shares',
                method: 'POST',
                body: {...initialShareData,}
            }),
            invalidateTags: [
                {type: 'Share', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server share route no. 2
        // @crud u1
        // @desc Update share
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 3
        // @Server share route no. 3
        // @crud d1
        // @desc Delete share
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteShare: builder.mutation({
            query: ({ id }) => ({
                url: `shares/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 4
        // @Server share route no. 4
        // @crud d2
        // @desc Delete share (verified)
        // @method Mutation/DELETE
        // @route /:id/verified
        // @access Private
        deleteShareVerified: builder.mutation({
            query: ({ id }) => ({
                url: `shares/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 5
        // @Server share route no. 11
        // @crud u2
        // @desc Add flame view
        // @method Mutation/PATCH
        // @route /:id/flameView
        // @access Private
        flameViewShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}/flameView`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 6
        // @Server share route no. 12
        // @crud u3
        // @desc Add union views
        // @method Mutation/PATCH
        // @route /:id/unionView
        // @access Private
        unionViewShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}/unionView`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 7
        // @Server share route no. 13
        // @crud u4
        // @desc Add flame Comments
        // @method Mutation/PATCH
        // @route /:id/flameComment
        // @access Private
        flameCommentShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}/flameComment`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 8
        // @Server share route no. 14
        // @crud u5
        // @desc Add union Comments
        // @method Mutation/PATCH
        // @route /:id/unionComment
        // @access Private
        unionCommentShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}/unionComment`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 9
        // @Server share route no. 15
        // @crud u6
        // @desc Add flame like/unlike share
        // @method Mutation/PATCH
        // @route /:id/flameLike
        // @access Private
        flameLikeShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}/flameLike`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 10
        // @Server share route no. 16
        // @crud u7
        // @desc Add union like/unlike share
        // @method Mutation/PATCH
        // @route /:id/unionLike
        // @access Private
        unionLikeShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}/unionLike`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 11
        // @Server share route no. 17
        // @crud u8
        // @desc Add flame love/unlove share
        // @method Mutation/PATCH
        // @route /:id/flameLove
        // @access Private
        flameLoveShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}/flameLove`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 12
        // @Server share route no. 18
        // @crud u9
        // @desc Add union love/unlove share
        // @method Mutation/PATCH
        // @route /:id/unionLove
        // @access Private
        unionLoveShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}/unionLove`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 13
        // @Server share route no. 19
        // @crud u10
        // @desc Add flame flag/unflag share
        // @method Mutation/PATCH
        // @route /:id/flameFlag
        // @access Private
        flameFlagShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}/flameFlag`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 14
        // @Server share route no. 20
        // @crud u11
        // @desc Add union flag/unflag share
        // @method Mutation/PATCH
        // @route /:id/unionFlag
        // @access Private
        unionFlagShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}/unionFlag`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

        // @mutation 15
        // @Server share route no. 21
        // @crud u12
        // @desc report share
        // @method PATCH
        // @route /:id/report
        // @access private
        reportShare: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `shares/${id}/report`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),

    }),   
});

export const {

    // Queries

    useGetShareQuery,
    useGetSharesQuery,
    useGetFlameSharesQuery,
    useGetUnionSharesQuery,
    useGetSharesFeedCntQuery,
    useGetPaginatedSharesQuery,

    // Mutations

    useCreateShareMutation,
    useUpdateShareMutation,
    useDeleteShareMutation,
    useFlameViewShareMutation,
    useUnionViewShareMutation,
    useFlameCommentShareMutation,
    useUnionCommentShareMutation,
    useFlameLikeShareMutation,
    useUnionLikeShareMutation,
    useFlameLoveShareMutation,
    useUnionLoveShareMutation,
    useFlameFlagShareMutation,
    useUnionFlagShareMutation,
    useReportShareMutation,

} = sharesSlice;

// returns the query result object
export const selectSharesResult = sharesSlice.endpoints.getShares.select();

// creates memoized selector
const selectSharesData = createSelector(
    selectSharesResult,
    sharesResult => sharesResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllShares,
    selectById: selectByShareId,
    selectIds: selectShareIds,
    // Pass in memoized selector that returns shares slice state
} = sharesAdapter.getSelectors(state => selectSharesData(state) ?? initialState);