document.addEventListener('DOMContentLoaded', (event) => {
    const starsThreshold = 1000;
    const githubSearchApiUrl = `https://api.github.com/search/repositories?q=stars:>${starsThreshold}&per_page=10`;

    fetch(githubSearchApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络似乎有点问题...错误代码:' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const repoList = document.getElementById('repo-list');
            data.items.forEach(repo => {
                const listItem = document.createElement('li');
                listItem.textContent = `名称: ${repo.name}, 星数: ${repo.stargazers_count}, 链接: ${repo.html_url}`;
                repoList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            // 可选：在HTML中显示错误信息
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Failed to load repositories. Please try again later.';
            errorDiv.style.color = 'red';
            document.getElementById('repo-container').appendChild(errorDiv);
        });
});
