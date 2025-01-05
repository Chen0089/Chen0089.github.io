const url = 'https://api.github.com/search/repositories?q=language:JavaScript&sort=stars&order=desc';  // GitHub API URL，按星标排序
const token = process.env.PAT;
let page = 1; // 当前页数
const perPage = 10; // 每页请求数量
const loadingElement = document.getElementById('loading'); // 加载提示元素
const repoListElement = document.getElementById('repo-list'); // 仓库列表容器

// 获取仓库数据并渲染
function fetchRepos() {
  loadingElement.style.display = 'block'; // 显示加载提示

  fetch(`${url}&page=${page}&per_page=${perPage}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // 使用 PAT 进行身份验证
      'Accept': 'application/vnd.github.v3+json' // 设置 GitHub API 的版本
    }
  })
    .then(response => {
      // 获取速率限制信息
      const rateLimit = response.headers.get('X-RateLimit-Remaining');
      const resetTime = response.headers.get('X-RateLimit-Reset');
      console.log(`Remaining Requests: ${rateLimit}`);
      console.log(`Rate Limit Resets At: ${new Date(resetTime * 1000)}`); // 转换为可读时间

      return response.json();
    })
    .then(data => {
      const repoList = data.items;

      // 遍历并展示仓库信息
      repoList.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.classList.add('repo-item');
        listItem.innerHTML = `
          <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
          <p>⭐: ${repo.stargazers_count}</p>
          <p><strong>语言:</strong> ${repo.language || 'N/A'}</p>
          <p><strong>创建时间:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
          <p><strong>最后编辑:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
          <p>${repo.description || 'No description available.'}</p>
        `;
        repoListElement.appendChild(listItem);
      });

      loadingElement.style.display = 'none'; // 隐藏加载提示
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      loadingElement.style.display = 'none'; // 隐藏加载提示
      alert('Failed to load repositories. Please try again later.');
    });
}

// 初次加载仓库数据
fetchRepos();

// 监听滚动事件，判断是否到达底部
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
    page++; // 页数增加
    fetchRepos(); // 加载更多仓库
  }
});
