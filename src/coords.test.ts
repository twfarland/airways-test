import { right, left, isRight } from "fp-ts/Either";
import { isLeft } from "fp-ts/lib/These";
import {
  distance,
  calculateCoordDistances,
  analyseCoordDistances,
  CoordAnalysis,
} from "./coords";

test("distance", () => {
  expect(distance([0, 0], [0, 0])).toEqual(0);
  expect(distance([0, 0], [3, 4])).toEqual(5);
  expect(distance([0, 0], [-3, -4])).toEqual(5);
  expect(distance([3, 4], [-3, -4])).toEqual(10);
});

test("calculateCoordDistances happy path", () => {
  expect(
    calculateCoordDistances([
      [0, 0],
      [3, 4],
      [-3, -4],
    ])
  ).toEqual(
    right({
      "0,0 <-> -3,-4": {
        distance: 5,
        between: [
          [0, 0],
          [-3, -4],
        ],
      },
      "0,0 <-> 3,4": {
        distance: 5,
        between: [
          [0, 0],
          [3, 4],
        ],
      },
      "3,4 <-> -3,-4": {
        distance: 10,
        between: [
          [3, 4],
          [-3, -4],
        ],
      },
    })
  );
});

test("calculateCoordDistances sad path", () => {
  expect(calculateCoordDistances([])).toEqual(
    left("At least 2 coordinates are required")
  );
});

test("analyseCoordDistances happy path", () => {
  const coordDistances = calculateCoordDistances([
    [0, 0],
    [3, 4],
    [-3, -4],
  ]);

  const expected: CoordAnalysis = {
    average: 6.666666666666667,
    max: {
      distance: 10,
      between: [
        [3, 4],
        [-3, -4],
      ],
    },
    min: {
      distance: 5,
      between: [
        [0, 0],
        [3, 4],
      ],
    },
  };

  expect(
    isRight(coordDistances) && analyseCoordDistances(coordDistances.right)
  ).toEqual(right(expected));
});

test("analyseCoordDistances sad path", () => {
  const coordDistances = calculateCoordDistances([]);
  expect(isLeft(coordDistances)).toBe(true);
});
