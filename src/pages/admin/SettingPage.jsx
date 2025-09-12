import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useSelector } from "react-redux";

export default function AdminSettings() {
  const { user } = useSelector((state) => state.user);
  // Dummy admin data
  const [adminData, setAdminData] = useState({
    name: user?.name || "Admin User",
    email: user?.email || "admin@example.com",
    password: "********",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Admin Data:", adminData);
    alert("Settings updated successfully!");
    // Replace console.log with API call to update admin settings
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={adminData.name}
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
