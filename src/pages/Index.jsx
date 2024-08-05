import { useState } from 'react';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">My Bare-Bones App</h1>
      </header>

      <main className="flex-grow container mx-auto p-4 bg-yellow-500">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome to Your App</h2>
          <p className="text-gray-600">This is a bare-bones application that you can easily modify and build upon.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Interactive Component Example</h2>
          <div className="flex items-center gap-4">
            <Button onClick={() => setCount(count - 1)}>-</Button>
            <span className="text-lg">{count}</span>
            <Button onClick={() => setCount(count + 1)}>+</Button>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground p-4 text-center">
        <p>&copy; 2024 My Bare-Bones App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
