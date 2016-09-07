Develop an API that moves a rover around Mars, which is modelled as a rectangular grid.
The rover will be giving a starting coordinate and direction it is facing.
The rover will take four commands, left, right, up and down.
On the commands left or right, the rover will rotate -90 or +90 degrees and remain in the same grid
position.
On the commands up or down, the rover will move one grid position according to the rotation of the
rover.
If the rover attempts to move off the grid it should stop moving.
If the rover encounters another rover in the same grid position it should stop moving before moving
to the grid position.
When the rover stops moving it should log out it's final position.


This project produces no visible output, as the requirement was for an API.

To extend this we could turn it into a RESTful API in node.js with a front-end to allow a user to send the commands manually.

We could also use require,js or webpack to package the front-end.

To run, type 'npm start' and visit http://localhost:8000/ in your browser.

Unit tests demonstrate the full range of movements.

To run the tests, type 'npm test'.
