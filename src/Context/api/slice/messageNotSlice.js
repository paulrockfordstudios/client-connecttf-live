import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const messageNotsAdapter = createEntityAdapter({});

const initialState = messageNotsAdapter.getInitialState();

export const messageNotsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @Server messageNot route no. 2
        // @crud r1
        // @desc Get all user's message notifications
        // @method GET
        // @route /:receiverId
        // @access private
        getUserMessageNots: builder.query({
            query: ({ receiverId }) => `/messageNots/${receiverId}`,
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
                        { type: 'UserMessageNot', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'UserMessageNot', id }))
                    ]
                } else return [{ type: 'UserMessageNot', id: 'LIST' }];
            }
        }),

        // @query 2
        // @server flag route no. 3
        // @crud r2
        // @desc Query whether there is a unseen Message notification
        // @method GET
        // @route /:senderId/:receiverId
        // @access private
        queryUnseenMsg: builder.query({
            query: ({ senderId, receiverId }) => ({
                url: `/messageNots/${senderId}/${receiverId}`,
                method: 'GET',
            })
        }),

        // Mutations

        // @mutation 1
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
                body: {...initialMessageNotData}
            }),
            invalidateTags: [
                {type: 'MessageNot', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server messageNot route no. 4
        // @crud u1
        // @desc Update messageNot notification seen key
        // @method Mutation/PATCH
        // @route /:id/seen
        // @access Private
        updateMsgSeen: builder.mutation({
            query: ({ id }) => ({
                url: `messageNots/${id}/seen`,
                method: 'PATCH',
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'MessageNot', id: id}
            ]
        }),

        // Mutation 3
        // @Server messageNot route no. 5
        // @crud u2
        // @desc Add user to an unseen message notification
        // @method PATCH
        // @route /:id/add_message
        // @access private
        updateMsgRead: builder.mutation({
            query: ({ id }) => ({
                url: `messageNots/${id}/add_message`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'MessageNot', id: id}
            ]
        }),

        // Mutation 4
        // @Server messageNot route no. 6
        // @crud u3
        // @desc Add message to an unseen message notification
        // @method PATCH
        // @route /:id/add_message
        // @access private
        addMsg2Not: builder.mutation({
            query: ({ id }) => ({
                url: `messageNots/${id}/add_message`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'MessageNot', id: id}
            ]
        }),
    }),   
});

export const {

    // Queries

    useGetUserMessageNotsQuery,
    useQueryUnseenMsgQuery,

    // Mutations

    useCreateMessageNotMutation,
    useUpdateMsgSeenMutation,
    useUpdateMsgReadMutation,
    useAddMsg2NotMutation,

} = messageNotsSlice;

// returns the query result object
export const selectMessageNotsResult = messageNotsSlice.endpoints.getMessageNots.select();

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