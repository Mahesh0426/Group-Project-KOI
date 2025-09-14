import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, GraduationCap } from "lucide-react";

const MyProgramPage = () => {
  // Dummy enrolled programs
  const enrolledPrograms = [
    {
      id: 1,
      title: "🤖 Robotics & Coding",
      age: "Ages 10-14",
      duration: "8 weeks",
      price: "$299",
      schedule: "Saturdays 10:00 AM - 12:00 PM",
      status: "In Progress",
      image: "assets/Robotics/collaborating-instructor-guidance.png",
    },
    {
      id: 2,
      title: "🧪 Chemistry Lab Adventures",
      age: "Ages 8-12",
      duration: "6 weeks",
      price: "$249",
      schedule: "Wednesdays 4:00 PM - 6:00 PM",
      status: "Upcoming",
      image: "assets/Chemistry/Chemistry-Experiments.png",
    },
  ];

  return (
    <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        🎓 My Enrolled Programs
      </h1>

      {enrolledPrograms.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg mb-6">
            You haven’t enrolled in any programs yet.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Browse Programs
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          {enrolledPrograms.map((program) => (
            <Card
              key={program.id}
              className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-0"
            >
              <img
                src={program.image}
                alt={program.title}
                className="rounded-t-2xl w-full h-48 object-cover block"
              />
              <CardContent className=" space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{program.title}</h2>
                  <Badge
                    className={`${
                      program.status === "In Progress"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {program.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-gray-700 text-sm">
                  <p className="flex items-center gap-2">
                    <GraduationCap size={16} /> {program.age}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={16} /> {program.duration}
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={16} /> {program.schedule}
                  </p>
                  <p className="flex items-center gap-2">
                    <DollarSign size={16} /> {program.price}
                  </p>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProgramPage;
