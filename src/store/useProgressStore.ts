// =============================================================================
// PROGRESS STORE - Zustand with AsyncStorage Persistence
// =============================================================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CourseProgress } from '../types';

// =============================================================================
// STORE INTERFACE
// =============================================================================

interface ProgressState {
  /** Progress data: courseId -> lessonId -> completed */
  progress: CourseProgress;
  
  /** Check if a lesson is completed */
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  
  /** Toggle lesson completion status */
  toggleLesson: (courseId: string, lessonId: string) => void;
  
  /** Get progress percentage for a course */
  getCourseProgress: (courseId: string, totalLessons: number) => number;
  
  /** Get overall progress across all courses */
  getOverallProgress: (courses: Array<{
    id: string;
    modules: Array<{ lessons: Array<{ id: string }> }>;
  }>) => number;
  
  /** Get completed lessons count for a course */
  getCompletedCount: (courseId: string) => number;
  
  /** Reset all progress */
  resetProgress: () => void;
}

// =============================================================================
// ZUSTAND STORE
// =============================================================================

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},

      isLessonCompleted: (courseId: string, lessonId: string): boolean => {
        const { progress } = get();
        return Boolean(progress[courseId]?.[lessonId]);
      },

      toggleLesson: (courseId: string, lessonId: string): void => {
        set((state) => {
          const newProgress = { ...state.progress };
          if (!newProgress[courseId]) {
            newProgress[courseId] = {};
          }
          newProgress[courseId][lessonId] = !newProgress[courseId][lessonId];
          return { progress: newProgress };
        });
      },

      getCourseProgress: (courseId: string, totalLessons: number): number => {
        if (totalLessons === 0) return 0;
        const { progress } = get();
        if (!progress[courseId]) return 0;
        const completed = Object.values(progress[courseId]).filter(Boolean).length;
        return Math.round((completed / totalLessons) * 100);
      },

      getOverallProgress: (courses): number => {
        const { progress } = get();
        let totalLessons = 0;
        let completedLessons = 0;

        courses.forEach((course) => {
          course.modules.forEach((module) => {
            totalLessons += module.lessons.length;
            module.lessons.forEach((lesson) => {
              if (progress[course.id]?.[lesson.id]) {
                completedLessons++;
              }
            });
          });
        });

        return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      },

      getCompletedCount: (courseId: string): number => {
        const { progress } = get();
        if (!progress[courseId]) return 0;
        return Object.values(progress[courseId]).filter(Boolean).length;
      },

      resetProgress: (): void => {
        set({ progress: {} });
      },
    }),
    {
      name: 'aiml-progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    }
  )
);

// =============================================================================
// SELECTOR HOOKS (for performance optimization)
// =============================================================================

export const useProgress = () => useProgressStore((state) => state.progress);

export const useIsLessonCompleted = (courseId: string, lessonId: string) =>
  useProgressStore((state) => state.isLessonCompleted(courseId, lessonId));

export const useCourseProgress = (courseId: string, totalLessons: number) =>
  useProgressStore((state) => state.getCourseProgress(courseId, totalLessons));
