import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: []
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        addCourse: (state, action) => {
            state.courses.push({
                id: Date.now(),
                title: action.payload.title,
                description: action.payload.description
            });
        },
        deleteCourse: (state, action) => {
            state.courses = state.courses.filter(course => course.id !== action.payload);
        },
        editCourse: (state, action) => {
            const { id, title, description } = action.payload;
            const course = state.courses.find(course => course.id === id);
            if (course) {
                course.title = title;
                course.description = description;
            }
        }
    }
});

export const { addCourse, deleteCourse, editCourse } = courseSlice.actions;

export default courseSlice.reducer;
