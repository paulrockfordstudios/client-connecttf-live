import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const advertisementsAdapter = createEntityAdapter({});

const initialState = advertisementsAdapter.getInitialState();

export const advertisementsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @no. 5
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
            keepUnusedDataFor: 5,
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
    }),   
});

export const {
    useGetAdvertisementsQuery,
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