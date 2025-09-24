import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const unionsAdapter = createEntityAdapter({});

const initialState = unionsAdapter.getInitialState();

export const unionsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server union route no. 5
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

        // @Server union route no. 1
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

        // @Server union route no. 2
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

        // @Server union route no. 3
        // @crud d1
        // @desc Delete union
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewUnion: builder.mutation({
            query: ({ id }) => ({
                url: `unions/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Union', id: id}
            ]
        }),
    }),   
});

export const {
    useGetUnionsQuery,
    useCreateUnionMutation,
    useUpdateUnionMutation,
    unionDeleteUnionMutation,
} = unionsSlice;

// returns the query result object
export const selectUnionsResult = unionSlice.endpoints.getUnions.select();

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