import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getAllUsersAction } from "../../redux/auth/userAction";
import { getAllProgramsAction } from "../../redux/AdminProgram/adminProgramAction";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get data from Redux store
  const { users: allUsers, isLoading: usersLoading } = useSelector(
    (state) => state.user
  );
  const { programs: allPrograms, isLoading: programsLoading } = useSelector(
    (state) => state.adminProgram
  );

  // Local state for search and fetch tracking
  const [hasFetchedUsers, setHasFetchedUsers] = useState(false);
  const [hasFetchedPrograms, setHasFetchedPrograms] = useState(false);

  // Fetch users data
  useEffect(() => {
    if (!usersLoading && allUsers.length === 0 && !hasFetchedUsers) {
      dispatch(getAllUsersAction());
      setHasFetchedUsers(true);
    }
  }, [dispatch, usersLoading, allUsers.length, hasFetchedUsers]);

  // Fetch programs data
  useEffect(() => {
    if (!programsLoading && allPrograms.length === 0 && !hasFetchedPrograms) {
      dispatch(getAllProgramsAction());
      setHasFetchedPrograms(true);
    }
  }, [dispatch, programsLoading, allPrograms.length, hasFetchedPrograms]);

  // Calculate stats dynamically
  const stats = {
    totalUsers: allUsers.length,
    totalPrograms: allPrograms.length,
    totalEnrollments: allPrograms.reduce((total, program) => {
      return total + (program.enrollments?.length || 0);
    }, 0),
  };

  // Filter users to exclude admins if needed, or show all
  const displayUsers = allUsers.filter((user) => user.role !== "admin");

  // Get recent users (last 3 for display)
  const recentUsers = displayUsers.slice(0, 3);

  // Get recent programs (last 2 for display)
  const recentPrograms = allPrograms.slice(0, 2);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalPrograms}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalEnrollments}</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Users</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/users")}
          >
            View All
          </Button>
        </CardHeader>
        <CardContent>
          {usersLoading ? (
            <p>Loading users...</p>
          ) : recentUsers.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.map((user) => (
                  <TableRow key={user._id || user.id}>
                    <TableCell>
                      {user._id?.substring(0, 8) || user.id}
                    </TableCell>
                    <TableCell>{user.username || user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Programs Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Programs</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/programs")}
          >
            View All
          </Button>
        </CardHeader>
        <CardContent>
          {programsLoading ? (
            <p>Loading programs...</p>
          ) : recentPrograms.length === 0 ? (
            <p>No programs found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Schedule</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPrograms.map((program) => (
                  <TableRow key={program._id || program.id}>
                    <TableCell>
                      {program._id?.substring(0, 8) || program.id}
                    </TableCell>
                    <TableCell>{program.title}</TableCell>
                    <TableCell>{program.category}</TableCell>
                    <TableCell>{program.schedule}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate("/admin/users")}>
          Manage Users
        </Button>
        <Button onClick={() => navigate("/admin/create-program")}>
          Create New Program
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
