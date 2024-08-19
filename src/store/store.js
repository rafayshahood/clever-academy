import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/auth';
import courseReducer from '../courses/courses';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        courses: courseReducer
    }
});
