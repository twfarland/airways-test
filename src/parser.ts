import { right, left, Either } from "fp-ts/Either";
import * as P from "parsimmon";
import { Coord } from "./coords";

export const coordLanguage = P.createLanguage({
  Int: () => P.regexp(/[0-9]+/).map((s) => Number(s)),

  Comma: () => P.string(","),

  Dot: () => P.string("."),

  Decimal: (r) =>
    P.seq(r.Int, r.Dot, r.Int).map(([n, _, m]) => Number(`${n}.${m}`)),

  Number: (r) => P.alt(r.Decimal, r.Int),

  SignedNumber: (r) =>
    P.seq(P.oneOf("+-"), r.Number).map(([sign, n]) => (sign === "-" ? -n : n)),

  OptionallySignedNumber: (r) => P.alt(r.SignedNumber, r.Number),

  Coord: (r) =>
    P.seq(r.OptionallySignedNumber, r.Comma, r.OptionallySignedNumber).map(
      ([x, comma, y]) => [x, y]
    ),

  CoordList: (r) =>
    P.seq(P.optWhitespace, r.Coord.sepBy(P.whitespace), P.optWhitespace).map(
      ([start, coords, end]) => coords
    ),
});

export const coordListParser = (
  coordInput: string
): Either<string, Coord[]> => {
  try {
    return right(coordLanguage.CoordList.tryParse(coordInput));
  } catch (error) {
    return left((error as Error).message);
  }
};
