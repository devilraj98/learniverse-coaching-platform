
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users } from 'lucide-react';

export interface CourseCardProps {
  id: string;
  title: string;
  instructor: {
    name: string;
    avatar?: string;
  };
  coverImage: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  studentsCount: number;
  featured?: boolean;
  className?: string;
}

const CourseCard = ({
  id,
  title,
  instructor,
  coverImage,
  price,
  originalPrice,
  rating,
  reviewCount,
  category,
  level,
  duration,
  studentsCount,
  featured = false,
  className,
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;
    
  return (
    <Link to={`/courses/${id}`}>
      <Card 
        className={cn(
          "overflow-hidden transition-all hover-lift h-full bg-white border-border",
          featured && "ring-1 ring-primary ring-opacity-50",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={coverImage}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 ease-out",
              isHovered && "scale-105",
              !imageLoaded && "opacity-0",
              imageLoaded && "opacity-100"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Category badge */}
          <Badge 
            className="absolute top-3 left-3 bg-background/80 backdrop-blur-xs text-foreground"
            variant="secondary"
          >
            {category}
          </Badge>
          
          {/* Discount badge */}
          {discountPercentage > 0 && (
            <Badge 
              className="absolute top-3 right-3 bg-primary text-primary-foreground"
            >
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title & Rating */}
          <div className="space-y-2">
            <h3 className="font-medium text-lg leading-tight line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center text-sm">
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
              </div>
              <span className="mx-1.5 text-muted-foreground">·</span>
              <span className="text-muted-foreground">{reviewCount} reviews</span>
            </div>
          </div>
          
          {/* Instructor */}
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-muted overflow-hidden mr-2">
              {instructor.avatar ? (
                <img 
                  src={instructor.avatar} 
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                  {instructor.name.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {instructor.name}
            </span>
          </div>
          
          {/* Course Meta */}
          <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-3">
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{studentsCount.toLocaleString()}</span>
            </div>
            <Badge variant="outline" className="font-normal">
              {level}
            </Badge>
          </div>
          
          {/* Price */}
          <div className="flex items-baseline">
            <span className="text-lg font-semibold">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;
