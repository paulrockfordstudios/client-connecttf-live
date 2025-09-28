import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const imagesAdapter = createEntityAdapter({});

const initialState = imagesAdapter.getInitialState();

export const imagesSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Mutations

        // @Server image route no. 1
        // @crud c1
        // @desc Upload single image files to Aws3
        // @method POST
        // @route /s3Upload/single
        // @access priivate
        s3UploadSingle: builder.mutation({
            query: initialImageData => ({
                url: '/images/s3Upload/single',
                method: 'POST',
                body: {...initialImageData,}
            }),
            invalidateTags: [
                {type: 'Image', id: "LIST"}
            ]
        }),
    }),   
});

export const {

    // Mutations

     useS3UploadSingleMutation: s3UploadSingle,
    
} = imagesSlice;