// =============================================================================
// UI COMPONENTS - AI/ML Learning Hub
// =============================================================================

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

// =============================================================================
// THEME
// =============================================================================

export const colors = {
  background: '#0f172a',
  surface: '#1e293b',
  surfaceLight: '#334155',
  primary: '#0ea5e9',
  secondary: '#d946ef',
  accent: '#10b981',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  border: '#475569',
  warning: '#f59e0b',
  error: '#ef4444',
  success: '#22c55e',
};

// =============================================================================
// BADGE COMPONENT
// =============================================================================

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'beginner' | 'intermediate' | 'advanced' | 'video' | 'article' | 'exercise' | 'quiz';
  style?: ViewStyle;
}

const badgeVariants: Record<string, { bg: string; text: string }> = {
  primary: { bg: 'rgba(14, 165, 233, 0.2)', text: colors.primary },
  secondary: { bg: 'rgba(217, 70, 239, 0.2)', text: colors.secondary },
  accent: { bg: 'rgba(16, 185, 129, 0.2)', text: colors.accent },
  beginner: { bg: 'rgba(16, 185, 129, 0.2)', text: colors.accent },
  intermediate: { bg: 'rgba(14, 165, 233, 0.2)', text: colors.primary },
  advanced: { bg: 'rgba(217, 70, 239, 0.2)', text: colors.secondary },
  video: { bg: 'rgba(239, 68, 68, 0.2)', text: '#ef4444' },
  article: { bg: 'rgba(59, 130, 246, 0.2)', text: '#3b82f6' },
  exercise: { bg: 'rgba(249, 115, 22, 0.2)', text: '#f97316' },
  quiz: { bg: 'rgba(236, 72, 153, 0.2)', text: '#ec4899' },
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', style }) => {
  const v = badgeVariants[variant] || badgeVariants.primary;
  return (
    <View style={[styles.badge, { backgroundColor: v.bg }, style]}>
      <Text style={[styles.badgeText, { color: v.text }]}>{label}</Text>
    </View>
  );
};

// =============================================================================
// PROGRESS BAR COMPONENT
// =============================================================================

interface ProgressBarProps {
  progress: number;
  height?: number;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, height = 6, style }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  return (
    <View style={[styles.progressBar, { height }, style]}>
      <View style={[styles.progressFill, { width: `${clampedProgress}%`, height }]} />
    </View>
  );
};

// =============================================================================
// CARD COMPONENT
// =============================================================================

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, onPress }) => {
  if (onPress) {
    return (
      <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
};

// =============================================================================
// STAT CARD COMPONENT
// =============================================================================

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color = colors.primary }) => (
  <View style={styles.statCard}>
    <View style={styles.statIcon}>{icon}</View>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// =============================================================================
// SECTION HEADER COMPONENT
// =============================================================================

interface SectionHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, action }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {action}
  </View>
);

// =============================================================================
// DIVIDER COMPONENT
// =============================================================================

export const Divider: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={[styles.divider, style]} />
);

// =============================================================================
// ICON BUTTON COMPONENT
// =============================================================================

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, onPress, size = 40, style }) => (
  <TouchableOpacity
    style={[styles.iconButton, { width: size, height: size, borderRadius: size / 2 }, style]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {icon}
  </TouchableOpacity>
);

// =============================================================================
// EMPTY STATE COMPONENT
// =============================================================================

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => (
  <View style={styles.emptyState}>
    <View style={styles.emptyIcon}>{icon}</View>
    <Text style={styles.emptyTitle}>{title}</Text>
    <Text style={styles.emptyDescription}>{description}</Text>
  </View>
);

// =============================================================================
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize' as const,
  },
  progressBar: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceLight,
    marginVertical: 8,
  },
  iconButton: {
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
