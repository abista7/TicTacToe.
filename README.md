# Final Exam

Create a simple multiplayer tick tack toe game
Assume 2 players max
First person is player one, second is player 2
Board should update automatically via websocket

The board positions are like this:
```
0,1,2
3,4,5
6,7,8
```
## 5 Questions 10 points each, total out of 100
- Create a server with endpoint `/api/play?userId=1&position=n`
- Create a react component with 9 tiles which are clickable, and have `id="box-n"` so box 0 would have `id="box-0"` clicking will display the player number in the square
- Create a ws server that will update all tabs
- When a player wins, display which one won with the text `Winner is n` in the div with id `winner`
- Reset button will reset the game


## Testing
These tests are not exhaustive and only cover a few cases for grading.
You can run the test script yourself with:
`npm run test` (You need chrome)