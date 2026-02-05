const e=`# Chess Advisor: YOLO + Stockfish

I paired YOLO-based board detection with Stockfish suggestions to guide over-the-board play.

## Pipeline
- Capture the board region of the screen.
- Run YOLO to locate pieces and map them to squares.
- Build a FEN string and feed it to Stockfish.
- Draw arrows for the top 3 moves.

## Practical notes
- Accurate screen capture dimensions matter more than fancy post-processing.
- Stockfish depth/time is a trade-off: 0.5s was plenty for casual play.
- Good lighting and clean boards make detection far more reliable.
`;export{e as default};
