import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const suspensionsAdapter = createEntityAdapter({});

const initialState = suspensionsAdapter.getInitialState();

export const suspensionsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server suspension route no. 5
        // @crud r2
        // @desc Get all suspensions
        // @method Query/GET
        // @route /all
        // @access Private
        getSuspensions: builder.query({
            query: () => '/suspensions/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedSuspensions = responseData.map(suspension => {
                    suspension.id = suspension._id
                    return suspension;
                });
                return suspensionsAdapter.setAll(initialState, loadedSuspensions)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Suspension', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Suspension', id }))
                    ]
                } else return [{ type: 'Suspension', id: 'LIST' }];
            }
        }),

        // @Server suspension route no. 1
        // @crud c1
        // @desc Create suspension
        // @method Mutation/POST
        // @route /
        // @access Private
        createSuspension: builder.mutation({
            query: initialSuspensionData => ({
                url: '/suspensions',
                method: 'POST',
                body: {...initialSuspensionData,}
            }),
            invalidateTags: [
                {type: 'Suspension', id: "LIST"}
            ]
        }),

        // @Server suspension route no. 2
        // @crud u1
        // @desc Update suspension
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateSuspension: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `suspensions/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Suspension', id: id}
            ]
        }),

        // @Server suspension route no. 3
        // @crud d1
        // @desc Delete suspension
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewSuspension: builder.mutation({
            query: ({ id }) => ({
                url: `suspensions/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Suspension', id: id}
            ]
        }),
    }),   
});

export const {
    useGetSuspensionsQuery,
    useCreateSuspensionMutation,
    useUpdateSuspensionMutation,
    suspensionDeleteSuspensionMutation,
} = suspensionsSlice;

// returns the query result object
export const selectSuspensionsResult = suspensionSlice.endpoints.getSuspensions.select();

// creates memoized selector
const selectSuspensionsData = createSelector(
    selectSuspensionsResult,
    suspensionsResult => suspensionsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllSuspensions,
    selectById: selectBySuspensionId,
    selectIds: selectSuspensionIds,
    // Pass in memoized selector that returns suspensions slice state
} = suspensionsAdapter.getSelectors(state => selectSuspensionsData(state) ?? initialState);