import React from 'react';

interface RichTextViewerProps {
  text: string;
}

const tagToClassMap: Record<string, string> = {
  pos: 'text-red-400',
  neg: 'text-indigo-400',
  bal: 'text-amber-300',
  q1: 'text-sky-400',
  q2: 'text-rose-400',
  q3: 'text-purple-400',
  q4: 'text-violet-400',
};

// New, robust recursive parser to handle nested formatting
const parseAndRender = (text: string): (string | React.ReactElement)[] => {
    if (!text) return [];

    // This regex finds the first occurrence of any of our formatting patterns.
    const regex = /(\*\*[\s\S]*?\*\*|\*[\s\S]*?\*|<(\w+)>[\s\S]*?<\/\2>)/;
    const match = text.match(regex);

    if (!match) return [text];

    const [fullMatch, , tagName] = match;
    const matchIndex = match.index!;
    
    const before = text.slice(0, matchIndex);
    const after = text.slice(matchIndex + fullMatch.length);

    let element: React.ReactElement;

    if (fullMatch.startsWith('**')) {
        const content = fullMatch.slice(2, -2);
        element = <strong>{parseAndRender(content)}</strong>;
    } else if (fullMatch.startsWith('*')) {
        const content = fullMatch.slice(1, -1);
        element = <em>{parseAndRender(content)}</em>;
    } else {
        // This regex is specific to the matched tag, extracting its content.
        const contentMatch = fullMatch.match(new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`));
        const content = contentMatch ? contentMatch[1] : '';
        const className = tagToClassMap[tagName] || '';
        element = <span className={className}>{parseAndRender(content)}</span>;
    }

    // Recursively parse the rest of the string and combine results
    return [before, element, ...parseAndRender(after)].filter(Boolean);
};


const RichTextViewer: React.FC<RichTextViewerProps> = ({ text }) => {
    const content = parseAndRender(text);

    return (
        <div className="whitespace-pre-wrap">
            {content.map((part, i) => (
                <React.Fragment key={i}>{part}</React.Fragment>
            ))}
        </div>
    );
};

export default RichTextViewer;