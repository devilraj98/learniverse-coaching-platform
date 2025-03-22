
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, Star } from 'lucide-react';

export interface InstructorCardProps {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  bio: string;
  courseCount: number;
  studentsCount: number;
  rating: number;
  reviewCount: number;
  className?: string;
}

const InstructorCard = ({
  id,
  name,
  title,
  avatar,
  bio,
  courseCount,
  studentsCount,
  rating,
  reviewCount,
  className,
}: InstructorCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden hover-lift border-border h-full bg-card",
        className
      )}
    >
      <div className="p-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-muted">
          {!imageLoaded && avatar && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className={cn(
                "w-full h-full object-cover",
                !imageLoaded && "opacity-0",
                imageLoaded && "opacity-100"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-medium">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Name and title */}
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{title}</p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 w-full my-4">
          <div className="flex flex-col items-center">
            <GraduationCap className="h-5 w-5 text-primary mb-1" />
            <span className="font-semibold">{courseCount}</span>
            <span className="text-xs text-muted-foreground">Courses</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-5 w-5 text-primary mb-1" />
            <span className="font-semibold">{studentsCount.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">Students</span>
          </div>
          <div className="flex flex-col items-center">
            <Star className="h-5 w-5 text-yellow-500 mb-1" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">{reviewCount} reviews</span>
          </div>
        </div>
        
        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
          {bio}
        </p>
        
        {/* CTA */}
        <Button asChild variant="outline" className="w-full mt-auto">
          <Link to={`/instructors/${id}`}>
            View Profile
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default InstructorCard;
