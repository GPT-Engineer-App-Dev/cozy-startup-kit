import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Camera, Sparkles, Zap, TrendingUp, Sun, Moon, Cloud, Droplets, Wind, Thermometer, Settings } from "lucide-react";
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
  return { temp: 22, condition: 'Sunny', humidity: 60, windSpeed: 5 };
};

const FancyClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="text-6xl font-bold mb-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {time.toLocaleTimeString()}
    </motion.div>
  );
};

const WeatherWidget = ({ data, isLoading }) => {
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny': return <Sun className="h-16 w-16 text-yellow-400" />;
      case 'Cloudy': return <Cloud className="h-16 w-16 text-gray-400" />;
      case 'Rainy': return <Droplets className="h-16 w-16 text-blue-400" />;
      default: return <Sun className="h-16 w-16 text-yellow-400" />;
    }
  };

  if (isLoading) {
    return <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>;
  }

  return (
    <motion.div
      className="flex flex-col items-center bg-red-500 bg-opacity-20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {getWeatherIcon(data.condition)}
      <span className="text-4xl font-bold mt-2">{data.temp}°C</span>
      <span className="text-xl">{data.condition}</span>
      <div className="flex justify-between w-full mt-4">
        <div className="flex items-center">
          <Droplets className="h-5 w-5 mr-2" />
          <span>{data.humidity}%</span>
        </div>
        <div className="flex items-center">
          <Wind className="h-5 w-5 mr-2" />
          <span>{data.windSpeed} km/h</span>
        </div>
      </div>
    </motion.div>
  );
};

const Index = () => {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  const { data: weatherData, isLoading: isWeatherLoading } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherData,
  });

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'bg-gradient-to-br from-red-400 to-red-600' : 'bg-gradient-to-br from-red-900 to-red-950'}`}>
      <header className="bg-red-800 bg-opacity-90 backdrop-blur-md text-white p-6 flex justify-between items-center">
        <motion.h1 
          className="text-5xl font-bold text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Red Sky Dashboard
        </motion.h1>
        <Button 
          onClick={toggleTheme} 
          variant="outline" 
          size="icon"
          className={`${theme === 'light' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-400 text-gray-900 hover:bg-red-500'}`}
        >
          {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem] text-white" /> : <Sun className="h-[1.2rem] w-[1.2rem] text-gray-900" />}
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
              <Card className="mb-8 bg-red-500 bg-opacity-10 backdrop-blur-md text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 text-red-200" /> Welcome to Your Red Sky Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl mb-4">Explore your personalized insights and controls.</p>
                  <div className="flex flex-col space-y-4 mb-6">
                    <FancyClock />
                    <div className="flex items-center justify-center gap-4">
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={() => setCount(count - 1)}
                      >
                        -
                      </Button>
                      <motion.span 
                        key={count}
                        className="text-4xl font-bold"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {count}
                      </motion.span>
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={() => setCount(count + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <motion.div 
                      className="flex flex-col items-center justify-center bg-red-500 bg-opacity-20 rounded-lg p-4"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Camera className="h-12 w-12" />
                      <span className="mt-2 text-lg font-semibold">Camera</span>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col items-center justify-center bg-red-500 bg-opacity-20 rounded-lg p-4"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Zap className="h-12 w-12" />
                      <span className="mt-2 text-lg font-semibold">Energy</span>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col items-center justify-center bg-red-500 bg-opacity-20 rounded-lg p-4"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TrendingUp className="h-12 w-12" />
                      <span className="mt-2 text-lg font-semibold">Trends</span>
                    </motion.div>
                    <WeatherWidget data={weatherData} isLoading={isWeatherLoading} />
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-red-600 bg-opacity-20 backdrop-blur-md text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2" /> Line Chart Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#000' }} />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="bg-white bg-opacity-20 backdrop-blur-md text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="mr-2" /> Pie Chart Analytics
                    </CardTitle>
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
                          fill="#ef4444"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2" /> Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl mb-4">Customize your dashboard experience here.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg">Theme</span>
                    <Button onClick={toggleTheme} variant="outline" size="lg">
                      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-red-800 bg-opacity-90 backdrop-blur-md text-white p-4 text-center">
        <p className="text-lg">&copy; 2024 Super Fancy Red Sky Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
