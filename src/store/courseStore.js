import { create } from 'zustand';

const useCourseStore = create((set) => ({
  courses:        [],
  currentCourse:  null,
  setCourses:     (courses)       => set({ courses }),
  setCurrentCourse: (course)     => set({ currentCourse: course }),
  clearCurrent:   ()             => set({ currentCourse: null }),
}));

export default useCourseStore;
