
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, User, BookOpen } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Instructors', href: '/instructors' },
    { name: 'About', href: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 md:px-10",
        isScrolled ? 
          "bg-white/80 backdrop-blur-md shadow-sm" : 
          "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-semibold text-xl transition-opacity hover:opacity-80"
        >
          <BookOpen className="h-6 w-6 text-primary" />
          <span>LearnSphere</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors relative py-2",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {item.name}
              {location.pathname === item.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
              )}
            </Link>
          ))}
        </nav>
        
        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="h-9 px-4">
            Log in
          </Button>
          <Button className="h-9 px-4">
            Sign up
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 top-[70px] bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-6 space-y-6 h-full">
          <nav className="flex flex-col space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-lg font-medium",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-4">
            <Button variant="outline" className="w-full justify-center">
              Log in
            </Button>
            <Button className="w-full justify-center">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
