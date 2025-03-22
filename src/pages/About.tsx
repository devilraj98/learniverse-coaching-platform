
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">About LearnSphere</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At LearnSphere, we believe that education should be accessible to everyone, 
                everywhere. Our mission is to create a platform where learners can connect with 
                expert instructors and gain practical skills that make a difference in their lives.
              </p>
              <p className="text-gray-700">
                We're dedicated to providing high-quality courses taught by industry professionals 
                who are passionate about sharing their knowledge and experience with students worldwide.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                LearnSphere was founded in 2023 by a group of educators and technologists who 
                saw the need for a more engaging and effective online learning platform. Since 
                then, we've grown to serve thousands of students across the globe.
              </p>
              <p className="text-gray-700">
                Our team comes from diverse backgrounds in education, technology, and business, 
                bringing together the best ideas to create an exceptional learning experience.
              </p>
            </div>
          </div>

          <Alert className="mb-12">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Our Values</AlertTitle>
            <AlertDescription>
              Excellence, accessibility, innovation, and community are at the core of everything we do.
            </AlertDescription>
          </Alert>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80" },
                { name: "David Chen", role: "CTO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80" },
                { name: "Maria Rodriguez", role: "Head of Education", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80" }
              ].map((member, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-24 h-24 rounded-full mb-3 object-cover"
                  />
                  <h3 className="font-medium text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              Have questions or feedback? We'd love to hear from you. Reach out to our team at{" "}
              <a href="mailto:support@learnsphere.com" className="text-primary">
                support@learnsphere.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
