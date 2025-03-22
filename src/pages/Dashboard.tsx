
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import MyLearningTab from '@/components/dashboard/MyLearningTab';
import WishlistTab from '@/components/dashboard/WishlistTab';
import CompletedCoursesTab from '@/components/dashboard/CompletedCoursesTab';
import NotificationsTab from '@/components/dashboard/NotificationsTab';
import LiveClassSection from '@/components/ui/LiveClassSection';
import { Card, CardContent } from '@/components/ui/card';

import { 
  enrolledCourses, 
  wishlistCourses, 
  completedCourses, 
  achievements, 
  notifications, 
  userStats 
} from '@/data/dashboardData';

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Dashboard Header */}
        <DashboardHeader 
          unreadNotificationsCount={unreadNotificationsCount}
          isLoaded={isLoaded}
        />
        
        {/* Dashboard Content */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <DashboardSidebar 
                  userStats={userStats} 
                  enrolledCourses={enrolledCourses}
                  achievements={achievements}
                  isLoaded={isLoaded}
                />
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="learning" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="learning">My Learning</TabsTrigger>
                    <TabsTrigger value="live-classes">Live Classes</TabsTrigger>
                    <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>
                  
                  {/* My Learning Tab */}
                  <TabsContent value="learning" className="pt-6">
                    <MyLearningTab 
                      enrolledCourses={enrolledCourses}
                      isLoaded={isLoaded}
                    />
                  </TabsContent>
                  
                  {/* Live Classes Tab */}
                  <TabsContent value="live-classes" className="pt-6">
                    <div className={isLoaded ? "animate-fade-in" : "opacity-0"}>
                      <Card>
                        <CardContent className="p-6">
                          <LiveClassSection />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Wishlist Tab */}
                  <TabsContent value="wishlist" className="pt-6">
                    <WishlistTab 
                      wishlistCourses={wishlistCourses}
                      isLoaded={isLoaded}
                    />
                  </TabsContent>
                  
                  {/* Completed Tab */}
                  <TabsContent value="completed" className="pt-6">
                    <CompletedCoursesTab 
                      completedCourses={completedCourses}
                      isLoaded={isLoaded}
                    />
                  </TabsContent>
                  
                  {/* Notifications Tab */}
                  <TabsContent value="notifications" className="pt-6">
                    <NotificationsTab 
                      notifications={notifications}
                      isLoaded={isLoaded}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
