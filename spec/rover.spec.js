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
    expect(newName).toEqual({"name": "Message"});
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let newRover = new Rover();
    let newMessage = new Message("Name", ["Command 1", "Command 2"])
    expect(newRover.receiveMessage(newMessage).commandsArray.length).toEqual(2)
  })

});
