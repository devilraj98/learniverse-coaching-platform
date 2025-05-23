
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface CategoryFilterProps<T extends string> {
  categories: { id: T; name: string }[];
  selectedCategories: T[];
  onChange: (category: T) => void;
}

const CategoryFilter = <T extends string>({ 
  categories, 
  selectedCategories, 
  onChange 
}: CategoryFilterProps<T>) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant={selectedCategories.includes(category.id) ? "default" : "outline"}
          className={cn(
            "px-3 py-1 cursor-pointer transition-all",
            selectedCategories.includes(category.id)
              ? "bg-primary hover:bg-primary/80"
              : "hover:bg-primary/10"
          )}
          onClick={() => onChange(category.id)}
        >
          {category.name}
        </Badge>
      ))}
    </div>
  );
};

export default CategoryFilter;
