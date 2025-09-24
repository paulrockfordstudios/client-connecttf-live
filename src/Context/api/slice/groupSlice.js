import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const groupsAdapter = createEntityAdapter({});

const initialState = groupsAdapter.getInitialState();

export const groupsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server group route no. 5
        // @crud r2
        // @desc Get all groups
        // @method Query/GET
        // @route /all
        // @access Private
        getGroups: builder.query({
            query: () => '/groups/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedGroups = responseData.map(group => {
                    group.id = group._id
                    return group;
                });
                return groupsAdapter.setAll(initialState, loadedGroups)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Group', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Group', id }))
                    ]
                } else return [{ type: 'Group', id: 'LIST' }];
            }
        }),

        // @Server group route no. 1
        // @crud c1
        // @desc Create group
        // @method Mutation/POST
        // @route /
        // @access Private
        createGroup: builder.mutation({
            query: initialGroupData => ({
                url: '/groups',
                method: 'POST',
                body: {...initialGroupData,}
            }),
            invalidateTags: [
                {type: 'Group', id: "LIST"}
            ]
        }),

        // @Server group route no. 2
        // @crud u1
        // @desc Update group
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateGroup: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `groups/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Group', id: id}
            ]
        }),

        // @Server group route no. 3
        // @crud d1
        // @desc Delete group
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewGroup: builder.mutation({
            query: ({ id }) => ({
                url: `groups/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Group', id: id}
            ]
        }),
    }),   
});

export const {
    useGetGroupsQuery,
    useCreateGroupMutation,
    useUpdateGroupMutation,
    groupDeleteGroupMutation,
} = groupsSlice;

// returns the query result object
export const selectGroupsResult = groupSlice.endpoints.getGroups.select();

// creates memoized selector
const selectGroupsData = createSelector(
    selectGroupsResult,
    groupsResult => groupsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllGroups,
    selectById: selectByGroupId,
    selectIds: selectGroupIds,
    // Pass in memoized selector that returns groups slice state
} = groupsAdapter.getSelectors(state => selectGroupsData(state) ?? initialState);