
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, BookMarked, CheckCircle } from 'lucide-react';

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

interface LearningStatsProps {
  userStats: UserStats;
  enrolledCourses: EnrolledCourse[];
}

const LearningStats = ({ userStats, enrolledCourses }: LearningStatsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-medium mb-4">Learning Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-primary p-1.5 bg-primary/10 rounded-full mr-3" />
            <div>
              <div className="font-medium">{userStats.totalHoursLearned} hours</div>
              <div className="text-sm text-muted-foreground">Total learning time</div>
            </div>
          </div>
          <div className="flex items-center">
            <BookMarked className="h-8 w-8 text-primary p-1.5 bg-primary/10 rounded-full mr-3" />
            <div>
              <div className="font-medium">{enrolledCourses.length}</div>
              <div className="text-sm text-muted-foreground">Courses in progress</div>
            </div>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-primary p-1.5 bg-primary/10 rounded-full mr-3" />
            <div>
              <div className="font-medium">{userStats.coursesCompleted}</div>
              <div className="text-sm text-muted-foreground">Courses completed</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningStats;
