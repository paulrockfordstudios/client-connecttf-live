import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const sharesAdapter = createEntityAdapter({});

const initialState = sharesAdapter.getInitialState();

export const sharesSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

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

        // @Server share route no. 3
        // @crud d1
        // @desc Delete share
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewShare: builder.mutation({
            query: ({ id }) => ({
                url: `shares/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Share', id: id}
            ]
        }),
    }),   
});

export const {
    useGetSharesQuery,
    useCreateShareMutation,
    useUpdateShareMutation,
    shareDeleteShareMutation,
} = sharesSlice;

// returns the query result object
export const selectSharesResult = shareSlice.endpoints.getShares.select();

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