import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const reportsAdapter = createEntityAdapter({});

const initialState = reportsAdapter.getInitialState();

export const reportsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

        // @query 1
        // @server report route no. 5
        // @crud r1
        // @desc Get report
        // @method Query/GET
        // @route /:id
        // @access Private
        getReport: builder.query({
            query: ({ id }) => `/replies/${id}`,
        }),

        // @query 2
        // @Server report route no. 5
        // @crud r2
        // @desc Get all reports
        // @method Query/GET
        // @route /all
        // @access Private
        getReports: builder.query({
            query: () => '/reports/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedReports = responseData.map(report => {
                    report.id = report._id
                    return report;
                });
                return reportsAdapter.setAll(initialState, loadedReports)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Report', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Report', id }))
                    ]
                } else return [{ type: 'Report', id: 'LIST' }];
            }
        }),

        // @query 3
        // @server report route no. 7
        // @crud r3
        // @desc Get flame's reports
        // @method GET
        // @route /flame/:userId
        // @access private
        getFlameReports: builder.query({
            query: ({ userId }) => `/replies/flame/${userId}`,
        }),

        // @query 4
        // @server report route no. 8
        // @crud r4
        // @desc Get union's reports
        // @method GET
        // @route /union/:unionId
        // @access private
        getUnionReports: builder.query({
            query: ({ unionId }) => `/replies/union/${unionId}`,
        }),

        // Mutations

        // @mutation 1
        // @Server report route no. 1
        // @crud c1
        // @desc Create report
        // @method Mutation/POST
        // @route /
        // @access Private
        createReport: builder.mutation({
            query: initialReportData => ({
                url: '/reports',
                method: 'POST',
                body: {...initialReportData,}
            }),
            invalidateTags: [
                {type: 'Report', id: "LIST"}
            ]
        }),

        // @mutation 2
        // @Server report route no. 2
        // @crud u1
        // @desc Update report
        // @method Mutation/PATCH
        // @route /:id
        // @access Private
        updateReport: builder.mutation({
            query: ({ id, ...patch}) => ({
                url: `reports/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Report', id: id}
            ]
        }),

        // @mutation 3
        // @Server report route no. 3
        // @crud d1
        // @desc Delete report
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        deleteReport: builder.mutation({
            query: ({ id }) => ({
                url: `reports/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Report', id: id}
            ]
        }),

        // @mutation 4
        // @Server report route no. 4
        // @crud d2
        // @desc Delete report (verified)
        // @method Mutation/DELETE
        // @route /:id/verified
        // @access Private
        deleteReport: builder.mutation({
            query: ({ id }) => ({
                url: `reports/${id}/verified`,
                method: 'DELETE',
                body: { id },
            }),
            invalidateTags: (result, error, { id }) => [
                {type: 'Report', id: id}
            ]
        }),

    }),   
});

export const {

    // Queries

    useGetReportQuery,
    useGetReportsQuery,
    useGetFlameReportsQuery,
    useGetUnionReportsQuery,

    // Mutations

    useCreateReportMutation,
    useUpdateReportMutation,
    useDeleteReportMutation,
    useDeleteReportVerifiedMutation,

} = reportsSlice;

// returns the query result object
export const selectReportsResult = reportsSlice.endpoints.getReports.select();

// creates memoized selector
const selectReportsData = createSelector(
    selectReportsResult,
    reportsResult => reportsResult.data // normalized state object with ids and entities
);

//getSelectors creates selector
// renamed destructured selectors with aliases
export const {
    selectAll: selectAllReports,
    selectById: selectByReportId,
    selectIds: selectReportIds,
    // Pass in memoized selector that returns reports slice state
} = reportsAdapter.getSelectors(state => selectReportsData(state) ?? initialState);