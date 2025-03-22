
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Star, Clock, BarChart, Award, CheckCircle, Play, FileText, Download, Users, ChevronLeft, List } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/ui/CourseCard';

// Mock course data
const courseData = {
  id: 'course-1',
  title: 'Mastering Digital Marketing: A Comprehensive Guide',
  subtitle: 'Learn the strategies and techniques used by top marketing professionals to grow businesses in the digital age.',
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
  studentsCount: 42890,
  category: 'Marketing',
  level: 'Intermediate',
  duration: '30 hours',
  lastUpdated: '2023-08-15',
  language: 'English',
  features: [
    'Comprehensive curriculum covering all aspects of digital marketing',
    'Real-world projects and case studies from top brands',
    'Lifetime access to course updates and resources',
    'Certificate of completion to showcase your skills',
  ],
  description: `<p>In this comprehensive course, you'll learn everything you need to know about digital marketing from a seasoned expert with over 15 years of experience in the field.</p>
                <p>This course is designed for beginners to intermediate students who want to understand how to create and implement effective marketing strategies across various digital channels.</p>
                <p>We'll cover everything from search engine optimization (SEO) to social media marketing, email campaigns, content strategy, and paid advertising.</p>
                <p>By the end of this course, you'll have a solid understanding of digital marketing principles and practical skills that you can apply immediately to grow any business.</p>`,
  whatYouWillLearn: [
    'Create comprehensive digital marketing strategies from scratch',
    'Optimize websites for search engines and improve rankings',
    'Build effective social media campaigns across multiple platforms',
    'Develop engaging content that converts visitors into customers',
    'Set up and analyze marketing analytics to measure campaign success',
    'Create and optimize paid advertising campaigns',
    'Build and grow an email list with high engagement rates',
  ],
  courseContent: [
    {
      id: 'section-1',
      title: 'Introduction to Digital Marketing',
      lessons: [
        { id: 'lesson-1-1', title: 'What is Digital Marketing?', duration: '12:30', type: 'video', isPreview: true },
        { id: 'lesson-1-2', title: 'The Digital Marketing Landscape', duration: '15:45', type: 'video' },
        { id: 'lesson-1-3', title: 'Setting Your Marketing Goals', duration: '18:20', type: 'video' },
        { id: 'lesson-1-4', title: 'Understanding Your Target Audience', duration: '22:10', type: 'video' },
      ],
    },
    {
      id: 'section-2',
      title: 'Search Engine Optimization (SEO)',
      lessons: [
        { id: 'lesson-2-1', title: 'SEO Fundamentals', duration: '24:15', type: 'video' },
        { id: 'lesson-2-2', title: 'Keyword Research', duration: '18:30', type: 'video' },
        { id: 'lesson-2-3', title: 'On-Page SEO Techniques', duration: '27:45', type: 'video' },
        { id: 'lesson-2-4', title: 'Off-Page SEO Strategies', duration: '20:10', type: 'video' },
        { id: 'lesson-2-5', title: 'Technical SEO Audit', duration: '30:20', type: 'video' },
      ],
    },
    {
      id: 'section-3',
      title: 'Social Media Marketing',
      lessons: [
        { id: 'lesson-3-1', title: 'Social Media Strategy', duration: '22:40', type: 'video' },
        { id: 'lesson-3-2', title: 'Content Creation for Social Media', duration: '25:15', type: 'video' },
        { id: 'lesson-3-3', title: 'Instagram Marketing', duration: '19:30', type: 'video', isPreview: true },
        { id: 'lesson-3-4', title: 'Facebook Advertising', duration: '28:45', type: 'video' },
        { id: 'lesson-3-5', title: 'LinkedIn for B2B Marketing', duration: '23:10', type: 'video' },
        { id: 'lesson-3-6', title: 'TikTok Marketing Strategies', duration: '26:30', type: 'video' },
      ],
    },
  ],
  relatedCourses: ['course-2', 'course-3', 'course-4']
};

// Mock related courses data
const relatedCoursesData = [
  {
    id: 'course-2',
    title: 'Advanced Social Media Marketing',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
    price: 79.99,
    originalPrice: 109.99,
    rating: 4.7,
    reviewCount: 832,
    category: 'Marketing',
    level: 'Advanced',
    duration: '25 hours',
    studentsCount: 18450,
  },
  {
    id: 'course-3',
    title: 'Email Marketing Mastery',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 59.99,
    originalPrice: 89.99,
    rating: 4.6,
    reviewCount: 728,
    category: 'Marketing',
    level: 'Intermediate',
    duration: '18 hours',
    studentsCount: 21320,
  },
  {
    id: 'course-4',
    title: 'Content Marketing Strategy',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewCount: 945,
    category: 'Marketing',
    level: 'Beginner',
    duration: '22 hours',
    studentsCount: 28670,
  },
];

const CourseDetail = () => {
  const { courseId } = useParams();
  const [expandedSections, setExpandedSections] = useState<string[]>(['section-1']);
  
  // In a real app, we'd fetch the course based on courseId
  // For now, we'll just use our mock data
  const course = courseData;
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4">
          <div className="max-w-7xl mx-auto px-6">
            <Link to="/courses" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Courses
            </Link>
          </div>
        </div>
        
        {/* Course Header */}
        <section className="py-8 md:py-12 bg-card border-b">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <div className="rounded-lg overflow-hidden mb-6">
                  <img 
                    src={course.coverImage} 
                    alt={course.title} 
                    className="w-full aspect-video object-cover" 
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
                <p className="text-lg text-muted-foreground">{course.subtitle}</p>
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5" fill={i < Math.floor(course.rating) ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{course.rating}</span>
                    <span className="ml-1 text-muted-foreground">({course.reviewCount} reviews)</span>
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.studentsCount.toLocaleString()} students</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name} 
                    className="h-10 w-10 rounded-full mr-3" 
                  />
                  <div>
                    <p className="font-medium">{course.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge variant="outline" className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {course.duration}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <BarChart className="h-3 w-3 mr-1" />
                    {course.level}
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <Award className="h-3 w-3 mr-1" />
                    Certificate
                  </Badge>
                  <Badge variant="outline">
                    Last updated {course.lastUpdated}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${course.price}</span>
                    {course.originalPrice && (
                      <span className="ml-2 text-muted-foreground line-through">${course.originalPrice}</span>
                    )}
                    {course.originalPrice && (
                      <Badge className="ml-2 bg-green-500">
                        {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                      </Badge>
                    )}
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Enroll Now
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">30-Day Money-Back Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Tabs defaultValue="overview">
                  <TabsList className="w-full grid grid-cols-3 mb-8">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                      <div className="text-muted-foreground space-y-4" dangerouslySetInnerHTML={{ __html: course.description }} />
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="curriculum" className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Course Content</h2>
                      <div className="text-sm text-muted-foreground">
                        {course.courseContent.reduce((acc, section) => acc + section.lessons.length, 0)} lessons • {course.duration}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {course.courseContent.map((section) => (
                        <div key={section.id} className="border rounded-md overflow-hidden">
                          <div 
                            className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer"
                            onClick={() => toggleSection(section.id)}
                          >
                            <div className="flex items-center font-medium">
                              <List className="h-5 w-5 mr-2" />
                              {section.title}
                              <Badge variant="outline" className="ml-3">
                                {section.lessons.length} lessons
                              </Badge>
                            </div>
                            <ChevronLeft className={`h-5 w-5 transition-transform ${expandedSections.includes(section.id) ? 'rotate-90' : '-rotate-90'}`} />
                          </div>
                          
                          {expandedSections.includes(section.id) && (
                            <div className="divide-y">
                              {section.lessons.map((lesson) => (
                                <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-muted/20">
                                  <div className="flex items-center">
                                    {lesson.type === 'video' ? (
                                      <Play className="h-4 w-4 mr-3 text-primary" />
                                    ) : (
                                      <FileText className="h-4 w-4 mr-3 text-primary" />
                                    )}
                                    <span>{lesson.title}</span>
                                    {lesson.isPreview && (
                                      <Badge variant="outline" className="ml-3">Preview</Badge>
                                    )}
                                  </div>
                                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="instructor" className="space-y-6">
                    <div className="flex items-start gap-6">
                      <img 
                        src={course.instructor.avatar} 
                        alt={course.instructor.name} 
                        className="h-20 w-20 rounded-full" 
                      />
                      <div>
                        <h2 className="text-2xl font-bold">{course.instructor.name}</h2>
                        <p className="text-muted-foreground">{course.instructor.title}</p>
                        
                        <div className="flex gap-6 mt-3">
                          <div>
                            <div className="font-medium">{course.instructor.rating}</div>
                            <div className="text-sm text-muted-foreground">Instructor Rating</div>
                          </div>
                          <div>
                            <div className="font-medium">{course.instructor.reviewsCount.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Reviews</div>
                          </div>
                          <div>
                            <div className="font-medium">{course.instructor.studentsCount.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Students</div>
                          </div>
                          <div>
                            <div className="font-medium">{course.instructor.coursesCount}</div>
                            <div className="text-sm text-muted-foreground">Courses</div>
                          </div>
                        </div>
                        
                        <p className="mt-4">
                          {course.instructor.bio}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <Card className="h-fit sticky top-20">
                <div className="p-6 space-y-6">
                  <h3 className="text-xl font-bold">This course includes:</h3>
                  
                  <div className="space-y-3">
                    <div className="flex">
                      <Play className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium">30 hours on-demand video</div>
                      </div>
                    </div>
                    <div className="flex">
                      <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium">15 articles & resources</div>
                      </div>
                    </div>
                    <div className="flex">
                      <Download className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Access on mobile and TV</div>
                      </div>
                    </div>
                    <div className="flex">
                      <Award className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Certificate of completion</div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      Enroll Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Try Free Preview
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Related Courses */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCoursesData.map((relatedCourse) => (
                <CourseCard 
                  key={relatedCourse.id} 
                  {...relatedCourse} 
                  level={relatedCourse.level as "Beginner" | "Intermediate" | "Advanced" | "All Levels"}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
