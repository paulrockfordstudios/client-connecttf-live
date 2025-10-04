import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const flareNotsAdapter = createEntityAdapter({});

const initialState = flareNotsAdapter.getInitialState();

export const flareNotsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @Server flareNot route no. 2
        // @crud r1
        // @desc Get all user's flare notifications
        // @method GET
        // @route /:flareStarterId
        // @access private
        getFlareNots: builder.query({
            query: ({ flareStarterId }) => `/flareNots/${flareStarterId}`,
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

        // @query 2
        // @server flag route no. 3
        // @crud r2
        // @desc Query whether there is a unseen flare notification
        // @method GET
        // @route /:notType/:flareType/:flareId/:union/:seen
        // @access private
        queryFNSeen: builder.query({
            query: ({ notType, flareType, flareId, union, seen }) => ({
                url: `/flareNots/${notType}/${flareType}/${flareId}/${union}/${seen}`,
                method: 'GET',
            })
        }),

        // Mutations

        // @mutation 1
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

        // @mutation 2
        // @Server flareNot route no. 4
        // @crud u1
        // @desc Update flareNot
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateFNSeen: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `flareNots/${id}/seen`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'FlareNot', id: id}
            ]
        }),

        // Mutation 3
        // @Server flareNot route no. 5
        // @crud u2
        // @desc Add user to an unseen flare notification
        // @method PATCH
        // @route /:id/add_user
        // @access private
        flareNotAddUser: builder.mutation({
            query: ({ id }) => ({
                url: `flareNots/${id}/add_user`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'FlareNot', id: id}
            ]
        }),
    }),   
});

export const {

    // Queries

    useGetFlareNotsQuery,
    useQueryFNSeenQuery,

    // Mutations

    useCreateFlareNotMutation,
    useUpdateFNSeenMutation,
    useFlareNotAddUserMutation,

} = flareNotsSlice;

// returns the query result object
export const selectFlareNotsResult = flareNotsSlice.endpoints.getFlareNots.select();

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