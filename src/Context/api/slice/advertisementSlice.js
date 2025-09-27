import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const advertisementsAdapter = createEntityAdapter({});

const initialState = advertisementsAdapter.getInitialState();

export const advertisementsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server advertisement route no. 4
        // @crud r1
        // @desc Get advertisement
        // @method Query/GET
        // @route /:id
        // @access Private
        getAdvertisement: builder.query({
            query: ({ id }) => `/advertisements/${id}`,
        }),

        // @Query 2
        // @Server advertisement no. 5
        // @crud r2
        // @desc Get all advertisements
        // @method Query/GET
        // @route /all
        // @access Private
        getAdvertisements: builder.query({
            query: () => '/advertisements/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAdvertisements = responseData.map(advertisement => {
                    advertisement.id = advertisement._id
                    return advertisement;
                });
                return advertisementsAdapter.setAll(initialState, loadedAdvertisements)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Advertisement', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Advertisement', id }))
                    ]
                } else return [{ type: 'Advertisement', id: 'LIST' }];
            }
        }),

        // Mutations

        // @Mutation 1
        // @Server advertisement no. 1
        // @crud c1
        // @desc Create advertisement
        // @method Mutation/POST
        // @route /
        // @access Private
        createAdvertisement: builder.mutation({
            query: initialAdvertisementData => ({
                url: '/advertisements',
                method: 'POST',
                body: {...initialAdvertisementData,}
            }),
            invalidateTags: [
                {type: 'Advertisement', id: "LIST"}
            ]
        }),

        // @Mutation 2
        // @Server advertisement no. 2
        // @crud u1
        // @desc Update advertisement
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateAdvertisement: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `advertisements/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Advertisement', id: id}
            ]
        }),

        // Mutation 3
        // @Server advertisement no. 3
        // @crud d1
        // @desc Delete advertisement
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewAdvertisement: builder.mutation({
            query: ({ id }) => ({
                url: `advertisements/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Advertisement', id: id}
            ]
        }),
    }),   
});

export const {

    // Queries 

    useGetAdvertisementQuery,
    useGetAdvertisementsQuery,

    // Mutations

    useCreateAdvertisementMutation,
    useUpdateAdvertisementMutation,
    advertisementDeleteAdvertisementMutation,

} = advertisementsSlice;

// returns the query result object
export const selectAdvertisementsResult = advertisementSlice.endpoints.getAdvertisements.select();

// creates memoized selector
const selectAdvertisementsData = createSelector(
    selectAdvertisementsResult,
    advertisementsResult => advertisementsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllAdvertisements,
    selectById: selectByAdvertisementId,
    selectIds: selectAdvertisementIds,
    // Pass in memoized selector that returns advertisements slice state
} = advertisementsAdapter.getSelectors(state => selectAdvertisementsData(state) ?? initialState);