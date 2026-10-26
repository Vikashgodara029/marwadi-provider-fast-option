const startingBalance = 1000;
let balance = startingBalance;
let rotation = 0;
const balanceEl = document.getElementById('balance');
const wheel = document.getElementById('wheel');
const message = document.getElementById('game-message');
const spinButton = document.getElementById('spin-button');

document.getElementById('year').textContent = new Date().getFullYear();

function renderBalance() {
  balanceEl.textContent = balance.toLocaleString('en-IN');
  spinButton.disabled = balance < 10;
}
spinButton.addEventListener('click', () => {
  if (balance < 10) return;
  balance -= 10;
  renderBalance();
  spinButton.disabled = true;
  message.textContent = 'Spinning…';
  rotation += 720 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${rotation}deg)`;
  window.setTimeout(() => {
    const result = Math.floor(Math.random() * 4);
    const outcomes = [
      { label: 'You won 20 virtual coins!', change: 20 },
      { label: 'Try again next time.', change: 0 },
      { label: 'You won 5 virtual coins!', change: 5 },
      { label: 'No bonus this spin.', change: 0 }
    ];
    const outcome = outcomes[result];
    balance += outcome.change;
    message.textContent = `${outcome.label} (demo only)`;
    renderBalance();
  }, 1250);
});
document.getElementById('reset-button').addEventListener('click', () => {
  balance = startingBalance;
  rotation = 0;
  wheel.style.transform = 'rotate(0deg)';
  message.textContent = 'Demo balance reset to 1,000 virtual coins.';
  renderBalance();
});
renderBalance();
