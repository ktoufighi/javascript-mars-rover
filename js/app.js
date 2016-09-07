"use strinct";

var app = (function() {
    return {

        Grid: function(width, height) {

            // These are kept private by default
            var roverList = [];    // Stores references to any Rovers in the grid, so can we check for occupied positions

            var addRover = function(rover) {
                roverList.push({id: rover.id, x: rover.x, y: rover.y});
            };
            var updateRover = function(rover) {
                for(var index = 0, roverListLength = roverList.length; index <  roverListLength; index++) {
                    if(roverList[index].id === rover.id) {
                        roverList[index] = rover;
                    }
                }
            };
            var checkTargetPositionIsValid = function(targetPosition) {
                if(targetPosition.x < width && targetPosition.x >= 0 && targetPosition.y < height && targetPosition.y >= 0) {
                    return true;
                } else {
                    return false;
                }
            };
            var checkTargetPositionIsOccupied = function(targetPosition) {
                for(var index = 0, roverListLength = roverList.length; index <  roverListLength; index++) {
                    var occupier = roverList[index];
                    if(occupier.x == targetPosition.x && occupier.y == targetPosition.y && occupier.id != targetPosition.id) {
                        return true;
                    }
                }
                return false;
            };

            return {
                // public methods
                addRover: addRover,
                updateRover: updateRover,
                checkTargetPositionIsValid: checkTargetPositionIsValid,
                checkTargetPositionIsOccupied: checkTargetPositionIsOccupied
            };
        },


        Rover: function(grid, rover) {

            // These are kept private by default
            var x = rover.x;
            var y = rover.y;
            var id = rover.id;
            var direction = rover.direction;

            grid.addRover(rover);

            var getStatus = function() {
                return { x: x, y: y, id: id, direction: direction };
            };
            var logStatus = function() {
                console.log(getStatus());
            };
            var sendCommands = function(commands) {
                for(var index = 0, commandsLength = commands.length; index < commandsLength; index++) {
                    var command = commands[index];
                    var result = move(command);
                    if (result.failure) {
                        break;
                    }
                }
                logStatus();
            };
            var move = function(command) {
                // Rotation commands should always be executed
                if (command === 'L') {
                    direction = (direction + 270) % 360;
                    return { success: true };
                } else if (command === 'R') {
                    direction = (direction + 90) % 360;
                    return { success: true };
                }
                if (command !== 'U' && command !== 'D') {
                    return { failure: true, reason: 'Unknown command'};
                }

                // Process Up and Down movements - but check move is valid first
                var dx = 0, dy = 0, movement = 1;
                if (command === 'D') {
                    movement = -1;
                }
                switch(direction) {
                    case 0:
                        dy = -movement;
                        break;
                    case 90:
                        dx = movement;
                        break;
                    case 180:
                        dy = movement;
                        break;
                    case 270:
                        dx = -movement;
                        break;
                    default:
                        break;
                }
                var targetPosition = { x: x + dx, y: y + dy, id: id };
                var targetPositionValid = grid.checkTargetPositionIsValid(targetPosition);
                if(!targetPositionValid) {
                    return { failure: true, reason: 'Rover cannot go off edge of grid' };
                }
                var targetPositionOccupied = grid.checkTargetPositionIsOccupied(targetPosition);
                if(targetPositionOccupied) {
                    return { failure: true, reason: 'Target position is occupied by another rover' };
                }

                // ok to move rover
                x = targetPosition.x;
                y = targetPosition.y;
                rover = { id: id, x: x, y: y, direction: direction };
                grid.updateRover(rover);
                return { success: true };
            };
            return {
                // public methods
                getStatus: getStatus,
                logStatus: logStatus,
                sendCommands: sendCommands,
                move: move
            };
        }
    };
})();




