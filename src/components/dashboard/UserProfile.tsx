
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UserStats {
  totalHoursLearned: number;
  coursesCompleted: number;
  certificatesEarned: number;
  currentStreak: number;
  longestStreak: number;
}

interface UserProfileProps {
  userStats: UserStats;
}

const UserProfile = ({ userStats }: UserProfileProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="bg-primary/5 p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-medium">
          J
        </div>
        <div>
          <h2 className="font-medium text-lg">John Doe</h2>
          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Learning Streak</p>
              <div className="text-2xl font-bold">{userStats.currentStreak} days</div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Certificates</p>
              <div className="text-2xl font-bold">{userStats.certificatesEarned}</div>
            </div>
          </div>
          
          <div className="pt-2">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/profile">
                View Profile
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
