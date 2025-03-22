
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, PlayCircle, BarChart, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface MyLearningTabProps {
  enrolledCourses: EnrolledCourse[];
  isLoaded: boolean;
}

const MyLearningTab = ({ enrolledCourses, isLoaded }: MyLearningTabProps) => {
  return (
    <div 
      className={cn(
        "space-y-6",
        isLoaded ? "animate-fade-in" : "opacity-0"
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Courses In Progress</h2>
        <div className="text-sm text-muted-foreground">
          {enrolledCourses.length} courses
        </div>
      </div>
      
      {enrolledCourses.length > 0 ? (
        <div className="space-y-4">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover-lift">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-40 md:h-auto relative">
                  <img 
                    src={course.coverImage} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-background/80 backdrop-blur-xs text-foreground">
                    {course.category}
                  </Badge>
                </div>
                <div className="flex-grow p-5">
                  <div className="flex flex-col h-full justify-between">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Instructor: {course.instructor}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{course.progress}% complete</span>
                          <span>{course.completedLessons} / {course.totalLessons} lessons</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Last accessed: {course.lastAccessed}
                      </div>
                      <Button asChild>
                        <Link to={`/courses/${course.id}`}>
                          <PlayCircle className="h-4 w-4 mr-1" />
                          Continue Learning
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">You're not enrolled in any courses yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Browse our catalog and find courses that interest you.
            </p>
            <Button asChild>
              <Link to="/courses">
                Browse Courses
              </Link>
            </Button>
          </div>
        </Card>
      )}
      
      {/* Learning Activity */}
      <Card className="p-6">
        <h3 className="font-medium mb-5">Learning Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Recent Activity
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">
                    Completed Lesson: "SEO Fundamentals"
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Mastering Digital Marketing • 2 days ago
                  </div>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">
                    Started Lesson: "On-Page SEO Techniques"
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Mastering Digital Marketing • 2 days ago
                  </div>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">
                    Enrolled in "Advanced Python for Data Science"
                  </div>
                  <div className="text-xs text-muted-foreground">
                    7 days ago
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Weekly Learning Summary
            </h4>
            <div className="h-40 flex items-center justify-center bg-muted/30 rounded-md">
              <BarChart className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-sm text-center text-muted-foreground">
              You've studied for 6.5 hours this week, 2.5 hours more than last week.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyLearningTab;
