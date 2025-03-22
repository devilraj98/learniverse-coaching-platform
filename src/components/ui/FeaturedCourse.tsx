
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Clock, CheckCircle } from 'lucide-react';

export interface FeaturedCourseProps {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    title: string;
    avatar?: string;
  };
  coverImage: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  duration: string;
  features: string[];
  className?: string;
}

const FeaturedCourse = ({
  id,
  title,
  description,
  instructor,
  coverImage,
  price,
  originalPrice,
  rating,
  reviewCount,
  category,
  duration,
  features,
  className,
}: FeaturedCourseProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
          {/* Content */}
          <div className="space-y-6 md:space-y-8 flex flex-col justify-center">
            {/* Category badge */}
            <Badge 
              className="w-fit bg-background/80 backdrop-blur-xs text-foreground/80 text-xs"
              variant="secondary"
            >
              Featured {category}
            </Badge>
            
            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
              {title}
            </h2>
            
            {/* Description */}
            <p className="text-muted-foreground md:text-lg">
              {description}
            </p>
            
            {/* Instructor & Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-muted overflow-hidden mr-3">
                  {instructor.avatar ? (
                    <img 
                      src={instructor.avatar} 
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                      {instructor.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{instructor.name}</div>
                  <div className="text-muted-foreground text-xs">{instructor.title}</div>
                </div>
              </div>
              
              <div className="h-8 border-l border-border hidden sm:block" />
              
              <div className="flex items-center gap-1">
                <div className="flex items-center text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
                </div>
                <span className="text-muted-foreground">({reviewCount} reviews)</span>
              </div>
              
              <div className="h-8 border-l border-border hidden sm:block" />
              
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>{duration}</span>
              </div>
            </div>
            
            {/* Features */}
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            {/* Price & CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">
                  ${price.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="ml-2 text-lg text-muted-foreground line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <Button asChild size="lg" className="group">
                <Link to={`/courses/${id}`}>
                  Enroll Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 rounded-xl bg-muted animate-pulse" />
            )}
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-700 ease-out">
              <img
                src={coverImage}
                alt={title}
                className={cn(
                  "w-full h-full object-cover aspect-[4/3]",
                  !imageLoaded && "opacity-0",
                  imageLoaded && "opacity-100 animate-scale-in"
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourse;
