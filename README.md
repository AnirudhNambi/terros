# terros
How to run the program:
- Clone the git repository
- Run the project using `npx ts-node index.ts`
- We can use curl or postman for POST API calls. endpoint: `http://localhost:3000/move`
    - Sample request body: {
        "current":[1,0],
        "final":[2,0],
    }// Black Pawn Move from H2 to H3.
- Move API returns true if the given final position is valid and updates the state of the board. Else it returns false.

Note: We do not validate the current position in the request body as all the positions on current chess board(front end) state are valid.

Front End(todo):
- We create an 8X8 board with pieces in their initial states making a get('/') call.
- For every move player can click current and final positions of a piece on the board. Then we make a POST API call to our service to check if the move is valid. Depending on the response we update the board.


    