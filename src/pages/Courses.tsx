import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/ui/CourseCard';
import CategoryFilter from '@/components/ui/CategoryFilter';
import { 
  Button, 
  Input, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  Checkbox
} from '@/components/ui';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  SlidersHorizontal,
  BookOpen,
} from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const categories = [
  { id: 'aws-core', name: 'AWS Core Services' },
  { id: 'devops', name: 'DevOps Practices' },
  { id: 'ci-cd', name: 'CI/CD Pipelines' },
  { id: 'containers', name: 'Containers & Kubernetes' },
  { id: 'iac', name: 'Infrastructure as Code' },
  { id: 'monitoring', name: 'Monitoring & Logging' },
  { id: 'security', name: 'Security & Compliance' },
  { id: 'automation', name: 'Automation' },
];

const coursesData = [
  {
    id: 'aws-devops-pro',
    title: 'AWS Certified DevOps Engineer Professional',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1667372393119-3d9503fd520a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 342,
    category: 'devops',
    level: 'Advanced',
    duration: '45 hours',
    studentsCount: 5840,
    featured: true
  },
  {
    id: 'aws-ci-cd',
    title: 'CI/CD Pipeline Implementation with AWS',
    instructor: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviewCount: 218,
    category: 'ci-cd',
    level: 'Intermediate',
    duration: '30 hours',
    studentsCount: 3420,
    featured: false
  },
  {
    id: 'aws-terraform',
    title: 'Infrastructure as Code with Terraform on AWS',
    instructor: {
      name: 'Jennifer Lee',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewCount: 156,
    category: 'iac',
    level: 'Intermediate',
    duration: '28 hours',
    studentsCount: 2750,
    featured: false
  },
  {
    id: 'aws-containers',
    title: 'AWS Container Services: ECS and EKS Masterclass',
    instructor: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1605745341289-55ac289bf12c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    price: 99.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviewCount: 187,
    category: 'containers',
    level: 'Intermediate',
    duration: '35 hours',
    studentsCount: 2100,
    featured: false
  },
  {
    id: 'aws-security',
    title: 'AWS Security Best Practices for DevOps',
    instructor: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.7,
    reviewCount: 125,
    category: 'security',
    level: 'Intermediate',
    duration: '25 hours',
    studentsCount: 1850,
    featured: false
  },
  {
    id: 'aws-monitoring',
    title: 'AWS CloudWatch and Monitoring Solutions',
    instructor: {
      name: 'Thomas Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviewCount: 98,
    category: 'monitoring',
    level: 'Intermediate',
    duration: '20 hours',
    studentsCount: 1380,
    featured: false
  },
  {
    id: 'aws-automation',
    title: 'AWS Automation with CloudFormation and CDK',
    instructor: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 84.99,
    originalPrice: 109.99,
    rating: 4.8,
    reviewCount: 146,
    category: 'automation',
    level: 'Intermediate',
    duration: '32 hours',
    studentsCount: 2250,
    featured: false
  },
  {
    id: 'aws-beginner',
    title: 'AWS Fundamentals for DevOps Engineers',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.9,
    reviewCount: 312,
    category: 'aws-core',
    level: 'Beginner',
    duration: '18 hours',
    studentsCount: 7500,
    featured: true
  }
];

type Course = typeof coursesData[0];
type Category = typeof categories[0];

const filters = [
  { id: 'featured', label: 'Featured' },
  { id: 'free', label: 'Free' },
  { id: 'paid', label: 'Paid' },
  { id: 'discount', label: 'Discounted' },
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const levelOptions = [
  { value: 'All Levels', label: 'All Levels' },
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState('popular');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
    setActivePage(1);
  };
  
  const handleFilterChange = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
    setActivePage(1);
  };
  
  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(prev => !prev);
  };
  
  const filteredCourses = coursesData.filter(course => {
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) {
      return false;
    }
    
    if (selectedLevel && selectedLevel !== 'All Levels' && course.level !== selectedLevel) {
      return false;
    }
    
    if (selectedFilters.includes('featured') && !course.featured) {
      return false;
    }
    
    if (selectedFilters.includes('free') && course.price !== 0) {
      return false;
    }
    
    if (selectedFilters.includes('paid') && course.price === 0) {
      return false;
    }
    
    if (selectedFilters.includes('discount') && !course.originalPrice) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (selectedSortOption) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return 0.5 - Math.random();
      case 'popular':
      default:
        return b.studentsCount - a.studentsCount;
    }
  });
  
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-grow pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              AWS DevOps Courses
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Master cloud infrastructure and automation with our expert-led AWS DevOps certification courses
            </p>
          </div>
          
          <div className="mb-10 space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="search"
                placeholder="Search for AWS DevOps courses..."
                className="pl-10 py-6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="bg-muted/40 p-4 rounded-lg">
              <h2 className="font-medium mb-3">Browse Categories</h2>
              <CategoryFilter 
                categories={categories} 
                selectedCategories={selectedCategories} 
                onChange={handleCategoryChange} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Sort By</h3>
                  <Select value={selectedSortOption} onValueChange={setSelectedSortOption}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Level</h3>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Filters</h3>
                  <div className="space-y-2">
                    {filters.map((filter) => (
                      <div key={filter.id} className="flex items-center">
                        <Checkbox
                          id={`filter-${filter.id}`}
                          checked={selectedFilters.includes(filter.id)}
                          onCheckedChange={() => handleFilterChange(filter.id)}
                        />
                        <label
                          htmlFor={`filter-${filter.id}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {filter.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full" onClick={() => {
                    setSelectedCategories([]);
                    setSelectedFilters([]);
                    setSelectedLevel('');
                    setSelectedSortOption('popular');
                    setSearchQuery('');
                  }}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:hidden mb-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-between"
                onClick={toggleFilterMenu}
              >
                <div className="flex items-center">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <span>Filters & Sorting</span>
                </div>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isFilterMenuOpen && "transform rotate-180"
                  )} 
                />
              </Button>
              
              {isFilterMenuOpen && (
                <div className="mt-4 p-4 border rounded-lg space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Browse Categories</h3>
                    <CategoryFilter 
                      categories={categories} 
                      selectedCategories={selectedCategories} 
                      onChange={handleCategoryChange} 
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Sort By</h3>
                    <Select value={selectedSortOption} onValueChange={setSelectedSortOption}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Level</h3>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter by level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Filters</h3>
                    <div className="space-y-2">
                      {filters.map((filter) => (
                        <div key={filter.id} className="flex items-center">
                          <Checkbox
                            id={`mobile-filter-${filter.id}`}
                            checked={selectedFilters.includes(filter.id)}
                            onCheckedChange={() => handleFilterChange(filter.id)}
                          />
                          <label
                            htmlFor={`mobile-filter-${filter.id}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {filter.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={() => {
                    setSelectedCategories([]);
                    setSelectedFilters([]);
                    setSelectedLevel('');
                    setSelectedSortOption('popular');
                    setSearchQuery('');
                  }}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{currentItems.length}</span> of{" "}
                  <span className="font-medium">{filteredCourses.length}</span> courses
                </div>
              </div>
              
              {isLoaded ? (
                currentItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {currentItems.map((course) => (
                      <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        instructor={course.instructor}
                        coverImage={course.coverImage}
                        price={course.price}
                        originalPrice={course.originalPrice}
                        rating={course.rating}
                        reviewCount={course.reviewCount}
                        category={course.category}
                        level={course.level}
                        duration={course.duration}
                        studentsCount={course.studentsCount}
                        featured={course.featured}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No courses found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedFilters([]);
                        setSelectedLevel('');
                        setSelectedSortOption('popular');
                        setSearchQuery('');
                      }}
                    >
                      Reset all filters
                    </Button>
                  </div>
                )
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array(6).fill(null).map((_, i) => (
                    <div key={i} className="bg-muted rounded-lg overflow-hidden">
                      <div className="aspect-video bg-muted-foreground/10 animate-pulse" />
                      <div className="p-5 space-y-4">
                        <div className="h-5 bg-muted-foreground/10 animate-pulse rounded w-3/4" />
                        <div className="h-4 bg-muted-foreground/10 animate-pulse rounded w-1/2" />
                        <div className="pt-4 flex justify-between">
                          <div className="h-6 bg-muted-foreground/10 animate-pulse rounded w-1/4" />
                          <div className="h-6 bg-muted-foreground/10 animate-pulse rounded w-1/4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setActivePage(prev => Math.max(prev - 1, 1))}
                        className={activePage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1;
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= activePage - 1 && pageNumber <= activePage + 1)
                      ) {
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              isActive={activePage === pageNumber}
                              onClick={() => setActivePage(pageNumber)}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      
                      if (
                        (pageNumber === 2 && activePage > 3) ||
                        (pageNumber === totalPages - 1 && activePage < totalPages - 2)
                      ) {
                        return <PaginationItem key={pageNumber}><PaginationEllipsis /></PaginationItem>;
                      }
                      
                      return null;
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setActivePage(prev => Math.min(prev + 1, totalPages))}
                        className={activePage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
