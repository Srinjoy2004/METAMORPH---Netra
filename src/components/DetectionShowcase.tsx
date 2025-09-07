import { useState } from "react";
import { Target, AlertTriangle, Eye, Shield } from "lucide-react";
import { Card } from "./ui/card";
import detectionPerson from "@/assets/detection-person.jpg";
import detectionVehicle from "@/assets/detection-vehicle.jpg";
import detectionWeapon from "@/assets/detection-weapon.jpg";

interface DetectionExample {
  id: number;
  type: string;
  image: string;
  confidence: number;
  threat: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  coordinates: string;
  timestamp: string;
}

const detectionExamples: DetectionExample[] = [
  {
    id: 1,
    type: "Person",
    image: detectionPerson,
    confidence: 99.7,
    threat: 'medium',
    description: "Individual detected crossing border perimeter at night",
    coordinates: "28.6139°N, 77.2090°E",
    timestamp: "23:47:15"
  },
  {
    id: 2,
    type: "Vehicle - Truck",
    image: detectionVehicle,
    confidence: 98.3,
    threat: 'high',
    description: "Unauthorized vehicle movement in restricted zone",
    coordinates: "28.6145°N, 77.2095°E", 
    timestamp: "02:15:32"
  },
  {
    id: 3,
    type: "Weapon - Gun",
    image: detectionWeapon,
    confidence: 99.9,
    threat: 'critical',
    description: "Armed threat identified - immediate response required",
    coordinates: "28.6142°N, 77.2088°E",
    timestamp: "01:23:44"
  }
];

export const DetectionShowcase = () => {
  const [hoveredDetection, setHoveredDetection] = useState<number | null>(null);

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'low': return 'text-primary';
      case 'medium': return 'text-warning-amber';
      case 'high': return 'text-orange-500';
      case 'critical': return 'text-danger-red';
      default: return 'text-primary';
    }
  };

  const getThreatBorder = (threat: string) => {
    switch (threat) {
      case 'low': return 'border-primary';
      case 'medium': return 'border-warning-amber';
      case 'high': return 'border-orange-500';
      case 'critical': return 'border-danger-red danger-alert';
      default: return 'border-primary';
    }
  };

  return (
    <section className="py-24 bg-military-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-orbitron font-bold mb-4 military-heading">
            Real-World <span className="text-primary neon-glow">Detection Examples</span>
          </h2>
          <p className="text-lg military-subtext text-muted-foreground">
            Live surveillance footage from NETRA deployment operations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {detectionExamples.map((detection) => (
            <Card 
              key={detection.id}
              className={`group cursor-pointer transition-all duration-500 bg-card overflow-hidden ${getThreatBorder(detection.threat)} hover:shadow-[var(--shadow-neon)] transform hover:scale-105`}
              onMouseEnter={() => setHoveredDetection(detection.id)}
              onMouseLeave={() => setHoveredDetection(null)}
            >
              <div className="relative">
                <img 
                  src={detection.image} 
                  alt={`${detection.type} Detection`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                
                {/* Detection Overlay */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  {detection.threat === 'critical' ? (
                    <AlertTriangle className="w-5 h-5 text-danger-red animate-bounce" />
                  ) : (
                    <Target className="w-5 h-5 text-primary animate-pulse" />
                  )}
                  <span className={`text-sm font-semibold military-subtext ${getThreatColor(detection.threat)}`}>
                    {detection.confidence}% MATCH
                  </span>
                </div>

                {/* Threat Level */}
                <div className="absolute top-3 right-3">
                  <span className={`text-xs px-2 py-1 rounded font-bold military-subtext uppercase ${
                    detection.threat === 'critical' ? 'bg-danger-red text-white' :
                    detection.threat === 'high' ? 'bg-orange-500 text-white' :
                    detection.threat === 'medium' ? 'bg-warning-amber text-black' :
                    'bg-primary text-black'
                  }`}>
                    {detection.threat}
                  </span>
                </div>

                {/* Scanning Effect */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  hoveredDetection === detection.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="radar-sweep w-full h-full" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-orbitron font-semibold military-heading">{detection.type}</h3>
                </div>

                <p className="text-sm military-subtext text-muted-foreground mb-4">
                  {detection.description}
                </p>

                <div className="space-y-2 text-xs military-subtext">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coordinates:</span>
                    <span className="font-mono text-primary">{detection.coordinates}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span className="font-mono">{detection.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Threat Level:</span>
                    <span className={`font-semibold uppercase ${getThreatColor(detection.threat)}`}>
                      {detection.threat}
                    </span>
                  </div>
                </div>

                {detection.threat === 'critical' && (
                  <div className="mt-4 p-2 bg-danger-red/20 border border-danger-red rounded">
                    <p className="text-xs text-danger-red military-subtext font-semibold">
                      🚨 IMMEDIATE ACTION REQUIRED
                    </p>
                  </div>
                )}
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                hoveredDetection === detection.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute inset-0 bg-primary/5 rounded-lg" />
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics Bar */}
        <div className="mt-16 grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: "Detection Accuracy", value: "99.7%", icon: Target },
            { label: "Response Time", value: "< 2 sec", icon: Eye },
            { label: "Coverage Range", value: "50 km²", icon: Shield },
            { label: "Threat Prevention", value: "100%", icon: AlertTriangle }
          ].map((stat, index) => (
            <Card key={index} className="p-4 bg-card text-center group hover:shadow-[var(--shadow-neon)] transition-all duration-300">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-2 group-hover:animate-pulse-neon" />
              <div className="text-2xl font-orbitron font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm military-subtext text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};