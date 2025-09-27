import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const appealsAdapter = createEntityAdapter({});

const initialState = appealsAdapter.getInitialState();

export const appealsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server appeal route no. 5
        // @crud r1
        // @desc Get appeal
        // @method Query/GET
        // @route /:id
        // @access Private
        getAppeal: builder.query({
            query: ({ id }) => `/appeals/${id}`,
        }),

        // Query 2
        // @Server appeal route no. 6
        // @crud r2
        // @desc Get all appeals
        // @method Query/GET
        // @route /all
        // @access Private
        getAppeals: builder.query({
            query: () => '/appeals/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAppeals = responseData.map(appeal => {
                    appeal.id = appeal._id
                    return appeal;
                });
                return appealsAdapter.setAll(initialState, loadedAppeals)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Appeal', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Appeal', id }))
                    ]
                } else return [{ type: 'Appeal', id: 'LIST' }];
            }
        }),

        // Mutations

        // @Mutation 1
        // @Server appeal route no. 1
        // @crud c1
        // @desc Create appeal
        // @method Mutation/POST
        // @route /
        // @access Private
        createAppeal: builder.mutation({
            query: initialAppealData => ({
                url: '/appeals',
                method: 'POST',
                body: {...initialAppealData,}
            }),
            invalidateTags: [
                {type: 'Appeal', id: "LIST"}
            ]
        }),

        // @Mutation 2
        // @Server appeal route no. 2
        // @crud u1
        // @desc Update appeal
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateAppeal: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `appeals/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Appeal', id: id}
            ]
        }),

        // @Mutation 3
        // @Server appeal route no. 3
        // @crud d1
        // @desc Delete appeal
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteAppeal: builder.mutation({
            query: ({ id }) => ({
                url: `appeals/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Appeal', id: id}
            ]
        }),

        // @Mutation 4
        // @Server appeal route no. 4
        // @crud d2
        // @desc Delete appeal (verified)
        // @method Mutation/DELETE
        // @route /:id/verified
        // @access Private
        deleteAppeal: builder.mutation({
            query: ({ id }) => ({
                url: `appeals/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Appeal', id: id}
            ]
        }),

    }),   
});

export const {

    // Queries

    useGetAppealQuery,
    useGetAppealsQuery,

    // Mutations

    useCreateAppealMutation,
    useUpdateAppealMutation,
    useDeleteAppealMutation,
    useDeleteAppealVerifiedMutation,
    
} = appealsSlice;

// returns the query result object
export const selectAppealsResult = appealsSlice.endpoints.getAppeals.select();

// creates memoized selector
const selectAppealsData = createSelector(
    selectAppealsResult,
    appealsResult => appealsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllAppeals,
    selectById: selectByAppealId,
    selectIds: selectAppealIds,
    // Pass in memoized selector that returns appeals slice state
} = appealsAdapter.getSelectors(state => selectAppealsData(state) ?? initialState);