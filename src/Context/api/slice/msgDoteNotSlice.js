import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const msgDoteNotsAdapter = createEntityAdapter({});

const initialState = msgDoteNotsAdapter.getInitialState();

export const msgDoteNotsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server msgDoteNot route no. 5
        // @crud r2
        // @desc Get all msgDoteNots
        // @method Query/GET
        // @route /all
        // @access Private
        getMsgDoteNots: builder.query({
            query: () => '/msgDoteNots/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedMsgDoteNots = responseData.map(msgDoteNot => {
                    msgDoteNot.id = msgDoteNot._id
                    return msgDoteNot;
                });
                return msgDoteNotsAdapter.setAll(initialState, loadedMsgDoteNots)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'MsgDoteNot', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'MsgDoteNot', id }))
                    ]
                } else return [{ type: 'MsgDoteNot', id: 'LIST' }];
            }
        }),

        // @Server msgDoteNot route no. 1
        // @crud c1
        // @desc Create msgDoteNot
        // @method Mutation/POST
        // @route /
        // @access Private
        createMsgDoteNot: builder.mutation({
            query: initialMsgDoteNotData => ({
                url: '/msgDoteNots',
                method: 'POST',
                body: {...initialMsgDoteNotData,}
            }),
            invalidateTags: [
                {type: 'MsgDoteNot', id: "LIST"}
            ]
        }),

        // @Server msgDoteNot route no. 2
        // @crud u1
        // @desc Update msgDoteNot
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateMsgDoteNot: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `msgDoteNots/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'MsgDoteNot', id: id}
            ]
        }),

        // @Server msgDoteNot route no. 3
        // @crud d1
        // @desc Delete msgDoteNot
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewMsgDoteNot: builder.mutation({
            query: ({ id }) => ({
                url: `msgDoteNots/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'MsgDoteNot', id: id}
            ]
        }),
    }),   
});

export const {
    useGetMsgDoteNotsQuery,
    useCreateMsgDoteNotMutation,
    useUpdateMsgDoteNotMutation,
    msgDoteNotDeleteMsgDoteNotMutation,
} = msgDoteNotsSlice;

// returns the query result object
export const selectMsgDoteNotsResult = msgDoteNotSlice.endpoints.getMsgDoteNots.select();

// creates memoized selector
const selectMsgDoteNotsData = createSelector(
    selectMsgDoteNotsResult,
    msgDoteNotsResult => msgDoteNotsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllMsgDoteNots,
    selectById: selectByMsgDoteNotId,
    selectIds: selectMsgDoteNotIds,
    // Pass in memoized selector that returns msgDoteNots slice state
} = msgDoteNotsAdapter.getSelectors(state => selectMsgDoteNotsData(state) ?? initialState);