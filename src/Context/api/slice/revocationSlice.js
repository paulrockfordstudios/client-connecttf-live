import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const revocationsAdapter = createEntityAdapter({});

const initialState = revocationsAdapter.getInitialState();

export const revocationsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server revocation route no. 5
        // @crud r1
        // @desc Get revocation
        // @method Query/GET
        // @route /:id
        // @access Private
        getRevocation: builder.query({
            query: ({ id }) => `/revocations/${id}`,
        }),

        // @query 2
        // @Server revocation route no. 5
        // @crud r2
        // @desc Get all revocations
        // @method Query/GET
        // @route /all
        // @access Private
        getRevocations: builder.query({
            query: () => '/revocations/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedRevocations = responseData.map(revocation => {
                    revocation.id = revocation._id
                    return revocation;
                });
                return revocationsAdapter.setAll(initialState, loadedRevocations)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Revocation', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Revocation', id }))
                    ]
                } else return [{ type: 'Revocation', id: 'LIST' }];
            }
        }),

        // @query 3
        // @server revocation route no. 7
        // @crud r3
        // @desc Get flame user's revocations
        // @method Query/GET
        // @route /flame/:userId
        // @access private
        getFlameRevocations: builder.query({
            query: ({ userId }) => `/revocations/flame/${userId}`,
        }),

        // @query 4
        // @server revocation route no. 8
        // @crud r4
        // @desc Get flame union's revocations
        // @method Query/GET
        // @route /union/:unionId
        // @access private
        getUnionRevocations: builder.query({
            query: ({ unionId }) => `/revocations/union/${unionId}`,
        }),

        // Mutations

        // @mutation 1
        // @Server revocation route no. 1
        // @crud c1
        // @desc Create revocation
        // @method Mutation/POST
        // @route /
        // @access Private
        createRevocation: builder.mutation({
            query: initialRevocationData => ({
                url: '/revocations',
                method: 'POST',
                body: {...initialRevocationData,}
            }),
            invalidateTags: [
                {type: 'Revocation', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server revocation route no. 2
        // @crud u1
        // @desc Update revocation
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateRevocation: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `revocations/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Revocation', id: id}
            ]
        }),

        // @mutation 3
        // @Server revocation route no. 3
        // @crud d1
        // @desc Delete revocation
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteRevocation: builder.mutation({
            query: ({ id }) => ({
                url: `revocations/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Revocation', id: id}
            ]
        }),

        // @mutation 4
        // @Server revocation route no. 3
        // @crud d1
        // @desc Delete revocation (verified)
        // @method Mutation/DELETE
        // @route /:id/verified
        // @access Private
        deleteRevocationVerified: builder.mutation({
            query: ({ id }) => ({
                url: `revocations/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Revocation', id: id}
            ]
        }),

    }),   
});

export const {

    // Queries

    useGetRevocationQuery,
    useGetRevocationsQuery,
    useGetFlameRevocationsQuery,
    useGetUnionRevocationsQuery,

    // Mutations

    useCreateRevocationMutation,
    useUpdateRevocationMutation,
    useDeleteRevocationMutation,
    useDeleteRevocationVerifiedMutation,

} = revocationsSlice;

// returns the query result object
export const selectRevocationsResult = revocationsSlice.endpoints.getRevocations.select();

// creates memoized selector
const selectRevocationsData = createSelector(
    selectRevocationsResult,
    revocationsResult => revocationsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllRevocations,
    selectById: selectByRevocationId,
    selectIds: selectRevocationIds,
    // Pass in memoized selector that returns revocations slice state
} = revocationsAdapter.getSelectors(state => selectRevocationsData(state) ?? initialState);