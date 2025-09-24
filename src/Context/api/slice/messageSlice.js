import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const messagesAdapter = createEntityAdapter({});

const initialState = messagesAdapter.getInitialState();

export const messagesSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server message route no. 5
        // @crud r2
        // @desc Get all messages
        // @method Query/GET
        // @route /all
        // @access Private
        getMessages: builder.query({
            query: () => '/messages/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedMessages = responseData.map(message => {
                    message.id = message._id
                    return message;
                });
                return messagesAdapter.setAll(initialState, loadedMessages)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Message', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Message', id }))
                    ]
                } else return [{ type: 'Message', id: 'LIST' }];
            }
        }),

        // @Server message route no. 1
        // @crud c1
        // @desc Create message
        // @method Mutation/POST
        // @route /
        // @access Private
        createMessage: builder.mutation({
            query: initialMessageData => ({
                url: '/messages',
                method: 'POST',
                body: {...initialMessageData,}
            }),
            invalidateTags: [
                {type: 'Message', id: "LIST"}
            ]
        }),

        // @Server message route no. 2
        // @crud u1
        // @desc Update message
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateMessage: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `messages/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Message', id: id}
            ]
        }),

        // @Server message route no. 3
        // @crud d1
        // @desc Delete message
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewMessage: builder.mutation({
            query: ({ id }) => ({
                url: `messages/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Message', id: id}
            ]
        }),
    }),   
});

export const {
    useGetMessagesQuery,
    useCreateMessageMutation,
    useUpdateMessageMutation,
    messageDeleteMessageMutation,
} = messagesSlice;

// returns the query result object
export const selectMessagesResult = messageSlice.endpoints.getMessages.select();

// creates memoized selector
const selectMessagesData = createSelector(
    selectMessagesResult,
    messagesResult => messagesResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllMessages,
    selectById: selectByMessageId,
    selectIds: selectMessageIds,
    // Pass in memoized selector that returns messages slice state
} = messagesAdapter.getSelectors(state => selectMessagesData(state) ?? initialState);