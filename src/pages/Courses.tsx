
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/ui/CourseCard';
import CategoryFilter, { Category, Level } from '@/components/ui/CategoryFilter';
import { cn } from '@/lib/utils';
import { ArrowUpDown, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for demonstration
const allCourses = [
  {
    id: 'course-1',
    title: 'Mastering Digital Marketing: A Comprehensive Guide',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 1247,
    category: 'Marketing',
    level: 'All Levels',
    duration: '30 hours',
    studentsCount: 18650,
  },
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
    category: 'Business',
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
  {
    id: 'course-5',
    title: 'UX/UI Design Fundamentals',
    instructor: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    price: 74.99,
    originalPrice: 94.99,
    rating: 4.8,
    reviewCount: 762,
    category: 'Design',
    level: 'Beginner',
    duration: '20 hours',
    studentsCount: 9840,
  },
  {
    id: 'course-6',
    title: 'Mindfulness and Stress Management',
    instructor: {
      name: 'Jennifer Lee',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 49.99,
    rating: 4.9,
    reviewCount: 1354,
    category: 'Personal Development',
    level: 'All Levels',
    duration: '15 hours',
    studentsCount: 28750,
  },
  {
    id: 'course-7',
    title: 'React.js for Front-End Developers',
    instructor: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 84.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 987,
    category: 'Programming',
    level: 'Intermediate',
    duration: '26 hours',
    studentsCount: 14530,
  },
  {
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
  {
    id: 'course-9',
    title: 'Leadership Skills for Managers',
    instructor: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewCount: 1089,
    category: 'Business',
    level: 'Advanced',
    duration: '24 hours',
    studentsCount: 16780,
  },
];

const categories: Category[] = [
  { id: 'business', name: 'Business', count: 128 },
  { id: 'marketing', name: 'Marketing', count: 95 },
  { id: 'programming', name: 'Programming', count: 186 },
  { id: 'design', name: 'Design', count: 64 },
  { id: 'communication', name: 'Communication', count: 47 },
  { id: 'personal-development', name: 'Personal Development', count: 72 },
];

type SortOption = 'most-popular' | 'highest-rated' | 'newest' | 'price-low-high' | 'price-high-low';

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // State
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortOption, setSortOption] = useState<SortOption>('most-popular');
  
  useEffect(() => {
    // Get any initial filter values from URL
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const category = categories.find(c => c.name.toLowerCase() === categoryParam.toLowerCase());
      if (category) {
        setSelectedCategories([category.id]);
      }
    }
    
    const searchParam = searchParams.get('q');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    setIsLoaded(true);
  }, [searchParams]);
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...allCourses];
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(course => 
        selectedCategories.some(categoryId => {
          const category = categories.find(c => c.id === categoryId);
          return category && course.category === category.name;
        })
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.instructor.name.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query)
      );
    }
    
    // Apply level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter(course => 
        selectedLevels.includes(course.level as Level)
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(course => 
      course.price >= priceRange[0] && course.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'most-popular':
        filtered.sort((a, b) => b.studentsCount - a.studentsCount);
        break;
      case 'highest-rated':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In real app, would use a date field
        filtered.sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
        break;
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }
    
    setFilteredCourses(filtered);
    
    // Update URL parameters
    const params = new URLSearchParams();
    if (selectedCategories.length > 0) {
      const categoryNames = selectedCategories.map(id => {
        const category = categories.find(c => c.id === id);
        return category ? category.name.toLowerCase() : '';
      }).filter(Boolean);
      
      params.set('category', categoryNames.join(','));
    }
    
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    
    setSearchParams(params, { replace: true });
  }, [selectedCategories, searchQuery, selectedLevels, priceRange, sortOption, setSearchParams]);
  
  const handleCategoryChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
  };
  
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleLevelChange = (levels: Level[]) => {
    setSelectedLevels(levels);
  };
  
  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Header section */}
        <section 
          className={cn(
            "bg-muted/30 py-10 md:py-16",
            isLoaded ? "animate-fade-in" : "opacity-0"
          )}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold">Explore Our Courses</h1>
              <p className="text-muted-foreground text-lg mt-2">
                Browse our collection of premium courses taught by industry experts
              </p>
            </div>
          </div>
        </section>
        
        {/* Main content section */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar with filters */}
              <div 
                className={cn(
                  "lg:col-span-1",
                  isLoaded ? "animate-fade-in" : "opacity-0"
                )}
              >
                <CategoryFilter
                  categories={categories}
                  onCategoryChange={handleCategoryChange}
                  onSearchChange={handleSearchChange}
                  onLevelChange={handleLevelChange}
                  onPriceRangeChange={handlePriceRangeChange}
                  className="sticky top-24"
                />
              </div>
              
              {/* Course listings */}
              <div className="lg:col-span-3">
                {/* Sorting and results count */}
                <div 
                  className={cn(
                    "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4",
                    isLoaded ? "animate-fade-in animation-delay-100" : "opacity-0"
                  )}
                >
                  <div className="text-muted-foreground">
                    <p>Showing <span className="font-medium text-foreground">{filteredCourses.length}</span> results</p>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Sort by:</span>
                    <Select
                      value={sortOption}
                      onValueChange={(value: SortOption) => setSortOption(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="most-popular">Most Popular</SelectItem>
                        <SelectItem value="highest-rated">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                        <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="ml-2"
                      onClick={() => setSortOption(sortOption === 'price-low-high' ? 'price-high-low' : 'price-low-high')}
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Course grid */}
                {filteredCourses.length > 0 ? (
                  <div 
                    className={cn(
                      "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
                      isLoaded ? "animate-fade-in animation-delay-200" : "opacity-0"
                    )}
                  >
                    {filteredCourses.map((course) => (
                      <CourseCard key={course.id} {...course} />
                    ))}
                  </div>
                ) : (
                  <div 
                    className={cn(
                      "text-center py-16 bg-muted/30 rounded-lg",
                      isLoaded ? "animate-fade-in animation-delay-200" : "opacity-0"
                    )}
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium">No courses found</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        We couldn't find any courses matching your search criteria. Try adjusting your filters or search terms.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedCategories([]);
                          setSearchQuery('');
                          setSelectedLevels([]);
                          setPriceRange([0, 200]);
                          setSortOption('most-popular');
                        }}
                      >
                        Clear all filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
