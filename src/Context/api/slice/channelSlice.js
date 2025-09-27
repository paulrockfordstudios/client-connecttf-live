import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const channelsAdapter = createEntityAdapter({});

const initialState = channelsAdapter.getInitialState();

export const channelsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server channel route no. 4
        // @crud r1
        // @desc Get channel
        // @method Query/GET
        // @route /:id
        // @access Private
        getChannel: builder.query({
            query: ({ id }) => `/channels/${id}`,
        }),

        // Qquery 2
        // @Server channel route no. 5
        // @crud r2
        // @desc Get all channels
        // @method Query/GET
        // @route /all
        // @access Private
        getChannels: builder.query({
            query: () => '/channels/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedChannels = responseData.map(channel => {
                    channel.id = channel._id
                    return channel;
                });
                return channelsAdapter.setAll(initialState, loadedChannels)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Channel', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Channel', id }))
                    ]
                } else return [{ type: 'Channel', id: 'LIST' }];
            }
        }),

        // Mutations


        // @mutation 1
        // @Server channel route no. 1
        // @crud c1
        // @desc Create channel
        // @method Mutation/POST
        // @route /
        // @access Private
        createChannel: builder.mutation({
            query: initialChannelData => ({
                url: '/channels',
                method: 'POST',
                body: {...initialChannelData,}
            }),
            invalidateTags: [
                {type: 'Channel', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server channel route no. 2
        // @crud u1
        // @desc Update channel
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateChannel: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `channels/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Channel', id: id}
            ]
        }),

        // @mutation 3
        // @Server channel route no. 3
        // @crud d1
        // @desc Delete channel
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewChannel: builder.mutation({
            query: ({ id }) => ({
                url: `channels/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Channel', id: id}
            ]
        }),
    }),   
});

export const {

    // Queries

    useGetChannelQuery,
    useGetChannelsQuery,

    // Mutations 

    useCreateChannelMutation,
    useUpdateChannelMutation,
    channelDeleteChannelMutation,
    
} = channelsSlice;

// returns the query result object
export const selectChannelsResult = channelSlice.endpoints.getChannels.select();

// creates memoized selector
const selectChannelsData = createSelector(
    selectChannelsResult,
    channelsResult => channelsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllChannels,
    selectById: selectByChannelId,
    selectIds: selectChannelIds,
    // Pass in memoized selector that returns channels slice state
} = channelsAdapter.getSelectors(state => selectChannelsData(state) ?? initialState);