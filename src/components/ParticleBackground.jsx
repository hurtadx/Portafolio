import { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const shapesRef = useRef([]);
  const requestRef = useRef();
  const previousTimeRef = useRef();

  useEffect(() => {
    
    const particleCount = 20;
    const shapeCount = 5;
    const container = containerRef.current;
    
    if (!container) return;
    
    const { width, height } = container.getBoundingClientRect();
    
    
    particlesRef.current = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 6 + 2,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      opacity: Math.random() * 0.5 + 0.1
    }));
    
    
    shapesRef.current = Array.from({ length: shapeCount }).map(() => {
      const types = ['rectangle', 'circle', 'donut'];
      const type = types[Math.floor(Math.random() * types.length)];
      const size = Math.random() * 100 + 50;
      
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        rotation: Math.random() * 360,
        speedX: (Math.random() * 0.5 - 0.25) * 0.1,
        speedY: (Math.random() * 0.5 - 0.25) * 0.1,
        rotationSpeed: (Math.random() * 0.5 - 0.25) * 0.1,
        type,
        width: type === 'rectangle' ? size * 1.5 : size,
        height: type === 'rectangle' ? size * 0.8 : size,
        opacity: Math.random() * 0.15 + 0.05
      };
    });
    
    
    particlesRef.current.forEach(particle => {
      const element = document.createElement('div');
      element.className = 'particle';
      element.style.width = `${particle.size}px`;
      element.style.height = `${particle.size}px`;
      element.style.opacity = particle.opacity;
      element.style.left = `${particle.x}px`;
      element.style.top = `${particle.y}px`;
      particle.element = element;
      container.appendChild(element);
    });
    
    shapesRef.current.forEach(shape => {
      const element = document.createElement('div');
      element.className = `shape ${shape.type}`;
      element.style.width = `${shape.width}px`;
      element.style.height = `${shape.height}px`;
      element.style.opacity = shape.opacity;
      element.style.left = `${shape.x}px`;
      element.style.top = `${shape.y}px`;
      element.style.transform = `rotate(${shape.rotation}deg)`;
      shape.element = element;
      container.appendChild(element);
    });
    
    
    const animate = time => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        
        
        particlesRef.current.forEach(particle => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          
          if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > height) particle.speedY *= -1;
          
          
          if (particle.element) {
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
          }
        });
        
        
        shapesRef.current.forEach(shape => {
          shape.x += shape.speedX * deltaTime;
          shape.y += shape.speedY * deltaTime;
          shape.rotation += shape.rotationSpeed * deltaTime;
          
          
          const margin = shape.size / 2;
          if (shape.x < -margin) shape.x = width + margin;
          if (shape.x > width + margin) shape.x = -margin;
          if (shape.y < -margin) shape.y = height + margin;
          if (shape.y > height + margin) shape.y = -margin;
          
          
          if (shape.element) {
            shape.element.style.transform = `translate(${shape.x}px, ${shape.y}px) rotate(${shape.rotation}deg)`;
          }
        });
      }
      
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      
      particlesRef.current.forEach(particle => {
        if (particle.element && particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
      shapesRef.current.forEach(shape => {
        if (shape.element && shape.element.parentNode) {
          shape.element.parentNode.removeChild(shape.element);
        }
      });
    };
  }, []);
  
  return <div ref={containerRef} className="floating-elements"></div>;
};

export default ParticleBackground;
