class Rover {
   constructor(position, mode = "NORMAL", generatorWatts = 110){
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(inMessage){
      let status = {
         mode: this.mode,
         generatorWatts: this.generatorWatts,
         position: this.position
      }
      let commands = inMessage.commandsArray;
      let newResults = []
      for (let i in commands){
         if (commands[i].commandType === "STATUS_CHECK"){
            let result = {
               completed: true,
               roverStatus: status
            };
            newResults.push(result);
         }
         if (commands[i].commandType === "MODE_CHANGE"){
            status.mode = commands[i].value;
            let result = {completed: true}
            newResults.push(result);
         };
         if(commands[i].commandType === "MOVE"){
            if (status.mode === "LOW_POWER"){
               let result = {completed: false};
               newResults.push(result);
            } else if (status.mode === "NORMAL"){
               let newPos = commands[i].value;
               status.position = newPos;
               let result = {completed: true};
               newResults.push(result);
            }
         } 
      }

      let message = {
         message: inMessage.name,
         results: newResults
      }
      return message;
   }
}


module.exports = Rover;