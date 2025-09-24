import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const coachsAdapter = createEntityAdapter({});

const initialState = coachsAdapter.getInitialState();

export const coachsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server coach route no. 5
        // @crud r2
        // @desc Get all coachs
        // @method Query/GET
        // @route /all
        // @access Private
        getCoachs: builder.query({
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

        // @Server coach route no. 3
        // @crud d1
        // @desc Delete coach
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewCoach: builder.mutation({
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
    useGetCoachsQuery,
    useCreateCoachMutation,
    useUpdateCoachMutation,
    coachDeleteCoachMutation,
} = coachsSlice;

// returns the query result object
export const selectCoachsResult = coachSlice.endpoints.getCoachs.select();

// creates memoized selector
const selectCoachsData = createSelector(
    selectCoachsResult,
    coachsResult => coachsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllCoachs,
    selectById: selectByCoachId,
    selectIds: selectCoachIds,
    // Pass in memoized selector that returns coachs slice state
} = coachsAdapter.getSelectors(state => selectCoachsData(state) ?? initialState);