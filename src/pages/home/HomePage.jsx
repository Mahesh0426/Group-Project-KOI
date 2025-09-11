import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FlaskConical,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      icon: <FlaskConical className="w-12 h-12 text-blue-600" />,
      title: "Hands-On Learning",
      description:
        "Interactive experiments and projects that make learning fun and memorable.",
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Small Groups",
      description:
        "Personalized attention with small class sizes for optimal learning experience.",
    },
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: "Expert Instructors",
      description:
        "Qualified educators passionate about inspiring the next generation of innovators.",
    },
    {
      icon: <Sparkles className="w-12 h-12 text-blue-600" />,
      title: "Age-Appropriate",
      description:
        "Carefully designed curriculum tailored for children aged 8-14 years.",
    },
  ];

  const programs = [
    {
      title: "Robotics & Coding",
      description:
        "Build and program your own robots while learning fundamental coding concepts.",
      image: "src/assets/robots and coding.png",
      alt: "Children building and programming robots",
      link: "/programs#robotics",
    },
    {
      title: "Chemistry Lab",
      description:
        "Discover the wonders of chemistry through safe, exciting experiments.",
      image: "src/assets/chemistryLab.png",
      alt: "Kids conducting chemistry experiments with colorful reactions",
      link: "/programs#chemistry",
    },
    {
      title: "Engineering Design",
      description:
        "Design, build, and test structures while learning engineering principles.",
      image: "src/assets/engineer Design.png",
      alt: "Children designing and building engineering structures",
      link: "/programs#engineering",
    },
  ];

  const testimonials = [
    {
      stars: 5,
      text: "My daughter absolutely loves the robotics program! She's learned so much and can't wait for each session.",
      author: "- Sarah M., Parent",
    },
    {
      stars: 5,
      text: "The instructors are amazing! They make complex concepts easy to understand and fun to learn.",
      author: "- Mike T., Parent",
    },
    {
      stars: 4,
      text: "STEM Explorers has sparked my son's interest in science. He's always excited to share what he learned!",
      author: "- Lisa K., Parent",
    },
    {
      stars: 5,
      text: "The best decision we made for our child’s education. Highly recommend!",
      author: "- David R., Parent",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  return (
    <main>
      {/* Hero section */}

      <section className="relative min-h-[80vh] flex items-center justify-center text-center">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover brightness-80 opacity-90 blur-in-sm "
          style={{ backgroundImage: "url('src/assets/hero.png')" }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero content */}
        <div className="relative z-10 max-w-3xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to STEM Explorers Club!
          </h2>
          <p className="text-white text-lg md:text-xl mb-6 leading-relaxed drop-shadow-md">
            Igniting curiosity and creativity through hands-on STEM learning
            experiences for children aged 8-14. Join us on an exciting journey
            of discovery, experimentation, and innovation!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              <Link to="/programs" className="flex items-center gap-2">
                Explore Programs <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              className="rounded-full border-2 border-white text-white bg-transparent hover:border-gray-200 transition-transform hover:-translate-y-1"
            >
              <Link to="/login">Join Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Why Choose STEM Explorers?
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 text-center rounded-2xl border-4 border-transparent shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400 transition-all"
              >
                <CardContent className="flex flex-col items-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our popular program section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Our Popular Programs
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all p-0"
              >
                {/* Image goes directly at the top */}
                <div className="w-full">
                  <img
                    src={program.image}
                    alt={program.alt}
                    className="w-full h-52 object-cover block"
                  />
                </div>

                {/* Text content with padding */}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-slate-600">{program.description}</p>
                  <Link
                    to={program.link}
                    className="inline-flex items-center gap-2 text-blue-500 font-semibold mt-4 transition-transform hover:translate-x-1"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 bg-gradient-to-br ">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-violet-600 mb-10">
            What Parents Say
          </h2>

          <div className="relative">
            {/* Testimonial Card */}
            <Card className="p-6 shadow-lg rounded-2xl transition-all duration-300">
              <CardContent>
                {/* Dynamic Stars */}
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[current].stars
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 italic">
                  "{testimonials[current].text}"
                </p>
                <div className="mt-4 font-semibold text-violet-600">
                  {testimonials[current].author}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Arrows */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="rounded-full bg-white shadow-md hover:bg-gray-100"
              >
                <ChevronLeft className="w-6 h-6 text-violet-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="rounded-full bg-white shadow-md hover:bg-gray-100"
              >
                <ChevronRight className="w-6 h-6 text-violet-600" />
              </Button>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${
                  current === index ? "bg-violet-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
