import cv2
import torch
import numpy as np
import threading
import time
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from PIL import Image, ImageTk
import requests
import socket
from ultralytics import YOLO
import json
import os

# --- YOLO internals for PyTorch compatibility ---
import ultralytics.nn.tasks as tasks
import ultralytics.nn.modules.conv as conv
import ultralytics.nn.modules.block as block

# Allowlist YOLO + Torch classes (fix for PyTorch >= 2.6)
torch.serialization.add_safe_globals([
    tasks.DetectionModel,
    conv.Conv,
    block.C2f,
    block.Bottleneck,
    block.SPPF,
    torch.nn.Module,
    torch.nn.Sequential,
    torch.nn.Conv2d,
    torch.nn.BatchNorm2d,
    torch.nn.ReLU,
    torch.nn.SiLU,
    torch.nn.Upsample,
    torch.nn.MaxPool2d,
    torch.nn.modules.container.ModuleList,
])

class PhoneCameraDetector:
    def __init__(self):
        self.model = None
        self.cap = None
        self.is_streaming = False
        self.current_frame = None
        self.detection_enabled = True
        self.fps_counter = 0
        self.fps_start_time = time.time()
        self.current_fps = 0
        
        # Hardcoded model path - UPDATE THIS PATH TO YOUR YOLO MODEL
        self.model_path = "yolov8n.pt"  # Change this to your weapon detection model path
        
        # Connection settings - Default to webcam
        self.connection_type = "webcam"
        self.phone_ip = "192.0.0.4"
        self.phone_port = "8080"
        self.usb_device_id = 0
        
        # Detection settings
        self.confidence_threshold = 0.5
        
        # ONLY DETECT THESE SPECIFIC CLASSES
        self.target_classes = ['gun', 'knife', 'person', 'truck', 'vehicle']
        
        self.setup_gui()
        self.auto_load_model()  # Automatically load model on startup
        
    def auto_load_model(self):
        """Automatically load YOLO model on startup"""
        try:
            if os.path.exists(self.model_path):
                self.model = YOLO(self.model_path)
                self.model_status.config(text="Model loaded", fg='green')
                self.update_status(f"Model loaded: {os.path.basename(self.model_path)}")
                
                # Get class names and filter target classes
                if hasattr(self.model, 'names'):
                    all_classes = list(self.model.names.values())
                    available_targets = [cls for cls in self.target_classes if cls in all_classes]
                    self.update_status(f"Target classes available: {', '.join(available_targets)}")
                    
                # Auto-connect to webcam
                self.root.after(1000, self.auto_connect_webcam)  # Connect after 1 second
                    
            else:
                # Try to download YOLOv8n if model file doesn't exist
                self.update_status("Downloading YOLOv8n model...")
                self.model = YOLO('yolov8n.pt')  # This will download the model
                self.model_status.config(text="Model loaded", fg='green')
                self.update_status("YOLOv8n model downloaded and loaded")
                
                # Auto-connect to webcam
                self.root.after(1000, self.auto_connect_webcam)
                
        except Exception as e:
            self.model_status.config(text="Load failed", fg='red')
            self.update_status(f"Model load failed: {str(e)}")
    
    def auto_connect_webcam(self):
        """Automatically connect to webcam"""
        try:
            # Set connection type to webcam
            self.conn_var.set("webcam")
            # Connect to webcam
            self.connect_camera()
        except Exception as e:
            self.update_status(f"Auto-connect failed: {str(e)}")
        
    def setup_gui(self):
        """Initialize the GUI interface"""
        self.root = tk.Tk()
        self.root.title("Weapon & Person Detection - YOLO")
        self.root.geometry("1200x800")
        self.root.configure(bg='#2b2b2b')
        
        # Create main frames
        self.create_control_panel()
        self.create_video_display()
        self.create_status_panel()
        
    def create_control_panel(self):
        """Create the control panel with connection and detection settings"""
        control_frame = tk.Frame(self.root, bg='#2b2b2b', relief=tk.RAISED, bd=2)
        control_frame.pack(side=tk.TOP, fill=tk.X, padx=5, pady=5)
        
        # Model loading section
        model_frame = tk.LabelFrame(control_frame, text="Model Settings", bg='#2b2b2b', fg='white')
        model_frame.pack(side=tk.LEFT, padx=10, pady=5, fill=tk.Y)
        
        tk.Button(model_frame, text="Load YOLO Model", command=self.load_model,
                 bg='#4CAF50', fg='white', width=15).pack(pady=2)
        
        self.model_status = tk.Label(model_frame, text="Loading model...", 
                                   bg='#2b2b2b', fg='yellow', width=20)
        self.model_status.pack(pady=2)
        
        # Model path display
        model_path_label = tk.Label(model_frame, text=f"Path: {self.model_path}", 
                                   bg='#2b2b2b', fg='gray', width=20, wraplength=150)
        model_path_label.pack(pady=2)
        
        # Target classes display
        target_classes_label = tk.Label(model_frame, text=f"Target: {', '.join(self.target_classes)}", 
                                       bg='#2b2b2b', fg='cyan', width=20, wraplength=150, 
                                       font=('Arial', 8, 'bold'))
        target_classes_label.pack(pady=2)
        
        # Connection settings section
        conn_frame = tk.LabelFrame(control_frame, text="Connection Settings", bg='#2b2b2b', fg='white')
        conn_frame.pack(side=tk.LEFT, padx=10, pady=5, fill=tk.Y)
        
        # Connection type selection
        tk.Label(conn_frame, text="Connection Type:", bg='#2b2b2b', fg='white').pack()
        self.conn_var = tk.StringVar(value="webcam")  # Default to webcam
        
        conn_options = [
            ("Webcam (Default)", "webcam"),
            ("IP Webcam App", "ip_webcam"),
            ("DroidCam", "droidcam"), 
            ("USB Connection", "usb"),
            ("Custom RTSP", "rtsp")
        ]
        
        for text, value in conn_options:
            tk.Radiobutton(conn_frame, text=text, variable=self.conn_var, value=value,
                          bg='#2b2b2b', fg='white', selectcolor='#4CAF50').pack(anchor=tk.W)
        
        # IP and Port settings
        tk.Label(conn_frame, text="Phone IP:", bg='#2b2b2b', fg='white').pack()
        self.ip_entry = tk.Entry(conn_frame, width=15)
        self.ip_entry.insert(0, self.phone_ip)
        self.ip_entry.pack(pady=2)
        
        tk.Label(conn_frame, text="Port:", bg='#2b2b2b', fg='white').pack()
        self.port_entry = tk.Entry(conn_frame, width=15)
        self.port_entry.insert(0, self.phone_port)
        self.port_entry.pack(pady=2)
        
        # Detection settings section
        detect_frame = tk.LabelFrame(control_frame, text="Detection Settings", bg='#2b2b2b', fg='white')
        detect_frame.pack(side=tk.LEFT, padx=10, pady=5, fill=tk.Y)
        
        tk.Label(detect_frame, text="Confidence:", bg='#2b2b2b', fg='white').pack()
        self.conf_var = tk.DoubleVar(value=0.5)
        conf_scale = tk.Scale(detect_frame, from_=0.1, to=1.0, resolution=0.1,
                             variable=self.conf_var, orient=tk.HORIZONTAL,
                             bg='#2b2b2b', fg='white', highlightbackground='#2b2b2b')
        conf_scale.pack()
        
        self.detect_toggle = tk.BooleanVar(value=True)
        tk.Checkbutton(detect_frame, text="Enable Detection", variable=self.detect_toggle,
                      bg='#2b2b2b', fg='white', selectcolor='#4CAF50').pack()
        
        # Class filtering display
        tk.Label(detect_frame, text="Detecting Only:", bg='#2b2b2b', fg='yellow', 
                font=('Arial', 8, 'bold')).pack()
        for cls in self.target_classes:
            tk.Label(detect_frame, text=f"• {cls}", bg='#2b2b2b', fg='lime', 
                    font=('Arial', 7)).pack()
        
        # Control buttons section
        button_frame = tk.LabelFrame(control_frame, text="Controls", bg='#2b2b2b', fg='white')
        button_frame.pack(side=tk.LEFT, padx=10, pady=5, fill=tk.Y)
        
        self.connect_btn = tk.Button(button_frame, text="Connect", command=self.connect_camera,
                                   bg='#2196F3', fg='white', width=12)
        self.connect_btn.pack(pady=2)
        
        self.disconnect_btn = tk.Button(button_frame, text="Disconnect", command=self.disconnect_camera,
                                      bg='#f44336', fg='white', width=12, state=tk.DISABLED)
        self.disconnect_btn.pack(pady=2)
        
        tk.Button(button_frame, text="Test Connection", command=self.test_connection,
                 bg='#FF9800', fg='white', width=12).pack(pady=2)
        
    def create_video_display(self):
        """Create the video display area"""
        video_frame = tk.Frame(self.root, bg='#2b2b2b', relief=tk.SUNKEN, bd=2)
        video_frame.pack(side=tk.TOP, fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        self.video_label = tk.Label(video_frame, bg='black', text="Starting webcam...",
                                  fg='white', font=('Arial', 20))
        self.video_label.pack(expand=True)
        
    def create_status_panel(self):
        """Create the status panel"""
        status_frame = tk.Frame(self.root, bg='#2b2b2b', relief=tk.RAISED, bd=2)
        status_frame.pack(side=tk.BOTTOM, fill=tk.X, padx=5, pady=5)
        
        self.status_label = tk.Label(status_frame, text="Initializing...", bg='#2b2b2b', fg='white')
        self.status_label.pack(side=tk.LEFT, padx=10)
        
        self.fps_label = tk.Label(status_frame, text="FPS: 0", bg='#2b2b2b', fg='white')
        self.fps_label.pack(side=tk.RIGHT, padx=10)
        
    def load_model(self):
        """Load YOLO model"""
        try:
            file_path = filedialog.askopenfilename(
                title="Select YOLO Model",
                filetypes=[("PyTorch files", "*.pt"), ("All files", "*.*")]
            )
            
            if file_path:
                self.model = YOLO(file_path)
                self.model_path = file_path  # Update model path
                self.model_status.config(text="Model loaded", fg='green')
                self.update_status(f"Model loaded: {os.path.basename(file_path)}")
                
                # Get class names and check target classes
                if hasattr(self.model, 'names'):
                    all_classes = list(self.model.names.values())
                    available_targets = [cls for cls in self.target_classes if cls in all_classes]
                    self.update_status(f"Target classes available: {', '.join(available_targets)}")
                    
        except Exception as e:
            messagebox.showerror("Error", f"Failed to load model: {str(e)}")
            self.model_status.config(text="Load failed", fg='red')
    
    def get_stream_url(self):
        """Get the appropriate stream URL based on connection type"""
        conn_type = self.conn_var.get()
        ip = self.ip_entry.get()
        port = self.port_entry.get()
        
        urls = {
            "ip_webcam": f"http://{ip}:{port}/video",
            "droidcam": f"http://{ip}:{port}/mjpegfeed?640x480",
            "rtsp": f"rtsp://{ip}:{port}/live"
        }
        
        if conn_type in ["usb", "webcam"]:
            return 0  # Return device ID 0 for default webcam
        
        return urls.get(conn_type, f"http://{ip}:{port}/video")
    
    def test_connection(self):
        """Test connection to camera"""
        conn_type = self.conn_var.get()
        
        if conn_type in ["usb", "webcam"]:
            # Test webcam
            test_cap = cv2.VideoCapture(0)
            if test_cap.isOpened():
                ret, _ = test_cap.read()
                test_cap.release()
                if ret:
                    messagebox.showinfo("Success", "Webcam connection successful!")
                else:
                    messagebox.showerror("Error", "Webcam found but no video signal")
            else:
                messagebox.showerror("Error", "No webcam detected")
        else:
            # Test network connection
            try:
                ip = self.ip_entry.get()
                port = int(self.port_entry.get())
                
                # Test basic connectivity
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sock.settimeout(5)
                result = sock.connect_ex((ip, port))
                sock.close()
                
                if result == 0:
                    messagebox.showinfo("Success", f"Connection to {ip}:{port} successful!")
                else:
                    messagebox.showerror("Error", f"Cannot connect to {ip}:{port}")
                    
            except Exception as e:
                messagebox.showerror("Error", f"Connection test failed: {str(e)}")
    
    def connect_camera(self):
        """Connect to camera and start streaming"""
        if not self.model:
            messagebox.showerror("Error", "Please wait for model to load first!")
            return
            
        try:
            stream_source = self.get_stream_url()
            self.cap = cv2.VideoCapture(stream_source)
            
            # Set camera properties for better performance
            if isinstance(stream_source, int):  # Webcam
                self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
                self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
                self.cap.set(cv2.CAP_PROP_FPS, 30)
            
            if not self.cap.isOpened():
                raise Exception("Failed to connect to camera stream")
                
            self.is_streaming = True
            self.connect_btn.config(state=tk.DISABLED)
            self.disconnect_btn.config(state=tk.NORMAL)
            
            # Start streaming thread
            self.stream_thread = threading.Thread(target=self.stream_loop, daemon=True)
            self.stream_thread.start()
            
            conn_type = self.conn_var.get()
            if conn_type == "webcam":
                self.update_status("Connected to webcam - Detecting target classes only")
            else:
                self.update_status(f"Connected to {conn_type} - Detecting target classes only")
            
        except Exception as e:
            messagebox.showerror("Error", f"Failed to connect: {str(e)}")
    
    def disconnect_camera(self):
        """Disconnect from camera"""
        self.is_streaming = False
        
        if self.cap:
            self.cap.release()
            self.cap = None
            
        self.connect_btn.config(state=tk.NORMAL)
        self.disconnect_btn.config(state=tk.DISABLED)
        
        self.video_label.config(image='', text="No video stream")
        self.update_status("Disconnected")
    
    def is_target_class(self, class_name):
        """Check if detected class is one of our target classes"""
        class_lower = class_name.lower()
        
        # Check for exact matches and common variations
        target_mappings = {
            'gun': ['gun', 'pistol', 'rifle', 'firearm', 'weapon'],
            'knife': ['knife', 'blade', 'sword'],
            'person': ['person', 'people', 'human'],
            'truck': ['truck', 'lorry'],
            'vehicle': ['vehicle', 'car', 'automobile', 'van', 'bus']
        }
        
        for target_class, variations in target_mappings.items():
            if class_lower in variations:
                return True, target_class
                
        return False, None
    
    def stream_loop(self):
        """Main streaming and detection loop"""
        while self.is_streaming and self.cap and self.cap.isOpened():
            ret, frame = self.cap.read()
            
            if not ret:
                print("Failed to read frame")
                time.sleep(0.1)
                continue
                
            # Update FPS counter
            self.fps_counter += 1
            if time.time() - self.fps_start_time >= 1.0:
                self.current_fps = self.fps_counter
                self.fps_counter = 0
                self.fps_start_time = time.time()
                self.root.after(0, lambda: self.fps_label.config(text=f"FPS: {self.current_fps}"))
            
            # Run YOLO detection if enabled
            if self.detect_toggle.get() and self.model:
                frame = self.run_detection(frame)
            
            # Convert frame for display
            self.current_frame = frame
            self.display_frame(frame)
            
            # Control frame rate
            time.sleep(0.033)  # ~30 FPS
    
    def run_detection(self, frame):
        """Run YOLO detection on frame - ONLY FOR TARGET CLASSES"""
        try:
            # Run inference
            results = self.model(frame, conf=self.conf_var.get())
            
            # Draw detections - ONLY FOR TARGET CLASSES
            for r in results:
                if r.boxes is not None:
                    for box in r.boxes:
                        # Get coordinates
                        x1, y1, x2, y2 = map(int, box.xyxy[0])
                        conf = float(box.conf[0])
                        cls = int(box.cls[0])
                        
                        # Get class name
                        class_name = self.model.names[cls] if hasattr(self.model, 'names') else f"Class {cls}"
                        
                        # CHECK IF THIS IS A TARGET CLASS
                        is_target, target_class = self.is_target_class(class_name)
                        
                        if not is_target:
                            continue  # Skip non-target classes
                        
                        # Use the target class name for display
                        display_name = target_class if target_class else class_name
                        
                        # Choose color based on target class
                        colors = {
                            'gun': (0, 0, 255),         # RED - High alert
                            'knife': (0, 0, 255),       # RED - High alert  
                            'person': (0, 255, 0),      # GREEN
                            'truck': (255, 0, 0),       # BLUE
                            'vehicle': (255, 0, 0),     # BLUE
                        }
                        
                        color = colors.get(display_name, (255, 255, 0))  # Default cyan
                        
                        # Make weapons more prominent
                        thickness = 3 if display_name in ['gun', 'knife'] else 2
                        
                        # Draw bounding box
                        cv2.rectangle(frame, (x1, y1), (x2, y2), color, thickness)
                        
                        # Draw label with background
                        label = f"{display_name.upper()} {conf:.2f}"
                        label_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 2)[0]
                        
                        # Larger background for weapons
                        bg_padding = 12 if display_name in ['gun', 'knife'] else 10
                        
                        cv2.rectangle(frame, (x1, y1 - label_size[1] - bg_padding), 
                                    (x1 + label_size[0] + 10, y1), color, -1)
                        cv2.putText(frame, label, (x1 + 5, y1 - 5), 
                                  cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
                        
                        # Add warning text for weapons
                        if display_name in ['gun', 'knife']:
                            warning_text = "⚠ WEAPON DETECTED ⚠"
                            cv2.putText(frame, warning_text, (10, 30), 
                                      cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
            
        except Exception as e:
            print(f"Detection error: {e}")
            
        return frame
    
    def display_frame(self, frame):
        """Display frame in GUI"""
        try:
            # Resize frame to fit display
            display_height = 600
            h, w = frame.shape[:2]
            display_width = int(w * display_height / h)
            
            frame_resized = cv2.resize(frame, (display_width, display_height))
            
            # Convert BGR to RGB
            frame_rgb = cv2.cvtColor(frame_resized, cv2.COLOR_BGR2RGB)
            
            # Convert to PhotoImage
            image = Image.fromarray(frame_rgb)
            photo = ImageTk.PhotoImage(image)
            
            # Update display
            self.root.after(0, lambda: self.video_label.config(image=photo, text=""))
            self.root.after(0, lambda: setattr(self.video_label, 'image', photo))
            
        except Exception as e:
            print(f"Display error: {e}")
    
    def update_fps_display(self):
        """Update FPS display safely"""
        self.fps_label.config(text=f"FPS: {self.current_fps}")
    
    def update_status(self, message):
        """Update status message"""
        def update_status_safe():
            self.status_label.config(text=message)
        self.root.after(0, update_status_safe)
    
    def run(self):
        """Start the application"""
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
        self.root.mainloop()
    
    def on_closing(self):
        """Handle application closing"""
        self.disconnect_camera()
        self.root.destroy()

if __name__ == "__main__":    
    # Start the application directly
    app = PhoneCameraDetector()
    app.run()