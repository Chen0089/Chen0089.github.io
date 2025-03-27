// 用户数据
try {
  // 使用 fetch 请求获取 JSON 数据
  const response = await fetch("json/AccountData.json");

  // 确保请求成功
  if (!response.ok) {
    throw new Error("无法加载用户数据");
  }

  // 解析 JSON 数据
  const users = await response.json();
    console.log(users); // 打印用户数据，可以在这里进行登录验证
  } catch (error) {
    console.error("发生错误:", error);
  }
// 登录表单的提交事件
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 查找用户是否存在并且密码是否匹配
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // 如果找到匹配的用户，登录成功
        alert("登录成功！");
        // 这里可以重定向到用户的主页或者执行其他操作
        window.location.href = "https://chen0089.github.io/";  // 成功后跳转到主页
    } else {
        // 如果没有匹配的用户，显示错误信息
        document.getElementById("errorMessage").style.display = "block";
    }
});
