import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const flagsAdapter = createEntityAdapter({});

const initialState = flagsAdapter.getInitialState();

export const flagsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server flag route no. 5
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

        // @Server flag route no. 2
        // @crud u1
        // @desc Update flag
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateFlag: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `flags/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Flag', id: id}
            ]
        }),

        // @Server flag route no. 3
        // @crud d1
        // @desc Delete flag
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewFlag: builder.mutation({
            query: ({ id }) => ({
                url: `flags/${id}`,
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
    useGetFlagsQuery,
    useCreateFlagMutation,
    useUpdateFlagMutation,
    flagDeleteFlagMutation,
} = flagsSlice;

// returns the query result object
export const selectFlagsResult = flagSlice.endpoints.getFlags.select();

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