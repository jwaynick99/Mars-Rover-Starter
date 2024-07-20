class Rover {
   constructor(position, mode, generatorWatts){
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(inMessage){
      let message = {
         name: inMessage.name,
         commandsArray: inMessage.commandsArray
      }
      return message;
   }
}

module.exports = Rover;