import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, { payload: enrollment }) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenrollCourse: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) =>
          !(e.user === enrollment.user && e.course === enrollment.course)
      );
    },
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    },
  },
});

export const { enrollCourse, unenrollCourse, setEnrollments } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;