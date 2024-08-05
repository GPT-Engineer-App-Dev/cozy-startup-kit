import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p>We strive to create innovative solutions that make a positive impact on people's lives.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Our Team</CardTitle>
          <CardDescription>Meet the people behind our success</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li>John Doe - Founder & CEO</li>
            <li>Jane Smith - CTO</li>
            <li>Mike Johnson - Lead Developer</li>
            <li>Sarah Brown - UX Designer</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
