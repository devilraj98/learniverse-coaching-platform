
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Mail, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-semibold text-xl">LearnSphere</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering knowledge through elegant, accessible online learning experiences.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links Columns */}
          <div>
            <h3 className="font-medium mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors text-sm">All Courses</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/for-instructors" className="text-muted-foreground hover:text-foreground transition-colors text-sm">For Instructors</Link></li>
              <li><Link to="/enterprise" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Enterprise</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Careers</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div>
            <h3 className="font-medium mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex space-x-2 mb-1">
              <Input 
                placeholder="your@email.com" 
                className="h-9" 
                type="email"
              />
              <Button size="sm" className="h-9">
                <Mail className="h-4 w-4 mr-1" />
                <span>Subscribe</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              By subscribing, you agree to our privacy policy.
            </p>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} LearnSphere. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
