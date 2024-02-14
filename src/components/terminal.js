import { formatFullDate } from "../utils/date.js";
import TextCommander from "../lib/text-commander.js";

const loginItemElement = document.getElementById("terminal-login-item");
const terminalInputElement = document.getElementById("terminal-input");
const terminalListElement = document.getElementById("terminal-command-list");

const rollDice = () => {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    return `You rolled a ${diceResult}! 🎲`;
}

const CUSTOM_COMMANDS = {
    hello: {
        msg: 'Hello :)',
    },
    sing: {
        msg: '🎵 Never gonna give you up, never gonna let you down... 🎵',
    },
    rollDice: {
        msg: rollDice(),
    }
}

const terminal = new TextCommander();

terminal.setTerminalElement(terminalListElement);
terminal.setCustomCommands(CUSTOM_COMMANDS);

const showLoginTime = () => {
    const currentDate = new Date(); 
    loginItemElement.innerHTML = `Last login: ${formatFullDate(currentDate)}`;
};

showLoginTime();

const handleInput = (e) => {
    if(e.key === "Enter") {
        terminal.useTerminal(e.target.value);
    }
}


terminalInputElement.addEventListener('keydown', handleInput);