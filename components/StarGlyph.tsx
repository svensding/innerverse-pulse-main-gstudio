import React from 'react';
import StarGlyphs from './icons/StarGlyphs';

interface StarGlyphProps {
  starName: string;
  size?: 'small' | 'large';
  className?: string;
}

const StarGlyph: React.FC<StarGlyphProps> = ({ starName, size = 'small', className = '' }) => {
  const sizeClass = size === 'small' ? 'w-3 h-3' : 'w-6 h-6';
  
  return (
    <div className={`${sizeClass} ${className}`}>
      <StarGlyphs name={starName} />
    </div>
  );
};

export default StarGlyph;
