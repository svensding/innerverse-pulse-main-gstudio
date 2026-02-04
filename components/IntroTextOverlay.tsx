
import React, { useState, useEffect } from 'react';

interface IntroTextOverlayProps {
    text: string | null;
}

const IntroTextOverlay: React.FC<IntroTextOverlayProps> = ({ text }) => {
    const [visibleText, setVisibleText] = useState<string | null>(null);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        if (text) {
            setFading(true);
            const timer = setTimeout(() => {
                setVisibleText(text);
                setFading(false);
            }, 500); // fade out duration
            return () => clearTimeout(timer);
        } else if (visibleText) {
            setFading(true);
            const timer = setTimeout(() => setVisibleText(null), 500); // fade out duration
            return () => clearTimeout(timer);
        }
    }, [text, visibleText]);

    if (!visibleText && !fading) return null;

    return (
        <div 
            className="fixed inset-0 z-20 flex items-center justify-center text-center p-4 pointer-events-none"
            style={{ transform: 'translate3d(0,0,0)' }}
        >
            <div className={`
                p-8 rounded-full 
                bg-radial-gradient from-black/80 to-transparent 
                transition-opacity duration-500
                /* PERFORMANCE FIX: Removed backdrop-blur for smoother rendering on mobile */
            `}
            style={{ opacity: fading ? 0 : 1 }}
            >
                <p
                    className={`text-2xl md:text-3xl text-white/80 font-light [&>strong]:font-bold [&>strong]:text-white/95`}
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                    dangerouslySetInnerHTML={{ __html: visibleText || '' }}
                />
            </div>
        </div>
    );
};

export default IntroTextOverlay;
