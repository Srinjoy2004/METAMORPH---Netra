import indianFlag from "@/assets/indian-flag.svg";
import srinjoyImg from "@/assets/Srinjoyjpeg.jpeg";
import rudraImg from "@/assets/rudra.jpeg";
import subhaImg from "@/assets/subha.jpeg";
import mushaImg from "@/assets/mushajpeg.jpeg";
import arpanImg from "@/assets/1703521749869.jpeg";
import { Shield, Eye, Zap, Target, Radar, Navigation, Brain, Clock } from "lucide-react";
import { MilitaryButton } from "./MilitaryButton";
import { RadarAnimation } from "./RadarAnimation";
import { DetectionShowcase } from "./DetectionShowcase";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";
import militaryHero from "@/assets/military-hero.jpg";
import indiaMap from "@/assets/india-map.jpg";
import indianFlagAnimated from "@/assets/indian-flag-animated.svg";
import indiaMapAnimated from "@/assets/india-map-animated.svg";
import roverPic from "@/assets/detection-vehicle.jpg";
import makeInIndia from "@/assets/make-in-india.jpg";
import borderPatrol from "@/assets/border-patrol.jpg";

export const HomePage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Target,
      title: "Object Detection",
      description: "AI-powered detection of persons, vehicles, weapons, and threats with 99.7% accuracy",
      items: ["Person Detection", "Vehicle Classification", "Weapon Identification", "Threat Assessment"]
    },
    {
      icon: Navigation,
      title: "Real-time Coordinates",
      description: "Precise GPS tracking with live coordinate streaming to command centers",
      items: ["GPS Precision", "Live Streaming", "Coordinate Mapping", "Path Tracking"]
    },
    {
      icon: Eye,
      title: "Night Vision & Thermal",
      description: "Advanced thermal imaging and night vision for 24/7 surveillance operations",
      items: ["Thermal Imaging", "Night Vision", "Weather Resistant", "Clear Vision"]
    },
    {
      icon: Radar,
      title: "LoRaWAN Communication",
      description: "Long-range, low-power communication for remote border areas",
      items: ["Long Range", "Low Power", "Secure Channel", "Real-time Data"]
    },
    {
      icon: Brain,
      title: "Predictive Intelligence",
      description: "AI-driven patrol planning and threat prediction algorithms",
      items: ["Pattern Analysis", "Predictive Routing", "Threat Prediction", "Smart Planning"]
    },
    {
      icon: Clock,
      title: "24/7 Autonomous",
      description: "Persistent surveillance with autonomous navigation and decision making",
      items: ["Continuous Operation", "Auto Navigation", "Self Charging", "Weather Proof"]
    }
  ];
  
  // ...existing code...

  const team = [
    { name: "Srinjoy Pramanik", role: "Backend Dev Pro", expertise: "Military Systems", img: srinjoyImg },
    { name: "Rudrashis Dutta", role: "AI & ML Expert", expertise: "Computer Vision", img: rudraImg },
    { name: "Subhabilash Das", role: "Hardware USP", expertise: "Border Security", img: subhaImg },
    { name: "Syed Md. Musharraf", role: "ML Researcher", expertise: "Autonomous Systems", img: mushaImg },
    { name: "Arpan Chowdhury", role: "Frontend Guy", expertise: "Autonomous Systems", img: arpanImg },
  ];

  const whyNetraReasons = [
    {
      icon: Shield,
      title: "Persistent Surveillance",
      description: "24/7 autonomous monitoring without human fatigue or rest requirements"
    },
    {
      icon: Zap,
      title: "Autonomous Navigation", 
      description: "AI-powered pathfinding and obstacle avoidance for complex terrain"
    },
    {
      icon: Target,
      title: "AI Threat Detection",
      description: "Advanced algorithms for real-time threat identification and classification"
    },
    {
      icon: Radar,
      title: "Indian Army Integration",
      description: "Seamless integration with existing BSF and Indian Army command systems"
    }
  ];


  return (
  <div className="min-h-screen bg-gradient-to-br from-[#FF9933]/20 via-[#FFFFFF]/20 to-[#138808]/30 relative">
      {/* Hero Section with Rover & Radar */}
  {/* Indian Flag in Hero */}
      {/* Animated Indian Flag in Hero */}
      <img src={indianFlagAnimated} alt="Indian Flag" className="absolute top-8 right-8 w-20 opacity-90 z-20 hidden md:block animate-pulse" style={{filter: 'drop-shadow(0 0 16px #FF9933)'}} />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Indian Map Motif */}
        {/* Animated Indian Map Motif */}
        <img src={indiaMapAnimated} alt="India Map" className="absolute top-8 left-8 w-40 opacity-40 z-10 hidden md:block animate-float" style={{filter: 'drop-shadow(0 0 32px #39FF14)'}} />
        {/* Rover Image Motif */}
        <img src={roverPic} alt="Rover" className="absolute bottom-8 right-8 w-32 opacity-40 z-10 hidden md:block" style={{filter: 'drop-shadow(0 0 16px #FF9933)'}} />
        {/* Rover as Radar Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${borderPatrol})` }}
        >
          <div className="absolute inset-0 bg-military-black/80" />
          {/* Radar grid overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{background: "radial-gradient(circle at center, rgba(0,255,0,0.08) 0%, transparent 70%), repeating-radial-gradient(circle at center, rgba(0,255,0,0.12) 2px, transparent 8px, transparent 20px)"}} />
        </div>

        {/* Left Military Image */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
          <img src={militaryHero} alt="Indian Military" className="w-64 h-96 object-cover rounded-xl shadow-xl border-4 border-primary" style={{filter: 'grayscale(0.3) brightness(0.7) sepia(1) hue-rotate(90deg) saturate(2)'}} />
          <div className="absolute inset-0 rounded-xl" style={{background: 'rgba(57,255,20,0.18)', mixBlendMode: 'screen'}} />
        </div>

        {/* Right Military Image */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
          <img src={makeInIndia} alt="Indian Military" className="w-64 h-96 object-cover rounded-xl shadow-xl border-4 border-primary" style={{filter: 'grayscale(0.3) brightness(0.7) sepia(1) hue-rotate(90deg) saturate(2)'}} />
          <div className="absolute inset-0 rounded-xl" style={{background: 'rgba(57,255,20,0.18)', mixBlendMode: 'screen'}} />
        </div>

        {/* Animated Radar Sweep */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="600" height="600" viewBox="0 0 600 600" className="absolute" style={{zIndex:2}}>
            <circle cx="300" cy="300" r="290" stroke="#39FF14" strokeWidth="2" fill="none" opacity="0.15" />
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="2s" repeatCount="indefinite" />
              <line x1="300" y1="300" x2="300" y2="20" stroke="#39FF14" strokeWidth="4" opacity="0.7" />
              <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#39FF14" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
              </radialGradient>
              <path d="M300,300 L300,20 A280,280 0 0,1 420,80 Z" fill="url(#radarSweep)" opacity="0.3" />
            </g>
          </svg>
        </div>

        {/* Hero Content */}
  <div className="relative z-20 text-center max-w-4xl mx-auto px-8 py-20 bg-black/30 rounded-2xl shadow-xl border-2 border-primary/30 backdrop-blur-md animate-fade-in-up flex flex-col items-center" style={{boxShadow: '0 0 16px #39FF14, 0 0 32px #000 inset'}}>
          {/* Tricolor Divider */}
          <div className="w-full h-2 mb-6 rounded-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808]" />
          <h1 className="text-7xl md:text-8xl font-orbitron font-extrabold mb-8 military-heading animate-fade-in-up tracking-tight" style={{textShadow: '0 0 8px #39FF1455'}}>
            <span className="block" style={{color: '#FF9933', textShadow: '0 0 32px #FF9933, 0 0 8px #39FF14, 0 0 2px #fff'}}>NETRA ROVER</span>
            <span className="block" style={{color: '#138808', textShadow: '0 0 16px #138808, 0 0 2px #fff'}}>BORDER GUARDIAN</span>
          </h1>
          <p className="text-2xl md:text-3xl military-subtext text-primary mb-6 animate-fade-in-up font-semibold" style={{animationDelay: '0.3s', textShadow: '0 0 4px #39FF1444'}}>
            Autonomous. Intelligent. Relentless.
          </p>
          <p className="text-lg military-subtext text-muted-foreground mb-10 animate-fade-in-up font-medium" style={{animationDelay: '0.6s'}}>
            Experience the future of border security with real-time AI detection, GPS tracking, and 24/7 autonomous patrol.<br className="hidden md:block" />
            <span className="text-primary">NETRA</span> redefines defense for the Indian Army & BSF.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            <MilitaryButton 
              onClick={() => navigate('/demo')}
              size="lg"
              className="text-xl px-16 shadow-lg neon-glow border-2 border-primary"
            >
              Activate Rover Demo
            </MilitaryButton>
          </div>
        </div>
      </section>

  {/* ...existing code... */}
      <section className="py-24 bg-gradient-to-r from-[#FF9933]/20 via-[#FFFFFF]/20 to-[#138808]/30 relative overflow-hidden">
        {/* Indian Flag in About Section */}
        <img src={indianFlag} alt="Indian Flag" className="absolute top-8 left-8 w-16 opacity-70 z-10 hidden md:block" style={{filter: 'drop-shadow(0 0 8px #138808)'}} />
        {/* Indian Map Motif */}
        <img src={indiaMap} alt="India Map" className="absolute top-8 right-8 w-32 opacity-20 z-0 hidden md:block" style={{filter: 'drop-shadow(0 0 24px #138808)'}} />
        {/* Rover Image Motif */}
        <img src={roverPic} alt="Rover" className="absolute bottom-8 left-8 w-24 opacity-30 z-0 hidden md:block" style={{filter: 'drop-shadow(0 0 16px #FF9933)'}} />
        {/* Radar Animation */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/4 z-0 opacity-40 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="190" stroke="#39FF14" strokeWidth="2" fill="none" opacity="0.12" />
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="2.5s" repeatCount="indefinite" />
              <line x1="200" y1="200" x2="200" y2="20" stroke="#39FF14" strokeWidth="3" opacity="0.5" />
              <radialGradient id="aboutRadarSweep" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#39FF14" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
              </radialGradient>
              <path d="M200,200 L200,20 A180,180 0 0,1 320,80 Z" fill="url(#aboutRadarSweep)" opacity="0.2" />
            </g>
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-orbitron font-bold mb-6 military-heading">
                Mission: Securing India's Borders
              </h2>
              <p className="text-lg military-subtext mb-6 text-muted-foreground">
                NETRA represents the pinnacle of indigenous defense technology, embodying the 
                spirit of <span className="text-primary font-semibold">Make in India</span> and 
                <span className="text-primary font-semibold"> Atmanirbhar Bharat</span>.
              </p>
              <p className="text-lg military-subtext mb-8 text-muted-foreground">
                Our advanced autonomous rover system provides continuous border surveillance, 
                reducing risks to personnel while enhancing security coverage across challenging terrains.
              </p>
              <div className="flex items-center space-x-4">
                <img src={makeInIndia} alt="Make in India" className="w-20 h-20 rounded-lg neon-border" />
                <div>
                  <p className="font-semibold text-primary">100% Indigenous</p>
                  <p className="text-sm text-muted-foreground">Designed & Built in India</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={borderPatrol} 
                alt="Border Patrol" 
                className="w-full h-96 object-cover rounded-lg neon-border"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Why NETRA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-4 military-heading">
              Why <span className="text-primary neon-glow">NETRA</span>?
            </h2>
            <p className="text-lg military-subtext text-muted-foreground max-w-3xl mx-auto">
              Revolutionary defense technology built specifically for Indian military requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyNetraReasons.map((reason, index) => (
              <Card key={index} className="p-6 bg-card neon-border hover:shadow-[var(--shadow-neon)] transition-all duration-500 group transform hover:scale-105 hover:-translate-y-2">
                <div className="text-center">
                  <div className="relative mb-4">
                    <reason.icon className="w-12 h-12 text-primary mx-auto group-hover:animate-pulse-neon transition-all duration-300" />
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="text-xl font-orbitron font-semibold mb-3 military-heading group-hover:text-primary transition-colors duration-300">{reason.title}</h3>
                  <p className="text-sm military-subtext text-muted-foreground group-hover:text-foreground transition-colors duration-300">{reason.description}</p>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-r from-[#FF9933]/20 via-[#FFFFFF]/20 to-[#138808]/30 relative overflow-hidden">
        {/* Indian Flag in Features Section */}
        <img src={indianFlag} alt="Indian Flag" className="absolute top-8 right-8 w-16 opacity-70 z-10 hidden md:block" style={{filter: 'drop-shadow(0 0 8px #FF9933)'}} />
          {/* Tricolor Divider */}
          <div className="w-full h-2 mb-8 rounded-full bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808]" />
        {/* Indian Map Motif */}
        <img src={indiaMap} alt="India Map" className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 opacity-20 z-0 hidden md:block" style={{filter: 'drop-shadow(0 0 24px #138808)'}} />
        {/* Rover Image Motif */}
        <img src={roverPic} alt="Rover" className="absolute bottom-8 right-1/2 transform translate-x-1/2 w-24 opacity-30 z-0 hidden md:block" style={{filter: 'drop-shadow(0 0 16px #FF9933)'}} />
        {/* Radar Animation */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/4 z-0 opacity-40 pointer-events-none">
          <svg width="400" height="400" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="190" stroke="#39FF14" strokeWidth="2" fill="none" opacity="0.12" />
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="2.5s" repeatCount="indefinite" />
              <line x1="200" y1="200" x2="200" y2="20" stroke="#39FF14" strokeWidth="3" opacity="0.5" />
              <radialGradient id="featuresRadarSweep" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#39FF14" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
              </radialGradient>
              <path d="M200,200 L200,20 A180,180 0 0,1 320,80 Z" fill="url(#featuresRadarSweep)" opacity="0.2" />
            </g>
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-4 military-heading">
              Advanced <span className="text-primary neon-glow">Capabilities</span>
            </h2>
            <p className="text-lg military-subtext text-muted-foreground">
              Military-grade features designed for the most demanding defense operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 bg-card neon-border hover:shadow-[var(--shadow-neon)] transition-all duration-500 group animate-fade-in-up transform hover:scale-105 hover:-translate-y-3" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative mb-6">
                  <feature.icon className="w-12 h-12 text-primary group-hover:animate-pulse-neon transition-all duration-300 group-hover:scale-110" />
                  <div className="absolute -inset-2 bg-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-xl font-orbitron font-semibold mb-4 military-heading group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm military-subtext text-muted-foreground mb-6 group-hover:text-foreground transition-colors duration-300">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="text-sm military-subtext flex items-center group-hover:text-foreground transition-colors duration-300">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse-neon group-hover:scale-150 transition-transform duration-300" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                {/* Interactive Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Preview */}
      <section id="demo" className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-orbitron font-bold mb-8 military-heading">
            Experience <span className="text-primary neon-glow">NETRA</span> in Action
          </h2>
          <p className="text-lg military-subtext text-muted-foreground mb-12 max-w-3xl mx-auto">
            Try our interactive rover simulation and experience real-time object detection, 
            coordinate tracking, and threat assessment capabilities.
          </p>
          
          <div className="bg-card neon-border rounded-lg p-12 max-w-4xl mx-auto relative overflow-hidden group hover:shadow-[var(--shadow-neon)] transition-all duration-500">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-ping" />
              <div className="absolute top-8 right-8 w-3 h-3 bg-primary rounded-full animate-pulse" style={{animationDelay: '1s'}} />
              <div className="absolute bottom-6 left-12 w-2 h-2 bg-primary rounded-full animate-ping" style={{animationDelay: '2s'}} />
              <div className="absolute bottom-12 right-6 w-1 h-1 bg-primary rounded-full animate-pulse" style={{animationDelay: '1.5s'}} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <RadarAnimation size={300} />
                  {/* Floating Detection Dots */}
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-warning-amber rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
                  <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-danger-red rounded-full animate-pulse" style={{animationDelay: '1.2s'}} />
                  <div className="absolute bottom-1/4 left-2/3 w-2 h-2 bg-primary rounded-full animate-ping" style={{animationDelay: '0.8s'}} />
                </div>
              </div>
              <h3 className="text-2xl font-orbitron font-semibold mb-4 military-heading group-hover:text-primary transition-colors duration-300">Live Rover Simulation</h3>
              <p className="military-subtext text-muted-foreground mb-8 group-hover:text-foreground transition-colors duration-300">
                Interactive border patrol with real-time detection and coordinate mapping
              </p>
              <MilitaryButton 
                onClick={() => navigate('/demo')}
                size="lg"
                className="text-lg px-16 group-hover:animate-pulse-neon"
              >
                Launch Rover Control
              </MilitaryButton>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Team Section */}

      <section id="team" className="py-24 relative overflow-hidden" style={{background: 'radial-gradient(ellipse at center, #138808 0%, #000 80%)'}}>
        {/* Radar animation background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="100%" height="100%" viewBox="0 0 1200 600" className="w-full h-full">
            <defs>
              <radialGradient id="radarGreen" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#39FF14" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.8" />
              </radialGradient>
            </defs>
            <circle cx="600" cy="300" r="280" fill="url(#radarGreen)" />
            <circle cx="600" cy="300" r="180" fill="none" stroke="#39FF14" strokeWidth="2" opacity="0.2" />
            <circle cx="600" cy="300" r="80" fill="none" stroke="#39FF14" strokeWidth="1" opacity="0.1" />
            <line x1="600" y1="300" x2="1100" y2="300" stroke="#39FF14" strokeWidth="2" opacity="0.15" />
            <line x1="600" y1="300" x2="600" y2="20" stroke="#39FF14" strokeWidth="2" opacity="0.15" />
          </svg>
        </div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-4 military-heading">
              Our <span className="text-primary neon-glow">Team</span>
            </h2>
            <p className="text-lg military-subtext text-muted-foreground px-4 py-2 rounded-lg" style={{background: 'rgba(0,0,0,0.7)', color: '#fff', display: 'inline-block', boxShadow: '0 2px 12px #0008'}}>
              Elite team of technology professionals
            </p>
          </div>
          {/* Team grid: 2 rows, 2 cards in first, 3 in second */}
          <div className="flex flex-col gap-12 relative z-10">
            {/* First row: 2 members */}
            <div className="flex flex-col md:flex-row gap-12 justify-center">
              {team.slice(0,2).map((member, index) => (
                <Card key={index} className="flex-1 min-w-[260px] max-w-[340px] p-8 text-center group hover:shadow-[var(--shadow-neon)] transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative flex flex-col items-center"
                  style={{
                    background: 'rgba(0,0,0,0.85)',
                    border: '4px solid',
                    borderImage: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%) 1',
                    boxShadow: '0 0 24px #39FF14, 0 0 48px #138808',
                  }}>
                  {/* Team Member Avatar */}
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full mx-auto border-4 border-[#39FF14] shadow-lg" style={{boxShadow: '0 0 24px #39FF14, 0 0 48px #138808'}}>
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="absolute inset-0 w-24 h-24 mx-auto border-2 border-[#39FF14]/60 rounded-full animate-spin opacity-60 pointer-events-none" style={{animationDuration: '3s'}} />
                  </div>
                  <h3 className="text-lg font-orbitron font-semibold mb-2 military-heading group-hover:text-primary transition-colors duration-300 text-white drop-shadow-lg">{member.name}</h3>
                  <p className="text-sm military-subtext text-[#FF9933] mb-1 group-hover:neon-glow transition-all duration-300 font-bold drop-shadow-lg">{member.role}</p>
                  <p className="text-xs military-subtext text-[#FFFFFF] group-hover:text-[#138808] transition-colors duration-300 drop-shadow-lg">{member.expertise}</p>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#39FF14]/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Card>
              ))}
            </div>
            {/* Second row: 3 members */}
            <div className="flex flex-col md:flex-row gap-12 justify-center mt-12">
              {team.slice(2,5).map((member, index) => (
                <Card key={index+2} className="flex-1 min-w-[260px] max-w-[340px] p-8 text-center group hover:shadow-[var(--shadow-neon)] transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative flex flex-col items-center"
                  style={{
                    background: 'rgba(0,0,0,0.85)',
                    border: '4px solid',
                    borderImage: 'linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%) 1',
                    boxShadow: '0 0 24px #39FF14, 0 0 48px #138808',
                  }}>
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full mx-auto border-4 border-[#39FF14] shadow-lg" style={{boxShadow: '0 0 24px #39FF14, 0 0 48px #138808'}}>
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="absolute inset-0 w-24 h-24 mx-auto border-2 border-[#39FF14]/60 rounded-full animate-spin opacity-60 pointer-events-none" style={{animationDuration: '3s'}} />
                  </div>
                  <h3 className="text-lg font-orbitron font-semibold mb-2 military-heading group-hover:text-primary transition-colors duration-300 text-white drop-shadow-lg">{member.name}</h3>
                  <p className="text-sm military-subtext text-[#FF9933] mb-1 group-hover:neon-glow transition-all duration-300 font-bold drop-shadow-lg">{member.role}</p>
                  <p className="text-xs military-subtext text-[#FFFFFF] group-hover:text-[#138808] transition-colors duration-300 drop-shadow-lg">{member.expertise}</p>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#39FF14]/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Detection Examples */}
      <DetectionShowcase />

      {/* Military Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-orbitron font-bold mb-4 military-heading">
              Military <span className="text-primary neon-glow">Testimonials</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 bg-card neon-border group hover:shadow-[var(--shadow-neon)] transition-all duration-500 transform hover:scale-105">
              <div className="relative">
                <p className="text-lg military-subtext mb-6 italic text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  "NETRA has revolutionized our border surveillance operations. The autonomous capabilities 
                  and real-time threat detection have significantly enhanced our security posture."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center neon-border mr-4 group-hover:animate-pulse-neon">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold military-subtext group-hover:text-primary transition-colors duration-300">Brig. General Singh</p>
                    <p className="text-sm text-muted-foreground">Border Security Force</p>
                  </div>
                </div>
                
                {/* Quote decoration */}
                <div className="absolute -top-2 -left-2 text-4xl text-primary/30 font-serif">"</div>
                <div className="absolute -bottom-6 -right-2 text-4xl text-primary/30 font-serif">"</div>
              </div>
            </Card>
            
            <Card className="p-8 bg-card neon-border group hover:shadow-[var(--shadow-neon)] transition-all duration-500 transform hover:scale-105">
              <div className="relative">
                <p className="text-lg military-subtext mb-6 italic text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  "The predictive intelligence and autonomous navigation capabilities have reduced 
                  personnel risk while increasing our operational effectiveness by 300%."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center neon-border mr-4 group-hover:animate-pulse-neon">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold military-subtext group-hover:text-primary transition-colors duration-300">Col. Priya Nair</p>
                    <p className="text-sm text-muted-foreground">Indian Army Intelligence</p>
                  </div>
                </div>
                
                {/* Quote decoration */}
                <div className="absolute -top-2 -left-2 text-4xl text-primary/30 font-serif">"</div>
                <div className="absolute -bottom-6 -right-2 text-4xl text-primary/30 font-serif">"</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-r from-[#FF9933]/30 via-[#FFFFFF]/20 to-[#138808]/40 border-t border-border relative">
        {/* Indian Flag in Footer */}
        <img src={indianFlag} alt="Indian Flag" className="absolute top-4 left-4 w-14 opacity-80 z-10 hidden md:block" style={{filter: 'drop-shadow(0 0 8px #FF9933)'}} />
        {/* Indian Map in Footer */}
        <img src={indiaMap} alt="India Map" className="absolute bottom-4 right-4 w-20 opacity-20 z-0 hidden md:block" style={{filter: 'drop-shadow(0 0 24px #138808)'}} />
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-8 h-8 text-primary neon-glow" />
                <span className="text-2xl font-orbitron font-bold text-primary neon-glow">NETRA</span>
              </div>
              <p className="military-subtext text-muted-foreground">
                Advanced autonomous defense systems for Indian military forces.
              </p>
            </div>
            
            <div>
              <h4 className="font-orbitron font-semibold mb-4 military-heading">Quick Links</h4>
              <ul className="space-y-2 military-subtext text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#demo" className="hover:text-primary transition-colors">Demo</a></li>
                <li><a href="#team" className="hover:text-primary transition-colors">Team</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-orbitron font-semibold mb-4 military-heading">Contact</h4>
              <ul className="space-y-2 military-subtext text-muted-foreground">
                <li>defense@netra.mail.com</li>
                <li>+91 8777240684</li>
                <li>New Delhi, Headquarter India</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-orbitron font-semibold mb-4 military-heading">Partners</h4>
              <div className="flex items-center space-x-4">
                <img src={makeInIndia} alt="Make in India" className="w-16 h-16 rounded neon-border" />
                <div>
                  <p className="text-sm font-semibold text-primary">Make in India</p>
                  <p className="text-xs text-muted-foreground">Atmanirbhar Bharat</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="military-subtext text-muted-foreground">
              © 2025 THE_DEBUGGERS. All rights reserved. Made in India 🇮🇳
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};