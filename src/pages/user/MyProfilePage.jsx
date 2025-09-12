import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock } from "lucide-react";

const MyProfilePage = () => {
  // Dummy user data (later you can replace with DB data)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    password: "password123",
  });

  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser(formData); // update state (later connect to API/DB)
    alert("Profile updated successfully ✅");
  };

  return (
    <div className="py-12 px-4 md:px-8 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        👤 My Profile
      </h1>

      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-8">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User size={16} /> Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail size={16} /> Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock size={16} /> Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Save Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfilePage;
