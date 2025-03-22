
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsTabProps {
  notifications: Notification[];
  isLoaded: boolean;
}

const NotificationsTab = ({ notifications, isLoaded }: NotificationsTabProps) => {
  return (
    <div 
      className={cn(
        "space-y-6",
        isLoaded ? "animate-fade-in" : "opacity-0"
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <Button variant="ghost" size="sm" className="text-xs h-8">
          Mark all as read
        </Button>
      </div>
      
      {notifications.length > 0 ? (
        <Card>
          <div className="divide-y">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={cn(
                  "p-4 hover:bg-muted/50 transition-colors flex items-start",
                  !notification.read && "bg-primary/5"
                )}
              >
                <div className="flex-grow">
                  <div className="flex items-center space-x-2">
                    <h3 className={cn(
                      "font-medium",
                      !notification.read && "text-primary"
                    )}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <Badge variant="outline" className="h-auto py-0 px-2 text-[10px] bg-primary text-primary-foreground">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <div className="text-xs text-muted-foreground mt-2">
                    {notification.time}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Bell className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">No notifications</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              You're all caught up! We'll notify you about course updates and important events.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default NotificationsTab;
