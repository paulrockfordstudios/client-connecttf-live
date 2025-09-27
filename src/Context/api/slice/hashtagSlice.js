import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const hashtagsAdapter = createEntityAdapter({});

const initialState = hashtagsAdapter.getInitialState();

export const hashtagsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server hashtag route no. 5
        // @crud r2
        // @desc Get all hashtags
        // @method Query/GET
        // @route /all
        // @access Private
        getHashtags: builder.query({
            query: () => '/hashtags/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedHashtags = responseData.map(hashtag => {
                    hashtag.id = hashtag._id
                    return hashtag;
                });
                return hashtagsAdapter.setAll(initialState, loadedHashtags)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Hashtag', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Hashtag', id }))
                    ]
                } else return [{ type: 'Hashtag', id: 'LIST' }];
            }
        }),

        // @Server hashtag route no. 1
        // @crud c1
        // @desc Create hashtag
        // @method Mutation/POST
        // @route /
        // @access Private
        createHashtag: builder.mutation({
            query: initialHashtagData => ({
                url: '/hashtags',
                method: 'POST',
                body: {...initialHashtagData,}
            }),
            invalidateTags: [
                {type: 'Hashtag', id: "LIST"}
            ]
        }),

        // @Server hashtag route no. 2
        // @crud u1
        // @desc Update hashtag
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateHashtag: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `hashtags/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Hashtag', id: id}
            ]
        }),

        // @Server hashtag route no. 3
        // @crud d1
        // @desc Delete hashtag
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewHashtag: builder.mutation({
            query: ({ id }) => ({
                url: `hashtags/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Hashtag', id: id}
            ]
        }),
    }),   
});

export const {
    useGetHashtagsQuery,
    useCreateHashtagMutation,
    useUpdateHashtagMutation,
    hashtagDeleteHashtagMutation,
} = hashtagsSlice;

// returns the query result object
export const selectHashtagsResult = hashtagSlice.endpoints.getHashtags.select();

// creates memoized selector
const selectHashtagsData = createSelector(
    selectHashtagsResult,
    hashtagsResult => hashtagsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllHashtags,
    selectById: selectByHashtagId,
    selectIds: selectHashtagIds,
    // Pass in memoized selector that returns hashtags slice state
} = hashtagsAdapter.getSelectors(state => selectHashtagsData(state) ?? initialState);