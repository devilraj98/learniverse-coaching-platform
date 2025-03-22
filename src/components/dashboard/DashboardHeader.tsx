
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  unreadNotificationsCount: number;
  isLoaded: boolean;
}

const DashboardHeader = ({ unreadNotificationsCount, isLoaded }: DashboardHeaderProps) => {
  return (
    <section 
      className={cn(
        "bg-muted/30 py-10 border-b",
        isLoaded ? "animate-fade-in" : "opacity-0"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your progress and manage your learning journey</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
                  {unreadNotificationsCount}
                </Badge>
              </Button>
            </div>
            <Button asChild>
              <Link to="/courses">
                Browse Courses
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;
