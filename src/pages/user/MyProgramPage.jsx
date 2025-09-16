import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, GraduationCap } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const ENROLL_API = `${API_BASE_URL}/features/program/enroll.php`;
const PROGRAM_API = `${API_BASE_URL}/features/program/programs.php`;

const MyProgramPage = () => {
  const token = localStorage.getItem("accessToken");
  const { user } = useSelector((state) => state.user);
  const [enrolledPrograms, setEnrolledPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !user?.id) return;

    const fetchEnrollments = async () => {
      setLoading(true);
      try {
        // Get enrollments for logged-in user
        const enrollRes = await axios.get(
          `${ENROLL_API}?user_enrollments=1&user_id=${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Filter active enrollments only
        const activeEnrollments = (enrollRes.data.enrollments || []).filter(
          (enr) => enr.status === "active"
        );

        // Get program IDs from active enrollments
        const programIds = activeEnrollments.map((enr) => enr.program_id);

        // Fetch all programs and filter to those enrolled
        const programsRes = await axios.get(PROGRAM_API, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const programs = programsRes.data || [];

        // Map program details by ID for quick lookup
        const programMap = programs.reduce((map, p) => {
          map[p.id] = p;
          return map;
        }, {});

        // Combine enrollment and program info
        const enrolledProgramsWithDetails = activeEnrollments.map((enr) => {
          const prog = programMap[enr.program_id] || {};
          return {
            id: prog.id,
            title: prog.title || "Unknown Program",
            age: prog.age_group || "Unknown age group",
            duration: prog.duration || "Unknown duration",
            price: prog.price ? `$${prog.price}` : "N/A",
            schedule: prog.schedule || "N/A",
            status: "In Progress", // Use active mapped to "In Progress"
            image: prog.image_url || "/default-program-image.png",
          };
        });

        setEnrolledPrograms(enrolledProgramsWithDetails);
        setError(null);
      } catch (err) {
        setError("Failed to load enrolled programs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [token, user]);

  return (
    <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        🎓 My Enrolled Programs
      </h1>

      {loading ? (
        <p className="text-center py-20">Loading enrolled programs...</p>
      ) : error ? (
        <p className="text-center py-20 text-red-600">{error}</p>
      ) : enrolledPrograms.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg mb-6">
            You haven’t enrolled in any active programs yet.
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
                className="rounded-t-2xl w-full h-55  block"
                onError={(e) => {
                  e.target.src = "/default-program-image.png";
                }}
              />
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{program.title}</h2>
                  <Badge className="bg-green-500 text-white">In Progress</Badge>
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

// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Calendar, Clock, DollarSign, GraduationCap } from "lucide-react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
// const ENROLL_API = `${API_BASE_URL}/features/program/enroll.php`;
// const PROGRAM_API = `${API_BASE_URL}/features/program/programs.php`;

// const MyProgramPage = () => {
//   const token = localStorage.getItem("accessToken");
//   const { user } = useSelector((state) => state.user);
//   const [enrolledPrograms, setEnrolledPrograms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!token || !user?.id) return;

//     const fetchEnrollments = async () => {
//       setLoading(true);
//       try {
//         // Fetch enrollments for logged-in user
//         const enrollRes = await axios.get(
//           `${ENROLL_API}?user_enrollments=1&user_id=${user.id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         // Filter for active enrollments only
//         const activeEnrollments = (enrollRes.data.enrollments || []).filter(
//           (enr) => enr.status === "active"
//         );

//         // Fetch all programs details
//         const programsRes = await axios.get(PROGRAM_API, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const programs = programsRes.data || [];

//         // Map programs by ID for quick lookup
//         const programMap = programs.reduce((map, p) => {
//           map[p.id] = p;
//           return map;
//         }, {});

//         // Combine enrollment and program info
//         const enrolledProgramsWithDetails = activeEnrollments.map((enr) => {
//           const prog = programMap[enr.program_id] || {};
//           return {
//             enrollment_id: enr.id, // Use enrollment id for unique key
//             user_id: enr.user_id,
//             program_id: enr.program_id,
//             title: prog.title || "Unknown Program",
//             age: prog.age_group || "Unknown age group",
//             duration: prog.duration || "Unknown duration",
//             price: prog.price ? `$${prog.price}` : "N/A",
//             schedule: prog.schedule || "N/A",
//             status: "In Progress", // Map 'active' to display status
//             image: prog.image_url || "/default-program-image.png",
//           };
//         });

//         setEnrolledPrograms(enrolledProgramsWithDetails);
//         setError(null);
//       } catch (err) {
//         setError("Failed to load enrolled programs.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEnrollments();
//   }, [token, user]);

//   const cancelEnrollment = async (enrollment) => {
//     if (!window.confirm("Are you sure you want to cancel this enrollment?")) {
//       return;
//     }

//     if (!enrollment.user_id || !enrollment.program_id) {
//       toast.error("Missing user ID or program ID for cancellation.");
//       return;
//     }

//     try {
//       await axios.delete(ENROLL_API, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: {
//           user_id: enrollment.user_id,
//           program_id: enrollment.program_id,
//         },
//       });
//       toast.success("Enrollment cancelled successfully.");

//       setEnrolledPrograms((prev) =>
//         prev.filter(
//           (p) =>
//             !(
//               p.user_id === enrollment.user_id &&
//               p.program_id === enrollment.program_id
//             )
//         )
//       );
//     } catch (error) {
//       toast.error("Failed to cancel enrollment.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
//       <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
//         🎓 My Enrolled Programs
//       </h1>

//       {loading ? (
//         <p className="text-center py-20">Loading enrolled programs...</p>
//       ) : error ? (
//         <p className="text-center py-20 text-red-600">{error}</p>
//       ) : enrolledPrograms.length === 0 ? (
//         <div className="text-center py-20">
//           <p className="text-gray-600 text-lg mb-6">
//             You haven’t enrolled in any active programs yet.
//           </p>
//           <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//             Browse Programs
//           </Button>
//         </div>
//       ) : (
//         <div className="grid gap-8 sm:grid-cols-2">
//           {enrolledPrograms.map((program) => (
//             <Card
//               key={program.enrollment_id}
//               className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-0"
//             >
//               <img
//                 src={program.image}
//                 alt={program.title}
//                 className="rounded-t-2xl w-full h-48 object-cover block"
//                 onError={(e) => (e.target.src = "/default-program-image.png")}
//               />
//               <CardContent className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-bold">{program.title}</h2>
//                   <Badge className="bg-green-500 text-white">In Progress</Badge>
//                 </div>
//                 <div className="space-y-2 text-gray-700 text-sm">
//                   <p className="flex items-center gap-2">
//                     <GraduationCap size={16} /> {program.age}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Clock size={16} /> {program.duration}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Calendar size={16} /> {program.schedule}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <DollarSign size={16} /> {program.price}
//                   </p>
//                 </div>
//                 <div className="flex gap-4 mt-4">
//                   <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
//                     View Details
//                   </Button>
//                   <Button
//                     className="flex-1 bg-red-600 hover:bg-red-700 text-white"
//                     onClick={() => cancelEnrollment(program)}
//                   >
//                     Cancel Enrollment
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyProgramPage;
