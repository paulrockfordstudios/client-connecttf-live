import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const traitTagsAdapter = createEntityAdapter({});

const initialState = traitTagsAdapter.getInitialState();

export const traitTagsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server user route no. 5
        // @crud r1
        // @desc Search traitTags
        // @method Query/GET
        // @route /search
        // @access private
        searchTraitTags: builder.query({
            query: ({ q }) => '/users/search',
        }),

        // @query 2
        // @server user route no. 6
        // @crud r2
        // @desc Check/verify if traitTag document exists v.1
        // @method GET
        // @route /:value/checkExistance
        // @access private
        checkExistance1: builder.query({
            query: ({ value }) => `/${value}/checkExistance`,
        }),

        // @query 3
        // @server user route no. 7
        // @crud r3
        // @desc Check/verify if traitTag document exists v.2
        // @method GET
        // @route /:flare/:flareId/checkAdded
        // @access private
        checkExistance2: builder.query({
            query: ({ flare, flareId }) => `/${flare}/${flareId}/checkAdded`,
        }),

        // @query 3
        // @Server traitTag route no. 8
        // @crud r4
        // @desc Get Top 5 traitTags
        // @method GET
        // @route /topFive
        // @access private
        getTopFiveTraitTags: builder.query({
            query: () => '/traitTags/topFive',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedTraitTags = responseData.map(traitTag => {
                    traitTag.id = traitTag._id
                    return traitTag;
                });
                return traitTagsAdapter.setAll(initialState, loadedTraitTags)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'T5TraitTag', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'TraitTag', id }))
                    ]
                } else return [{ type: 'T5TraitTag', id: 'LIST' }];
            }
        }),

        // Mutations

        // @mutation 1
        // @Server traitTag route no. 1
        // @crud c1
        // @desc Create traitTag
        // @method Mutation/POST
        // @route /
        // @access Private
        createTraitTag: builder.mutation({
            query: initialTraitTagData => ({
                url: '/traitTags',
                method: 'POST',
                body: {...initialTraitTagData,}
            }),
            /*
            invalidateTags: [
                {type: 'TraitTag', id: "LIST"}
            ]
            */
        }),

        // @mutation 2
        // @Server traitTag route no. 2
        // @crud d1
        // @desc Delete traitTag
        // @method Mutation/DELETE
        // @route /:value
        // @access Private
        deleteTraitTag: builder.mutation({
            query: ({ value }) => ({
                url: `traitTags/${value}`,
                method: 'DELETE',
                body: { value },
            }),
            /*
            invalidateTags: (result, error, { value }) => [
                {type: 'TraitTag', value: value}
            ]
            */
        }),

        // @mutation 3
        // @Server traitTag route no. 3
        // @crud u1
        // @desc Add traitTag count
        // @method PATCH
        // @route /:value/:flareId/:flareType/add
        // @access private
        addHastagCnt: builder.mutation({
            query: ({ value, flareId, flareType }) => ({
                url: `traitTags/${value}/${flareId}/${flareType}/add`,
                method: 'PATCH',
            }),
            /*
            invalidateTags: (result, error, { value }) => [
                {type: 'TraitTag', value: value}
            ]
            */
        }),

        // @mutation 4
        // @Server traitTag route no. 4
        // @crud u2
        // @desc Subtract traitTag count
        // @method PATCH
        // @route /:value/:flareId/:flareType/subtract
        // @access private
        subtractHastagCnt: builder.mutation({
            query: ({ value, flareId, flareType }) => ({
                url: `traitTags/${value}/${flareId}/${flareType}/subtract`,
                method: 'PATCH',
            }),
            /*
            invalidateTags: (result, error, { value }) => [
                {type: 'TraitTag', value: value}
            ]
            */
        }),
    }),   
});

export const {

    // Queries

    useSearchTraitTagsQuery,
    useCheckExistance1Query,
    useCheckExistance2Query,
    useGetTopFiveTraitTagsQuery,

    // Mutations

    useCreateTraitTagMutation,
    useDeleteTraitTagMutation,
    useAddTraitTagCntMutation,
    useSubtractTraitTagCntMutation,

} = traitTagsSlice;


/*
// returns the query result object
export const selectTraitTagsResult = traitTagsSlice.endpoints.getTraitTags.select();

// creates memoized selector
const selectTraitTagsData = createSelector(
    selectTraitTagsResult,
    traitTagsResult => traitTagsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllTraitTags,
    selectById: selectByTraitTagId,
    selectIds: selectTraitTagIds,
    // Pass in memoized selector that returns traitTags slice state
} = traitTagsAdapter.getSelectors(state => selectTraitTagsData(state) ?? initialState);
 */