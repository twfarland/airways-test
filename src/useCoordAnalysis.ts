import { useMemo } from "react";
import {
  analyseCoordDistances,
  calculateCoordDistances,
  CoordAnalysis,
} from "./coords";
import { coordListParser } from "./parser";
import { Either, right, chain } from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";

export function useCoordAnalysis(
  coordInput: string
): Either<string, CoordAnalysis> {
  return useMemo(
    () =>
      pipe(
        coordInput,
        right,
        chain(coordListParser),
        chain(calculateCoordDistances),
        chain(analyseCoordDistances)
      ),
    [coordInput]
  );
}
