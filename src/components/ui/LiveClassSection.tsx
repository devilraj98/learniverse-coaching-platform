
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Video, Users, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LiveClassProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  participants: number;
  isUpcoming: boolean;
  joinUrl?: string;
  className?: string;
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const LiveClassCard = ({
  title,
  description,
  date,
  time,
  duration,
  instructor,
  participants,
  isUpcoming,
  joinUrl,
  className,
}: LiveClassProps) => {
  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", className)}>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          <Badge 
            variant={isUpcoming ? "default" : "outline"} 
            className={cn(
              isUpcoming ? "bg-green-500 hover:bg-green-600" : "text-muted-foreground"
            )}
          >
            {isUpcoming ? "Upcoming" : "Completed"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{time} ({duration})</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{participants} participants</span>
          </div>
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-muted-foreground" />
            <span>Instructor: {instructor}</span>
          </div>
        </div>

        {isUpcoming && joinUrl && (
          <div className="pt-2">
            <Button className="w-full" asChild>
              <a href={joinUrl} target="_blank" rel="noopener noreferrer">
                <Video className="h-4 w-4 mr-2" />
                Join Live Class
              </a>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

const LiveClassSection = () => {
  // Mock data for AWS DevOps live classes
  const liveClasses: LiveClassProps[] = [
    {
      id: 'class-1',
      title: 'CI/CD Pipeline Implementation with AWS CodePipeline',
      description: 'Learn how to set up continuous integration and deployment pipelines using AWS CodePipeline services.',
      date: '2023-11-20', // Monday
      time: '7:00 PM EST',
      duration: '90 min',
      instructor: 'David Miller',
      participants: 48,
      isUpcoming: true,
      joinUrl: 'https://example.com/join-class-1',
    },
    {
      id: 'class-2',
      title: 'Container Orchestration with ECS and EKS',
      description: 'Deep dive into AWS container services and how to orchestrate Docker containers in production.',
      date: '2023-11-22', // Wednesday
      time: '7:00 PM EST',
      duration: '90 min',
      instructor: 'David Miller',
      participants: 42,
      isUpcoming: true,
      joinUrl: 'https://example.com/join-class-2',
    },
    {
      id: 'class-3',
      title: 'Infrastructure as Code using CloudFormation and CDK',
      description: 'Learn how to define your infrastructure using code with AWS CloudFormation and the AWS CDK.',
      date: '2023-11-24', // Friday
      time: '7:00 PM EST',
      duration: '90 min',
      instructor: 'David Miller',
      participants: 45,
      isUpcoming: true,
      joinUrl: 'https://example.com/join-class-3',
    },
    {
      id: 'class-0',
      title: 'AWS DevOps Introduction and Course Overview',
      description: 'Introduction to DevOps concepts and overview of what we will cover in the AWS DevOps program.',
      date: '2023-11-17', // Previous Friday
      time: '7:00 PM EST',
      duration: '90 min',
      instructor: 'David Miller',
      participants: 52,
      isUpcoming: false,
    },
  ];

  return (
    <div className="space-y-6">
      <CardHeader className="px-0">
        <div className="flex items-center justify-between">
          <CardTitle>Upcoming Live Classes</CardTitle>
          <Badge variant="outline" className="ml-2">
            Mon/Wed/Fri
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        {liveClasses
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((liveClass) => (
            <LiveClassCard key={liveClass.id} {...liveClass} />
          ))}
      </CardContent>
    </div>
  );
};

export default LiveClassSection;
