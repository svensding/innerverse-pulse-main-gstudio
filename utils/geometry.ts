
// utils/geometry.ts

/**
 * Generates a closed SVG path string for an organic "blob" shape using polar coordinates.
 */
export const generateBlobPath = (radius: number, randomness: number, points: number = 8): string => {
  let path = "";
  const step = (Math.PI * 2) / points;
  
  const vertices: {x: number, y: number}[] = [];
  
  for (let i = 0; i < points; i++) {
    const theta = i * step;
    const r = radius * (1 - randomness * 0.5 + Math.random() * randomness);
    
    const x = 50 + r * Math.cos(theta); // 50 is center of 100x100 viewBox
    const y = 50 + r * Math.sin(theta);
    vertices.push({ x, y });
  }

  if (vertices.length === 0) return "";

  const startX = (vertices[vertices.length - 1].x + vertices[0].x) / 2;
  const startY = (vertices[vertices.length - 1].y + vertices[0].y) / 2;

  path += `M ${startX} ${startY}`;

  for (let i = 0; i < vertices.length; i++) {
    const p1 = vertices[i];
    const p2 = vertices[(i + 1) % vertices.length];
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    
    path += ` Q ${p1.x} ${p1.y}, ${midX} ${midY}`;
  }

  path += " Z";
  return path;
};

/**
 * Calculates the cross product of vectors OA and OB.
 * A positive cross product indicates a counter-clockwise turn, 
 * negative indicates clockwise, and zero indicates collinear points.
 */
const cross = (o: {x:number, y:number}, a: {x:number, y:number}, b: {x:number, y:number}) => {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
};

/**
 * Monotone Chain Algorithm to compute the convex hull of a set of 2D points.
 * @param points Array of objects with x and y coordinates
 * @returns Array of points representing the hull in clockwise order
 */
export const getConvexHull = (points: {x:number, y:number}[]) => {
    if (points.length <= 2) return points;

    const n = points.length;
    // Sort points by x-coordinate (in case of a tie, sort by y-coordinate)
    const sortedPoints = [...points].sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);

    const upperHull: {x:number, y:number}[] = [];
    for (let i = 0; i < n; i++) {
        while (upperHull.length >= 2 && cross(upperHull[upperHull.length - 2], upperHull[upperHull.length - 1], sortedPoints[i]) <= 0) {
            upperHull.pop();
        }
        upperHull.push(sortedPoints[i]);
    }

    const lowerHull: {x:number, y:number}[] = [];
    for (let i = n - 1; i >= 0; i--) {
        while (lowerHull.length >= 2 && cross(lowerHull[lowerHull.length - 2], lowerHull[lowerHull.length - 1], sortedPoints[i]) <= 0) {
            lowerHull.pop();
        }
        lowerHull.push(sortedPoints[i]);
    }

    // Concatenate lower and upper hull to get full hull
    // Remove the last point of each half because it's repeated at the beginning of the other half
    upperHull.pop();
    lowerHull.pop();
    return upperHull.concat(lowerHull);
};

/**
 * Generates a smooth SVG Path string from a set of hull points using Catmull-Rom splines or Bezier approximation.
 * This creates the "Puddle" effect connecting the stars.
 */
export const generateSmoothHullPath = (points: {x:number, y:number}[], buffer: number = 10): string => {
    if (points.length < 3) return "";

    // 1. Buffer the points outwards from the centroid to make the puddle larger than the stars
    // Simple centroid calculation
    let cx = 0, cy = 0;
    points.forEach(p => { cx += p.x; cy += p.y; });
    cx /= points.length;
    cy /= points.length;

    const bufferedPoints = points.map(p => {
        const dx = p.x - cx;
        const dy = p.y - cy;
        // normalize and scale
        const len = Math.sqrt(dx*dx + dy*dy);
        if (len === 0) return p;
        return {
            x: p.x + (dx/len) * buffer,
            y: p.y + (dy/len) * buffer
        };
    });

    // 2. Generate smooth path connecting buffered points
    let path = `M ${bufferedPoints[0].x} ${bufferedPoints[0].y}`;
    
    for (let i = 0; i < bufferedPoints.length; i++) {
        const p0 = bufferedPoints[(i - 1 + bufferedPoints.length) % bufferedPoints.length];
        const p1 = bufferedPoints[i];
        const p2 = bufferedPoints[(i + 1) % bufferedPoints.length];
        const p3 = bufferedPoints[(i + 2) % bufferedPoints.length];

        // Catmull-Rom to Cubic Bezier conversion factors
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;

        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    path += " Z";
    return path;
};
