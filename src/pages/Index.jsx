import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Camera, Sparkles, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const Index = () => {
  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 to-pink-500">
      <header className="bg-white bg-opacity-10 backdrop-blur-md text-white p-6">
        <motion.h1 
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Fancy Dashboard
        </motion.h1>
      </header>

      <main className="flex-grow container mx-auto p-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="mb-8 bg-white bg-opacity-20 backdrop-blur-md text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2" /> Welcome to Your Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">Explore your personalized insights and controls.</p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-4xl font-bold">{currentTime.toLocaleTimeString()}</div>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setCount(count - 1)}
                      >
                        -
                      </Button>
                      <span className="text-2xl font-bold">{count}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setCount(count + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {['Camera', 'Zap', 'TrendingUp'].map((Icon, index) => (
                      <motion.div 
                        key={Icon} 
                        className="flex items-center justify-center bg-white bg-opacity-10 rounded-lg p-4"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {Icon === 'Camera' && <Camera className="h-12 w-12" />}
                        {Icon === 'Zap' && <Zap className="h-12 w-12" />}
                        {Icon === 'TrendingUp' && <TrendingUp className="h-12 w-12" />}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="analytics">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white bg-opacity-20 backdrop-blur-md text-white">
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#000' }} />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="settings">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white bg-opacity-20 backdrop-blur-md text-white">
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">Customize your dashboard experience here.</p>
                  {/* Add more settings controls here */}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white bg-opacity-10 backdrop-blur-md text-white p-4 text-center">
        <p>&copy; 2024 Fancy Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
