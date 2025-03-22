
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import CourseCard from '@/components/ui/CourseCard';
import CategoryFilter from '@/components/ui/CategoryFilter';
import { cn } from '@/lib/utils';

// Define the course type
interface Course {
  id: string;
  title: string;
  instructor: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  price: number;
  rating: number;
  imageUrl: string;
  studentCount: number;
  duration: string;
}

// Define the category type
interface Category {
  id: string;
  name: string;
  count: number;
}

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    level: "Beginner",
    category: "Web Development",
    price: 89.99,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 12543,
    duration: "45 hours"
  },
  {
    id: "2",
    title: "Advanced JavaScript Concepts",
    instructor: "Andrei Neagoie",
    level: "Intermediate",
    category: "JavaScript",
    price: 69.99,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1552308995-2baac1ad5490?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 8721,
    duration: "29 hours"
  },
  {
    id: "3",
    title: "Machine Learning A-Z: Hands-On Python",
    instructor: "Kirill Eremenko",
    level: "Intermediate",
    category: "Data Science",
    price: 79.99,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 10982,
    duration: "38 hours"
  },
  {
    id: "4",
    title: "The Complete Digital Marketing Course",
    instructor: "Rob Percival",
    level: "Beginner",
    category: "Marketing",
    price: 59.99,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1553835973-dec43bfddbeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 9843,
    duration: "32 hours"
  },
  {
    id: "5",
    title: "iOS App Development with Swift",
    instructor: "Stephen Grider",
    level: "Advanced",
    category: "Mobile Development",
    price: 99.99,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1534802046520-4f27db7f3ae5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 6532,
    duration: "42 hours"
  },
  {
    id: "6",
    title: "React Native - The Practical Guide",
    instructor: "Maximilian Schwarzmüller",
    level: "Intermediate",
    category: "Mobile Development",
    price: 79.99,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1581276879449-0571ec1dca89?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 7812,
    duration: "37 hours"
  },
  {
    id: "7",
    title: "The Complete Node.js Developer Course",
    instructor: "Andrew Mead",
    level: "Intermediate",
    category: "Web Development",
    price: 69.99,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 8925,
    duration: "30 hours"
  },
  {
    id: "8",
    title: "Python for Data Science and Machine Learning",
    instructor: "Jose Portilla",
    level: "Advanced",
    category: "Data Science",
    price: 89.99,
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 11342,
    duration: "40 hours"
  },
  {
    id: "9",
    title: "UX/UI Design Fundamentals",
    instructor: "David Travis",
    level: "Beginner",
    category: "Design",
    price: 59.99,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1586936893539-accfc184f8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 7632,
    duration: "26 hours"
  },
  {
    id: "10",
    title: "Adobe Photoshop Masterclass",
    instructor: "Daniel Walter Scott",
    level: "Intermediate",
    category: "Design",
    price: 69.99,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 8521,
    duration: "35 hours"
  },
  {
    id: "11",
    title: "GraphQL with React: The Complete Guide",
    instructor: "Stephen Grider",
    level: "Advanced",
    category: "Web Development",
    price: 79.99,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1534670007418-bc7b8e50a356?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 6218,
    duration: "32 hours"
  },
  {
    id: "12",
    title: "Complete SQL Bootcamp",
    instructor: "Jose Portilla",
    level: "Beginner",
    category: "Database",
    price: 59.99,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1554306274-f23873d9a26c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    studentCount: 9163,
    duration: "24 hours"
  }
];

// Calculate categories with counts
const getCategories = (): Category[] => {
  const categoryCounts: Record<string, number> = {};
  
  mockCourses.forEach(course => {
    if (categoryCounts[course.category]) {
      categoryCounts[course.category]++;
    } else {
      categoryCounts[course.category] = 1;
    }
  });
  
  // Added id to fix the type error
  return Object.entries(categoryCounts).map(([name, count], index) => ({
    id: index.toString(),
    name,
    count
  }));
};

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses);
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = getCategories();
  const levels = ["Beginner", "Intermediate", "Advanced"];
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle level checkbox change
  const handleLevelChange = (level: string) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter(l => l !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 100]);
    setSelectedLevels([]);
    setSelectedCategories([]);
  };
  
  // Apply filters
  useEffect(() => {
    let results = mockCourses;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        course => 
          course.title.toLowerCase().includes(query) || 
          course.instructor.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query)
      );
    }
    
    // Apply price filter
    results = results.filter(
      course => course.price >= priceRange[0] && course.price <= priceRange[1]
    );
    
    // Apply level filter
    if (selectedLevels.length > 0) {
      results = results.filter(course => selectedLevels.includes(course.level));
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(course => selectedCategories.includes(course.category));
    }
    
    setFilteredCourses(results);
  }, [searchQuery, priceRange, selectedLevels, selectedCategories]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 md:pt-28">
        {/* Page header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Discover Courses</h1>
            <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
              Explore our wide range of courses taught by expert instructors to help you reach your goals.
            </p>
            
            {/* Search bar */}
            <div className="max-w-2xl mx-auto mt-8 relative">
              <Input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                className="pl-10 pr-4 py-3 rounded-lg shadow-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              
              <div className="md:hidden mt-4 flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters sidebar - desktop */}
            <div className={cn(
              "basis-1/4 shrink-0 hidden md:block",
              showFilters && "block"
            )}>
              <div className="sticky top-28">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
                    Clear all
                  </Button>
                </div>
                
                {/* Price range filter */}
                <div className="mb-8">
                  <h3 className="text-base font-medium mb-4">Price Range</h3>
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Level filter */}
                <div className="mb-8">
                  <h3 className="text-base font-medium mb-4">Level</h3>
                  <div className="space-y-3">
                    {levels.map(level => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`level-${level}`} 
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={() => handleLevelChange(level)}
                        />
                        <label 
                          htmlFor={`level-${level}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Category filter */}
                <div>
                  <h3 className="text-base font-medium mb-4">Categories</h3>
                  <CategoryFilter
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onChange={handleCategoryChange}
                  />
                </div>
              </div>
            </div>
            
            {/* Mobile filters (modal-like) */}
            {showFilters && (
              <div className="md:hidden fixed inset-0 bg-white z-40 p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Mobile filters content */}
                <div className="mb-8">
                  <h3 className="text-base font-medium mb-4">Price Range</h3>
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-base font-medium mb-4">Level</h3>
                  <div className="space-y-3">
                    {levels.map(level => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-level-${level}`} 
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={() => handleLevelChange(level)}
                        />
                        <label 
                          htmlFor={`mobile-level-${level}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-base font-medium mb-4">Categories</h3>
                  <CategoryFilter
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onChange={handleCategoryChange}
                  />
                </div>
                
                <div className="flex gap-3 mt-8">
                  <Button variant="outline" onClick={clearFilters} className="flex-1">
                    Clear all
                  </Button>
                  <Button onClick={() => setShowFilters(false)} className="flex-1">
                    Apply filters
                  </Button>
                </div>
              </div>
            )}
            
            {/* Course listing */}
            <div className="flex-1">
              {/* Active filters */}
              {(selectedLevels.length > 0 || selectedCategories.length > 0 || 
                priceRange[0] > 0 || priceRange[1] < 100) && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Active filters:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLevels.map(level => (
                      <Badge key={level} variant="secondary" className="flex items-center gap-1">
                        {level}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleLevelChange(level)} 
                        />
                      </Badge>
                    ))}
                    
                    {selectedCategories.map(category => (
                      <Badge key={category} variant="secondary" className="flex items-center gap-1">
                        {category}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => handleCategoryChange(category)} 
                        />
                      </Badge>
                    ))}
                    
                    {(priceRange[0] > 0 || priceRange[1] < 100) && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        ${priceRange[0]} - ${priceRange[1]}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setPriceRange([0, 100])} 
                        />
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {/* Results count */}
              <p className="text-gray-600 mb-6">
                Showing {filteredCourses.length} results
              </p>
              
              {/* Course grid */}
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-4">No courses found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <Link key={course.id} to={`/courses/${course.id}`}>
                      <CourseCard course={course} />
                    </Link>
                  ))}
                </div>
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
