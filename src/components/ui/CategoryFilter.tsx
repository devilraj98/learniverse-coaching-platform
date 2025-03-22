
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export type Category = {
  id: string;
  name: string;
  count: number;
};

export type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface CategoryFilterProps {
  categories: Category[];
  onCategoryChange: (selectedCategories: string[]) => void;
  onSearchChange: (query: string) => void;
  onLevelChange: (selectedLevels: Level[]) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  className?: string;
}

const CategoryFilter = ({
  categories,
  onCategoryChange,
  onSearchChange,
  onLevelChange,
  onPriceRangeChange,
  className,
}: CategoryFilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [showFilters, setShowFilters] = useState(false);
  
  const levels: Level[] = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
  
  const handleCategoryToggle = (categoryId: string) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
      
    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchQuery);
  };
  
  const handleLevelToggle = (level: Level) => {
    const updatedLevels = selectedLevels.includes(level)
      ? selectedLevels.filter(l => l !== level)
      : [...selectedLevels, level];
      
    setSelectedLevels(updatedLevels);
    onLevelChange(updatedLevels);
  };
  
  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    onPriceRangeChange(range);
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setSelectedLevels([]);
    setPriceRange([0, 200]);
    onCategoryChange([]);
    onSearchChange('');
    onLevelChange([]);
    onPriceRangeChange([0, 200]);
  };
  
  const hasActiveFilters = selectedCategories.length > 0 || searchQuery.length > 0 || 
    selectedLevels.length > 0 || priceRange[0] > 0 || priceRange[1] < 200;
  
  return (
    <div className={cn("bg-card rounded-lg border border-border", className)}>
      {/* Top section with search */}
      <div className="p-4 border-b border-border">
        <form onSubmit={handleSearch} className="flex w-full">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full pl-9"
              placeholder="Search for courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            variant="secondary"
            className="ml-2 whitespace-nowrap"
          >
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="ml-2 md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </div>
      
      {/* Filter sections */}
      <div className={cn(
        "md:block",
        showFilters ? "block" : "hidden"
      )}>
        {/* Categories section */}
        <div className="p-4 border-b border-border">
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all",
                  selectedCategories.includes(category.id) 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                )}
                onClick={() => handleCategoryToggle(category.id)}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Level section */}
        <div className="p-4 border-b border-border">
          <h3 className="font-medium mb-3">Level</h3>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Badge
                key={level}
                variant={selectedLevels.includes(level) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all",
                  selectedLevels.includes(level) 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                )}
                onClick={() => handleLevelToggle(level)}
              >
                {level}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Price range section */}
        <div className="p-4 border-b border-border">
          <h3 className="font-medium mb-3">Price Range</h3>
          <Slider
            defaultValue={[0, 200]}
            min={0}
            max={200}
            step={5}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={handlePriceChange}
            className="my-6"
          />
          <div className="flex justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        
        {/* Clear filters button */}
        {hasActiveFilters && (
          <div className="p-4 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={clearFilters}
            >
              <X className="h-4 w-4 mr-1" />
              Clear filters
            </Button>
            <div className="text-sm text-muted-foreground">
              {selectedCategories.length > 0 && (
                <span className="mr-2">{selectedCategories.length} categories</span>
              )}
              {selectedLevels.length > 0 && (
                <span className="mr-2">{selectedLevels.length} levels</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
