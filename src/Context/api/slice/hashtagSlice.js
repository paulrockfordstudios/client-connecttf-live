import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const hashtagsAdapter = createEntityAdapter({});

const initialState = hashtagsAdapter.getInitialState();

export const hashtagsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server user route no. 5
        // @crud r1
        // @desc Search hashtags
        // @method Query/GET
        // @route /search
        // @access private
        searchHashtags: builder.query({
            query: ({ q }) => '/users/search',
        }),

        // @query 2
        // @server user route no. 6
        // @crud r2
        // @desc Check/verify if hashtag document exists v.1
        // @method GET
        // @route /:value/checkExistance
        // @access private
        checkExistance1: builder.query({
            query: ({ value }) => `/${value}/checkExistance`,
        }),

        // @query 3
        // @server user route no. 7
        // @crud r3
        // @desc Check/verify if hashtag document exists v.2
        // @method GET
        // @route /:flare/:flareId/checkAdded
        // @access private
        checkExistance2: builder.query({
            query: ({ flare, flareId }) => `/${flare}/${flareId}/checkAdded`,
        }),

        // @query 3
        // @Server hashtag route no. 8
        // @crud r4
        // @desc Get Top 5 hashtags
        // @method GET
        // @route /topFive
        // @access private
        getTopFiveHashtags: builder.query({
            query: () => '/hashtags/topFive',
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
                        { type: 'T5Hashtag', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Hashtag', id }))
                    ]
                } else return [{ type: 'T5Hashtag', id: 'LIST' }];
            }
        }),

        // Mutations

        // @mutation 1
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
            /*
            invalidateTags: [
                {type: 'Hashtag', id: "LIST"}
            ]
            */
        }),

        // @mutation 2
        // @Server hashtag route no. 2
        // @crud d1
        // @desc Delete hashtag
        // @method Mutation/DELETE
        // @route /:value
        // @access Private
        deleteHashtag: builder.mutation({
            query: ({ value }) => ({
                url: `hashtags/${value}`,
                method: 'DELETE',
                body: { value },
            }),
            /*
            invalidateTags: (result, error, { value }) => [
                {type: 'Hashtag', value: value}
            ]
            */
        }),

        // @mutation 3
        // @Server hashtag route no. 3
        // @crud u1
        // @desc Add hashtag count
        // @method PATCH
        // @route /:value/:flareId/:flareType/add
        // @access private
        addHastagCnt: builder.mutation({
            query: ({ value, flareId, flareType }) => ({
                url: `hashtags/${value}/${flareId}/${flareType}/add`,
                method: 'PATCH',
            }),
            /*
            invalidateTags: (result, error, { value }) => [
                {type: 'Hashtag', value: value}
            ]
            */
        }),

        // @mutation 4
        // @Server hashtag route no. 4
        // @crud u2
        // @desc Subtract hashtag count
        // @method PATCH
        // @route /:value/:flareId/:flareType/subtract
        // @access private
        subtractHastagCnt: builder.mutation({
            query: ({ value, flareId, flareType }) => ({
                url: `hashtags/${value}/${flareId}/${flareType}/subtract`,
                method: 'PATCH',
            }),
            /*
            invalidateTags: (result, error, { value }) => [
                {type: 'Hashtag', value: value}
            ]
            */
        }),
    }),   
});

export const {

    // Queries

    useSearchHashtagsQuery,
    useCheckExistance1Query,
    useCheckExistance2Query,
    useGetTopFiveHashtagsQuery,

    // Mutations

    useCreateHashtagMutation,
    useDeleteHashtagMutation,
    useAddHashtagCntMutation,
    useSubtractHashtagCntMutation,

} = hashtagsSlice;


/*
// returns the query result object
export const selectHashtagsResult = hashtagsSlice.endpoints.getHashtags.select();

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
 */