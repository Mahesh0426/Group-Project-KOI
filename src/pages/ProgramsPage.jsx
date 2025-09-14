import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProgramsAction } from "../redux/AdminProgram/adminProgramAction";

const ProgramsPage = () => {
  const { programs } = useSelector((state) => state.adminProgram);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProgramsAction());
  }, [dispatch]);

  // Features array remains static as it's not coming from the API
  const features = [
    {
      icon: "👨‍🏫",
      title: "Expert Instructors",
      desc: "All our instructors have advanced degrees and extensive experience in both their fields and education.",
    },
    {
      icon: "🔬",
      title: "Hands-On Learning",
      desc: "Every program emphasizes practical, hands-on activities that reinforce theoretical concepts.",
    },
    {
      icon: "👥",
      title: "Small Class Sizes",
      desc: "Maximum 8 students per class ensures personalized attention and optimal learning outcomes.",
    },
    {
      icon: "🏆",
      title: "Achievement Recognition",
      desc: "Students receive certificates and showcase their projects at our quarterly exhibitions.",
    },
    {
      icon: "🛡️",
      title: "Safe Environment",
      desc: "All activities follow strict safety protocols with age-appropriate materials and supervision.",
    },
    {
      icon: "📚",
      title: "Take-Home Materials",
      desc: "Students keep their projects and receive additional resources to continue learning at home.",
    },
  ];

  return (
    <div>
      {/* Programs Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {programs &&
            programs.map((p, index) => (
              <div
                key={p.id}
                id={p.id}
                className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center py-12 border-b last:border-b-0 ${
                  index % 2 !== 0 ? "md:[direction:rtl]" : ""
                }`}
              >
                <div className={`${index % 2 !== 0 ? "[direction:ltr]" : ""}`}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {p.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Ages {p.age_group}
                    </span>
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {p.duration}
                    </span>
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ${p.price}
                    </span>
                  </div>
                  <p className="mb-4 text-gray-700">{p.description}</p>
                  <h3 className="text-blue-800 font-semibold mt-4 mb-2">
                    What You'll Learn:
                  </h3>
                  <ul className="list-disc list-inside mb-6 text-gray-700">
                    {p.learning_outcomes &&
                      p.learning_outcomes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                  </ul>
                  <h3 className="text-blue-800 font-semibold mb-2">
                    Schedule:
                  </h3>
                  <p className="mb-6">{p.schedule}</p>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link to="/contact">Enroll Now</Link>
                  </Button>
                </div>
                <div className={`${index % 2 !== 0 ? "[direction:ltr]" : ""}`}>
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            What Makes Our Programs Special?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, index) => (
              <Card
                key={index}
                className="text-center rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 duration-300"
              >
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-600">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Info */}
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <Card className="bg-white rounded-3xl shadow-2xl max-w-3xl mx-auto text-center p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your STEM Journey?
            </h2>
            <p className="text-gray-700 mb-8">
              Join hundreds of young explorers who have discovered the joy of
              STEM learning with us!
            </p>
            <div className="grid gap-4 sm:grid-cols-2 mb-8 text-left">
              <div className="p-4 bg-slate-50 rounded-lg">
                <strong>Registration:</strong> Open year-round
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <strong>Class Size:</strong> Maximum 8 students
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <strong>Materials:</strong> All included in program fee
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <strong>Discounts:</strong> 10% off for siblings, 15% off for
                multiple programs
              </div>
            </div>
            <Button
              size="lg"
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link to="/contact">Contact Us to Enroll</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
