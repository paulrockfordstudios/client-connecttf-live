import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const messagesAdapter = createEntityAdapter({});

const initialState = messagesAdapter.getInitialState();

export const messagesSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server message route no. 4
        // @crud r1
        // @desc Get message
        // @method Query/GET
        // @route /:id
        // @access Private
        getMessage: builder.query({
            query: ({ id }) => `/messages/${id}`,
        }),

        // @query 2
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

        // @query 3
        // @server message route no. 7
        // @crud r3
        // @desc Get messages count
        // @method Query/GET
        // @route /count/:conversationId
        // @access private
        getMessageCnt: builder.query({
            query: ({ conversationId }) => `/messages/count/${conversationId}`,
        }),

        // @query 4
        // @server message route no. 8
        // @crud r4
        // @desc Get latest message
        // @method Query/GET
        // @route /latest/:conversationId
        // @access private
        getLatestMsg: builder.query({
            query: ({ conversationId }) => `/messages/latest/${conversationId}`,
        }),

        // @query 5
        // @server message route no. 9
        // @crud r5
        // @desc Get unseen messages
        // @method Query/GET
        // @route /:conversationId/:receiverId/unseen
        // @access private
        getUnseenMessages: builder.query({
            query: ({ conversationId, receiverId }) => `/messages/${conversationId}/${receiverId}/unseen`,
        }),

        // @query 6
        // @server message route no. 10
        // @crud r6
        // @desc Get unred messages
        // @method Query/GET
        // @route /:conversationId/:receiverId/unread
        // @access private
        getUnreadMessages: builder.query({
            query: ({ conversationId, receiverId }) => `/messages/${conversationId}/${receiverId}/unread`,
        }),

        // @query 7
        // @server message route no. 15
        // @crud r7
        // @desc Get messages (paginated)
        // @method Query/GET
        // @route /:conversationId/:pgCnt
        // @access private
        getMsgsPaginated: builder.query({
            query: ({ conversationId, pgCnt }) => `/messages/${conversationId}/${pgCnt}`,
        }),

        // Mutations

        // @mutation 1
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

        // @mutation 2
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

        // @mutation 3
        // @Server message route no. 3
        // @crud d1
        // @desc Delete message
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteMessage: builder.mutation({
            query: ({ id }) => ({
                url: `messages/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Message', id: id}
            ]
        }),

        // @mutation 4
        // @Server message route no. 5
        // @crud d2
        // @desc Delete message (verified)
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteMessageVerified: builder.mutation({
            query: ({ id }) => ({
                url: `messages/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Message', id: id}
            ]
        }),

        // @mutation 5
        // @Server message route no. 11
        // @crud u2
        // @desc Update message seen
        // @method Mutation/PATCH
        // @route /:id/seen
        // @access private
        updateMsgSeen: builder.mutation({
            query: ({ id }) => ({
                url: `messages/${id}/seen`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Message', id: id}
            ]
        }),

        // @mutation 6
        // @Server message route no. 12
        // @crud u3
        // @desc Update message read
        // @method Mutation/PATCH
        // @route /:id/read
        // @access private
        updateMsgRead: builder.mutation({
            query: ({ id }) => ({
                url: `messages/${id}/read`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Message', id: id}
            ]
        }),

        // @mutation 7
        // @Server message route no. 13
        // @crud u4
        // @desc Update message liked
        // @method Mutation/PATCH
        // @route /:id/like
        // @access private
        updateMsgLiked: builder.mutation({
            query: ({ id }) => ({
                url: `messages/${id}/like`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Message', id: id}
            ]
        }),

        // @mutation 8
        // @Server message route no. 14
        // @crud u5
        // @desc Update message loved
        // @method Mutation/PATCH
        // @route /:id/love
        // @access private
        updateMsgLoved: builder.mutation({
            query: ({ id }) => ({
                url: `messages/${id}/love`,
                method: 'PATCH',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Message', id: id}
            ]
        }),
    }),   
});

export const {

    // Queries

    useGetMessageQuery,
    useGetMessagesQuery,
    useGetMessageCntQuery,
    useGetLatestMsg,
    useGetUnseenMessagesQuery,
    useGetUnreadMessagesQuery,
    useGetMsgsPaginated,

    // Mutations

    useCreateMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
    useDeleteMessageVerifiedMutation,
    useUpdateMsgSeenMutation,
    useUpdateMsgReadMutation,
    useUpdateMsgLikedMutation,
    useUpdateMsgLovedMutation,
    useUpdateMsgReportedMutation,

} = messagesSlice;

// returns the query result object
export const selectMessagesResult = messagesSlice.endpoints.getMessages.select();

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