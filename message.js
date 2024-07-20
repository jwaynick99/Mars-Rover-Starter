class Message {
   constructor(name, commandsArray){
      this.name = name;
      if (!name){
         throw Error("Name is required.")
      }
      this.commandsArray = commandsArray;
   }
}

module.exports = Message;