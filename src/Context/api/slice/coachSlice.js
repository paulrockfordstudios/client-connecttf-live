import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const coachesAdapter = createEntityAdapter({});

const initialState = coachesAdapter.getInitialState();

export const coachesSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server coach route no. 4
        // @crud r1
        // @desc Get coach
        // @method Query/GET
        // @route /:id
        // @access Private
        getCoach: builder.query({
            query: ({ id }) => `/coachs/${id}`,
        }),

        // Qquery 2
        // @Server coach route no. 5
        // @crud r2
        // @desc Get all coachs
        // @method Query/GET
        // @route /all
        // @access Private
        getCoaches: builder.query({
            query: () => '/coachs/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedCoachs = responseData.map(coach => {
                    coach.id = coach._id
                    return coach;
                });
                return coachsAdapter.setAll(initialState, loadedCoachs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Coach', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Coach', id }))
                    ]
                } else return [{ type: 'Coach', id: 'LIST' }];
            }
        }),

        // Mutations


        // @mutation 1
        // @Server coach route no. 1
        // @crud c1
        // @desc Create coach
        // @method Mutation/POST
        // @route /
        // @access Private
        createCoach: builder.mutation({
            query: initialCoachData => ({
                url: '/coachs',
                method: 'POST',
                body: {...initialCoachData,}
            }),
            invalidateTags: [
                {type: 'Coach', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server coach route no. 2
        // @crud u1
        // @desc Update coach
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateCoach: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `coachs/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Coach', id: id}
            ]
        }),

        // @mutation 3
        // @Server coach route no. 3
        // @crud d1
        // @desc Delete coach
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteCoach: builder.mutation({
            query: ({ id }) => ({
                url: `coachs/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Coach', id: id}
            ]
        }),
    }),   
});

export const {

    // Queries

    useGetCoachQuery,
    useGetCoachesQuery,

    // Mutations 

    useCreateCoachMutation,
    useUpdateCoachMutation,
    useDeleteCoachMutation,
    
} = coachesSlice;

// returns the query result object
export const selectCoachesResult = coachesSlice.endpoints.getCoachs.select();

// creates memoized selector
const selectCoachesData = createSelector(
    selectCoachesResult,
    coachesResult => coachesResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllCoaches,
    selectById: selectByCoachId,
    selectIds: selectCoachIds,
    // Pass in memoized selector that returns coachs slice state
} = coachesAdapter.getSelectors(state => selectCoachesData(state) ?? initialState);