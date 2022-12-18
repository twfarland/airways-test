# Airways test

### Test

    npm test

### Run

    npm dev

### Notes

Because all processing can be done clientside, I chose to update the analysis on reaction to text input, rather than requiring a form submit. This allows faster feedback.

I used a parser combinator library (Parsimmon) to read the text input. I also handled signed numbers and extra whitespace between the coordinates.

I separated the parsing, processing, and rendering logic from each other. I used pure functions, which are easier to unit test. I used the Either monad to simplify the control flow of dealing with possible failures.

The processing logic is wrapped up in a hook (useCoordAnalysis), leaving the main component to just deal with rendering.

I used TLD (test last development) - unit testing with Jest. I didn't do any component testing because the interaction is trivial (it's just text input). But I would use that if the interactions were more complex. I would also use property-based testing (fast-check) if the processing requirements were more complex.

I didn't try to make it pretty - just focused on correctness.

### Complexity

The calculation of distances between coordinates is O(N * M).
The analysis of those distances is O(N) - better than sorting to get the max/min.

