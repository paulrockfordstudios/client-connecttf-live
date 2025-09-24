import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const traitTagsAdapter = createEntityAdapter({});

const initialState = traitTagsAdapter.getInitialState();

export const traitTagsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server traitTag route no. 5
        // @crud r2
        // @desc Get all traitTags
        // @method Query/GET
        // @route /all
        // @access Private
        getTraitTags: builder.query({
            query: () => '/traitTags/all',
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
                        { type: 'TraitTag', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'TraitTag', id }))
                    ]
                } else return [{ type: 'TraitTag', id: 'LIST' }];
            }
        }),

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
            invalidateTags: [
                {type: 'TraitTag', id: "LIST"}
            ]
        }),

        // @Server traitTag route no. 2
        // @crud u1
        // @desc Update traitTag
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateTraitTag: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `traitTags/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'TraitTag', id: id}
            ]
        }),

        // @Server traitTag route no. 3
        // @crud d1
        // @desc Delete traitTag
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewTraitTag: builder.mutation({
            query: ({ id }) => ({
                url: `traitTags/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'TraitTag', id: id}
            ]
        }),
    }),   
});

export const {
    useGetTraitTagsQuery,
    useCreateTraitTagMutation,
    useUpdateTraitTagMutation,
    traitTagDeleteTraitTagMutation,
} = traitTagsSlice;

// returns the query result object
export const selectTraitTagsResult = traitTagSlice.endpoints.getTraitTags.select();

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