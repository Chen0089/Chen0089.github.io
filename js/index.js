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

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        // 随机选择一个项目
        const randomIndex = Math.floor(Math.random() * data.length);
        const project = data[randomIndex];

        // 更新页面内容
        document.getElementById('project-name').innerText = project.name + " (Star: " + project.stars + "+)";
        document.getElementById('project-description').innerText = project.description;
        document.getElementById('project-link').setAttribute('href', project.url);
    })
    .catch(error => console.error('Error fetching project data:', error));
