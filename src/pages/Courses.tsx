
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CourseCard from '@/components/ui/CourseCard';
import CategoryFilter from '@/components/ui/CategoryFilter';

// Mock Data
const categories = [
  { name: 'All Categories', count: 1296 },
  { name: 'Business', count: 486 },
  { name: 'Programming', count: 352 },
  { name: 'Marketing', count: 275 },
  { name: 'Design', count: 183 },
  { name: 'Personal Development', count: 142 },
  { name: 'Photography', count: 128 },
  { name: 'Music', count: 95 },
  { name: 'Health & Fitness', count: 87 },
  { name: 'Language Learning', count: 76 },
  { name: 'Finance', count: 68 },
  { name: 'Teaching & Academics', count: 57 },
];

const levels = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const durations = [
  { value: 'all', label: 'Any Duration' },
  { value: 'short', label: '0-3 Hours' },
  { value: 'medium', label: '3-10 Hours' },
  { value: 'long', label: '10+ Hours' },
];

const prices = [
  { value: 'all', label: 'Any Price' },
  { value: 'free', label: 'Free' },
  { value: 'paid', label: 'Paid' },
  { value: 'low', label: 'Under $50' },
  { value: 'high', label: '$50+' },
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'top-rated', label: 'Top Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

// Mock course data
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
    level: 'Intermediate',
    duration: '30 hours',
    studentsCount: 42890,
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
    category: 'Personal Development',
    level: 'All Levels',
    duration: '16 hours',
    studentsCount: 22340,
  },
  {
    id: 'course-5',
    title: 'UI/UX Design Principles',
    instructor: {
      name: 'Jessica Lee',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1540851696419-de7ce1a3dbda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviewCount: 1189,
    category: 'Design',
    level: 'Beginner',
    duration: '20 hours',
    studentsCount: 31240,
  },
  {
    id: 'course-6',
    title: 'Introduction to Machine Learning',
    instructor: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviewCount: 978,
    category: 'Programming',
    level: 'Intermediate',
    duration: '32 hours',
    studentsCount: 19850,
  },
  {
    id: 'course-7',
    title: 'Photography Masterclass',
    instructor: {
      name: 'Robert Chen',
      avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1764&q=80',
    price: 74.99,
    originalPrice: 94.99,
    rating: 4.9,
    reviewCount: 1432,
    category: 'Photography',
    level: 'All Levels',
    duration: '25 hours',
    studentsCount: 38720,
  },
  {
    id: 'course-8',
    title: 'Guitar for Beginners',
    instructor: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.6,
    reviewCount: 892,
    category: 'Music',
    level: 'Beginner',
    duration: '18 hours',
    studentsCount: 28930,
  },
  {
    id: 'course-9',
    title: 'Complete Web Development Bootcamp',
    instructor: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    },
    coverImage: 'https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    price: 99.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 3254,
    category: 'Programming',
    level: 'All Levels',
    duration: '65 hours',
    studentsCount: 125740,
  },
];

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortOption, setSortOption] = useState('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [activeFilters, setActiveFilters] = useState<{type: string, value: string}[]>([]);
  
  // Apply filters whenever any filter criteria changes
  useEffect(() => {
    let result = [...allCourses];
    
    // Apply category filter
    if (activeCategory !== 'All Categories') {
      result = result.filter(course => course.category === activeCategory);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.category.toLowerCase().includes(query) ||
        course.instructor.name.toLowerCase().includes(query)
      );
    }
    
    // Apply level filter
    if (levelFilter !== 'all') {
      const levelMap: Record<string, string> = {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate',
        'advanced': 'Advanced',
        'all-levels': 'All Levels'
      };
      result = result.filter(course => course.level === levelMap[levelFilter]);
    }
    
    // Apply duration filter
    if (durationFilter !== 'all') {
      const getDurationHours = (duration: string): number => {
        const match = duration.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      };
      
      const hours = result.map(course => getDurationHours(course.duration));
      
      if (durationFilter === 'short') {
        result = result.filter((_, i) => hours[i] <= 3);
      } else if (durationFilter === 'medium') {
        result = result.filter((_, i) => hours[i] > 3 && hours[i] <= 10);
      } else if (durationFilter === 'long') {
        result = result.filter((_, i) => hours[i] > 10);
      }
    }
    
    // Apply price filter
    if (priceFilter !== 'all') {
      if (priceFilter === 'free') {
        result = result.filter(course => course.price === 0);
      } else if (priceFilter === 'paid') {
        result = result.filter(course => course.price > 0);
      } else if (priceFilter === 'low') {
        result = result.filter(course => course.price > 0 && course.price < 50);
      } else if (priceFilter === 'high') {
        result = result.filter(course => course.price >= 50);
      }
    }
    
    // Apply sorting
    if (sortOption === 'newest') {
      // In a real app, courses would have a creation date
      // For this mock, we'll just reverse the array to simulate "newest"
      result = [...result].reverse();
    } else if (sortOption === 'top-rated') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else {
      // 'popular' is default
      result = [...result].sort((a, b) => b.studentsCount - a.studentsCount);
    }
    
    setFilteredCourses(result);
    
    // Update active filters for display
    const newActiveFilters: {type: string, value: string}[] = [];
    
    if (activeCategory !== 'All Categories') {
      newActiveFilters.push({ type: 'category', value: activeCategory });
    }
    
    if (levelFilter !== 'all') {
      const levelLabel = levels.find(l => l.value === levelFilter)?.label || '';
      if (levelLabel) {
        newActiveFilters.push({ type: 'level', value: levelLabel });
      }
    }
    
    if (durationFilter !== 'all') {
      const durationLabel = durations.find(d => d.value === durationFilter)?.label || '';
      if (durationLabel) {
        newActiveFilters.push({ type: 'duration', value: durationLabel });
      }
    }
    
    if (priceFilter !== 'all') {
      const priceLabel = prices.find(p => p.value === priceFilter)?.label || '';
      if (priceLabel) {
        newActiveFilters.push({ type: 'price', value: priceLabel });
      }
    }
    
    setActiveFilters(newActiveFilters);
    
  }, [activeCategory, searchQuery, levelFilter, durationFilter, priceFilter, sortOption]);
  
  const handleRemoveFilter = (filterToRemove: {type: string, value: string}) => {
    if (filterToRemove.type === 'category') {
      setActiveCategory('All Categories');
    } else if (filterToRemove.type === 'level') {
      setLevelFilter('all');
    } else if (filterToRemove.type === 'duration') {
      setDurationFilter('all');
    } else if (filterToRemove.type === 'price') {
      setPriceFilter('all');
    }
  };
  
  const clearAllFilters = () => {
    setActiveCategory('All Categories');
    setLevelFilter('all');
    setDurationFilter('all');
    setPriceFilter('all');
    setSearchQuery('');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Page Header */}
        <section className="bg-muted/30 py-10 md:py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Our Courses</h1>
              <p className="text-lg text-muted-foreground">
                Discover top-quality courses taught by industry experts and take your skills to the next level
              </p>
              
              <div className="mt-8 max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    type="search"
                    placeholder="Search courses, categories, or instructors..." 
                    className="pl-10 py-6 text-base border-input"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Catalog */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Filters (Desktop) */}
              <aside className="hidden md:block w-64 space-y-8">
                <div>
                  <h3 className="font-medium text-lg mb-3">Categories</h3>
                  <CategoryFilter 
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Filter by</h3>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Level</label>
                      <Select value={levelFilter} onValueChange={setLevelFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map(level => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Duration</label>
                      <Select value={durationFilter} onValueChange={setDurationFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {durations.map(duration => (
                            <SelectItem key={duration.value} value={duration.value}>
                              {duration.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-medium">Price</label>
                      <Select value={priceFilter} onValueChange={setPriceFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select price" />
                        </SelectTrigger>
                        <SelectContent>
                          {prices.map(price => (
                            <SelectItem key={price.value} value={price.value}>
                              {price.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </aside>
              
              {/* Mobile Filters Button */}
              <div className="md:hidden mb-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setIsMobileFilterOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filter Courses
                </Button>
              </div>
              
              {/* Mobile Filters Drawer */}
              {isMobileFilterOpen && (
                <div className="fixed inset-0 bg-background z-50 overflow-y-auto p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsMobileFilterOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-medium mb-3">Categories</h3>
                      <CategoryFilter 
                        categories={categories}
                        activeCategory={activeCategory}
                        onSelectCategory={(category) => {
                          setActiveCategory(category);
                          setIsMobileFilterOpen(false);
                        }}
                      />
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Level</label>
                        <Select value={levelFilter} onValueChange={setLevelFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {levels.map(level => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Duration</label>
                        <Select value={durationFilter} onValueChange={setDurationFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {durations.map(duration => (
                              <SelectItem key={duration.value} value={duration.value}>
                                {duration.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Price</label>
                        <Select value={priceFilter} onValueChange={setPriceFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select price" />
                          </SelectTrigger>
                          <SelectContent>
                            {prices.map(price => (
                              <SelectItem key={price.value} value={price.value}>
                                {price.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full"
                        onClick={() => setIsMobileFilterOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Main Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <p className="text-muted-foreground">Showing {filteredCourses.length} results</p>
                  </div>
                  
                  <div className="flex items-center w-full sm:w-auto">
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Active Filters */}
                {activeFilters.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm text-muted-foreground">Active filters:</span>
                      {activeFilters.map((filter, index) => (
                        <div 
                          key={index}
                          className="flex items-center bg-muted px-3 py-1 rounded-full text-sm"
                        >
                          <span>{filter.value}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5 ml-1 p-0"
                            onClick={() => handleRemoveFilter(filter)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      
                      <Button 
                        variant="ghost" 
                        className="text-sm h-7 ml-2"
                        onClick={clearAllFilters}
                      >
                        Clear all
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Course Grid */}
                {filteredCourses.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <CourseCard 
                        key={course.id} 
                        {...course} 
                        level={course.level as "Beginner" | "Intermediate" | "Advanced" | "All Levels"} 
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <h3 className="text-xl font-medium mb-2">No courses found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
                    <Button onClick={clearAllFilters}>Clear Filters</Button>
                  </Card>
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
