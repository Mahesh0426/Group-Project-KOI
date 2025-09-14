import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  ImageIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProgramAction,
  getAllProgramsAction,
  updateProgramAction,
} from "../../redux/AdminProgram/adminProgramAction";
import ConfirmDelete from "../../components/helper/ConfirmDelete";

export default function AdminProgramsPage() {
  const { programs } = useSelector((state) => state.adminProgram);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProgramsAction());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Transform the programs data to match the expected structure
  const transformedPrograms = programs.map((program) => ({
    id: program.id,
    title: program.title,
    ageGroup: program.age_group,
    category: "STEM",

    duration: program.duration,
    price: parseFloat(program.price),
    status: "active",
    schedule: program.schedule,
    image_url: program.image_url,
    created_at: program.created_at,
  }));

  const filteredPrograms = transformedPrograms.filter((program) => {
    const matchesSearch = program.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || program.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || program.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "default";
      case "enrolling":
        return "secondary";
      case "completed":
        return "outline";
      default:
        return "secondary";
    }
  };

  const handleEdit = (programId) => {
    navigate(`/admin/edit-program/${programId}`);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Programs Management
          </h1>
          <p className="text-muted-foreground">
            Manage all STEM programs and courses
          </p>
        </div>
        <Link to="/admin/create-program">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Program
          </Button>
        </Link>
      </div>

      {/* Program Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Programs
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transformedPrograms.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Programs
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transformedPrograms.filter((p) => p.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue (Est.)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {transformedPrograms
                .reduce((sum, p) => sum + p.price, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search programs "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="enrolling">Enrolling</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Computer Science">
                  Computer Science
                </SelectItem>
                <SelectItem value="General Science">General Science</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Programs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Programs</CardTitle>
          <CardDescription>
            Showing {filteredPrograms.length} of {transformedPrograms.length}{" "}
            programs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SN</TableHead>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program, index) => (
                  <TableRow key={program.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {program.image_url ? (
                        <div className="h-12 w-12 overflow-hidden rounded-md border">
                          <img
                            src={program.image_url}
                            alt={program.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 flex items-center justify-center rounded-md border bg-muted">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{program.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Age: {program.ageGroup}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{program.category}</TableCell>
                    <TableCell>{program.schedule}</TableCell>
                    <TableCell>{program.duration}</TableCell>
                    <TableCell>${program.price}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(program.status)}>
                        {program.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(program?.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {/* delete button */}
                        <ConfirmDelete
                          onDelete={() =>
                            dispatch(deleteProgramAction(program?.id))
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No programs found</h3>
                      <p className="text-muted-foreground">
                        {transformedPrograms.length === 0
                          ? "You haven't created any programs yet."
                          : "Try adjusting your search or filter to find what you're looking for."}
                      </p>
                      {transformedPrograms.length === 0 && (
                        <Link to="/admin/create-program" className="mt-4">
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Your First Program
                          </Button>
                        </Link>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
