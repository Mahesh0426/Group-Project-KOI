import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAction,
  updateUserAction,
  getUserByIdAction,
} from "../../redux/auth/userAction";

const CreateEditUsersFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { users, isLoading } = useSelector((state) => state.user);

  // Filter the user from the users list
  const selectedUser = users.find((u) => u.id == id);
  // Determine if we're in edit mode
  const isEditMode = Boolean(id);

  // Find the user if in edit mode
  const user = isEditMode ? selectedUser : null;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "learner",
    password: "",
    is_active: true,
  });

  // Load user data when in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(getUserByIdAction(id));
    }
  }, [dispatch, id, isEditMode]);

  // Populate form when user data is loaded
  useEffect(() => {
    if (isEditMode && user && user.id == id) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "learner",
        password: "",
        is_active: user.is_active !== undefined ? user.is_active : true,
      });
    }
  }, [user, isEditMode, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSwitchChange = (field, checked) => {
    setFormData({ ...formData, [field]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For edit mode, remove password field if it's empty
    const submitData =
      isEditMode && !formData.password
        ? { ...formData, password: undefined }
        : formData;

    try {
      if (isEditMode) {
        dispatch(updateUserAction(id, submitData));
      } else {
        dispatch(createUserAction(submitData));
      }
      navigate("/admin/users");
    } catch (error) {
      console.log(error);
    }
  };

  // Show loading while fetching user data in edit mode
  if (isEditMode && isLoading && !user) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 mt-12">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">Loading user data...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 mt-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isEditMode ? "Edit User" : "Create New User"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="username">Full Name</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter user's full name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleSelectChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="learner">Learner</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password - Only required for new users */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password{" "}
                {isEditMode && "(Leave blank to keep current password)"}
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter a secure password"
                value={formData.password}
                onChange={handleChange}
                required={!isEditMode} // Only require password for new users
              />
            </div>

            {/* Active Status - Only for edit mode */}
            {isEditMode && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("is_active", checked)
                  }
                />
                <Label htmlFor="is_active">Active User</Label>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/users")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update User"
                  : "Create User"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEditUsersFormPage;
