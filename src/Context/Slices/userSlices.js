import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../App/api/apiSlice';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState()