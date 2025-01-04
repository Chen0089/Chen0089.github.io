var fpsElement = document.getElementById('fps');
		var frameCount = 0;
		var fps = 0;

    function updateFPS() {
      frameCount++;
      var currentTime = Date.now();
      var deltaTime = currentTime - lastTime;

      if (deltaTime >= 1000) {
        fps = Math.round(frameCount / (deltaTime / 1000));
        frameCount = 0;
        lastTime = currentTime;
      }

      fpsElement.textContent = '帧率（FPS）: ' + fps;
      requestAnimationFrame(updateFPS);
    }

    var lastTime = Date.now();
    requestAnimationFrame(updateFPS);
    // 获取当前日期
const now = new Date();

// 获取当前年份
const currentYear = now.getFullYear();

// 计算下一年（或上一年）0点的日期对象
const nextYearDate = new Date(currentYear + 1, 0, 1); // 下一年1月1日0点
// const previousYearDate = new Date(currentYear - 1, 0, 1); // 上一年1月1日0点（如有需要可以替换）

// 更新倒计时
function updateCountdown() {
    const now = new Date();
    const timeDiff = nextYearDate - now; // 时间差（毫秒）

    if (timeDiff <= 0) {
        // 如果时间到了下一年，重新计算
        const nextYear = new Date(currentYear + 1, 0, 1);
        const nextDiff = nextYear - now;
        displayCountdown(nextDiff);
        return;
    }

    displayCountdown(timeDiff);
}

// 计算并显示剩余的时间
function displayCountdown(timeDiff) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // 天数
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // 小时数
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // 分钟数
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000); // 秒数

    const countdownDisplay = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
    document.getElementById("countdown").innerHTML = countdownDisplay;
}

// 每秒钟更新倒计时
setInterval(updateCountdown, 1000);

// 初始化显示
updateCountdown();

document.onreadystatechange = function() {
    	        if (document.readyState !== "complete") {
    	            document.querySelector(
    	                "body").style.visibility = "hidden";
    	            document.querySelector(
    	                "#loader").style.visibility = "visible";}
						else {
    	            document.querySelector(
    	                "#loader").style.display = "none";
    	            document.querySelector(
    	                "body").style.visibility = "visible";}};

document.getElementById('flarum-loading').style.display = 'block';
	        	    var flarum = {extensions: {}};

	const starButton = document.getElementById('starButton');

        // Toggle the "active" class when the button is clicked
        starButton.addEventListener('click', function() {
            starButton.classList.toggle('active');
            if (starButton.classList.contains('active')) {
                alert("You've starred this!");
            } else {
                alert("Unstarred.");
            }
        });
