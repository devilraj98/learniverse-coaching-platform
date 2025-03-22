
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, Users, Clock, Award, Check, Globe, PlayCircle, FileText, Monitor, BookOpen, Share2, ShoppingCart, PlusCircle, Menu } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/ui/CourseCard';

// Mock data for demonstration
const coursesData = {
  'course-1': {
    id: 'course-1',
    title: 'Mastering Digital Marketing: A Comprehensive Guide',
    subtitle: 'Learn the strategies and techniques used by top marketing professionals to grow businesses in the digital age',
    instructor: {
      id: 'instructor-1',
      name: 'Sarah Johnson',
      title: 'Marketing Director & Consultant',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      bio: 'Digital marketing expert who has helped scale startups to multi-million dollar businesses through strategic online campaigns.',
      coursesCount: 8,
      studentsCount: 35780,
      reviewsCount: 2876,
      rating: 4.7,
    },
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 1247,
    category: 'Marketing',
    level: 'All Levels',
    duration: '30 hours',
    totalLectures: 86,
    totalSections: 12,
    language: 'English',
    certificate: true,
    lifetime: true,
    lastUpdated: 'April 2023',
    studentsCount: 18650,
    description: `
      <p>Digital marketing is one of the most in-demand skills in today's job market, and for good reason. As businesses of all sizes shift their focus to online platforms, the need for professionals who understand how to effectively market in the digital space has never been greater.</p>
      
      <p>This comprehensive course is designed to take you from beginner to advanced in all aspects of digital marketing. Whether you're looking to advance your career, grow your own business, or just understand the digital landscape better, this course provides the knowledge and practical skills you need.</p>
      
      <h3>What You'll Learn:</h3>
      <ul>
        <li>Create effective marketing strategies across multiple digital channels</li>
        <li>Understand consumer behavior in the digital space</li>
        <li>Master SEO and content marketing to drive organic traffic</li>
        <li>Build and optimize paid advertising campaigns that convert</li>
        <li>Analyze marketing data to make informed decisions</li>
        <li>Develop cohesive brand messaging across platforms</li>
      </ul>
    `,
    whatYouWillLearn: [
      'Create comprehensive digital marketing strategies from scratch',
      'Master the fundamentals of SEO, PPC, content marketing, and social media',
      'Conduct market research and competitor analysis to identify opportunities',
      'Build and optimize landing pages that convert visitors to customers',
      'Develop email marketing campaigns with high open and click rates',
      'Track and analyze marketing metrics to improve campaign performance',
      'Create and run effective paid advertising campaigns on Google and social platforms',
      'Build a strong brand presence across multiple digital channels',
    ],
    requirements: [
      'No prior marketing experience needed - this course is suitable for beginners',
      'Basic computer skills and internet access',
      'A desire to learn and apply digital marketing strategies',
    ],
    curriculum: [
      {
        id: 'section-1',
        title: 'Introduction to Digital Marketing',
        lectures: [
          { id: 'lecture-1-1', title: 'Welcome to the Course', duration: '6:23', preview: true, type: 'video' },
          { id: 'lecture-1-2', title: 'What is Digital Marketing?', duration: '12:45', preview: false, type: 'video' },
          { id: 'lecture-1-3', title: 'The Digital Marketing Landscape', duration: '18:32', preview: false, type: 'video' },
          { id: 'lecture-1-4', title: 'Key Terms and Concepts', duration: '14:18', preview: false, type: 'text' },
          { id: 'lecture-1-5', title: 'Introduction Assignment', duration: '15:00', preview: false, type: 'assignment' },
        ],
      },
      {
        id: 'section-2',
        title: 'Building a Digital Marketing Strategy',
        lectures: [
          { id: 'lecture-2-1', title: 'Elements of a Successful Strategy', duration: '22:16', preview: false, type: 'video' },
          { id: 'lecture-2-2', title: 'Setting SMART Marketing Goals', duration: '18:42', preview: false, type: 'video' },
          { id: 'lecture-2-3', title: 'Understanding Your Target Audience', duration: '25:10', preview: false, type: 'video' },
          { id: 'lecture-2-4', title: 'Competitive Analysis Methods', duration: '20:35', preview: false, type: 'video' },
          { id: 'lecture-2-5', title: 'Strategy Development Exercise', duration: '30:00', preview: false, type: 'assignment' },
        ],
      },
      {
        id: 'section-3',
        title: 'Search Engine Optimization (SEO)',
        lectures: [
          { id: 'lecture-3-1', title: 'SEO Fundamentals', duration: '24:18', preview: false, type: 'video' },
          { id: 'lecture-3-2', title: 'Keyword Research and Analysis', duration: '28:45', preview: false, type: 'video' },
          { id: 'lecture-3-3', title: 'On-Page SEO Techniques', duration: '26:32', preview: false, type: 'video' },
          { id: 'lecture-3-4', title: 'Off-Page SEO Strategies', duration: '22:14', preview: false, type: 'video' },
          { id: 'lecture-3-5', title: 'Technical SEO Essentials', duration: '30:20', preview: false, type: 'video' },
          { id: 'lecture-3-6', title: 'SEO Audit Workshop', duration: '45:00', preview: false, type: 'assignment' },
        ],
      },
      {
        id: 'section-4',
        title: 'Content Marketing',
        lectures: [
          { id: 'lecture-4-1', title: 'Content Marketing Principles', duration: '19:56', preview: false, type: 'video' },
          { id: 'lecture-4-2', title: 'Creating a Content Strategy', duration: '23:42', preview: false, type: 'video' },
          { id: 'lecture-4-3', title: 'Blogging for Business', duration: '21:35', preview: false, type: 'video' },
          { id: 'lecture-4-4', title: 'Video Content Creation', duration: '25:18', preview: false, type: 'video' },
          { id: 'lecture-4-5', title: 'Content Distribution Channels', duration: '18:24', preview: false, type: 'video' },
          { id: 'lecture-4-6', title: 'Content Calendar Workshop', duration: '30:00', preview: false, type: 'assignment' },
        ],
      },
    ],
    relatedCourses: ['course-8', 'course-1', 'course-2'],
  },
  'course-2': {
    id: 'course-2',
    title: 'Financial Planning for Entrepreneurs',
    instructor: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewCount: 823,
    category: 'Business',
    level: 'Intermediate',
    duration: '22 hours',
    studentsCount: 12450,
  },
  'course-8': {
    id: 'course-8',
    title: 'Social Media Strategy for Businesses',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    price: 69.99,
    rating: 4.7,
    reviewCount: 756,
    category: 'Marketing',
    level: 'Intermediate',
    duration: '18 hours',
    studentsCount: 11250,
  },
};

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [relatedCourses, setRelatedCourses] = useState<any[]>([]);
  
  useEffect(() => {
    // In a real app, you would fetch course data from an API
    if (courseId && coursesData[courseId as keyof typeof coursesData]) {
      const courseData = coursesData[courseId as keyof typeof coursesData];
      setCourse(courseData);
      
      // Get related courses
      if (courseData.relatedCourses) {
        const related = courseData.relatedCourses
          .map(id => coursesData[id as keyof typeof coursesData])
          .filter(Boolean);
        setRelatedCourses(related);
      }
    }
    
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, [courseId]);
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const discountPercentage = course.originalPrice 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) 
    : 0;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Course Header */}
        <section 
          className={cn(
            "bg-muted/30 py-10 md:py-16 border-b",
            isLoaded ? "animate-fade-in" : "opacity-0"
          )}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Course Info */}
              <div className="space-y-6">
                <div>
                  <Badge className="mb-3">{course.category}</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold leading-tight">{course.title}</h1>
                  <p className="text-lg text-muted-foreground mt-2">{course.subtitle}</p>
                </div>
                
                <div className="flex items-center flex-wrap gap-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium">{course.rating.toFixed(1)}</span>
                    <span className="mx-1 text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{course.reviewCount} reviews</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.studentsCount.toLocaleString()} students</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>{course.language}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{course.level}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={course.instructor.avatar} 
                      alt={course.instructor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <Link to={`/instructors/${course.instructor.id}`} className="font-medium hover:text-primary">
                      {course.instructor.name}
                    </Link>
                    <div className="text-sm text-muted-foreground">{course.instructor.title}</div>
                  </div>
                </div>
                
                <div className="md:hidden">
                  {!imageLoaded && (
                    <div className="aspect-video bg-muted animate-pulse rounded-lg" />
                  )}
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className={cn(
                      "w-full object-cover rounded-lg",
                      !imageLoaded ? "hidden" : "block animate-fade-in"
                    )}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                
                <div className="pt-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button asChild className="w-full text-base bg-primary hover:bg-primary/90">
                      <a href="#enrollment">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Enroll Now
                      </a>
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Course Image (desktop only) */}
              <div className="hidden md:block">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  {!imageLoaded && (
                    <div className="aspect-video bg-muted animate-pulse" />
                  )}
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className={cn(
                      "w-full object-cover aspect-video",
                      !imageLoaded ? "hidden" : "block animate-scale-in"
                    )}
                    onLoad={() => setImageLoaded(true)}
                  />
                  {discountPercentage > 0 && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-sm">
                      {discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="pt-6">
                    <div 
                      className={cn(
                        "space-y-8",
                        isLoaded ? "animate-fade-in" : "opacity-0"
                      )}
                    >
                      {/* Description */}
                      <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">About This Course</h2>
                        <div 
                          className={cn(
                            "prose prose-sm max-w-none text-muted-foreground",
                            !showFullDescription && "line-clamp-6"
                          )}
                          dangerouslySetInnerHTML={{ __html: course.description }}
                        />
                        <Button 
                          variant="ghost" 
                          className="underline text-primary" 
                          onClick={() => setShowFullDescription(!showFullDescription)}
                        >
                          {showFullDescription ? "Show less" : "Show more"}
                        </Button>
                      </div>
                      
                      {/* What You'll Learn */}
                      <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">What You'll Learn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {course.whatYouWillLearn.map((item: string, index: number) => (
                            <div key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Requirements */}
                      <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Requirements</h2>
                        <ul className="space-y-2">
                          {course.requirements.map((item: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <div className="h-1.5 w-1.5 rounded-full bg-foreground mt-2 mr-3" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Curriculum Tab */}
                  <TabsContent value="curriculum" className="pt-6">
                    <div 
                      className={cn(
                        "space-y-6",
                        isLoaded ? "animate-fade-in" : "opacity-0"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Course Content</h2>
                        <div className="text-sm text-muted-foreground">
                          {course.totalSections} sections • {course.totalLectures} lectures • {course.duration} total
                        </div>
                      </div>
                      
                      <Accordion type="single" collapsible className="w-full">
                        {course.curriculum.map((section: any) => (
                          <AccordionItem value={section.id} key={section.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex flex-col items-start text-left">
                                <div>{section.title}</div>
                                <div className="text-sm text-muted-foreground font-normal">
                                  {section.lectures.length} lectures • {
                                    section.lectures.reduce((acc: number, lecture: any) => {
                                      const [mins, secs] = lecture.duration.split(':').map(Number);
                                      return acc + mins + secs / 60;
                                    }, 0).toFixed(0)
                                  } min
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-1 pt-2">
                                {section.lectures.map((lecture: any) => (
                                  <div 
                                    key={lecture.id} 
                                    className="flex items-center justify-between py-3 px-4 rounded-md hover:bg-muted/50 transition-colors"
                                  >
                                    <div className="flex items-center">
                                      {lecture.type === 'video' && <PlayCircle className="h-4 w-4 mr-3 text-primary" />}
                                      {lecture.type === 'text' && <FileText className="h-4 w-4 mr-3 text-primary" />}
                                      {lecture.type === 'assignment' && <Monitor className="h-4 w-4 mr-3 text-primary" />}
                                      <div>
                                        <div className="text-sm">{lecture.title}</div>
                                        {lecture.preview && (
                                          <Badge variant="outline" className="mt-1 text-xs">Preview</Badge>
                                        )}
                                      </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{lecture.duration}</div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>
                  
                  {/* Instructor Tab */}
                  <TabsContent value="instructor" className="pt-6">
                    <div 
                      className={cn(
                        "space-y-6",
                        isLoaded ? "animate-fade-in" : "opacity-0"
                      )}
                    >
                      <h2 className="text-2xl font-semibold">About the Instructor</h2>
                      
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="md:w-1/3 flex flex-col items-center text-center">
                          <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                            <img 
                              src={course.instructor.avatar} 
                              alt={course.instructor.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="text-lg font-medium">{course.instructor.name}</h3>
                          <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                          
                          <div className="grid grid-cols-3 gap-4 w-full mt-4">
                            <div className="flex flex-col items-center">
                              <Star className="h-5 w-5 text-yellow-500 mb-1" />
                              <span className="font-semibold">{course.instructor.rating.toFixed(1)}</span>
                              <span className="text-xs text-muted-foreground">Rating</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <BookOpen className="h-5 w-5 text-primary mb-1" />
                              <span className="font-semibold">{course.instructor.coursesCount}</span>
                              <span className="text-xs text-muted-foreground">Courses</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Users className="h-5 w-5 text-primary mb-1" />
                              <span className="font-semibold">{(course.instructor.studentsCount / 1000).toFixed(1)}k</span>
                              <span className="text-xs text-muted-foreground">Students</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-2/3">
                          <p className="text-muted-foreground">{course.instructor.bio}</p>
                          <Button asChild variant="outline" className="mt-4">
                            <Link to={`/instructors/${course.instructor.id}`}>
                              View Profile
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Reviews Tab */}
                  <TabsContent value="reviews" className="pt-6">
                    <div 
                      className={cn(
                        "space-y-6",
                        isLoaded ? "animate-fade-in" : "opacity-0"
                      )}
                    >
                      <h2 className="text-2xl font-semibold">Student Reviews</h2>
                      
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3 bg-muted/30 p-6 rounded-lg text-center">
                          <div className="text-5xl font-bold mb-2">{course.rating.toFixed(1)}</div>
                          <div className="flex justify-center mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star}
                                className={cn(
                                  "h-5 w-5",
                                  star <= Math.round(course.rating) 
                                    ? "text-yellow-500 fill-current"
                                    : "text-muted-foreground"
                                )}
                              />
                            ))}
                          </div>
                          <div className="text-muted-foreground">
                            Based on {course.reviewCount} reviews
                          </div>
                        </div>
                        
                        <div className="md:w-2/3">
                          <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((rating) => {
                              // Calculate a realistic distribution of ratings
                              const percentage = rating === 5 ? 68 :
                                rating === 4 ? 20 :
                                rating === 3 ? 8 :
                                rating === 2 ? 3 : 1;
                              
                              return (
                                <div key={rating} className="flex items-center">
                                  <div className="flex items-center w-20">
                                    <span className="mr-2">{rating}</span>
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  </div>
                                  <div className="flex-grow mx-3">
                                    <Progress value={percentage} className="h-2" />
                                  </div>
                                  <div className="w-12 text-right text-sm text-muted-foreground">
                                    {percentage}%
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          <Button className="mt-6">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Write a Review
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pt-4 text-center text-muted-foreground">
                        <p>Sign in to view all reviews and course discussions.</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card 
                    id="enrollment" 
                    className={cn(
                      "border-border overflow-hidden",
                      isLoaded ? "animate-fade-in" : "opacity-0"
                    )}
                  >
                    <div className="p-6 space-y-6">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">
                          ${course.price.toFixed(2)}
                        </span>
                        {course.originalPrice && (
                          <span className="ml-2 text-lg text-muted-foreground line-through">
                            ${course.originalPrice.toFixed(2)}
                          </span>
                        )}
                        {discountPercentage > 0 && (
                          <Badge className="ml-2 bg-primary/10 text-primary border-primary/20">
                            {discountPercentage}% off
                          </Badge>
                        )}
                      </div>
                      
                      <Button className="w-full text-base">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Enroll Now
                      </Button>
                      
                      <div className="text-center text-sm text-muted-foreground">
                        30-Day Money-Back Guarantee
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        <h3 className="font-medium">This course includes:</h3>
                        <ul className="space-y-3">
                          <li className="flex items-center text-sm">
                            <Monitor className="h-4 w-4 mr-3 text-muted-foreground" />
                            <span>{course.duration} on-demand video</span>
                          </li>
                          <li className="flex items-center text-sm">
                            <FileText className="h-4 w-4 mr-3 text-muted-foreground" />
                            <span>Downloadable resources</span>
                          </li>
                          <li className="flex items-center text-sm">
                            <Menu className="h-4 w-4 mr-3 text-muted-foreground" />
                            <span>{course.totalLectures} lessons in {course.totalSections} sections</span>
                          </li>
                          {course.certificate && (
                            <li className="flex items-center text-sm">
                              <Award className="h-4 w-4 mr-3 text-muted-foreground" />
                              <span>Certificate of completion</span>
                            </li>
                          )}
                          {course.lifetime && (
                            <li className="flex items-center text-sm">
                              <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
                              <span>Full lifetime access</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <section className="py-10 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6">
              <div 
                className={cn(
                  "mb-8",
                  isLoaded ? "animate-fade-in" : "opacity-0"
                )}
              >
                <h2 className="text-2xl font-semibold">Related Courses</h2>
                <p className="text-muted-foreground mt-1">You might also be interested in these courses</p>
              </div>
              
              <div 
                className={cn(
                  "grid grid-cols-1 md:grid-cols-3 gap-6",
                  isLoaded ? "animate-fade-in animation-delay-100" : "opacity-0"
                )}
              >
                {relatedCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
