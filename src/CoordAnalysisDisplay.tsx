import { CoordAnalysis } from "./coords";

interface CoordAnalysisProps {
  analysis: CoordAnalysis;
}

export function CoordAnalysisDisplay({
  analysis: { min, max, average },
}: CoordAnalysisProps) {
  return (
    <dl>
      <dt>Closest</dt>
      <dd>
        {min.between
          .map((p) => p.map((n) => n.toFixed(1)).join(","))
          .join(" <-> ")}
        {"  "}
        (Distance: {min.distance.toFixed(2)})
      </dd>

      <dt>Furthest</dt>
      <dd>
        {max.between
          .map((p) => p.map((n) => n.toFixed(1)).join(","))
          .join(" <-> ")}
        {"  "}
        (Distance: {max.distance.toFixed(2)})
      </dd>

      <dt>Average Distance</dt>
      <dd>{average.toFixed(2)}</dd>
    </dl>
  );
}
