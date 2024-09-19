import React, { useEffect, useState, useRef } from "react";

const EmergencyNumbers = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const emergencyNumbers = [
    { name: "National Suicide Prevention Lifeline", number: "0800 212121" },
    { name: "Crisis Text Line", number: "Text HOME to 741741" },
    { name: "Veterans Crisis Line", number: "1-800-273-8255 (Press 1)" },
    { name: "SAMHSA National Helpline", number: "1-800-662-4357" },
  ];

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const totalWidth = scrollElement.scrollWidth / 2;

    const scrollInterval = setInterval(() => {
      if (!isPaused) {
        setScrollPosition((prevPosition) => {
          const newPosition = (prevPosition + 3) % totalWidth;
          return newPosition;
        });
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  return (
    <div className="bg-n-8/80 backdrop-blur-sm py-2 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex items-center space-x-4 whitespace-nowrap">
          <span className="text-color-1 font-semibold">Need help?</span>
          <div className="h-6 w-px bg-n-1/20"></div>
          <div 
            className="overflow-hidden" 
            style={{width: 'calc(100% - 150px)'}}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              ref={scrollRef}
              className="inline-block" 
              style={{transform: `translateX(-${scrollPosition}px)`}}
            >
              {emergencyNumbers.concat(emergencyNumbers).map((number, index) => (
                <a 
                  key={index}
                  href={`tel:${number.number.replace(/\D/g,'')}`}
                  className="text-n-1 hover:text-color-1 transition-colors inline-block mr-8"
                >
                  {number.name}: {number.number}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyNumbers;