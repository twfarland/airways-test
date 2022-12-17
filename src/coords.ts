import { right, left, Either } from "fp-ts/Either";

export type Coord = [number, number];
export type Distances = Record<
  string,
  { distance: number; between: [Coord, Coord] }
>;
export interface CoordDistance {
  distance: number;
  between: [Coord, Coord];
}
export interface CoordAnalysis {
  average: number;
  min: CoordDistance;
  max: CoordDistance;
}

// Pythagoras
export function distance([x1, y1]: Coord, [x2, y2]: Coord): number {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
}

// O(N*M)
export function calculateCoordDistances(
  coords: Coord[]
): Either<string, Distances> {
  const distances: Distances = {};

  for (let a = 0; a < coords.length; a++) {
    for (let b = a; b < coords.length; b++) {
      const A = coords[a];
      const B = coords[b];
      if (A !== B) {
        distances[`${A} <-> ${B}`] = {
          distance: distance(A, B),
          between: [A, B],
        };
      }
    }
  }

  return Object.keys(distances).length > 0
    ? right(distances)
    : left("At least 2 coordinates are required");
}

// O(N)
export function analyseCoordDistances(
  distances: Distances
): Either<string, CoordAnalysis> {
  const keys = Object.keys(distances);
  let minKey = "";
  let minDistance: number | undefined;
  let maxKey = "";
  let maxDistance: number | undefined;
  let totalDistance = 0;

  for (const key of keys) {
    const distance = distances[key].distance;
    if (maxDistance === undefined || distance > maxDistance) {
      maxDistance = distance;
      maxKey = key;
    }
    if (minDistance === undefined || distance < minDistance) {
      minDistance = distance;
      minKey = key;
    }
    totalDistance += distance;
  }

  return minDistance !== undefined && maxDistance !== undefined
    ? right({
        average: totalDistance / keys.length,
        min: { distance: minDistance, between: distances[minKey].between },
        max: { distance: maxDistance, between: distances[maxKey].between },
      })
    : left("Not enough coordinates");
}
