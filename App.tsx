// =============================================================================
// AI/ML LEARNING HUB - MAIN APPLICATION
// Production-ready React Native Expo App
// =============================================================================

import React, { useState, useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Imports
import { colors, Badge, ProgressBar, Card, StatCard, SectionHeader, IconButton } from './src/components';
import { allCourses, getCourseById, getTotalLessons, getTotalDuration } from './src/data/courseData';
import { useProgressStore } from './src/store/useProgressStore';
import { Course, Lesson, RootStackParamList, MainTabParamList } from './src/types';

// =============================================================================
// NAVIGATION SETUP
// =============================================================================

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
  },
};

// =============================================================================
// MODULE SECTION COMPONENT (EXPANDABLE)
// =============================================================================

interface ModuleSectionProps {
  module: {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
  };
  courseId: string;
  onLessonPress: (lesson: Lesson) => void;
}

const ModuleSection: React.FC<ModuleSectionProps> = ({ module, courseId, onLessonPress }) => {
  const [expanded, setExpanded] = useState(false);
  const { isLessonCompleted } = useProgressStore();

  const completedCount = useMemo(
    () => module.lessons.filter((l) => isLessonCompleted(courseId, l.id)).length,
    [module.lessons, courseId, isLessonCompleted]
  );
  
  const progress = module.lessons.length > 0 ? (completedCount / module.lessons.length) * 100 : 0;

  return (
    <View style={styles.moduleContainer}>
      <TouchableOpacity
        style={styles.moduleHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.moduleHeaderLeft}>
          <Ionicons
            name={expanded ? 'chevron-down' : 'chevron-forward'}
            size={20}
            color={colors.primary}
          />
          <View style={styles.moduleTitleContainer}>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            <Text style={styles.moduleDescription}>{module.description}</Text>
          </View>
        </View>
        <View style={styles.moduleProgress}>
          <Text style={styles.moduleProgressText}>{completedCount}/{module.lessons.length}</Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.moduleContent}>
          <ProgressBar progress={progress} height={4} />
          <View style={styles.lessonList}>
            {module.lessons.map((lesson, index) => {
              const isCompleted = isLessonCompleted(courseId, lesson.id);
              return (
                <TouchableOpacity
                  key={lesson.id}
                  style={[styles.lessonItem, isCompleted && styles.lessonItemCompleted]}
                  onPress={() => onLessonPress(lesson)}
                  activeOpacity={0.7}
                >
                  <View style={styles.lessonLeft}>
                    <View style={[styles.lessonNumber, isCompleted && styles.lessonNumberCompleted]}>
                      {isCompleted ? (
                        <Ionicons name="checkmark" size={14} color={colors.background} />
                      ) : (
                        <Text style={styles.lessonNumberText}>{index + 1}</Text>
                      )}
                    </View>
                    <View style={styles.lessonInfo}>
                      <Text style={[styles.lessonItemTitle, isCompleted && styles.lessonItemTitleCompleted]}>
                        {lesson.title}
                      </Text>
                      <View style={styles.lessonMeta}>
                        <Ionicons
                          name={
                            lesson.type === 'video' ? 'play-circle-outline' :
                            lesson.type === 'exercise' ? 'code-slash-outline' :
                            lesson.type === 'quiz' ? 'help-circle-outline' : 'document-text-outline'
                          }
                          size={12}
                          color={colors.textMuted}
                        />
                        <Text style={styles.lessonMetaText}>{lesson.duration} min</Text>
                        <Badge label={lesson.type} variant={lesson.type} />
                      </View>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

// =============================================================================
// LESSON DETAIL SCREEN
// =============================================================================

interface LessonDetailProps {
  route: { params: { lesson: Lesson; courseId: string } };
  navigation: any;
}

const LessonDetailScreen: React.FC<LessonDetailProps> = ({ route, navigation }) => {
  const { lesson, courseId } = route.params;
  const { isLessonCompleted, toggleLesson } = useProgressStore();
  const completed = isLessonCompleted(courseId, lesson.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.lessonHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.lessonHeaderInfo}>
            <View style={styles.lessonBadges}>
              <Badge label={lesson.type} variant={lesson.type} />
              <Text style={styles.lessonDuration}>{lesson.duration} min</Text>
            </View>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.lessonContent}>
          <View style={styles.contentCard}>
            <Text style={styles.contentText}>{lesson.content}</Text>
          </View>

          {/* Code Example */}
          {lesson.codeExample && (
            <View style={styles.codeSection}>
              <View style={styles.codeHeader}>
                <Ionicons name="code-slash" size={16} color={colors.accent} />
                <Text style={styles.codeHeaderText}>Code Example ({lesson.codeLanguage || 'python'})</Text>
              </View>
              <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{lesson.codeExample}</Text>
              </View>
            </View>
          )}

          {/* Key Points */}
          {lesson.keyPoints && lesson.keyPoints.length > 0 && (
            <View style={styles.keyPointsSection}>
              <Text style={styles.keyPointsTitle}>✓ Key Takeaways</Text>
              {lesson.keyPoints.map((point, index) => (
                <View key={index} style={styles.keyPointItem}>
                  <Text style={styles.keyPointBullet}>•</Text>
                  <Text style={styles.keyPointText}>{point}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Complete Button */}
          <TouchableOpacity
            style={[styles.completeButton, completed && styles.completedButton]}
            onPress={() => toggleLesson(courseId, lesson.id)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={completed ? 'checkmark-circle' : 'radio-button-off'}
              size={20}
              color={completed ? colors.background : colors.text}
            />
            <Text style={[styles.completeButtonText, completed && styles.completedButtonText]}>
              {completed ? 'Completed' : 'Mark as Complete'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// =============================================================================
// COURSE DETAIL SCREEN
// =============================================================================

interface CourseDetailProps {
  route: { params: { course: Course } };
  navigation: any;
}

const CourseDetailScreen: React.FC<CourseDetailProps> = ({ route, navigation }) => {
  const { course } = route.params;
  const { getCourseProgress } = useProgressStore();

  const totalLessons = useMemo(
    () => course.modules.reduce((acc, m) => acc + m.lessons.length, 0),
    [course.modules]
  );
  
  const progress = getCourseProgress(course.id, totalLessons);

  const handleLessonPress = useCallback(
    (lesson: Lesson) => navigation.navigate('LessonDetail', { lesson, courseId: course.id }),
    [course.id, navigation]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.courseHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.courseHeaderContent}>
            <View style={styles.courseBadges}>
              <Badge label={course.level} variant={course.level} />
              <Badge label={course.category} variant="secondary" />
            </View>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.courseStats}>
          <StatCard
            icon={<Ionicons name="time-outline" size={20} color={colors.primary} />}
            value={`${course.duration}h`}
            label="Duration"
            color={colors.primary}
          />
          <StatCard
            icon={<Ionicons name="book-outline" size={20} color={colors.secondary} />}
            value={totalLessons.toString()}
            label="Lessons"
            color={colors.secondary}
          />
          <StatCard
            icon={<Ionicons name="star" size={20} color={colors.warning} />}
            value={course.rating.toString()}
            label="Rating"
            color={colors.warning}
          />
        </View>

        {/* Progress */}
        <View style={styles.section}>
          <ProgressBar progress={progress} height={8} />
          <Text style={styles.progressText}>{progress}% Complete</Text>
        </View>

        {/* Outcomes */}
        <View style={styles.section}>
          <SectionHeader title="What You'll Learn" />
          {course.outcomes.map((outcome, index) => (
            <View key={index} style={styles.outcomeItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
              <Text style={styles.outcomeText}>{outcome}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <SectionHeader title="Skills Covered" />
          <View style={styles.skillsGrid}>
            {course.skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Modules */}
        <View style={styles.section}>
          <SectionHeader title="Course Content" />
          {course.modules.map((module) => (
            <ModuleSection
              key={module.id}
              module={module}
              courseId={course.id}
              onLessonPress={handleLessonPress}
            />
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// =============================================================================
// COURSE CARD COMPONENT
// =============================================================================

interface CourseCardProps {
  course: Course;
  progress: number;
  onPress: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, progress, onPress }) => (
  <Card style={styles.courseCard} onPress={onPress}>
    <View style={styles.courseCardHeader}>
      <Text style={styles.courseIcon}>{course.icon}</Text>
      <View style={styles.courseCardInfo}>
        <View style={styles.courseCardBadges}>
          <Badge label={course.level} variant={course.level} />
        </View>
        <Text style={styles.courseCardTitle} numberOfLines={1}>{course.title}</Text>
        <Text style={styles.courseCardDescription} numberOfLines={2}>{course.description}</Text>
        <View style={styles.courseCardMeta}>
          <View style={styles.courseCardStat}>
            <Ionicons name="time-outline" size={14} color={colors.textMuted} />
            <Text style={styles.courseCardStatText}>{course.duration}h</Text>
          </View>
          <View style={styles.courseCardStat}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.courseCardStatText}>{course.rating}</Text>
          </View>
          {progress > 0 && (
            <Text style={styles.courseCardProgress}>{progress}% complete</Text>
          )}
        </View>
        {progress > 0 && <ProgressBar progress={progress} style={styles.courseProgressBar} />}
      </View>
    </View>
  </Card>
);

// =============================================================================
// HOME SCREEN
// =============================================================================

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { getCourseProgress, getOverallProgress } = useProgressStore();

  const coursesData = useMemo(
    () => allCourses.map((c) => ({ id: c.id, modules: c.modules })),
    []
  );
  
  const overallProgress = getOverallProgress(coursesData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            Python, AI & ML{'\n'}
            <Text style={styles.heroTitleAccent}>Learning Hub</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Master programming and artificial intelligence with comprehensive courses designed by industry experts.
          </Text>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.quickStat}>
              <Text style={[styles.quickStatValue, { color: colors.primary }]}>{allCourses.length}</Text>
              <Text style={styles.quickStatLabel}>Courses</Text>
            </View>
            <View style={styles.quickStat}>
              <Text style={[styles.quickStatValue, { color: colors.secondary }]}>{getTotalLessons()}</Text>
              <Text style={styles.quickStatLabel}>Lessons</Text>
            </View>
            <View style={styles.quickStat}>
              <Text style={[styles.quickStatValue, { color: colors.accent }]}>{getTotalDuration()}h</Text>
              <Text style={styles.quickStatLabel}>Content</Text>
            </View>
            <View style={styles.quickStat}>
              <Text style={[styles.quickStatValue, { color: colors.warning }]}>{overallProgress}%</Text>
              <Text style={styles.quickStatLabel}>Progress</Text>
            </View>
          </View>
        </View>

        {/* Courses */}
        <View style={styles.section}>
          <SectionHeader title="All Courses" />
          {allCourses.map((course) => {
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            const progress = getCourseProgress(course.id, totalLessons);
            return (
              <CourseCard
                key={course.id}
                course={course}
                progress={progress}
                onPress={() => navigation.navigate('CourseDetail', { course })}
              />
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// =============================================================================
// EXPLORE SCREEN
// =============================================================================

const ExploreScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const categories = ['All', 'Python', 'Machine Learning', 'Deep Learning'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { getCourseProgress } = useProgressStore();

  const filteredCourses = useMemo(
    () => selectedCategory === 'All' ? allCourses : allCourses.filter((c) => c.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Explore</Text>
          <Text style={styles.screenSubtitle}>Discover courses tailored for you</Text>
        </View>

        {/* Category Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryChipText, selectedCategory === cat && styles.categoryChipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Courses */}
        <View style={styles.section}>
          {filteredCourses.map((course) => {
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            const progress = getCourseProgress(course.id, totalLessons);
            return (
              <CourseCard
                key={course.id}
                course={course}
                progress={progress}
                onPress={() => navigation.navigate('CourseDetail', { course })}
              />
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// =============================================================================
// PROGRESS SCREEN
// =============================================================================

const ProgressScreen: React.FC = () => {
  const { getCourseProgress, getOverallProgress, isLessonCompleted } = useProgressStore();

  const coursesData = useMemo(
    () => allCourses.map((c) => ({ id: c.id, modules: c.modules })),
    []
  );
  
  const overallProgress = getOverallProgress(coursesData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Your Progress</Text>
        </View>

        {/* Overall Progress */}
        <Card style={styles.overallProgressCard}>
          <Text style={styles.overallProgressValue}>{overallProgress}%</Text>
          <Text style={styles.overallProgressLabel}>Overall Completion</Text>
          <ProgressBar progress={overallProgress} height={8} />
        </Card>

        {/* Course Progress */}
        {allCourses.map((course) => {
          const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
          const progress = getCourseProgress(course.id, totalLessons);
          const completedLessons = course.modules.reduce(
            (acc, m) => acc + m.lessons.filter((l) => isLessonCompleted(course.id, l.id)).length,
            0
          );

          return (
            <Card key={course.id} style={styles.courseProgressCard}>
              <View style={styles.courseProgressHeader}>
                <Text style={styles.courseProgressIcon}>{course.icon}</Text>
                <View style={styles.courseProgressInfo}>
                  <Text style={styles.courseProgressTitle}>{course.title}</Text>
                  <Text style={styles.courseProgressLessons}>{completedLessons}/{totalLessons} lessons</Text>
                </View>
                <Text style={styles.courseProgressPercent}>{progress}%</Text>
              </View>
              <ProgressBar progress={progress} />
            </Card>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// =============================================================================
// PROFILE SCREEN
// =============================================================================

const ProfileScreen: React.FC = () => {
  const { progress, getOverallProgress, resetProgress } = useProgressStore();

  const coursesData = useMemo(
    () => allCourses.map((c) => ({ id: c.id, modules: c.modules })),
    []
  );
  
  const overallProgress = getOverallProgress(coursesData);

  const completedLessons = useMemo(
    () => Object.values(progress).reduce((acc, course) => acc + Object.values(course).filter(Boolean).length, 0),
    [progress]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Profile</Text>
        </View>

        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.profileName}>Learner</Text>
          <Text style={styles.profileEmail}>student@example.com</Text>
        </Card>

        {/* Stats */}
        <View style={styles.profileStats}>
          <View style={styles.profileStat}>
            <Text style={[styles.profileStatValue, { color: colors.primary }]}>{completedLessons}</Text>
            <Text style={styles.profileStatLabel}>Lessons Done</Text>
          </View>
          <View style={styles.profileStat}>
            <Text style={[styles.profileStatValue, { color: colors.secondary }]}>{allCourses.length}</Text>
            <Text style={styles.profileStatLabel}>Courses</Text>
          </View>
          <View style={styles.profileStat}>
            <Text style={[styles.profileStatValue, { color: colors.accent }]}>{overallProgress}%</Text>
            <Text style={styles.profileStatLabel}>Complete</Text>
          </View>
        </View>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton} onPress={resetProgress} activeOpacity={0.7}>
          <Ionicons name="refresh-outline" size={20} color={colors.error} />
          <Text style={styles.resetButtonText}>Reset Progress</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// =============================================================================
// TAB NAVIGATOR
// =============================================================================

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.surfaceLight,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        tabBarIcon: ({ color, size, focused }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            HomeTab: focused ? 'home' : 'home-outline',
            ExploreTab: focused ? 'search' : 'search-outline',
            ProgressTab: focused ? 'stats-chart' : 'stats-chart-outline',
            ProfileTab: focused ? 'person' : 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="ExploreTab" component={ExploreScreen} options={{ tabBarLabel: 'Explore' }} />
      <Tab.Screen name="ProgressTab" component={ProgressScreen} options={{ tabBarLabel: 'Progress' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

// =============================================================================
// MAIN APP
// =============================================================================

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen 
          name="CourseDetail" 
          component={CourseDetailScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen 
          name="LessonDetail" 
          component={LessonDetailScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// =============================================================================
// STYLES
// =============================================================================

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 15,
    color: colors.textMuted,
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },

  // Hero
  hero: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  heroTitleAccent: {
    color: colors.primary,
  },
  heroSubtitle: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 22,
    marginBottom: 20,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickStat: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  quickStatLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },

  // Course Card
  courseCard: {
    marginBottom: 12,
  },
  courseCardHeader: {
    flexDirection: 'row',
  },
  courseIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  courseCardInfo: {
    flex: 1,
  },
  courseCardBadges: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  courseCardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  courseCardDescription: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 8,
  },
  courseCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseCardStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  courseCardStatText: {
    fontSize: 13,
    color: colors.textMuted,
    marginLeft: 4,
  },
  courseCardProgress: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  courseProgressBar: {
    marginTop: 8,
  },

  // Categories
  categoryScroll: {
    paddingLeft: 20,
    marginBottom: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMuted,
  },
  categoryChipTextActive: {
    color: colors.background,
  },

  // Course Detail
  courseHeader: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    padding: 8,
    marginBottom: 12,
    marginLeft: -8,
  },
  courseHeaderContent: {
    flex: 1,
  },
  courseBadges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 22,
  },
  courseStats: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  progressText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },

  // Outcomes
  outcomeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 10,
  },
  outcomeText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },

  // Skills
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    fontSize: 13,
    color: colors.text,
  },

  // Module
  moduleContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  moduleHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  moduleDescription: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  moduleProgress: {
    backgroundColor: `${colors.primary}30`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  moduleProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  moduleContent: {
    padding: 16,
    paddingTop: 0,
  },
  lessonList: {
    marginTop: 12,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceLight,
  },
  lessonItemCompleted: {
    opacity: 0.8,
  },
  lessonLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonNumberCompleted: {
    backgroundColor: colors.accent,
  },
  lessonNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  lessonInfo: {
    flex: 1,
    marginLeft: 12,
  },
  lessonItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  lessonItemTitleCompleted: {
    color: colors.textMuted,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  lessonMetaText: {
    fontSize: 12,
    color: colors.textMuted,
  },

  // Lesson Detail
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 10,
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  lessonHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  lessonBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  lessonDuration: {
    fontSize: 13,
    color: colors.textMuted,
  },
  lessonTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  lessonContent: {
    padding: 20,
  },
  contentCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  contentText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
  },
  codeSection: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: colors.surfaceLight,
  },
  codeHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  codeBlock: {
    padding: 16,
    backgroundColor: '#0d1117',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#c9d1d9',
    lineHeight: 18,
  },
  keyPointsSection: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  keyPointsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  keyPointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  keyPointBullet: {
    color: colors.accent,
    fontSize: 14,
  },
  keyPointText: {
    flex: 1,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  completedButton: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  completedButtonText: {
    color: colors.background,
  },

  // Progress Screen
  overallProgressCard: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  overallProgressValue: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text,
  },
  overallProgressLabel: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 16,
  },
  courseProgressCard: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  courseProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseProgressIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  courseProgressInfo: {
    flex: 1,
  },
  courseProgressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  courseProgressLessons: {
    fontSize: 13,
    color: colors.textMuted,
  },
  courseProgressPercent: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },

  // Profile Screen
  profileCard: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textMuted,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  profileStat: {
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  profileStatLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: `${colors.error}20`,
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 12,
  },
  resetButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.error,
  },
});
