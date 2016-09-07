"use strict";

describe('Mars Rover', function() {
    var grid, myRover;

    beforeEach(function() {
        grid = app.Grid(10,10);
        myRover = app.Rover(grid, { x: 5, y: 5, direction: 0, id: 1 });
    });
    describe('A grid of 10 by 10 is created and the rover is set to position 5,5 facing North (0 degrees)', function() {
        it('should correctly set the starting location and direction', function() {
            expect(myRover.getStatus()).toEqual({ x: 5, y: 5, direction: 0, id: 1 });
        });
    });
    describe('Rover can accept commands and will report it\'s position when it stops)', function() {
        it('should move forward by three positions in its current direction when receiving three UP commands', function() {
            myRover.sendCommands('UUU');
            expect(myRover.getStatus()).toEqual({ x: 5, y: 2, direction: 0, id: 1 });
        });
        it('should move backwards by two positions and maintain its direction when receiving two DOWN commands', function() {
            myRover.sendCommands('DD');
            expect(myRover.getStatus()).toEqual({ x: 5, y: 7, direction: 0, id: 1 });
        });
        it('should face East when rotated 90 degrees', function() {
            myRover.sendCommands('R');
            expect(myRover.getStatus()).toEqual({ x: 5, y: 5, direction: 90, id: 1 });
        });
        it('should face West when rotated -90 degrees', function() {
            myRover.sendCommands('L');
            expect(myRover.getStatus()).toEqual({ x: 5, y: 5, direction: 270, id: 1 });
        });
        it('should face South when rotated 180 degrees', function() {
            myRover.sendCommands('RR');
            expect(myRover.getStatus()).toEqual({ x: 5, y: 5, direction: 180, id: 1 });
        });
        it('should face West when rotated 270 degrees', function() {
            myRover.sendCommands('RRR');
            expect(myRover.getStatus()).toEqual({ x: 5, y: 5, direction: 270, id: 1 });
        });
        it('should face the same direction when rotated right 360 degrees', function() {
            myRover.sendCommands('RRRR');
            expect(myRover.getStatus()).toEqual({ x: 5, y: 5, direction: 0, id: 1 });
        });
        it('should face the same direction when rotated left 360 degrees', function() {
            myRover.sendCommands('LLLL');
            expect(myRover.getStatus()).toEqual({ x: 5, y: 5, direction: 0, id: 1 });
        });
        it('should should move and change direction according to the commands it is sent', function() {
            myRover.sendCommands('UURUULDD');
            expect(myRover.getStatus()).toEqual({ x: 7, y: 5, direction: 0, id: 1 });
        });
    });
    describe('Rover will stop moving when impeded)', function() {
        it('should stop when it hits the top edge of the grid', function() {
            myRover.sendCommands('UUUUUUUU');
            expect(myRover.getStatus()).toEqual({ x: 5, y: 0, direction: 0, id: 1 });
        });
        it('should stop when it hits the right edge of the grid', function() {
            myRover.sendCommands('RUUUUUUUU');
            expect(myRover.getStatus()).toEqual({ x: 9, y: 5, direction: 90, id: 1 });
        });
        it('should stop when it hits the bottom edge of the grid', function() {
            myRover.sendCommands('RRUUUUUUUU');
            expect(myRover.getStatus()).toEqual({ x: 5, y: 9, direction: 180, id: 1 });
        });
        it('should stop when it hits the left edge of the grid', function() {
            myRover.sendCommands('LUUUUUUUU');
            expect(myRover.getStatus()).toEqual({ x: 0, y: 5, direction: 270, id: 1 });
        });
        it('should stop when another rover is in its way', function() {
            app.Rover(grid, { x: 5, y: 3, direction: 0, id: 2 });
            myRover.sendCommands('UUUUUUUU');
            expect(myRover.getStatus()).toEqual({ x: 5, y: 4, direction: 0, id: 1 });
        });
    });
});
