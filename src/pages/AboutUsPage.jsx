import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Beaker, Target, Lightbulb, Star } from "lucide-react";

const AboutUsPage = () => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & Director",
      img: "https://images.pexels.com/photos/1181478/pexels-photo-1181478.jpeg",
      bio: "Ph.D. in Chemistry, 15+ years in education. Passionate about making science accessible to all children.",
    },
    {
      name: "Mark Rodriguez",
      role: "Robotics Instructor",
      img: "https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bio: "M.S. in Computer Science, former software engineer. Specializes in programming and robotics education.",
    },
    {
      name: "Emily Chen",
      role: "Engineering Instructor",
      img: "https://media.istockphoto.com/id/1154642632/photo/close-up-portrait-of-brunette-woman.jpg?s=1024x1024&w=is&k=20&c=mR2EucSZJpiLoG2gUBchrP-F8GZ0Vn8hqGl2k7yAQ8I=",
      bio: "B.S. in Mechanical Engineering, certified educator. Loves teaching design thinking and problem-solving.",
    },
    {
      name: "Dr. Michael Thompson",
      role: "Science Instructor",
      img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      bio: "Ph.D. in Physics, award-winning teacher. Expert in making complex concepts fun and understandable.",
    },
  ];
  const achievements = [
    { number: "500+", text: "Students Inspired" },
    { number: "50+", text: "Programs Completed" },
    { number: "98%", text: "Parent Satisfaction" },
    { number: "25+", text: "Awards Won" },
  ];
  return (
    <main>
      {/* our section section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Beaker className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
                  Our Story
                </h2>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Founded in 2020, STEM Explorers Club was born from a passion to
                make science, technology, engineering, and mathematics
                accessible and exciting for young learners. We believe that
                every child has the potential to be an innovator, and our
                mission is to provide the tools, knowledge, and inspiration they
                need to explore the fascinating world of STEM.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Our hands-on approach to learning ensures that children don't
                just memorize facts, but truly understand concepts through
                experimentation, discovery, and creative problem-solving. We've
                helped over 500 children develop critical thinking skills,
                scientific curiosity, and confidence in their abilities.
              </p>
            </div>

            {/* Image Section */}
            <div className="h-full ">
              <Card className="overflow-hidden rounded-2xl shadow-xl w-full h-full p-0">
                <CardContent className="p-0 h-full">
                  <img
                    src="assets/about.png"
                    alt="Children working together on a science project with an instructor guiding them"
                    className="w-full h-full"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Mission */}
            <Card className="text-center rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-blue-800">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To inspire and educate young minds through engaging, hands-on
                  STEM experiences that foster creativity, critical thinking,
                  and a lifelong love of learning.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="text-center rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8">
                <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-blue-800">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To be the leading provider of innovative STEM education,
                  empowering children to become confident problem-solvers and
                  future leaders in science and technology.
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="text-center rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8">
                <Star className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-blue-800">
                  Our Values
                </h3>
                <ul className="text-left list-inside text-gray-700 space-y-2">
                  <li>Curiosity-driven learning</li>
                  <li>Inclusive and supportive environment</li>
                  <li>Safety and fun in equal measure</li>
                  <li>Excellence in education</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Meet Our Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <CardContent className="p-8 flex flex-col items-center">
                  <img
                    src={member.img}
                    alt={member.name + ", " + member.role}
                    className="w-36 h-36 rounded-full object-cover mb-4 border-4 border-blue-400"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-violet-500 font-semibold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* our achievement section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-teal-200 to-pink-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-blue-800">
            Our Achievements
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item, index) => (
              <Card
                key={index}
                className="text-center rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                    {item.number}
                  </div>
                  <p className="text-gray-700 font-medium">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
