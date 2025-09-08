'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Plane,
  Package,
  Globe,
  Zap,
  Shield,
  BarChart3,
  Users,
  Clock,
  ArrowRight,
  Menu,
  X,
  CheckCircle,
  Star,
  TrendingUp,
  LogOut,
  Database,
  Cpu,
  Network
} from 'lucide-react';
import { ROUTES } from '@/components/layouts/constants';
import { useSession } from '@/hooks/useSession';
import UserMenu from '@/components/UserMenu';


export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const { user, loading } = useSession();

  const features = [
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Global Cargo Tracking",
      description: "Real-time tracking across 150+ countries with AI-powered route optimization"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Smart Inventory Management",
      description: "Automated warehouse management with predictive analytics"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Booking",
      description: "Intelligent cargo matching and dynamic pricing optimization"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Advanced Security",
      description: "Blockchain-based cargo verification and tamper-proof documentation"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950">
        <nav className="flex justify-between items-center px-6 py-4 lg:px-12">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-20 h-6 bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="w-16 h-6 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-20 h-6 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-16 h-6 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-24 h-10 bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
          <div className="md:hidden w-6 h-6 bg-gray-700 rounded animate-pulse"></div>
        </nav>

        <div className="px-6 py-20 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="w-96 h-16 bg-gray-700 rounded mx-auto mb-6 animate-pulse"></div>
            <div className="w-3/4 h-8 bg-gray-700 rounded mx-auto mb-8 animate-pulse"></div>
            <div className="flex justify-center gap-4 mb-16">
              <div className="w-40 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="w-32 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-blue-950 relative overflow-hidden">
      {/* Background Animations */}
      <style jsx>{`
        .stars-far, .stars-medium, .stars-close {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: stars 120s linear infinite;
          opacity: 0.3;
        }

        .stars-medium {
          background-image:
            radial-gradient(1.5px 1.5px at 50px 160px, #fff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 90px 40px, #bbb, rgba(0,0,0,0));
          background-size: 300px 300px;
          animation: stars 80s linear infinite;
          opacity: 0.4;
        }

        .stars-close {
          background-image:
            radial-gradient(1px 1px at 190px 120px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 140px 40px, #fff, rgba(0,0,0,0));
          background-size: 400px 400px;
          animation: stars 40s linear infinite;
          opacity: 0.5;
        }

        @keyframes stars {
          from { background-position: 0 0; }
          to { background-position: 0 200px; }
        }

        .animate-flow-line {
          animation: flowLine 8s linear infinite;
        }

        .animate-flow-vertical {
          animation: flowVertical 6s linear infinite;
        }

        .animate-flow-diagonal {
          animation: flowDiagonal 10s linear infinite;
        }

        .animate-wave-flow {
          animation: waveFlow 12s ease-in-out infinite;
        }

        @keyframes flowLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes flowVertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes flowDiagonal {
          0% { transform: translate(-100%, -100%); }
          100% { transform: translate(100%, 100%); }
        }

        @keyframes waveFlow {
          0%, 100% { opacity: 0.1; transform: scaleX(0.5); }
          50% { opacity: 0.3; transform: scaleX(1); }
        }

        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-6000 { animation-delay: 6s; }
      `}</style>

      {/* Parallax Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars-far"></div>
        <div className="stars-medium"></div>
        <div className="stars-close"></div>
      </div>

      {/* Information Flow Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 animate-flow-line"></div>
        <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30 animate-flow-line animation-delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-35 animate-flow-line animation-delay-2000"></div>
        <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-25 animate-flow-line animation-delay-3000"></div>

        <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-30 animate-flow-vertical"></div>
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-25 animate-flow-vertical animation-delay-1500"></div>
        <div className="absolute top-0 left-3/4 w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-20 animate-flow-vertical animation-delay-3000"></div>

        <div className="absolute top-0 left-0 w-1 h-1 bg-gradient-to-br from-blue-400 to-transparent opacity-60 animate-flow-diagonal"></div>
        <div className="absolute top-0 right-0 w-1 h-1 bg-gradient-to-bl from-purple-400 to-transparent opacity-60 animate-flow-diagonal animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-1 h-1 bg-gradient-to-tr from-cyan-400 to-transparent opacity-60 animate-flow-diagonal animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-1 h-1 bg-gradient-to-tl from-indigo-400 to-transparent opacity-60 animate-flow-diagonal animation-delay-6000"></div>

        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 via-purple-400 to-transparent opacity-20 animate-wave-flow"></div>
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 via-cyan-400 to-transparent opacity-15 animate-wave-flow animation-delay-2000"></div>
        <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 via-indigo-400 to-transparent opacity-10 animate-wave-flow animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-4 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AeroQ
          </span>
        </div>

        {/* Desktop Menu */}
         {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="#features" className="text-gray-300 hover:text-white transition-colors px-3 py-2">
            Features
          </Link>
          <Link href="#solutions" className="text-gray-300 hover:text-white transition-colors px-3 py-2">
            Solutions
          </Link>
          <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors px-3 py-2">
            Pricing
          </Link>
          <Link href="#about" className="text-gray-300 hover:text-white transition-colors px-3 py-2">
            About
          </Link>

          {user ? (
            <UserMenu user={user} />
          ) : (
            <div className="flex items-center space-x-3">
              <Link href={ROUTES.LOGIN}>
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href={ROUTES.REGISTER}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-sm z-20">
          <div className="flex flex-col space-y-4 p-6">
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#solutions"
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {user ? (
              <>
                <Link href={ROUTES.DASHBOARD} onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white">
                    Dashboard
                  </Button>
                </Link>
                <Link href={ROUTES.PROFILE} onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                    Profile
                  </Button>
                </Link>
                <button
                  onClick={async () => {
                    setIsMenuOpen(false);
                    const supabase = createSupabaseBrowserClient();
                    await supabase.auth.signOut();
                  }}
                  className="w-full py-2 px-4 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link href={ROUTES.REGISTER} onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 lg:px-12 lg:py-32">
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Next-Gen Cargo Notes
              </span>
              <br />
              <span className="text-white">Booking Platform</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Revolutionizing global logistics with AI-powered cargo booking, real-time tracking,
              and intelligent route optimization for the modern aviation industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-4 text-lg">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">150+</div>
              <div className="text-gray-400">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10M+</div>
              <div className="text-gray-400">Cargo Shipments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge artificial intelligence with decades of aviation expertise
              to deliver unprecedented efficiency and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-500 ${
                  currentFeature === index
                    ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/25'
                    : 'border-gray-700 bg-gray-800/50 hover:border-purple-500/50'
                }`}
              >
                <div className={`mb-4 transition-colors duration-500 ${
                  currentFeature === index ? 'text-purple-400' : 'text-gray-400'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Content Section */}
      <section className="relative z-10 px-6 py-20 lg:px-12 bg-gradient-to-r from-slate-800/50 to-purple-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Enterprise-Grade Cargo Management
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Experience the future of cargo booking with our comprehensive suite of tools designed
                for enterprise-level operations.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Real-time Analytics Dashboard</h3>
                    <p className="text-gray-400">Monitor shipments, track performance metrics, and gain insights with our advanced analytics platform.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Automated Documentation</h3>
                    <p className="text-gray-400">Generate and manage all required cargo documentation automatically with AI assistance.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Multi-modal Transportation</h3>
                    <p className="text-gray-400">Seamlessly coordinate air, sea, and land transportation with integrated logistics planning.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Live Cargo Tracking</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-white font-medium">Cargo #AQ-2024-001</div>
                        <div className="text-sm text-gray-400">Shanghai → New York</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-medium">In Transit</div>
                      <div className="text-sm text-gray-400">ETA: 2h 15m</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-white font-medium">Cargo #AQ-2024-002</div>
                        <div className="text-sm text-gray-400">London → Tokyo</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-medium">Loading</div>
                      <div className="text-sm text-gray-400">ETA: 6h 30m</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-white font-medium">Cargo #AQ-2024-003</div>
                        <div className="text-sm text-gray-400">Dubai → Frankfurt</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-400 font-medium">Delivered</div>
                      <div className="text-sm text-gray-400">2h ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-300">
              Leveraging the latest advancements in AI, cloud computing, and aviation technology.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <Cpu className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">AI/ML Engine</h3>
              <p className="text-gray-400 text-sm">Advanced machine learning for route optimization</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <Database className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Cloud Native</h3>
              <p className="text-gray-400 text-sm">Scalable microservices architecture</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <Network className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">IoT Integration</h3>
              <p className="text-gray-400 text-sm">Real-time sensor data processing</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700">
              <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Blockchain</h3>
              <p className="text-gray-400 text-sm">Secure cargo verification system</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Cargo Operations?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of companies already using AeroQ to streamline their logistics and reduce costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link href={ROUTES.DASHBOARD}>
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link href={ROUTES.LOGIN}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
            <Button variant="outline" size="lg" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-4 text-lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 lg:px-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AeroQ
                </span>
              </div>
              <p className="text-gray-400">
                Revolutionizing global cargo logistics with AI-powered solutions.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AeroQ. All rights reserved. Built with Next.js and modern AI technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
