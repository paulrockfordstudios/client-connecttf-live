import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const conversationsAdapter = createEntityAdapter({});

const initialState = conversationsAdapter.getInitialState();

export const conversationsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server conversation route no. 5
        // @crud r2
        // @desc Get all conversations
        // @method Query/GET
        // @route /all
        // @access Private
        getConversations: builder.query({
            query: () => '/conversations/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedConversations = responseData.map(conversation => {
                    conversation.id = conversation._id
                    return conversation;
                });
                return conversationsAdapter.setAll(initialState, loadedConversations)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Conversation', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Conversation', id }))
                    ]
                } else return [{ type: 'Conversation', id: 'LIST' }];
            }
        }),

        // @Server conversation route no. 1
        // @crud c1
        // @desc Create conversation
        // @method Mutation/POST
        // @route /
        // @access Private
        createConversation: builder.mutation({
            query: initialConversationData => ({
                url: '/conversations',
                method: 'POST',
                body: {...initialConversationData,}
            }),
            invalidateTags: [
                {type: 'Conversation', id: "LIST"}
            ]
        }),

        // @Server conversation route no. 2
        // @crud u1
        // @desc Update conversation
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateConversation: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `conversations/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Conversation', id: id}
            ]
        }),

        // @Server conversation route no. 3
        // @crud d1
        // @desc Delete conversation
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewConversation: builder.mutation({
            query: ({ id }) => ({
                url: `conversations/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Conversation', id: id}
            ]
        }),
    }),   
});

export const {
    useGetConversationsQuery,
    useCreateConversationMutation,
    useUpdateConversationMutation,
    conversationDeleteConversationMutation,
} = conversationsSlice;

// returns the query result object
export const selectConversationsResult = conversationSlice.endpoints.getConversations.select();

// creates memoized selector
const selectConversationsData = createSelector(
    selectConversationsResult,
    conversationsResult => conversationsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllConversations,
    selectById: selectByConversationId,
    selectIds: selectConversationIds,
    // Pass in memoized selector that returns conversations slice state
} = conversationsAdapter.getSelectors(state => selectConversationsData(state) ?? initialState);