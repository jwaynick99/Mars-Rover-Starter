const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it("constructor set position and default values for mode and generatorWatts", function(){
    let newRover = new Rover(98328, "NORMAL", 110);
    expect(newRover).toEqual({"position": 98328, "mode": "NORMAL", "generatorWatts": 110});
  });
  it("response returned by receiveMessage contains the name of the message", function(){
    let newRover = new Rover();
    let newName = newRover.receiveMessage(new Message("Message"));
    expect(newName.message).toEqual("Message");
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let newRover = new Rover();
    let command = new Command("STATUS_CHECK")
    let newMessage = new Message("Name", [command, command]);
    expect(newRover.receiveMessage(newMessage).results.length).toEqual(2);
  });
  it("responds correctly to the status check command", function(){
    let rover = new Rover(87382098, "NORMAL", 110);
    let command = [new Command("STATUS_CHECK")];
    let message = new Message("Test 10", command);
    let response = rover.receiveMessage(message);
    expect(response.results[0]).toEqual({"completed": true, "roverStatus": {"generatorWatts": 110, "mode": "NORMAL", "position": 87382098}});
  });
  it("responds correctly to the mode change command", function(){
    let rover = new Rover(100);
    let command = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK")
    ];
    let message = new Message("Test 11", command);
    let response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.mode).toEqual("LOW_POWER");
  });
  it("responds with a false completed when attempting to move in LOW_POWER mode", function(){
    let rover = new Rover(100, "LOW_POWER", 110);
    let command = [new Command("MOVE", 200)];
    let message = new Message("Test 12", command);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBeFalsy();
  });
  it("responds with the position for the move command", function(){
    let rover = new Rover(100);
    let command = [
      new Command("MOVE", 200),
      new Command("STATUS_CHECK")
    ];
    let message = new Message("Test 12", command);
    let response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.position).toEqual(200);
  });

});
