import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { toast } from "react-toastify";

const statusOptions = ["pending", "active", "completed", "cancelled"];
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const API_USERS = `${API_BASE_URL}/auth/admin_users.php`;
const API_PROGRAMS = `${API_BASE_URL}/features/program/programs.php`;
const API_ENROLL = `${API_BASE_URL}/features/program/enroll.php`;

export default function AdminEnrollmentsPage() {
  const token = localStorage.getItem("accessToken");
  const [users, setUsers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(undefined);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users
  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(API_USERS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data?.users || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
        setError("Failed to load users");
      }
    };

    fetchUsers();
  }, [token]);

  // Fetch programs
  useEffect(() => {
    if (!token) return;

    const fetchPrograms = async () => {
      try {
        const res = await axios.get(API_PROGRAMS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrograms(res.data || []);
      } catch (err) {
        console.error("Failed to fetch programs", err);
        setError("Failed to load programs");
      }
    };

    fetchPrograms();
  }, [token]);

  // Fetch enrollments when selectedUserId changes
  useEffect(() => {
    if (!token || !selectedUserId) {
      setEnrollments([]);
      return;
    }

    const fetchEnrollments = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_ENROLL}?user_enrollments=1&user_id=${selectedUserId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEnrollments(res.data?.enrollments || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch enrollments", err);
        setError("Failed to load enrollments");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [token, selectedUserId]);

  // Get program title safely
  const getProgramTitle = (programId) => {
    const program = programs.find((p) => String(p.id) === String(programId));
    return program?.title || `Program #${programId}`;
  };

  // Handle status change
  const handleStatusChange = async (userId, programId, newStatus) => {
    if (!newStatus) return;

    try {
      await axios.put(
        API_ENROLL,
        { user_id: userId, program_id: programId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEnrollments((prev) =>
        prev.map((enr) =>
          String(enr.user_id) === String(userId) &&
          String(enr.program_id) === String(programId)
            ? { ...enr, status: newStatus }
            : enr
        )
      );
      toast.success("Enrollment status updated.");
    } catch (err) {
      console.error("Failed to update status", err);
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Program Enrollments</h1>

      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}

      {/* User Select */}
      <div className="mb-6 w-72">
        <label htmlFor="userSelect" className="block mb-2 font-semibold">
          Select User:
        </label>
        <Select
          id="userSelect"
          value={selectedUserId}
          onValueChange={(value) => setSelectedUserId(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {users?.map((user) =>
              user?.id ? (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.username || "Unknown"} ({user.email || "No Email"})
                </SelectItem>
              ) : null
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Enrollment Table */}
      {loading ? (
        <p>Loading enrollments...</p>
      ) : enrollments.length === 0 ? (
        <p>No enrollments found for selected user.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SN</TableHead>
              <TableHead>Program ID</TableHead>
              <TableHead>Program Title</TableHead>
              <TableHead>Enrolled At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Change Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map((enr, index) => (
              <TableRow key={`${enr.user_id}-${enr.program_id}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{enr.program_id}</TableCell>
                <TableCell>{getProgramTitle(enr.program_id)}</TableCell>
                <TableCell>
                  {enr.enrolled_at
                    ? new Date(enr.enrolled_at).toLocaleString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Badge variant="default">{enr.status || "Unknown"}</Badge>
                </TableCell>
                <TableCell>
                  <Select
                    value={enr.status || undefined} // undefined shows placeholder
                    onValueChange={(value) =>
                      handleStatusChange(enr.user_id, enr.program_id, value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
