
class TextCommander {
    constructor() {
        this.defaultCommands = {
          help: () => this.addToTerminal(`Available commands: ${Object.keys(this.commands).join(', ')}`),
          clear: () => this.clearTerminal(),
          double: (args) => this.doubleNumber(args),
          quote: () => this.fetchAndDisplayRandomQuote(),
        };
        this.customCommands = {};
        this.terminalElement = null;
    }
  
    get commands() {
        const allCommands = { ...this.defaultCommands, ...this.customCommands };
        const unifiedCommands = {};

        for (const [commandName, commandData] of Object.entries(allCommands)) {
            if (commandData.msg) {
            unifiedCommands[commandName] = () => this.addToTerminal(commandData.msg);
            } else if (typeof commandData === 'function') {
            unifiedCommands[commandName] = commandData;
            }
        }

        return unifiedCommands;
    }

    setCustomCommands(commands) {
        this.customCommands = commands;
    }

    setTerminalElement(element) {
        this.terminalElement = element;
      }

    clearTerminal() {
        if (this.terminalElement) {
          this.terminalElement.innerHTML = '';
        } else {
          console.log('Terminal element not set. Call setTerminalElement() to set the terminal element.');
        }
    }

    doubleNumber(args) {
        const numberToDouble = parseFloat(args);
    
        if (!isNaN(numberToDouble)) {
          const result = numberToDouble * 2;
          this.addToTerminal(`Doubled: ${numberToDouble} * 2 = ${result}`);
        } else {
          this.addToTerminal('Invalid value. Please provide a valid number for doubling.');
        }
    }

    async fetchAndDisplayRandomQuote() {
        try {
          const response = await fetch('https://dummyjson.com/quotes/random');
          const data = await response.json();
          const quote = data.quote || 'No quote available.';
          this.addToTerminal(`Random Quote: ${quote}`);
        } catch (error) {
          console.error('Error fetching random quote:', error);
          this.addToTerminal('Error fetching random quote. Please try again later.');
        }
    }

    addToTerminal(content) {
        if (this.terminalElement) {
          const li = document.createElement('li');
          li.classList.add("terminal-command-item");
          li.textContent = content;
          this.terminalElement.appendChild(li);
        } else {
          console.log('Terminal element not set. Call setTerminalElement() to set the terminal element.');
        }
    }
  
    useTerminal(command) {
        const [commandName, args] = command.split(' ');
    
        if (this.commands.hasOwnProperty(commandName)) {
          this.commands[commandName](args);
        } else {
          this.addToTerminal('Command not found. Type "help" to see list of available commands.');
        }
    }
  }
  
  export default TextCommander;