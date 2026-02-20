// =============================================================================
// TYPES - AI/ML Learning Hub
// =============================================================================

/** Lesson content types */
export type LessonType = 'video' | 'article' | 'exercise' | 'quiz';

/** Course difficulty levels */
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

/**
 * Individual lesson within a module
 */
export interface Lesson {
  /** Unique identifier */
  id: string;
  /** Lesson title */
  title: string;
  /** Duration in minutes */
  duration: number;
  /** Content type */
  type: LessonType;
  /** Markdown-formatted lesson content */
  content: string;
  /** Optional code example */
  codeExample?: string;
  /** Programming language for code example */
  codeLanguage?: string;
  /** Key learning points */
  keyPoints?: string[];
}

/**
 * Module containing multiple lessons
 */
export interface Module {
  /** Unique identifier */
  id: string;
  /** Module title */
  title: string;
  /** Brief description */
  description: string;
  /** Array of lessons */
  lessons: Lesson[];
}

/**
 * Complete course definition
 */
export interface Course {
  /** Unique identifier */
  id: string;
  /** Course title */
  title: string;
  /** Course description */
  description: string;
  /** Difficulty level */
  level: CourseLevel;
  /** Category (Python, ML, Deep Learning) */
  category: string;
  /** Total duration in hours */
  duration: number;
  /** Instructor name */
  instructor: string;
  /** Rating out of 5 */
  rating: number;
  /** Number of enrolled students */
  enrollmentCount: number;
  /** Course modules */
  modules: Module[];
  /** Skills taught in this course */
  skills: string[];
  /** Required prior knowledge */
  prerequisites: string[];
  /** Learning outcomes */
  outcomes: string[];
  /** Emoji icon */
  icon: string;
}

/**
 * Progress tracking structure
 * Maps courseId -> lessonId -> completed status
 */
export interface CourseProgress {
  [courseId: string]: {
    [lessonId: string]: boolean;
  };
}

/**
 * Navigation types for React Navigation
 */
export type RootStackParamList = {
  MainTabs: undefined;
  CourseDetail: { course: Course };
  LessonDetail: { lesson: Lesson; courseId: string };
};

export type MainTabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  ProgressTab: undefined;
  ProfileTab: undefined;
};
