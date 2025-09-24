import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const imagesAdapter = createEntityAdapter({});

const initialState = imagesAdapter.getInitialState();

export const imagesSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @Server image route no. 5
        // @crud r2
        // @desc Get all images
        // @method Query/GET
        // @route /all
        // @access Private
        getImages: builder.query({
            query: () => '/images/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedImages = responseData.map(image => {
                    image.id = image._id
                    return image;
                });
                return imagesAdapter.setAll(initialState, loadedImages)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Image', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Image', id }))
                    ]
                } else return [{ type: 'Image', id: 'LIST' }];
            }
        }),

        // @Server image route no. 1
        // @crud c1
        // @desc Create image
        // @method Mutation/POST
        // @route /
        // @access Private
        createImage: builder.mutation({
            query: initialImageData => ({
                url: '/images',
                method: 'POST',
                body: {...initialImageData,}
            }),
            invalidateTags: [
                {type: 'Image', id: "LIST"}
            ]
        }),

        // @Server image route no. 2
        // @crud u1
        // @desc Update image
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateImage: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `images/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Image', id: id}
            ]
        }),

        // @Server image route no. 3
        // @crud d1
        // @desc Delete image
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewImage: builder.mutation({
            query: ({ id }) => ({
                url: `images/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Image', id: id}
            ]
        }),
    }),   
});

export const {
    useGetImagesQuery,
    useCreateImageMutation,
    useUpdateImageMutation,
    imageDeleteImageMutation,
} = imagesSlice;

// returns the query result object
export const selectImagesResult = imageSlice.endpoints.getImages.select();

// creates memoized selector
const selectImagesData = createSelector(
    selectImagesResult,
    imagesResult => imagesResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllImages,
    selectById: selectByImageId,
    selectIds: selectImageIds,
    // Pass in memoized selector that returns images slice state
} = imagesAdapter.getSelectors(state => selectImagesData(state) ?? initialState);