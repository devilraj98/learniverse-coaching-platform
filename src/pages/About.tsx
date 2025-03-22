
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Cloud, Terminal, Shield, Clock, Code, Database } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">About Our AWS DevOps Programme</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At AWS DevOps Academy, we believe that cloud infrastructure skills should be accessible to everyone, 
                everywhere. Our mission is to create a platform where learners can connect with 
                AWS-certified instructors and gain practical DevOps skills that make a difference in their careers.
              </p>
              <p className="text-gray-700">
                We're dedicated to providing high-quality AWS DevOps courses taught by industry professionals 
                who are passionate about sharing their knowledge and experience with students worldwide.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                AWS DevOps Academy was founded in 2023 by a group of AWS-certified professionals and technology leaders who 
                recognized the growing need for skilled DevOps engineers in the cloud space. Since 
                then, we've helped thousands of students across the globe obtain AWS certifications and land their dream jobs.
              </p>
              <p className="text-gray-700">
                Our team consists of experienced AWS Solution Architects, DevOps Engineers, and Cloud Consultants,
                bringing together practical experience to create an exceptional learning journey.
              </p>
            </div>
          </div>

          <Alert className="mb-12">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>AWS Certified Content</AlertTitle>
            <AlertDescription>
              All our courses are designed to align with the official AWS certification paths and are regularly updated with the latest services and best practices.
            </AlertDescription>
          </Alert>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Key Program Areas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-muted/30 p-6 rounded-lg">
                <Cloud className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">AWS Core Services</h3>
                <p className="text-gray-600">Master fundamental AWS services like EC2, S3, RDS, and VPC that form the foundation of cloud infrastructure.</p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg">
                <Terminal className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">CI/CD Pipelines</h3>
                <p className="text-gray-600">Learn to build and manage continuous integration and delivery pipelines using AWS CodePipeline, CodeBuild, and CodeDeploy.</p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg">
                <Code className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Infrastructure as Code</h3>
                <p className="text-gray-600">Implement infrastructure automation using CloudFormation, AWS CDK, and Terraform for AWS.</p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg">
                <Database className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Containers & Kubernetes</h3>
                <p className="text-gray-600">Deploy and orchestrate containerized applications using Amazon ECS, EKS, and ECR.</p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Security & Compliance</h3>
                <p className="text-gray-600">Implement AWS security best practices and ensure compliance with industry standards.</p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Monitoring & Logging</h3>
                <p className="text-gray-600">Set up comprehensive monitoring, logging, and alerting systems using CloudWatch, X-Ray, and other AWS tools.</p>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Meet Our Instructors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Sarah Johnson", role: "AWS Solutions Architect & Lead Instructor", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80", certification: "AWS Certified DevOps Engineer Professional" },
                { name: "David Chen", role: "Senior DevOps Engineer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80", certification: "AWS Certified Solutions Architect Professional" },
                { name: "Maria Rodriguez", role: "Cloud Infrastructure Specialist", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80", certification: "AWS Certified DevOps Engineer Professional" }
              ].map((member, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-24 h-24 rounded-full mb-3 object-cover"
                  />
                  <h3 className="font-medium text-lg">{member.name}</h3>
                  <p className="text-gray-600 mb-1">{member.role}</p>
                  <p className="text-xs text-primary font-medium">{member.certification}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              Have questions about our AWS DevOps programme? Want to learn more about our certification paths? Reach out to our team at{" "}
              <a href="mailto:support@awsdevopsacademy.com" className="text-primary">
                support@awsdevopsacademy.com
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
