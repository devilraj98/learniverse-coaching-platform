
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, Users, BarChart, Award, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeaturedCourse from '@/components/ui/FeaturedCourse';
import CourseCard from '@/components/ui/CourseCard';
import InstructorCard from '@/components/ui/InstructorCard';

// Mock data for demonstration
const featuredCourse = {
  id: 'course-1',
  title: 'Mastering Digital Marketing: A Comprehensive Guide',
  description: 'Learn the strategies and techniques used by top marketing professionals to grow businesses in the digital age.',
  instructor: {
    name: 'Sarah Johnson',
    title: 'Marketing Director & Consultant',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
  },
  coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
  price: 89.99,
  originalPrice: 129.99,
  rating: 4.8,
  reviewCount: 1247,
  category: 'Marketing',
  duration: '30 hours',
  features: [
    'Comprehensive curriculum covering all aspects of digital marketing',
    'Real-world projects and case studies from top brands',
    'Lifetime access to course updates and resources',
    'Certificate of completion to showcase your skills',
  ],
};

const popularCourses = [
  {
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
    category: 'Finance',
    level: 'Intermediate',
    duration: '22 hours',
    studentsCount: 12450,
  },
  {
    id: 'course-3',
    title: 'Advanced Python for Data Science',
    instructor: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80',
    price: 79.99,
    rating: 4.9,
    reviewCount: 1103,
    category: 'Programming',
    level: 'Advanced',
    duration: '28 hours',
    studentsCount: 15820,
  },
  {
    id: 'course-4',
    title: 'The Art of Public Speaking',
    instructor: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviewCount: 947,
    category: 'Communication',
    level: 'All Levels',
    duration: '16 hours',
    studentsCount: 22340,
  },
];

const topInstructors = [
  {
    id: 'instructor-1',
    name: 'Emily Rodriguez',
    title: 'Communication Coach & Speaker',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    bio: 'Award-winning public speaker with over 15 years of experience coaching executives and professionals on effective communication.',
    courseCount: 6,
    studentsCount: 42500,
    rating: 4.9,
    reviewCount: 3245,
  },
  {
    id: 'instructor-2',
    name: 'David Kim',
    title: 'Senior Data Scientist & Educator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    bio: 'Former Google AI researcher with a passion for making complex programming concepts accessible to everyone.',
    courseCount: 12,
    studentsCount: 68320,
    rating: 4.8,
    reviewCount: 5187,
  },
  {
    id: 'instructor-3',
    name: 'Sarah Johnson',
    title: 'Marketing Director & Consultant',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    bio: 'Digital marketing expert who has helped scale startups to multi-million dollar businesses through strategic online campaigns.',
    courseCount: 8,
    studentsCount: 35780,
    rating: 4.7,
    reviewCount: 2876,
  },
];

const categories = [
  { name: 'Business', count: 486, icon: BarChart },
  { name: 'Programming', count: 352, icon: GraduationCap },
  { name: 'Marketing', count: 275, icon: Users },
  { name: 'Personal Development', count: 183, icon: Award },
];

const features = [
  {
    icon: Award,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with real-world experience and proven track records.',
  },
  {
    icon: Clock,
    title: 'Flexible Learning',
    description: 'Study at your own pace, access content 24/7, and learn on any device.',
  },
  {
    icon: CheckCircle,
    title: 'Practical Skills',
    description: 'Focus on applicable skills through project-based learning and real-world scenarios.',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Join a community of learners and receive guidance from instructors and peers.',
  },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent",
              isLoaded ? "opacity-100" : "opacity-0",
              "transition-opacity duration-1000"
            )}
          />
          
          <div className="max-w-7xl mx-auto px-6 relative">
            <div 
              className={cn(
                "max-w-3xl mx-auto text-center space-y-6 md:space-y-8",
                isLoaded ? "animate-fade-in" : "opacity-0"
              )}
            >
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Transform Your Skills with Expert Online Coaching
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Access premium courses taught by industry experts and take your career to the next level.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" className="text-base">
                  <Link to="/courses">
                    Explore Courses
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link to="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
              
              <div className="pt-6 flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
                  <div>
                    <div className="text-3xl font-bold">300+</div>
                    <div className="text-muted-foreground">Courses</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-muted-foreground">Instructors</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">25k+</div>
                    <div className="text-muted-foreground">Students</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="text-muted-foreground">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Course Section */}
        <section className="py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div 
              className={cn(
                "text-center mb-10",
                isLoaded ? "animate-fade-in animation-delay-100" : "opacity-0"
              )}
            >
              <h2 className="text-3xl font-bold">Featured Course</h2>
              <p className="text-muted-foreground mt-2">Handpicked by our team for exceptional quality and relevance</p>
            </div>
            
            <div className={cn(
              isLoaded ? "animate-scale-in animation-delay-200" : "opacity-0"
            )}>
              <FeaturedCourse {...featuredCourse} />
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-10 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div 
              className={cn(
                "text-center mb-10",
                isLoaded ? "animate-fade-in animation-delay-300" : "opacity-0"
              )}
            >
              <h2 className="text-3xl font-bold">Popular Categories</h2>
              <p className="text-muted-foreground mt-2">Browse our top categories and find what interests you</p>
            </div>
            
            <div 
              className={cn(
                "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
                isLoaded ? "animate-fade-in animation-delay-400" : "opacity-0"
              )}
            >
              {categories.map((category, index) => (
                <Link 
                  key={category.name} 
                  to={`/courses?category=${category.name}`}
                  className="relative overflow-hidden rounded-lg bg-card border border-border hover-lift transition-all group h-32 flex items-center justify-center text-center p-6"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <div>
                    <category.icon className="h-8 w-8 text-primary mb-3 mx-auto" />
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} courses</p>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/courses" className="flex items-center">
                  View All Categories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Popular Courses Section */}
        <section className="py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div 
              className={cn(
                "flex justify-between items-end mb-10",
                isLoaded ? "animate-fade-in animation-delay-500" : "opacity-0"
              )}
            >
              <div>
                <h2 className="text-3xl font-bold">Popular Courses</h2>
                <p className="text-muted-foreground mt-2">Top-rated courses loved by our students</p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link to="/courses" className="flex items-center">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                isLoaded ? "animate-fade-in animation-delay-600" : "opacity-0"
              )}
            >
              {popularCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
            
            <div className="text-center mt-8 sm:hidden">
              <Button asChild>
                <Link to="/courses" className="flex items-center">
                  Browse All Courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-10 md:py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div 
              className={cn(
                "text-center mb-14",
                isLoaded ? "animate-fade-in animation-delay-700" : "opacity-0"
              )}
            >
              <h2 className="text-3xl font-bold">Why Choose Our Platform</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                We've designed every aspect of our learning experience to help you achieve your goals
              </p>
            </div>
            
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                isLoaded ? "animate-fade-in animation-delay-800" : "opacity-0"
              )}
            >
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className={cn(
                    "text-center space-y-3 p-6 rounded-lg bg-card border border-border hover-lift",
                    isLoaded ? `animate-fade-in animation-delay-${800 + (index * 100)}` : "opacity-0"
                  )}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Instructors Section */}
        <section className="py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div 
              className={cn(
                "flex justify-between items-end mb-10",
                isLoaded ? "animate-fade-in animation-delay-900" : "opacity-0"
              )}
            >
              <div>
                <h2 className="text-3xl font-bold">Meet Our Instructors</h2>
                <p className="text-muted-foreground mt-2">Learn from industry experts with real-world experience</p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link to="/instructors" className="flex items-center">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-6",
                isLoaded ? "animate-fade-in animation-delay-1000" : "opacity-0"
              )}
            >
              {topInstructors.map((instructor) => (
                <InstructorCard key={instructor.id} {...instructor} />
              ))}
            </div>
            
            <div className="text-center mt-8 sm:hidden">
              <Button asChild>
                <Link to="/instructors" className="flex items-center">
                  View All Instructors
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section 
          className={cn(
            "py-16 md:py-24 bg-primary/5 relative overflow-hidden",
            isLoaded ? "animate-fade-in animation-delay-1100" : "opacity-0"
          )}
        >
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Advance Your Skills?</h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of students who are already learning and growing with our platform.
              </p>
              <div className="pt-4">
                <Button asChild size="lg" className="text-base">
                  <Link to="/courses">
                    Get Started Today
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full transform -translate-x-1/2 translate-y-1/2" />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
