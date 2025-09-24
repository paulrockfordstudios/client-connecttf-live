import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const mediumsAdapter = createEntityAdapter({});

const initialState = mediumsAdapter.getInitialState();

export const mediumsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server medium route no. 5
        // @crud r2
        // @desc Get all mediums
        // @method Query/GET
        // @route /all
        // @access Private
        getMediums: builder.query({
            query: () => '/mediums/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedMediums = responseData.map(medium => {
                    medium.id = medium._id
                    return medium;
                });
                return mediumsAdapter.setAll(initialState, loadedMediums)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Medium', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Medium', id }))
                    ]
                } else return [{ type: 'Medium', id: 'LIST' }];
            }
        }),

        // @Server medium route no. 1
        // @crud c1
        // @desc Create medium
        // @method Mutation/POST
        // @route /
        // @access Private
        createMedium: builder.mutation({
            query: initialMediumData => ({
                url: '/mediums',
                method: 'POST',
                body: {...initialMediumData,}
            }),
            invalidateTags: [
                {type: 'Medium', id: "LIST"}
            ]
        }),

        // @Server medium route no. 2
        // @crud u1
        // @desc Update medium
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateMedium: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `mediums/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Medium', id: id}
            ]
        }),

        // @Server medium route no. 3
        // @crud d1
        // @desc Delete medium
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewMedium: builder.mutation({
            query: ({ id }) => ({
                url: `mediums/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Medium', id: id}
            ]
        }),
    }),   
});

export const {
    useGetMediumsQuery,
    useCreateMediumMutation,
    useUpdateMediumMutation,
    mediumDeleteMediumMutation,
} = mediumsSlice;

// returns the query result object
export const selectMediumsResult = mediumSlice.endpoints.getMediums.select();

// creates memoized selector
const selectMediumsData = createSelector(
    selectMediumsResult,
    mediumsResult => mediumsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllMediums,
    selectById: selectByMediumId,
    selectIds: selectMediumIds,
    // Pass in memoized selector that returns mediums slice state
} = mediumsAdapter.getSelectors(state => selectMediumsData(state) ?? initialState);