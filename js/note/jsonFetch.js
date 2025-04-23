// tips
fetch('json/note/tips.json')   // 解析
    .then(response => response.json())  // 处理
    .then(data => console.log(data))    // 错误处理
    .catch(error => console.error('Error:', error));

// 笔记数据
fetch('json/note/notes.json')   // 解析
    .then(response => response.json())  // 处理
    .then(data => console.log(data))    // 错误处理
    .catch(error => console.error('Error:', error));
