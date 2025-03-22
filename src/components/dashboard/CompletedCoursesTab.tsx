
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompletedCourse {
  id: string;
  title: string;
  instructor: string;
  coverImage: string;
  completedDate: string;
  certificate: boolean;
  category: string;
  rating: number;
}

interface CompletedCoursesTabProps {
  completedCourses: CompletedCourse[];
  isLoaded: boolean;
}

const CompletedCoursesTab = ({ completedCourses, isLoaded }: CompletedCoursesTabProps) => {
  return (
    <div 
      className={cn(
        "space-y-6",
        isLoaded ? "animate-fade-in" : "opacity-0"
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Completed Courses</h2>
        <div className="text-sm text-muted-foreground">
          {completedCourses.length} courses
        </div>
      </div>
      
      {completedCourses.length > 0 ? (
        <div className="space-y-4">
          {completedCourses.map((course) => (
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
                      
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                        
                        {course.certificate && (
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            Certificate Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-4 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Completed on: {course.completedDate}
                      </div>
                      <div className="flex space-x-2">
                        {course.certificate && (
                          <Button variant="outline">
                            <Award className="h-4 w-4 mr-1" />
                            View Certificate
                          </Button>
                        )}
                        <Button asChild>
                          <Link to={`/courses/${course.id}`}>
                            Review Course
                          </Link>
                        </Button>
                      </div>
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
            <Award className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">No completed courses yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Continue learning to earn certificates and track your progress.
            </p>
            <Button asChild>
              <Link to="/courses">
                Browse Courses
              </Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CompletedCoursesTab;
