import { useState, useEffect, useRef } from 'react';

const MouseFollower = () => {
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const onMouseOver = (e) => {
      // Check if target is an interactive element
      const isInteractive = 
        e.target.tagName === 'BUTTON' || 
        e.target.tagName === 'A' || 
        e.target.classList.contains('scroll-indicator') ||
        e.target.classList.contains('nav-links') ||
        e.target.classList.contains('tech-tag') ||
        e.target.classList.contains('social-link') ||
        e.target.parentElement?.classList.contains('nav-links') ||
        e.target.parentElement?.classList.contains('social-link') ||
        e.target.parentElement?.classList.contains('tech-tag');
        
      if (isInteractive) {
        setIsHovering(true);
      }
    };
    
    const onMouseOut = () => {
      setIsHovering(false);
    };
    
    // Setup animation loop
    const animateFollower = () => {
      const speed = isHovering ? 0.15 : 0.08;
      
      followerX += (mouseX - followerX) * speed;
      followerY += (mouseY - followerY) * speed;
      
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      
      requestAnimationFrame(animateFollower);
    };
    
    // Add event listeners
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    
    requestAnimationFrame(animateFollower);
    
    // Setup initial styles
    follower.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background-color: transparent;
      border: 2px solid rgba(99, 102, 241, 0.5);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s, width 0.2s, height 0.2s, background-color 0.2s;
      transform: translate(-50%, -50%);
      opacity: 0.6;
    `;
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [isHovering]);
  
  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;
    
    if (isHovering) {
      follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      follower.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
      follower.style.width = '30px';
      follower.style.height = '30px';
      follower.style.opacity = '0.8';
    } else {
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.backgroundColor = 'transparent';
      follower.style.width = '20px';
      follower.style.height = '20px';
      follower.style.opacity = '0.6';
    }
  }, [isHovering]);
  
  return <div ref={followerRef} />;
};

export default MouseFollower;
