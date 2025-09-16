'use client';

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { User } from "@/types/notes";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  Calendar,
  Edit3,
  Save,
  X,
  Globe,
  Building,
  MapPin,
  Phone,
  Link as LinkIcon,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock API function to get user data
const mockUserMe = async (): Promise<User> => {
  return {
    id: "user-1",
    email: "user@example.com",
    username: "currentuser",
    full_name: "Alexandr Petrov",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    created_at: new Date('2022-05-15').toISOString(),
    updated_at: new Date().toISOString()
  };
};

// Extended user profile type
interface UserProfile extends User {
  title?: string;
  company?: string;
  location?: string;
  website?: string;
  bio?: string;
  skills?: string[];
  phone?: string;
  connections?: number;
}

// Mock extended user profile data
const mockUserProfile = async (): Promise<UserProfile> => {
  const user = await mockUserMe();
  return {
    ...user,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Moscow, Russia",
    website: "alex-petrov.dev",
    bio: "Experienced frontend developer with 5+ years of expertise in React, TypeScript, and modern web development. Passionate about creating intuitive user interfaces and optimizing user experiences.",
    skills: ["React", "TypeScript", "Next.js", "UI/UX Design", "Node.js", "GraphQL"],
    phone: "+7 (999) 123-45-67",
    connections: 243
  };
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserProfile>>({});
  const { theme } = useTheme();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const userData = await mockUserProfile();
      setUser(userData);
      setEditData(userData);
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Error loading profile", {
        description: "Please try again later"
      });
    }
    setIsLoading(false);
  };

  const handleSave = () => {
    // In a real app, you would save the data to your backend here
    setUser(prev => prev ? { ...prev, ...editData } : null);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setEditData(user || {});
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (skillsString: string) => {
    const skillsArray = skillsString.split(',').map(skill => skill.trim()).filter(Boolean);
    setEditData(prev => ({ ...prev, skills: skillsArray }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <span>Professional Profile</span>
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </h1>
            <p className="text-slate-600 dark:text-slate-400 relative">
              Manage your professional identity and build your network
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden dark:bg-slate-800/80 dark:border-slate-700/30">
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-32 w-32 rounded-full mb-4 dark:bg-slate-700" />
                    <Skeleton className="h-6 w-40 mb-2 dark:bg-slate-700" />
                    <Skeleton className="h-4 w-32 mb-4 dark:bg-slate-700" />
                    <Skeleton className="h-10 w-full mb-4 dark:bg-slate-700" />
                    <div className="w-full space-y-2">
                      <Skeleton className="h-4 w-full dark:bg-slate-700" />
                      <Skeleton className="h-4 w-full dark:bg-slate-700" />
                      <Skeleton className="h-4 w-2/3 dark:bg-slate-700" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <img
                        src={user?.avatar_url || "/default-avatar.png"}
                        alt={user?.full_name}
                        className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg dark:border-slate-800"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-slate-800 dark:text-white text-center mb-1">
                      {isEditing ? (
                        <Input
                          value={editData.full_name || ""}
                          onChange={(e) => handleInputChange('full_name', e.target.value)}
                          className="text-center font-bold text-lg"
                        />
                      ) : (
                        user?.full_name
                      )}
                    </h2>

                    <p className="text-slate-600 dark:text-slate-400 text-center mb-4">
                      {isEditing ? (
                        <Input
                          value={editData.title || ""}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="text-center"
                          placeholder="Your job title"
                        />
                      ) : (
                        user?.title
                      )}
                    </p>

                    <div className="w-full space-y-3">
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Building className="h-4 w-4 mr-2" />
                        {isEditing ? (
                          <Input
                            value={editData.company || ""}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            placeholder="Company"
                          />
                        ) : (
                          user?.company
                        )}
                      </div>

                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        {isEditing ? (
                          <Input
                            value={editData.location || ""}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="Location"
                          />
                        ) : (
                          user?.location
                        )}
                      </div>

                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Mail className="h-4 w-4 mr-2" />
                        {user?.email}
                      </div>

                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Phone className="h-4 w-4 mr-2" />
                        {isEditing ? (
                          <Input
                            value={editData.phone || ""}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="Phone number"
                          />
                        ) : (
                          user?.phone
                        )}
                      </div>

                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Globe className="h-4 w-4 mr-2" />
                        {isEditing ? (
                          <Input
                            value={editData.website || ""}
                            onChange={(e) => handleInputChange('website', e.target.value)}
                            placeholder="Website"
                          />
                        ) : (
                          user?.website
                        )}
                      </div>

                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        Member since {user ? formatDate(user.created_at) : ''}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Connections Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mt-6 dark:bg-slate-800/80 dark:border-slate-700/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                  Professional Network
                </h3>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg dark:bg-slate-700/50">
                  <span className="text-slate-600 dark:text-slate-300">Connections</span>
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {user?.connections}
                  </Badge>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Manage network
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-blue-600" />
                  About
                </h3>

                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full dark:bg-slate-700" />
                    <Skeleton className="h-4 w-full dark:bg-slate-700" />
                    <Skeleton className="h-4 w-2/3 dark:bg-slate-700" />
                  </div>
                ) : isEditing ? (
                  <Textarea
                    value={editData.bio || ""}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                ) : (
                  <p className="text-slate-600 dark:text-slate-300">
                    {user?.bio || "No bio provided yet."}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                  Skills & Expertise
                </h3>

                {isLoading ? (
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full dark:bg-slate-700" />
                    ))}
                  </div>
                ) : isEditing ? (
                  <div>
                    <Input
                      value={editData.skills?.join(', ') || ""}
                      onChange={(e) => handleSkillsChange(e.target.value)}
                      placeholder="Add skills separated by commas"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      Separate skills with commas
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user?.skills?.map((skill, index) => (
                      <Badge
                        key={index}
                        className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Experience Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                  Experience
                </h3>

                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                        <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 my-2"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800 dark:text-white">Senior Frontend Developer</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">TechCorp Inc.</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">Jan 2021 - Present · 2 yrs 10 mos</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                        Leading frontend development for enterprise applications, mentoring junior developers, and implementing modern UI/UX practices.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
                        <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800 dark:text-white">Frontend Developer</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">WebSolutions LLC</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">Jun 2018 - Dec 2020 · 2 yrs 7 mos</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                        Developed responsive web applications using React and implemented client-side functionality for various projects.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
