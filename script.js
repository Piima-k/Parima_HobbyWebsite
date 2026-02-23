/* --- Rock Paper Scissors Game --- */
(function initRPS() {
  const startBtn = document.getElementById("start-game");
  const resetBtn = document.getElementById("reset-game");
  const choices = document.querySelectorAll(".choice");
  const message = document.getElementById("game-message");
  const playerScoreEl = document.getElementById("player-score");
  const computerScoreEl = document.getElementById("computer-score");
  const gameBox = document.getElementById("rps-game");

  if (!startBtn) return; // only runs on hobby3 page

  let playerScore = 0;
  let computerScore = 0;
  let gameActive = false;

  startBtn.addEventListener("click", () => {
    gameActive = true;
    message.textContent = "Choose your move!";
    gameBox.style.borderColor = "var(--accent)";
  });

  resetBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    message.textContent = "Game reset. Press Start!";
    gameActive = false;
    gameBox.style.borderColor = "var(--card-border)";
  });

  choices.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!gameActive) {
        message.textContent = "Press Start first!";
        return;
      }

      const playerChoice = btn.dataset.choice;
      const options = ["rock", "paper", "scissors"];
      const computerChoice = options[Math.floor(Math.random() * 3)];

      let result = "";

      if (playerChoice === computerChoice) {
        result = "It's a tie!";
        gameBox.style.borderColor = "#ffc0d0";
      } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
      ) {
        playerScore++;
        result = "You win! 🎀";
        gameBox.style.borderColor = "#ff8aa1";
      } else {
        computerScore++;
        result = "Computer wins! 💔";
        gameBox.style.borderColor = "#b6353e";
      }

      playerScoreEl.textContent = playerScore;
      computerScoreEl.textContent = computerScore;
      message.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
    });
  });
})();
(function initFloatingChat() {
  const toggle = document.getElementById("chat-toggle");
  const widget = document.getElementById("chat-widget");
  const closeBtn = document.getElementById("close-chat");
  const chatBox = document.getElementById("chat-box");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    widget.classList.remove("chat-hidden");
  });

  closeBtn.addEventListener("click", () => {
    widget.classList.add("chat-hidden");
  });

  function addMessage(text, className) {
    const msg = document.createElement("div");
    msg.classList.add("chat-message", className);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function botReply(text) {
    const lower = text.toLowerCase();

    if (lower.includes("hi")) return "YO";
    if (lower.includes("how are you")) return "tbh not doing good";
    if (lower.includes("love")) return "in this economy?";
    if (lower.includes("study")) return "you shouldve just study LMAO";
    if (lower.includes("game")) return "its in the extra page on the right";

    const random = [
      "is u srs",
      "I support you!",
      "That sounds like a personal issue",
      "Okay but did you think that through?",
      "Idk how to respond to that actually",
      "sorry what were you saying?"
    ];

    return random[Math.floor(Math.random() * random.length)];
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user-msg");

    setTimeout(() => {
      addMessage(botReply(text), "bot-msg");
    }, 400);

    input.value = "";
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });
})();