const faulttext = {
  player: {},
  
  texts: [],
  
  init() {
    this.texts = [...document.getElementsByClassName('faulttext')];
  },
  
  fault() {
    this.player = setInterval(
      () => {
        this.texts.forEach(
          (text) => {
            text.classList.add("faulttex_fault");
            text.style.transform = `translate(${Math.random() * 60 - 30}%, ${Math.random() * 60 - 30}%)`
          }
        )
      }
    )
  }
  // 这是最后一个
}

faulttext.init();// 初始化
faulttext.fault();

function goHome() {
  window.location.href = '/Chen0089/Chen0089.github.io/edit/main/js/index.html'; // 可以根据你的主页路径调整
}

function goBack() {
  window.history.back(); // 返回上一页
}
