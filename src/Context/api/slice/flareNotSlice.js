import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const flareNotsAdapter = createEntityAdapter({});

const initialState = flareNotsAdapter.getInitialState();

export const flareNotsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server flareNot route no. 5
        // @crud r2
        // @desc Get all flareNots
        // @method Query/GET
        // @route /all
        // @access Private
        getFlareNots: builder.query({
            query: () => '/flareNots/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedFlareNots = responseData.map(flareNot => {
                    flareNot.id = flareNot._id
                    return flareNot;
                });
                return flareNotsAdapter.setAll(initialState, loadedFlareNots)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'FlareNot', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'FlareNot', id }))
                    ]
                } else return [{ type: 'FlareNot', id: 'LIST' }];
            }
        }),

        // @Server flareNot route no. 1
        // @crud c1
        // @desc Create flareNot
        // @method Mutation/POST
        // @route /
        // @access Private
        createFlareNot: builder.mutation({
            query: initialFlareNotData => ({
                url: '/flareNots',
                method: 'POST',
                body: {...initialFlareNotData,}
            }),
            invalidateTags: [
                {type: 'FlareNot', id: "LIST"}
            ]
        }),

        // @Server flareNot route no. 2
        // @crud u1
        // @desc Update flareNot
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateFlareNot: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `flareNots/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'FlareNot', id: id}
            ]
        }),

        // @Server flareNot route no. 3
        // @crud d1
        // @desc Delete flareNot
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewFlareNot: builder.mutation({
            query: ({ id }) => ({
                url: `flareNots/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'FlareNot', id: id}
            ]
        }),
    }),   
});

export const {
    useGetFlareNotsQuery,
    useCreateFlareNotMutation,
    useUpdateFlareNotMutation,
    flareNotDeleteFlareNotMutation,
} = flareNotsSlice;

// returns the query result object
export const selectFlareNotsResult = flareNotSlice.endpoints.getFlareNots.select();

// creates memoized selector
const selectFlareNotsData = createSelector(
    selectFlareNotsResult,
    flareNotsResult => flareNotsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllFlareNots,
    selectById: selectByFlareNotId,
    selectIds: selectFlareNotIds,
    // Pass in memoized selector that returns flareNots slice state
} = flareNotsAdapter.getSelectors(state => selectFlareNotsData(state) ?? initialState);