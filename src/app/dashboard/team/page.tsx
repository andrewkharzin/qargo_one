'use client';

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  Shield,
  Star,
  Mail,
  Phone,
  Globe,
  MapPin,
  Sparkles,
  Filter,
  Search,
  ChevronDown,
  Network,
  Crown,
  BadgeCheck,
  Clock,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Types
interface User {
  id: string;
  name: string;
  title: string;
  email: string;
  phone?: string;
  avatar: string;
  department: string;
  location: string;
  isOnline: boolean;
  lastActive?: string;
  skills: string[];
}

interface InternalUser extends User {
  role: "employee" | "manager" | "executive";
  joinDate: string;
  projects: number;
}

interface ExternalUser extends User {
  company: string;
  trustStatus: "high" | "medium" | "low" | "pending";
  relationship: "partner" | "client" | "vendor" | "contractor";
  connectionDate: string;
}

type TeamMember = InternalUser | ExternalUser;

// Mock data for team members
const mockTeamMembers: TeamMember[] = [
  // Internal team members
  {
    id: "user-1",
    name: "Alexandr Petrov",
    title: "Senior Frontend Developer",
    email: "alex.petrov@company.com",
    phone: "+7 (999) 123-45-67",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Engineering",
    location: "Moscow, Russia",
    isOnline: true,
    lastActive: "Just now",
    skills: ["React", "TypeScript", "Next.js"],
    role: "employee",
    joinDate: "2021-05-15",
    projects: 12
  },
  {
    id: "user-2",
    name: "Elena Volkova",
    title: "Product Design Lead",
    email: "elena.volkova@company.com",
    phone: "+7 (999) 234-56-78",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Design",
    location: "St. Petersburg, Russia",
    isOnline: true,
    lastActive: "5 min ago",
    skills: ["UI/UX", "Figma", "User Research"],
    role: "manager",
    joinDate: "2019-11-20",
    projects: 18
  },
  {
    id: "user-3",
    name: "Dmitri Sokolov",
    title: "CTO & Co-Founder",
    email: "dmitri.sokolov@company.com",
    phone: "+7 (999) 345-67-89",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Leadership",
    location: "Moscow, Russia",
    isOnline: false,
    lastActive: "2 hours ago",
    skills: ["Architecture", "Strategy", "Management"],
    role: "executive",
    joinDate: "2018-03-10",
    projects: 32
  },
  {
    id: "user-4",
    name: "Irina Kuznetsova",
    title: "Backend Engineer",
    email: "irina.kuznetsova@company.com",
    phone: "+7 (999) 456-78-90",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Engineering",
    location: "Kazan, Russia",
    isOnline: true,
    lastActive: "15 min ago",
    skills: ["Node.js", "Python", "PostgreSQL"],
    role: "employee",
    joinDate: "2022-01-10",
    projects: 7
  },
  {
    id: "user-5",
    name: "Maxim Orlov",
    title: "DevOps Specialist",
    email: "maxim.orlov@company.com",
    phone: "+7 (999) 567-89-01",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Infrastructure",
    location: "Novosibirsk, Russia",
    isOnline: false,
    lastActive: "Yesterday",
    skills: ["AWS", "Kubernetes", "Docker"],
    role: "employee",
    joinDate: "2020-08-22",
    projects: 14
  },
  {
    id: "user-6",
    name: "Anastasia Popova",
    title: "Marketing Director",
    email: "anastasia.popova@company.com",
    phone: "+7 (999) 678-90-12",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Marketing",
    location: "Moscow, Russia",
    isOnline: true,
    lastActive: "30 min ago",
    skills: ["Digital Marketing", "Brand Strategy", "SEO"],
    role: "manager",
    joinDate: "2019-05-15",
    projects: 21
  },
  {
    id: "user-7",
    name: "Sergei Ivanov",
    title: "QA Engineer",
    email: "sergei.ivanov@company.com",
    phone: "+7 (999) 789-01-23",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Engineering",
    location: "Moscow, Russia",
    isOnline: true,
    lastActive: "Just now",
    skills: ["Testing", "Automation", "Cypress"],
    role: "employee",
    joinDate: "2021-11-05",
    projects: 9
  },
  {
    id: "user-8",
    name: "Olga Smirnova",
    title: "HR Business Partner",
    email: "olga.smirnova@company.com",
    phone: "+7 (999) 890-12-34",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Human Resources",
    location: "Moscow, Russia",
    isOnline: false,
    lastActive: "3 hours ago",
    skills: ["Recruitment", "Employee Development", "Coaching"],
    role: "manager",
    joinDate: "2020-02-18",
    projects: 16
  },

  // External partners
  {
    id: "ext-1",
    name: "Michael Johnson",
    title: "Solutions Architect",
    email: "michael.johnson@techpartners.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Solutions",
    location: "San Francisco, USA",
    isOnline: true,
    lastActive: "10 min ago",
    skills: ["Cloud Architecture", "AWS", "Enterprise Solutions"],
    company: "TechPartners Inc.",
    trustStatus: "high",
    relationship: "partner",
    connectionDate: "2020-06-15"
  },
  {
    id: "ext-2",
    name: "Sarah Williams",
    title: "Account Manager",
    email: "sarah.williams@globalcorp.com",
    phone: "+44 20 1234 5678",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Client Services",
    location: "London, UK",
    isOnline: false,
    lastActive: "Yesterday",
    skills: ["Account Management", "Negotiation", "CRM"],
    company: "GlobalCorp Ltd.",
    trustStatus: "medium",
    relationship: "client",
    connectionDate: "2021-09-22"
  },
  {
    id: "ext-3",
    name: "Chen Wei",
    title: "Technical Lead",
    email: "chen.wei@asia-dev.com",
    phone: "+86 10 1234 5678",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Development",
    location: "Beijing, China",
    isOnline: true,
    lastActive: "Just now",
    skills: ["Java", "Microservices", "Spring Boot"],
    company: "AsiaDev Solutions",
    trustStatus: "high",
    relationship: "vendor",
    connectionDate: "2019-03-10"
  },
  {
    id: "ext-4",
    name: "Anna Müller",
    title: "UX Researcher",
    email: "anna.muller@eurodesign.com",
    phone: "+49 30 12345678",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Design",
    location: "Berlin, Germany",
    isOnline: true,
    lastActive: "1 hour ago",
    skills: ["User Research", "Usability Testing", "Data Analysis"],
    company: "EuroDesign GmbH",
    trustStatus: "medium",
    relationship: "contractor",
    connectionDate: "2022-05-18"
  },
  {
    id: "ext-5",
    name: "Raj Patel",
    title: "DevOps Engineer",
    email: "raj.patel@indiatech.com",
    phone: "+91 80 1234 5678",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Infrastructure",
    location: "Bangalore, India",
    isOnline: false,
    lastActive: "2 days ago",
    skills: ["Azure", "Terraform", "CI/CD"],
    company: "IndiaTech Solutions",
    trustStatus: "low",
    relationship: "vendor",
    connectionDate: "2023-01-15"
  },
  {
    id: "ext-6",
    name: "Lisa Tanaka",
    title: "Product Manager",
    email: "lisa.tanaka@japan-products.co.jp",
    phone: "+81 3 1234 5678",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Product",
    location: "Tokyo, Japan",
    isOnline: true,
    lastActive: "20 min ago",
    skills: ["Product Strategy", "Agile", "Roadmapping"],
    company: "Japan Products Co.",
    trustStatus: "pending",
    relationship: "client",
    connectionDate: "2023-04-05"
  }
];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "internal" | "external">("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const { theme } = useTheme();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [teamMembers, searchTerm, filter, departmentFilter]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTeamMembers(mockTeamMembers);
    } catch (error) {
      console.error("Error loading team data:", error);
      toast.error("Error loading team data", {
        description: "Please try again later"
      });
    }
    setIsLoading(false);
  };

  const filterMembers = () => {
    let filtered = [...teamMembers];

    // Apply type filter
    if (filter === "internal") {
      filtered = filtered.filter(member => 'role' in member);
    } else if (filter === "external") {
      filtered = filtered.filter(member => 'company' in member);
    }

    // Apply department filter
    if (departmentFilter !== "all") {
      filtered = filtered.filter(member => member.department === departmentFilter);
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(term) ||
        member.title.toLowerCase().includes(term) ||
        member.department.toLowerCase().includes(term) ||
        ('company' in member && member.company.toLowerCase().includes(term)) ||
        member.skills.some(skill => skill.toLowerCase().includes(term))
      );
    }

    setFilteredMembers(filtered);
  };

  const getTrustStatusColor = (status: string) => {
    switch (status) {
      case "high": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "low": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "pending": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case "partner": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "client": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "vendor": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "contractor": return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Engineering": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Design": return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300";
      case "Leadership": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "Infrastructure": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Marketing": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "Human Resources": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get unique departments for filter
  const departments = Array.from(new Set(teamMembers.map(member => member.department)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"></div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-3 relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span>Team Directory</span>
              <Sparkles className="h-5 w-5 text-yellow-400" />
            </h1>
            <p className="text-slate-600 dark:text-slate-400 relative">
              Manage your organization and external partners with trust-based relationships
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={loadData}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="bg-white/80 backdrop-blur-sm border-slate-200/60 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-slate-200/60 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200"
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-slate-200/60 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200">
                  <Filter className="h-4 w-4 mr-2" />
                  {filter === "all" ? "All Members" : filter === "internal" ? "Internal Only" : "External Only"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  All Members
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("internal")}>
                  Internal Team
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("external")}>
                  External Partners
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-slate-200/60 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200">
                  <Building2 className="h-4 w-4 mr-2" />
                  {departmentFilter === "all" ? "All Departments" : departmentFilter}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setDepartmentFilter("all")}>
                  All Departments
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {departments.map(dept => (
                  <DropdownMenuItem key={dept} onClick={() => setDepartmentFilter(dept)}>
                    {dept}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/30">
            <CardContent className="p-4 flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 dark:bg-blue-900/30">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Members</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{teamMembers.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/30">
            <CardContent className="p-4 flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-lg p-3 dark:bg-green-900/30">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Internal Team</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{teamMembers.filter(m => 'role' in m).length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/30">
            <CardContent className="p-4 flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3 dark:bg-purple-900/30">
                <Network className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">External Partners</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{teamMembers.filter(m => 'company' in m).length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/30">
            <CardContent className="p-4 flex items-center">
              <div className="flex-shrink-0 bg-amber-100 rounded-lg p-3 dark:bg-amber-900/30">
                <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">High Trust</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{teamMembers.filter(m => 'trustStatus' in m && m.trustStatus === 'high').length}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg dark:bg-slate-800/80 dark:border-slate-700/30 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-12 w-12 rounded-full dark:bg-slate-700" />
                    <Skeleton className="h-6 w-16 rounded-full dark:bg-slate-700" />
                  </div>
                  <Skeleton className="h-5 w-3/4 mb-2 dark:bg-slate-700" />
                  <Skeleton className="h-4 w-1/2 mb-4 dark:bg-slate-700" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16 rounded-full dark:bg-slate-700" />
                    <Skeleton className="h-6 w-20 rounded-full dark:bg-slate-700" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-8 rounded-full dark:bg-slate-700" />
                    <Skeleton className="h-8 w-8 rounded-full dark:bg-slate-700" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No team members found</h3>
            <p className="text-slate-600 dark:text-slate-400">
              {searchTerm
                ? "No team members match your search criteria"
                : "Try adjusting your filters to see more results"
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group dark:bg-slate-800/80 dark:border-slate-700/30">
                  <CardContent className="p-6">
                    {/* Header with avatar and status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-14 w-14 rounded-xl object-cover border-2 border-white shadow-md dark:border-slate-800"
                        />
                        <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white dark:border-slate-800 ${member.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                      </div>

                      {'role' in member ? (
                        <Badge className={
                          member.role === 'executive' ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                          member.role === 'manager' ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                          "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                        }>
                          {member.role === 'executive' ? <Crown className="h-3 w-3 mr-1" /> :
                           member.role === 'manager' ? <BadgeCheck className="h-3 w-3 mr-1" /> : null}
                          {member.role}
                        </Badge>
                      ) : (
                        <Badge className={getTrustStatusColor(member.trustStatus)}>
                          <Shield className="h-3 w-3 mr-1" />
                          {member.trustStatus}
                        </Badge>
                      )}
                    </div>

                    {/* Name and title */}
                    <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {member.title}
                    </p>

                    {/* Company/Department */}
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-500 mb-4">
                      {'company' in member ? (
                        <>
                          <Building2 className="h-4 w-4 mr-1" />
                          {member.company}
                        </>
                      ) : (
                        <>
                          <Badge className={getDepartmentColor(member.department)}>
                            {member.department}
                          </Badge>
                        </>
                      )}
                    </div>

                    {/* Location and contact */}
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center text-slate-600 dark:text-slate-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        {member.location}
                      </div>
                      {'role' in member && (
                        <div className="flex items-center text-slate-600 dark:text-slate-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          Joined {formatDate(member.joinDate)}
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {member.skills.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600"
                        >
                          +{member.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Footer with actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/30">
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-500">
                        {member.isOnline ? (
                          <>
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                            Online
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            {member.lastActive}
                          </>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Mail className="h-4 w-4" />
                        </Button>
                        {'role' in member ? (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Phone className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Globe className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
