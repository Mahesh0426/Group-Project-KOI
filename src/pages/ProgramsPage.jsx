import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProgramsAction } from "../redux/AdminProgram/adminProgramAction";
import FeatuesSection from "../components/features/FeatuesSection";
import { enrollUser } from "../axios/enrollaxios";
import { toast } from "react-toastify";

const ProgramsPage = () => {
  const { programs } = useSelector((state) => state.adminProgram);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProgramsAction());
  }, [dispatch]);
  const handleEnroll = async (programId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const userId = user.id;

    try {
      const res = await enrollUser({ user_id: userId, program_id: programId });
      if (res.message === "Successfully enrolled in program") {
        toast.success("Enrolled successfully!");
        navigate("/my-program");
      } else if (res.error) {
        toast.error(res.error);
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
      toast.error("Enrollment failed. Please try again.");
    }
  };

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
                  {/* <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link to="/contact">Enroll Now</Link>
                  </Button> */}
                  <Button
                    className="bg-blue-600 ..."
                    onClick={() => handleEnroll(p.id)}
                  >
                    Enroll Now
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
      <FeatuesSection />
    </div>
  );
};

export default ProgramsPage;
