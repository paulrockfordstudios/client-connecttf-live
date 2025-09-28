import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const flagsAdapter = createEntityAdapter({});

const initialState = flagsAdapter.getInitialState();

export const flagsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server flag route no. 4
        // @crud r1
        // @desc Get flag
        // @method Query/GET
        // @route /:id
        // @access Private
        getFlag: builder.query({
            query: ({ id }) => `/flags/${id}`,
        }),

        // @query 2
        // @server flag route no. 5
        // @crud r2
        // @desc Get all flags
        // @method Query/GET
        // @route /all
        // @access Private
        getFlags: builder.query({
            query: () => '/flags/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedFlags = responseData.map(flag => {
                    flag.id = flag._id
                    return flag;
                });
                return flagsAdapter.setAll(initialState, loadedFlags)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Flag', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Flag', id }))
                    ]
                } else return [{ type: 'Flag', id: 'LIST' }];
            }
        }),

        // Mutations

        // @mutation 1
        // @Server flag route no. 1
        // @crud c1
        // @desc Create flag
        // @method Mutation/POST
        // @route /
        // @access Private
        createFlag: builder.mutation({
            query: initialFlagData => ({
                url: '/flags',
                method: 'POST',
                body: {...initialFlagData,}
            }),
            invalidateTags: [
                {type: 'Flag', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server flag route no. 2
        // @crud d1
        // @desc Delete flag
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteFlag: builder.mutation({
            query: ({ id }) => ({
                url: `flags/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Flag', id: id}
            ]
        }),

        // @mutation 3
        // @Server flag route no. 3
        // @crud d2
        // @desc Delete flag (verified)
        // @method DELETE
        // @route /:id/verified
        // @access private
        deleteFlagVerified: builder.mutation({
            query: ({ id }) => ({
                url: `flags/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Flag', id: id}
            ]
        }),
    }),   
});

export const {

    // Queries

    useGetFlagQuery,
    useGetFlagsQuery,

    // Mutations

    useCreateFlagMutation,
    useDeleteFlagMutation,
    useDeleteFlagVerifiedMutation,

} = flagsSlice;

// returns the query result object
export const selectFlagsResult = flagsSlice.endpoints.getFlags.select();

// creates memoized selector
const selectFlagsData = createSelector(
    selectFlagsResult,
    flagsResult => flagsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllFlags,
    selectById: selectByFlagId,
    selectIds: selectFlagIds,
    // Pass in memoized selector that returns flags slice state
} = flagsAdapter.getSelectors(state => selectFlagsData(state) ?? initialState);