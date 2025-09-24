import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const healersAdapter = createEntityAdapter({});

const initialState = healersAdapter.getInitialState();

export const healersSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server healer route no. 5
        // @crud r2
        // @desc Get all healers
        // @method Query/GET
        // @route /all
        // @access Private
        getHealers: builder.query({
            query: () => '/healers/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedHealers = responseData.map(healer => {
                    healer.id = healer._id
                    return healer;
                });
                return healersAdapter.setAll(initialState, loadedHealers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Healer', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Healer', id }))
                    ]
                } else return [{ type: 'Healer', id: 'LIST' }];
            }
        }),

        // @Server healer route no. 1
        // @crud c1
        // @desc Create healer
        // @method Mutation/POST
        // @route /
        // @access Private
        createHealer: builder.mutation({
            query: initialHealerData => ({
                url: '/healers',
                method: 'POST',
                body: {...initialHealerData,}
            }),
            invalidateTags: [
                {type: 'Healer', id: "LIST"}
            ]
        }),

        // @Server healer route no. 2
        // @crud u1
        // @desc Update healer
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateHealer: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `healers/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Healer', id: id}
            ]
        }),

        // @Server healer route no. 3
        // @crud d1
        // @desc Delete healer
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewHealer: builder.mutation({
            query: ({ id }) => ({
                url: `healers/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Healer', id: id}
            ]
        }),
    }),   
});

export const {
    useGetHealersQuery,
    useCreateHealerMutation,
    useUpdateHealerMutation,
    healerDeleteHealerMutation,
} = healersSlice;

// returns the query result object
export const selectHealersResult = healerSlice.endpoints.getHealers.select();

// creates memoized selector
const selectHealersData = createSelector(
    selectHealersResult,
    healersResult => healersResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllHealers,
    selectById: selectByHealerId,
    selectIds: selectHealerIds,
    // Pass in memoized selector that returns healers slice state
} = healersAdapter.getSelectors(state => selectHealersData(state) ?? initialState);