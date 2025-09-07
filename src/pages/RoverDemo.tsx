import { useState, useEffect, useRef, useMemo } from "react";
import { Shield, Play, Pause, MapPin, Download, ArrowLeft, AlertTriangle, Target } from "lucide-react";
import { MilitaryButton } from "@/components/MilitaryButton";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Detection {
  id: number;
  type: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  isDanger: boolean;
  image?: string;
}

interface RoverPosition {
  lat: number;
  lng: number;
}

interface PatrolRoute {
  waypoints: RoverPosition[];
  currentIndex: number;
}

export const RoverDemo = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [isPatrolling, setIsPatrolling] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [roverPosition, setRoverPosition] = useState<RoverPosition>({ lat: 28.6139, lng: 77.2090 });
  const [detections, setDetections] = useState<Detection[]>([]);
  const [pathPoints, setPathPoints] = useState<RoverPosition[]>([]);
  const [hoveredDetection, setHoveredDetection] = useState<Detection | null>(null);
  const [patrolRoute] = useState<PatrolRoute>({
    waypoints: [
      { lat: 28.6139, lng: 77.2090 }, // Start
      { lat: 28.6149, lng: 77.2100 }, // NE
      { lat: 28.6159, lng: 77.2110 }, // NE
      { lat: 28.6169, lng: 77.2120 }, // NE
      { lat: 28.6169, lng: 77.2140 }, // E
      { lat: 28.6169, lng: 77.2160 }, // E
      { lat: 28.6159, lng: 77.2170 }, // SE
      { lat: 28.6149, lng: 77.2180 }, // SE
      { lat: 28.6139, lng: 77.2190 }, // SE
      { lat: 28.6129, lng: 77.2180 }, // SW
      { lat: 28.6119, lng: 77.2170 }, // SW
      { lat: 28.6109, lng: 77.2160 }, // SW
      { lat: 28.6109, lng: 77.2140 }, // W
      { lat: 28.6109, lng: 77.2120 }, // W
      { lat: 28.6119, lng: 77.2110 }, // NW
      { lat: 28.6129, lng: 77.2100 }, // NW
      { lat: 28.6139, lng: 77.2090 }, // Back to start
    ],
    currentIndex: 0
  });
  const [routeProgress, setRouteProgress] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  
  const objectTypes = useMemo(
    () => [
      "auto", "bicycle", "bus", "car", "concrete_mixer", "tempo", "tractor", "truck_tanker", "two_wheelers", "vehicle_truck", "gun", "person"
    ],
    []
  );
  
  const loadingMessages = [
    "Initializing Secure Communication Channel...",
    "Connecting to NETRA Defense Network...",
    "Authenticating Military Protocols...",
    "Establishing Satellite Uplink...",
    "Rover Systems Online - Connection Established"
  ];
  
  useEffect(() => {
    if (isConnected && isPatrolling) {
      const interval = setInterval(() => {
        setRouteProgress(prev => {
          const newProgress = prev + 0.02; // Smooth progress along route
          const targetWaypointIndex = Math.floor(newProgress) % patrolRoute.waypoints.length;
          const nextWaypointIndex = (targetWaypointIndex + 1) % patrolRoute.waypoints.length;
          const segmentProgress = newProgress - Math.floor(newProgress);
          
          const currentWaypoint = patrolRoute.waypoints[targetWaypointIndex];
          const nextWaypoint = patrolRoute.waypoints[nextWaypointIndex];
          
          // Interpolate between waypoints for smooth movement
          const newPosition = {
            lat: currentWaypoint.lat + (nextWaypoint.lat - currentWaypoint.lat) * segmentProgress,
            lng: currentWaypoint.lng + (nextWaypoint.lng - currentWaypoint.lng) * segmentProgress
          };
          
          setRoverPosition(newPosition);
          
          // Add to path with more frequent updates for smooth trail
          setPathPoints(prev => {
            const newPath = [...prev, newPosition];
            // Keep path length reasonable but show full trail
            return newPath.length > 200 ? newPath.slice(-200) : newPath;
          });
          
          return newProgress;
        });
        
        // Random object detection along the route
        if (Math.random() < 0.25) {
          const detectedType = objectTypes[Math.floor(Math.random() * objectTypes.length)];
          const hasGun = Math.random() < 0.15;
          const hasPerson = Math.random() < 0.3;
          const isDanger = hasGun && hasPerson && (detectedType === 'gun' || detectedType === 'person');
          
          const newDetection: Detection = {
            id: Date.now(),
            type: detectedType,
            coordinates: {
              lat: roverPosition.lat + (Math.random() - 0.5) * 0.0015,
              lng: roverPosition.lng + (Math.random() - 0.5) * 0.0015
            },
            timestamp: new Date().toLocaleTimeString(),
            isDanger,
            image: `detection_${detectedType}.jpg`
          };
          
          setDetections(prev => [newDetection, ...prev.slice(0, 12)]);
        }
      }, 800); // Faster updates for smoother movement
      
      return () => clearInterval(interval);
    }
  }, [isConnected, isPatrolling, roverPosition, patrolRoute.waypoints, objectTypes]);
  
  const connectRover = () => {
    setLoadingStage(0);
    const interval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev >= loadingMessages.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsConnected(true), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };
  
  const startPatrol = () => {
    setIsPatrolling(true);
    setPathPoints([roverPosition]);
  };
  
  const pausePatrol = () => {
    setIsPatrolling(false);
  };
  
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
  {/* ...no background animation... */}
        <div className="text-center relative z-10">
          <div className="flex justify-center mb-8">
            <Shield className="w-24 h-24 text-primary" style={{filter:'drop-shadow(0 0 16px #39FF14)'}} />
          </div>
          <h1 className="text-4xl font-orbitron font-bold mb-6 military-heading tracking-widest text-white animate-fade-in">
            NETRA ROVER CONTROL SYSTEM
          </h1>
          <p className="text-lg military-subtext text-muted-foreground mb-12 animate-fade-in" style={{textShadow:'0 2px 12px #0008'}}>
            Initialize secure connection to border surveillance rover
          </p>
          {loadingStage === 0 ? (
            <MilitaryButton onClick={connectRover} size="lg" className="relative group">
              <span className="relative z-10">CONNECT ROVER</span>
              <span className="absolute inset-0 rounded-lg border-2 border-[#39FF14] opacity-0 group-hover:opacity-100 animate-btn-pulse" style={{boxShadow:'0 0 16px #39FF14'}}></span>
            </MilitaryButton>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-card neon-border rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
                <div className="text-primary font-mono text-lg mb-4 animate-pulse">
                  {loadingMessages[loadingStage]}
                </div>
                <div className="w-full bg-military-surface rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500 neon-glow"
                    style={{ width: `${((loadingStage + 1) / loadingMessages.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
  {/* ...no animation CSS... */}
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-military-dark border-b border-border p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <MilitaryButton 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </MilitaryButton>
            
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-primary animate-pulse-neon" />
              <div>
                <h1 className="text-xl font-orbitron font-bold military-heading">NETRA ROVER CONTROL</h1>
                <p className="text-sm text-primary">System Status: ONLINE</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm military-subtext">Current Position</p>
              <p className="text-xs text-primary font-mono">
                {roverPosition.lat.toFixed(6)}, {roverPosition.lng.toFixed(6)}
              </p>
            </div>
            
            {!isPatrolling ? (
              <MilitaryButton onClick={startPatrol} className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Start Patrol</span>
              </MilitaryButton>
            ) : (
              <MilitaryButton variant="secondary" onClick={pausePatrol} className="flex items-center space-x-2">
                <Pause className="w-4 h-4" />
                <span>Pause Patrol</span>
              </MilitaryButton>
            )}
            
            <MilitaryButton variant="ghost" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </MilitaryButton>
          </div>
        </div>
      </header>
      
      <div className="flex h-[calc(100vh-100px)]">
        {/* Military Map */}
        <div className="flex-1 relative">
          <div 
            ref={mapRef}
            className="w-full h-full bg-military-black military-grid relative overflow-hidden"
          >
            {/* Coordinate Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={`h-${i}`}
                  className="absolute w-full border-t border-neon-green opacity-20"
                  style={{ top: `${i * 5}%` }}
                />
              ))}
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={`v-${i}`}
                  className="absolute h-full border-l border-neon-green opacity-20"
                  style={{ left: `${i * 5}%` }}
                />
              ))}
            </div>
            
            {/* Starting Point */}
            <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-primary rounded-full neon-glow animate-pulse-neon" />
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-primary font-mono">START</span>
            </div>
            
            {/* Rover Position with animated radar radius */}
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000"
              style={{ 
                top: `${50 + (roverPosition.lat - 28.6139) * 10000}%`, 
                left: `${25 + (roverPosition.lng - 77.2090) * 10000}%` 
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* Animated radar radius */}
                <svg width="80" height="80" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                  <circle cx="40" cy="40" r="32" stroke="#39FF14" strokeWidth="3" fill="rgba(57,255,20,0.07)" style={{filter:'drop-shadow(0 0 12px #39FF14)'}}>
                  </circle>
                  <circle cx="40" cy="40" r="32" stroke="#39FF14" strokeWidth="3" fill="none" style={{animation:'dash 2s linear infinite', strokeDasharray:'10,10'}} />
                  <style>{`@keyframes dash {to {stroke-dashoffset: 40;}}`}</style>
                </svg>
                <div className="w-6 h-6 bg-primary rounded-full neon-glow animate-pulse border-2 border-primary relative z-10" />
                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75 z-0" />
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-primary font-mono whitespace-nowrap z-10">
                  ROVER
                </span>
              </div>
            </div>
            
            {/* Patrol Route Preview (faint) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d={`M ${patrolRoute.waypoints.map(p => `${25 + (p.lng - 77.2090) * 10000}% ${50 + (p.lat - 28.6139) * 10000}%`).join(' L ')}`}
                stroke="hsl(var(--neon-green))"
                strokeWidth="1"
                fill="none"
                strokeDasharray="10,10"
                className="opacity-30"
              />
            </svg>
            
            {/* Traveled Path (dotted crossed neon green) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {pathPoints.length > 1 && (
                <>
                  {/* Main dotted path */}
                  <path
                    d={`M ${pathPoints.map(p => `${25 + (p.lng - 77.2090) * 10000}% ${50 + (p.lat - 28.6139) * 10000}%`).join(' L ')}`}
                    stroke="#39FF14"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,8"
                    className="opacity-90"
                    style={{
                      filter: 'drop-shadow(0 0 6px #39FF14)'
                    }}
                  />
                  {/* Crossed X marks at each path point */}
                  {pathPoints.map((p, i) => (
                    <g key={i}>
                      <line
                        x1={`${25 + (p.lng - 77.2090) * 10000 - 0.5}%`} y1={`${50 + (p.lat - 28.6139) * 10000 - 0.5}%`}
                        x2={`${25 + (p.lng - 77.2090) * 10000 + 0.5}%`} y2={`${50 + (p.lat - 28.6139) * 10000 + 0.5}%`}
                        stroke="#39FF14"
                        strokeWidth="2"
                        strokeDasharray="2,2"
                      />
                      <line
                        x1={`${25 + (p.lng - 77.2090) * 10000 + 0.5}%`} y1={`${50 + (p.lat - 28.6139) * 10000 - 0.5}%`}
                        x2={`${25 + (p.lng - 77.2090) * 10000 - 0.5}%`} y2={`${50 + (p.lat - 28.6139) * 10000 + 0.5}%`}
                        stroke="#39FF14"
                        strokeWidth="2"
                        strokeDasharray="2,2"
                      />
                    </g>
                  ))}
                </>
              )}
            </svg>
            
            {/* Detection Points with Hover */}
            {detections.map((detection) => (
              <div
                key={detection.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                  detection.isDanger ? 'animate-danger-pulse' : ''
                } hover:scale-150 hover:z-50`}
                style={{ 
                  top: `${50 + (detection.coordinates.lat - 28.6139) * 10000}%`, 
                  left: `${25 + (detection.coordinates.lng - 77.2090) * 10000}%` 
                }}
                onMouseEnter={() => setHoveredDetection(detection)}
                onMouseLeave={() => setHoveredDetection(null)}
              >
                <div className={`w-4 h-4 rounded-full ${
                  detection.isDanger ? 'bg-danger-red shadow-[var(--shadow-danger)]' : 'bg-warning-amber'
                } animate-pulse border-2 border-background`} />
                {detection.isDanger && (
                  <AlertTriangle className="w-5 h-5 text-danger-red absolute -top-3 -right-3 animate-bounce" />
                )}
                
                {/* Hover Tooltip */}
                {hoveredDetection?.id === detection.id && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-card border neon-border rounded-lg p-4 min-w-[250px] z-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="font-semibold military-subtext text-primary uppercase">{detection.type}</span>
                      {detection.isDanger && (
                        <span className="text-xs bg-danger-red text-white px-2 py-1 rounded font-bold">THREAT</span>
                      )}
                    </div>
                    <div className="text-xs military-subtext text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Coordinates:</span>
                        <span className="font-mono text-primary">
                          {detection.coordinates.lat.toFixed(6)}, {detection.coordinates.lng.toFixed(6)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time:</span>
                        <span className="font-mono">{detection.timestamp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confidence:</span>
                        <span className="text-primary">99.{Math.floor(Math.random() * 9) + 1}%</span>
                      </div>
                    </div>
                    {detection.isDanger && (
                      <div className="mt-2 p-2 bg-danger-red/20 border border-danger-red rounded text-xs text-danger-red">
                        ⚠️ Armed individual detected - Alert command center
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {/* Radar Sweep Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="radar-sweep w-full h-full" />
            </div>
          </div>
        </div>
        
        {/* Detection Panel */}
        <div className="w-96 bg-military-dark border-l border-border p-6 overflow-y-auto">
          <div className="flex items-center space-x-2 mb-6">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-orbitron font-bold military-heading">Live Detections</h2>
          </div>
          
          <div className="space-y-4">
            {detections.length === 0 ? (
              <Card className="p-4 bg-card border-border">
                <p className="text-sm military-subtext text-muted-foreground text-center">
                  No detections yet. Start patrol to begin surveillance.
                </p>
              </Card>
            ) : (
              detections.map((detection) => (
                <Card 
                  key={detection.id} 
                  className={`p-4 bg-card border transition-all duration-300 ${
                    detection.isDanger 
                      ? 'border-danger-red shadow-[var(--shadow-danger)] animate-danger-pulse' 
                      : 'border-warning-amber'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      {detection.isDanger ? (
                        <AlertTriangle className="w-5 h-5 text-danger-red animate-bounce" />
                      ) : (
                        <Target className="w-5 h-5 text-warning-amber" />
                      )}
                      <span className={`font-semibold uppercase text-sm military-subtext ${
                        detection.isDanger ? 'text-danger-red' : 'text-warning-amber'
                      }`}>
                        {detection.type}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {detection.timestamp}
                    </span>
                  </div>
                  
                  {detection.isDanger && (
                    <div className="bg-danger-red/20 border border-danger-red rounded p-2 mb-3">
                      <p className="text-xs military-subtext text-danger-red font-semibold">
                        🚨 CRITICAL THREAT DETECTED
                      </p>
                      <p className="text-xs military-subtext text-danger-red">
                        Armed individual identified - Immediate response required
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono text-primary">
                      {detection.coordinates.lat.toFixed(6)}, {detection.coordinates.lng.toFixed(6)}
                    </span>
                  </div>
                  
                  <div className="bg-military-surface rounded p-2">
                    <div className="flex justify-center items-center h-16">
                      <div className="text-xs military-subtext text-muted-foreground">
                        Detection Image: {detection.image}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <MilitaryButton size="sm" variant="ghost" className="flex-1 text-xs">
                      View Details
                    </MilitaryButton>
                    {detection.isDanger && (
                      <MilitaryButton size="sm" variant="danger" className="text-xs">
                        Alert Command
                      </MilitaryButton>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
          
          {/* Statistics */}
          <Card className="mt-6 p-4 bg-card border-border">
            <h3 className="font-orbitron font-semibold mb-3 military-heading text-sm">Mission Statistics</h3>
            <div className="space-y-2 text-xs military-subtext">
              <div className="flex justify-between">
                <span>Total Detections:</span>
                <span className="text-primary">{detections.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Threat Level:</span>
                <span className={detections.some(d => d.isDanger) ? 'text-danger-red' : 'text-primary'}>
                  {detections.some(d => d.isDanger) ? 'HIGH' : 'NORMAL'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Patrol Duration:</span>
                <span className="text-primary">
                  {isPatrolling ? `${Math.floor((Date.now() % 360000) / 60000)}:${String(Math.floor((Date.now() % 60000) / 1000)).padStart(2, '0')}` : '00:00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Coverage Area:</span>
                <span className="text-primary">{pathPoints.length * 10}m²</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};