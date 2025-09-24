import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../Context/api/apiSlice';

const reportsAdapter = createEntityAdapter({});

const initialState = reportsAdapter.getInitialState();

export const reportsSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Queries

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

        // @Server report route no. 3
        // @crud d1
        // @desc Delete report
        // @method Mutation/DELETE
        // @route /:id
        // @access Private
        creatNewReport: builder.mutation({
            query: ({ id }) => ({
                url: `reports/${id}`,
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
    useGetReportsQuery,
    useCreateReportMutation,
    useUpdateReportMutation,
    reportDeleteReportMutation,
} = reportsSlice;

// returns the query result object
export const selectReportsResult = reportSlice.endpoints.getReports.select();

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