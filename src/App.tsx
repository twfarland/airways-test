import { useState } from "react";
import { useCoordAnalysis } from "./useCoordAnalysis";
import { isLeft } from "fp-ts/Either";
import styles from "./App.module.css";
import { CoordAnalysisDisplay } from "./CoordAnalysisDisplay";

function App() {
  const [coordInput, setCoordInput] = useState("");
  const analysis = useCoordAnalysis(coordInput);

  return (
    <div className={styles.container}>
      <h4>Coordinate input:</h4>

      <input
        autoFocus
        className={styles.coordInput}
        value={coordInput}
        onInput={({ currentTarget }) => setCoordInput(currentTarget.value)}
        placeholder="Example: 0,1.234 3,8 4,3 10,13"
      />

      {isLeft(analysis) ? (
        <h4>{analysis.left}</h4>
      ) : (
        <div>
          <h4>Analysis:</h4>
          <CoordAnalysisDisplay analysis={analysis.right} />
        </div>
      )}
    </div>
  );
}

export default App;
