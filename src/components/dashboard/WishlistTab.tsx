
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookMarked, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WishlistCourse {
  id: string;
  title: string;
  instructor: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
}

interface WishlistTabProps {
  wishlistCourses: WishlistCourse[];
  isLoaded: boolean;
}

const WishlistTab = ({ wishlistCourses, isLoaded }: WishlistTabProps) => {
  return (
    <div 
      className={cn(
        "space-y-6",
        isLoaded ? "animate-fade-in" : "opacity-0"
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Wishlist</h2>
        <div className="text-sm text-muted-foreground">
          {wishlistCourses.length} courses
        </div>
      </div>
      
      {wishlistCourses.length > 0 ? (
        <div className="space-y-4">
          {wishlistCourses.map((course) => (
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
                      
                      <div className="flex items-center">
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 font-medium">{course.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex items-center justify-between">
                      <div className="flex items-baseline">
                        <span className="text-lg font-bold">
                          ${course.price.toFixed(2)}
                        </span>
                        {course.originalPrice && (
                          <span className="ml-2 text-sm text-muted-foreground line-through">
                            ${course.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline">
                          Remove
                        </Button>
                        <Button asChild>
                          <Link to={`/courses/${course.id}`}>
                            Enroll Now
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
            <BookMarked className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">Your wishlist is empty</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Save courses you're interested in for later.
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

export default WishlistTab;
