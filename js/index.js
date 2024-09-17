const textContainer = document.getElementById('text-container');
const texts = ['Hello world!!!', 'welcome to my website!', 'have a nice day!'];

function randomText() {
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}

function updateText() {
  const span = textContainer.querySelector('span');
  span.textContent = randomText();
}

setInterval(updateText, 1000);
