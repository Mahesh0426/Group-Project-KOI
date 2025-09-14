import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateAdminAction } from "../../redux/auth/userAction";

export default function AdminSettings() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Dummy admin data
  const [adminData, setAdminData] = useState({
    id: user?.id || "",
    username: user?.username || "Admin User",
    email: user?.email || "admin@example.com",
    role: user?.role || "admin",
    password: "********",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userUpdateAdminAction(adminData));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-1">
              <Label htmlFor="username">Name</Label>
              <Input
                id="username"
                name="username"
                value={adminData.username}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={adminData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1 relative">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={adminData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Update Settings</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
