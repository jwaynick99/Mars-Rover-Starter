class Rover {
   constructor(position, mode, generatorWatts){
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(messageName){
      let message = {
         name: messageName
      }
      return message;
   }
}

module.exports = Rover;