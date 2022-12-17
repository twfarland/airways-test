import { coordListParser } from "./parser";
import { right } from "fp-ts/Either";

test("CoordList integers", () => {
  expect(coordListParser("1,2 3,4")).toEqual(
    right([
      [1, 2],
      [3, 4],
    ])
  );
});

test("CoordList decimals", () => {
  expect(coordListParser("1.0,2.1 3.123,4.567")).toEqual(
    right([
      [1, 2.1],
      [3.123, 4.567],
    ])
  );
});

test("CoordList negatives and positives", () => {
  expect(coordListParser("-1.0,+2.1 +3.123,-4.567")).toEqual(
    right([
      [-1, 2.1],
      [3.123, -4.567],
    ])
  );
});

test("CoordList wide spacing", () => {
  expect(coordListParser("     1,2.1    3,4.567     ")).toEqual(
    right([
      [1, 2.1],
      [3, 4.567],
    ])
  );
});
