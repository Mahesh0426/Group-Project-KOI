import React from "react";
import { useState } from "react";
import { Play } from "lucide-react";

const GallaryPage = () => {
  const categories = ["all", "robotics", "chemistry", "engineering", "math"];

  const galleryItems = [
    // Robotics
    {
      category: "robotics",
      img: "src/assets/robots and coding.png",
      title: "Robotics Workshop",
      desc: "Building and programming robots",
    },
    {
      category: "robotics",
      img: "src/assets/Robotics/testing-roborts.png",
      title: "Robot Testing",
      desc: "Testing robots on obstacle course",
    },
    {
      category: "robotics",
      img: "src/assets/Robotics/collaborating-instructor-guidance.png",
      title: "Team Collaboration",
      desc: "Working together on robot design",
    },
    // Chemistry
    {
      category: "chemistry",
      img: "src/assets/Chemistry/Chemistry-Experiments.png",
      title: "Chemistry Experiments",
      desc: "Safe and exciting chemical reactions",
    },
    {
      category: "chemistry",
      img: "src/assets/chemistryLab.png",
      title: "Lab Discoveries",
      desc: "Exploring chemical properties",
    },
    {
      category: "chemistry",
      img: "src/assets/Chemistry/recording-observation.png",
      title: "Scientific Method",
      desc: "Recording experimental observations",
    },
    // Engineering
    {
      category: "engineering",
      img: "src/assets/Engineering/tall-tower.png",
      title: "Tower Challenge",
      desc: "Building the tallest stable tower",
    },
    {
      category: "engineering",
      img: "src/assets/Engineering/testing-bridge-structures.png",
      title: "Bridge Building",
      desc: "Testing bridge strength and design",
    },
    {
      category: "engineering",
      img: "src/assets/Engineering/3D-design.png",
      title: "3D Design",
      desc: "Creating digital prototypes",
    },
    // Math
    {
      category: "math",
      img: "src/assets/Math/puzzle-solving.png",
      title: "Math Puzzles",
      desc: "Solving logic and geometry puzzles",
    },
    {
      category: "math",
      img: "src/assets/Math/color-manipulation-calculator.png",
      title: "Hands-on Math",
      desc: "Learning with manipulatives",
    },
    {
      category: "math",
      img: "src/assets/Math/presenting-solution-whiteboard.png",
      title: "Math Presentations",
      desc: "Sharing problem-solving strategies",
    },
    // Mixed
    {
      category: "robotics engineering",
      img: "src/assets/mixed-Activities/showcase-certificate.png",
      title: "Achievement Celebration",
      desc: "Proud graduates with certificates",
    },
    {
      category: "chemistry engineering",
      img: "src/assets/mixed-Activities/showcase-parents.png",
      title: "Science Fair",
      desc: "Showcasing student projects",
    },
    {
      category: "robotics chemistry math",
      img: "src/assets/mixed-Activities/group-photo-teacher.png",
      title: "STEM Family",
      desc: "Our amazing students and instructors",
    },
  ];

  const videos = [
    {
      title: "Engineering Challenges",
      desc: "Building, testing, and improving designs.",
      src: "https://www.youtube.com/embed/nerXi5s_wxU?si=k1_nkY_dP_X-D1pY",
    },
    {
      title: "Chemistry Magic",
      desc: "Amazing chemical reactions and experiments.",
      src: "https://www.youtube.com/embed/KtU1vT_BDbg",
    },
    {
      title: "Robotics in Action",
      desc: "Watch our students program and test their robots.",
      src: "https://www.youtube.com/embed/hmWXHigKf4M",
    },
  ];

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) =>
          item.category.split(" ").includes(activeFilter)
        );

  return (
    <div className="max-w-[1200px] mx-auto px-4">
      {/* Filters */}
      <section className="py-8 text-center bg-gray-50">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-gradient-to-tr from-blue-400 to-cyan-400 text-white shadow-lg transform -translate-y-1"
                  : "bg-white text-gray-800 hover:bg-gradient-to-tr hover:from-blue-400 hover:to-cyan-400 hover:text-white hover:-translate-y-1"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white transform translate-y-full transition-transform duration-300 hover:translate-y-0">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm opacity-90">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl md:text-4xl text-center text-gray-900 mb-12">
          Watch Our Students in Action
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {videos.map((video, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative w-full aspect-video bg-gray-200">
                <iframe
                  width="100%"
                  height="100%"
                  src={video.src}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white bg-black/70 rounded-full p-2 hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-blue-700 text-lg font-semibold">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm">{video.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GallaryPage;
