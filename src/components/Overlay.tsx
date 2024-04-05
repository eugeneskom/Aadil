import React, { useEffect, useRef } from "react";

interface OverlayProps {
  isOpen: boolean;
  contentContainerRef: React.RefObject<HTMLDivElement>;
}

const Overlay: React.FC<OverlayProps> = ({ isOpen, contentContainerRef }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentContainerRef.current && overlayRef.current) {
      const containerRect = contentContainerRef.current.getBoundingClientRect();
      overlayRef.current.style.top = `${containerRect.top}px`;
      overlayRef.current.style.left = `${containerRect.left}px`;
      overlayRef.current.style.width = `${containerRect.width}px`;
      overlayRef.current.style.height = `${window.innerHeight - containerRect.top}px`;
    }
  }, [isOpen, contentContainerRef]);

  return isOpen ? (
    <div
      ref={overlayRef}
      className="fixed bg-black bg-opacity-50 z-0 pointer-events-none"
    ></div>
  ) : null;
};

export default Overlay;