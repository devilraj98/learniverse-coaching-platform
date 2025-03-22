
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookOpen, Clock, Calendar, Award, BookMarked, PlayCircle, BarChart, CheckCircle, Star, ChevronRight, Bell } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock data for demonstration
const enrolledCourses = [
  {
    id: 'course-1',
    title: 'Mastering Digital Marketing: A Comprehensive Guide',
    instructor: 'Sarah Johnson',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
    progress: 65,
    lastAccessed: '2 days ago',
    category: 'Marketing',
    duration: '30 hours',
    completedLessons: 56,
    totalLessons: 86,
  },
  {
    id: 'course-2',
    title: 'Financial Planning for Entrepreneurs',
    instructor: 'Michael Chen',
    coverImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    progress: 25,
    lastAccessed: '5 days ago',
    category: 'Business',
    duration: '22 hours',
    completedLessons: 12,
    totalLessons: 48,
  },
  {
    id: 'course-3',
    title: 'Advanced Python for Data Science',
    instructor: 'David Kim',
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80',
    progress: 10,
    lastAccessed: '1 week ago',
    category: 'Programming',
    duration: '28 hours',
    completedLessons: 8,
    totalLessons: 74,
  },
];

const wishlistCourses = [
  {
    id: 'course-4',
    title: 'The Art of Public Speaking',
    instructor: 'Emily Rodriguez',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.6,
    category: 'Communication',
  },
  {
    id: 'course-5',
    title: 'UX/UI Design Fundamentals',
    instructor: 'Alex Rivera',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    price: 74.99,
    originalPrice: 94.99,
    rating: 4.8,
    category: 'Design',
  },
];

const completedCourses = [
  {
    id: 'course-6',
    title: 'Mindfulness and Stress Management',
    instructor: 'Jennifer Lee',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    completedDate: 'June 15, 2023',
    certificate: true,
    category: 'Personal Development',
    rating: 5,
  },
];

const achievements = [
  {
    id: 'achievement-1',
    title: 'Fast Learner',
    description: 'Completed 5 lessons in one day',
    icon: Award,
    date: 'Jul 10, 2023',
  },
  {
    id: 'achievement-2',
    title: 'Consistent Student',
    description: 'Logged in for 7 consecutive days',
    icon: Calendar,
    date: 'Jul 7, 2023',
  },
  {
    id: 'achievement-3',
    title: 'Knowledge Explorer',
    description: 'Enrolled in 3 different categories',
    icon: BookOpen,
    date: 'Jun 28, 2023',
  },
];

const notifications = [
  {
    id: 'notification-1',
    title: 'New lesson available',
    message: 'A new bonus lesson has been added to "Mastering Digital Marketing"',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'notification-2',
    title: 'Assignment reminder',
    message: 'Your "Financial Planning" project is due in 3 days',
    time: '1 day ago',
    read: true,
  },
  {
    id: 'notification-3',
    title: 'Instructor feedback',
    message: 'Sarah Johnson has reviewed your recent assignment',
    time: '2 days ago',
    read: true,
  },
];

const userStats = {
  totalHoursLearned: 48,
  coursesCompleted: 1,
  certificatesEarned: 1,
  currentStreak: 5,
  longestStreak: 12,
};

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Dashboard Header */}
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
                      {notifications.filter(n => !n.read).length}
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
        
        {/* Dashboard Content */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div 
                  className={cn(
                    "space-y-6",
                    isLoaded ? "animate-fade-in" : "opacity-0"
                  )}
                >
                  {/* User Profile Card */}
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
                  
                  {/* Learning Stats */}
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
                  
                  {/* Achievements */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium">Achievements</h3>
                        <Button variant="ghost" size="sm" className="text-xs h-8">
                          View All
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {achievements.map((achievement) => (
                          <div key={achievement.id} className="flex items-center">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary mr-3">
                              <achievement.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{achievement.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {achievement.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="learning" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="learning">My Learning</TabsTrigger>
                    <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>
                  
                  {/* My Learning Tab */}
                  <TabsContent value="learning" className="pt-6">
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
                  </TabsContent>
                  
                  {/* Wishlist Tab */}
                  <TabsContent value="wishlist" className="pt-6">
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
                  </TabsContent>
                  
                  {/* Completed Tab */}
                  <TabsContent value="completed" className="pt-6">
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
                  </TabsContent>
                  
                  {/* Notifications Tab */}
                  <TabsContent value="notifications" className="pt-6">
                    <div 
                      className={cn(
                        "space-y-6",
                        isLoaded ? "animate-fade-in" : "opacity-0"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Notifications</h2>
                        <Button variant="ghost" size="sm" className="text-xs h-8">
                          Mark all as read
                        </Button>
                      </div>
                      
                      {notifications.length > 0 ? (
                        <Card>
                          <div className="divide-y">
                            {notifications.map((notification) => (
                              <div 
                                key={notification.id} 
                                className={cn(
                                  "p-4 hover:bg-muted/50 transition-colors flex items-start",
                                  !notification.read && "bg-primary/5"
                                )}
                              >
                                <div className="flex-grow">
                                  <div className="flex items-center space-x-2">
                                    <h3 className={cn(
                                      "font-medium",
                                      !notification.read && "text-primary"
                                    )}>
                                      {notification.title}
                                    </h3>
                                    {!notification.read && (
                                      <Badge variant="outline" className="h-auto py-0 px-2 text-[10px] bg-primary text-primary-foreground">
                                        New
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {notification.message}
                                  </p>
                                  <div className="text-xs text-muted-foreground mt-2">
                                    {notification.time}
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </Card>
                      ) : (
                        <Card className="p-6 text-center">
                          <div className="flex flex-col items-center space-y-4">
                            <Bell className="h-12 w-12 text-muted-foreground" />
                            <h3 className="text-lg font-medium">No notifications</h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                              You're all caught up! We'll notify you about course updates and important events.
                            </p>
                          </div>
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
