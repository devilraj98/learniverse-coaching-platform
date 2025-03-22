
import React from 'react';
import UserProfile from './UserProfile';
import LearningStats from './LearningStats';
import NextLiveClass from './NextLiveClass';
import Achievements from './Achievements';
import { cn } from '@/lib/utils';

interface UserStats {
  totalHoursLearned: number;
  coursesCompleted: number;
  certificatesEarned: number;
  currentStreak: number;
  longestStreak: number;
}

interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  coverImage: string;
  progress: number;
  lastAccessed: string;
  category: string;
  duration: string;
  completedLessons: number;
  totalLessons: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  date: string;
}

interface DashboardSidebarProps {
  userStats: UserStats;
  enrolledCourses: EnrolledCourse[];
  achievements: Achievement[];
  isLoaded: boolean;
}

const DashboardSidebar = ({ 
  userStats, 
  enrolledCourses, 
  achievements, 
  isLoaded 
}: DashboardSidebarProps) => {
  return (
    <div 
      className={cn(
        "space-y-6",
        isLoaded ? "animate-fade-in" : "opacity-0"
      )}
    >
      <UserProfile userStats={userStats} />
      <LearningStats userStats={userStats} enrolledCourses={enrolledCourses} />
      <NextLiveClass />
      <Achievements achievements={achievements} />
    </div>
  );
};

export default DashboardSidebar;
