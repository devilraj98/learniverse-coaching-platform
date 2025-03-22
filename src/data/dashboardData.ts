
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Calendar, 
  Award
} from 'lucide-react';

export const enrolledCourses = [
  {
    id: 'course-1',
    title: 'Mastering Digital Marketing: A Comprehensive Guide',
    instructor: 'Sarah Johnson',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
    progress: 65,
    lastAccessed: '2 days ago',
    category: 'Marketing',
    duration: '30 hours',
    completedLessons: 56,
    totalLessons: 86,
  },
  {
    id: 'course-2',
    title: 'Financial Planning for Entrepreneurs',
    instructor: 'Michael Chen',
    coverImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    progress: 25,
    lastAccessed: '5 days ago',
    category: 'Business',
    duration: '22 hours',
    completedLessons: 12,
    totalLessons: 48,
  },
  {
    id: 'course-3',
    title: 'Advanced Python for Data Science',
    instructor: 'David Kim',
    coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80',
    progress: 10,
    lastAccessed: '1 week ago',
    category: 'Programming',
    duration: '28 hours',
    completedLessons: 8,
    totalLessons: 74,
  },
];

export const wishlistCourses = [
  {
    id: 'course-4',
    title: 'The Art of Public Speaking',
    instructor: 'Emily Rodriguez',
    coverImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.6,
    category: 'Communication',
  },
  {
    id: 'course-5',
    title: 'UX/UI Design Fundamentals',
    instructor: 'Alex Rivera',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    price: 74.99,
    originalPrice: 94.99,
    rating: 4.8,
    category: 'Design',
  },
];

export const completedCourses = [
  {
    id: 'course-6',
    title: 'Mindfulness and Stress Management',
    instructor: 'Jennifer Lee',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    completedDate: 'June 15, 2023',
    certificate: true,
    category: 'Personal Development',
    rating: 5,
  },
];

export const achievements = [
  {
    id: 'achievement-1',
    title: 'Fast Learner',
    description: 'Completed 5 lessons in one day',
    icon: Award,
    date: 'Jul 10, 2023',
  },
  {
    id: 'achievement-2',
    title: 'Consistent Student',
    description: 'Logged in for 7 consecutive days',
    icon: Calendar,
    date: 'Jul 7, 2023',
  },
  {
    id: 'achievement-3',
    title: 'Knowledge Explorer',
    description: 'Enrolled in 3 different categories',
    icon: BookOpen,
    date: 'Jun 28, 2023',
  },
];

export const notifications = [
  {
    id: 'notification-1',
    title: 'New lesson available',
    message: 'A new bonus lesson has been added to "Mastering Digital Marketing"',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'notification-2',
    title: 'Assignment reminder',
    message: 'Your "Financial Planning" project is due in 3 days',
    time: '1 day ago',
    read: true,
  },
  {
    id: 'notification-3',
    title: 'Instructor feedback',
    message: 'Sarah Johnson has reviewed your recent assignment',
    time: '2 days ago',
    read: true,
  },
];

export const userStats = {
  totalHoursLearned: 48,
  coursesCompleted: 1,
  certificatesEarned: 1,
  currentStreak: 5,
  longestStreak: 12,
};
