import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createProgramAction } from "../../redux/AdminProgram/adminProgramAction";

const CreateProgramFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    age_group: "",
    duration: "",
    price: "",
    schedule: "",
    learning_outcomes: "",
    image_filename: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // handle file change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(createProgramAction(formData));
    } catch (error) {
      console.log(error);
    }

    navigate("/admin/programs");
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="mb-2">
                Program Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Robotics & Coding"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Age Group */}
            <div>
              <Label htmlFor="age_group" className="mb-2">
                Age Group
              </Label>
              <Input
                id="age_group"
                name="age_group"
                placeholder="e.g., 10-14"
                value={formData.age_group}
                onChange={handleChange}
                required
              />
            </div>

            {/* Duration */}
            <div>
              <Label htmlFor="duration" className="mb-2">
                Duration
              </Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g., 8 weeks"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" className="mb-2">
                Price ($)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="e.g., 299"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Schedule */}
            <div>
              <Label htmlFor="schedule" className="mb-2">
                Schedule
              </Label>
              <Input
                id="schedule"
                name="schedule"
                placeholder="e.g., Saturdays 10:00 AM - 12:00 PM"
                value={formData.schedule}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="mb-2">
                Program Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="e.g., Dive into the exciting world of robotics and programming!..."
                rows={2}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            {/* What Students Will Learn */}
            <div>
              <Label htmlFor="learning_outcomes" className="mb-2">
                What Students Will Learn
              </Label>
              <Textarea
                id="learning_outcomes"
                name="learning_outcomes"
                placeholder="e.g., 
                • Basic programming concepts and logic 
                • Robot assembly and mechanical systems ..."
                rows={5}
                value={formData.learning_outcomes}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Example: Include an overview and learning outcomes such as:
                <br />• Basic programming concepts and logic
                <br />• Robot assembly and mechanical systems
                <br />• Sensor integration and data processing
                <br />• Problem-solving through coding challenges
                <br />• Teamwork and project presentation skills
              </p>
            </div>
            {/* Program Image */}
            <div>
              <Label htmlFor="image_filename" className="mb-2">
                Program Image
              </Label>
              <Input
                id="image_filename"
                name="image_filename"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/programs")}
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Program
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProgramFormPage;
