import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const messageNotsAdapter = createEntityAdapter({});

const initialState = messageNotsAdapter.getInitialState();

export const messageNotsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server messageNot route no. 5
        // @crud r2
        // @desc Get all messageNots
        // @method Query/GET
        // @route /all
        // @access Private
        getMessageNots: builder.query({
            query: () => '/messageNots/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedMessageNots = responseData.map(messageNot => {
                    messageNot.id = messageNot._id
                    return messageNot;
                });
                return messageNotsAdapter.setAll(initialState, loadedMessageNots)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'MessageNot', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'MessageNot', id }))
                    ]
                } else return [{ type: 'MessageNot', id: 'LIST' }];
            }
        }),

        // @Server messageNot route no. 1
        // @crud c1
        // @desc Create messageNot
        // @method Mutation/POST
        // @route /
        // @access Private
        createMessageNot: builder.mutation({
            query: initialMessageNotData => ({
                url: '/messageNots',
                method: 'POST',
                body: {...initialMessageNotData,}
            }),
            invalidateTags: [
                {type: 'MessageNot', id: "LIST"}
            ]
        }),

        // @Server messageNot route no. 2
        // @crud u1
        // @desc Update messageNot
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateMessageNot: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `messageNots/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'MessageNot', id: id}
            ]
        }),

        // @Server messageNot route no. 3
        // @crud d1
        // @desc Delete messageNot
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewMessageNot: builder.mutation({
            query: ({ id }) => ({
                url: `messageNots/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'MessageNot', id: id}
            ]
        }),
    }),   
});

export const {
    useGetMessageNotsQuery,
    useCreateMessageNotMutation,
    useUpdateMessageNotMutation,
    messageNotDeleteMessageNotMutation,
} = messageNotsSlice;

// returns the query result object
export const selectMessageNotsResult = messageNotSlice.endpoints.getMessageNots.select();

// creates memoized selector
const selectMessageNotsData = createSelector(
    selectMessageNotsResult,
    messageNotsResult => messageNotsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllMessageNots,
    selectById: selectByMessageNotId,
    selectIds: selectMessageNotIds,
    // Pass in memoized selector that returns messageNots slice state
} = messageNotsAdapter.getSelectors(state => selectMessageNotsData(state) ?? initialState);