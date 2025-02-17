import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Info, Users, Target, Rocket } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-300 to-blue-500">
      <header className="bg-blue-600 bg-opacity-90 backdrop-blur-md text-white p-6">
        <motion.h1 
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Blue Sky Dashboard
        </motion.h1>
      </header>

      <main className="flex-grow container mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 bg-blue-400 bg-opacity-20 backdrop-blur-md text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 text-blue-200" /> Our Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">Blue Sky Dashboard was born from a passion for creating intuitive and powerful data visualization tools. Our journey began with a simple idea: to make complex data accessible and actionable for everyone.</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-blue-400 bg-opacity-20 backdrop-blur-md text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 text-blue-200" /> Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>We strive to empower businesses and individuals with real-time insights, enabling them to make data-driven decisions with confidence and ease.</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-400 bg-opacity-20 backdrop-blur-md text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 text-blue-200" /> Our Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>John Doe - Founder & CEO</li>
                  <li>Jane Smith - CTO</li>
                  <li>Mike Johnson - Lead Developer</li>
                  <li>Sarah Brown - UX Designer</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-blue-400 bg-opacity-20 backdrop-blur-md text-white md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rocket className="mr-2 text-blue-200" /> Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">We envision a future where data analysis is not just for experts, but a tool that enhances decision-making in every aspect of life and business. Blue Sky Dashboard is committed to leading this transformation, one dashboard at a time.</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>

      <footer className="bg-red-600 bg-opacity-90 backdrop-blur-md text-white p-4 text-center">
        <p>&copy; 2024 Blue Sky Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
