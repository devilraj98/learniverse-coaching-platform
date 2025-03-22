
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

const NextLiveClass = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Next Live Class</h3>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Mon/Wed/Fri
          </Badge>
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm">CI/CD Pipeline Implementation</h4>
            <p className="text-xs text-muted-foreground">Monday, Nov 20 • 7:00 PM EST</p>
          </div>
          <Button size="sm" variant="default" className="w-full" asChild>
            <a href="https://example.com/join-class" target="_blank" rel="noopener noreferrer">
              <PlayCircle className="h-3 w-3 mr-1" />
              Join Class
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextLiveClass;
