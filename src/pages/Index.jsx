import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Camera, Sparkles, Zap, TrendingUp, Sun, Moon, Cloud, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from '@tanstack/react-query';

const lineChartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const pieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

const fetchWeatherData = async () => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { temp: 22, condition: 'Sunny' };
};

const Index = () => {
  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState('light');

  const { data: weatherData, isLoading: isWeatherLoading } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny': return <Sun className="h-8 w-8 text-yellow-400" />;
      case 'Cloudy': return <Cloud className="h-8 w-8 text-gray-400" />;
      case 'Rainy': return <Droplets className="h-8 w-8 text-blue-400" />;
      default: return <Sun className="h-8 w-8 text-yellow-400" />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 'bg-gradient-to-br from-blue-900 to-blue-950'}`}>
      <header className="bg-white bg-opacity-10 backdrop-blur-md text-white p-6 flex justify-between items-center">
        <motion.h1 
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Red Sky Dashboard
        </motion.h1>
        <Button onClick={toggleTheme} variant="outline" size="icon">
          {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
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
              <Card className="mb-8 bg-white bg-opacity-10 backdrop-blur-md text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 text-blue-200" /> Welcome to Your Blue Sky Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">Explore your personalized insights and controls.</p>
                  <div className="flex flex-col space-y-6 mb-6">
                    <div className="text-4xl font-bold">{currentTime.toLocaleTimeString()}</div>
                    <div className="flex items-center justify-center gap-4">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setCount(count - 1)}
                      >
                        -
                      </Button>
                      <motion.span 
                        key={count}
                        className="text-2xl font-bold"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {count}
                      </motion.span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setCount(count + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {['Camera', 'Zap', 'TrendingUp', 'Weather'].map((Icon, index) => (
                      <motion.div 
                        key={Icon} 
                        className="flex flex-col items-center justify-center bg-blue-500 bg-opacity-20 rounded-lg p-4"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {Icon === 'Camera' && <Camera className="h-12 w-12" />}
                        {Icon === 'Zap' && <Zap className="h-12 w-12" />}
                        {Icon === 'TrendingUp' && <TrendingUp className="h-12 w-12" />}
                        {Icon === 'Weather' && (
                          isWeatherLoading ? (
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                          ) : (
                            <>
                              {getWeatherIcon(weatherData.condition)}
                              <span className="mt-2">{weatherData.temp}°C</span>
                            </>
                          )
                        )}
                        <span className="mt-2">{Icon}</span>
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
              <div className="grid grid-cols-2 gap-8">
                <Card className="bg-blue-600 bg-opacity-20 backdrop-blur-md text-white">
                  <CardHeader>
                    <CardTitle>Line Chart Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#000' }} />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#60a5fa" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="bg-white bg-opacity-20 backdrop-blur-md text-white">
                  <CardHeader>
                    <CardTitle>Pie Chart Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#3b82f6"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'][index % 4]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#000' }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
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
                  <p className="text-lg mb-4">Customize your dashboard experience here.</p>
                  <div className="flex items-center justify-between">
                    <span>Theme</span>
                    <Button onClick={toggleTheme} variant="outline">
                      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white bg-opacity-10 backdrop-blur-md text-white p-4 text-center">
        <p>&copy; 2024 Super Fancy Blue Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
