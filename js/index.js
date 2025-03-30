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
    

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
		document.querySelector("#loader").style.visibility = "visible";
	}
	else {
   		document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
	}
};
document.getElementById('flarum-loading').style.display = 'block';
var flarum = {
	extensions: {}
};
const list = document.querySelector(".list");
const items = Array.from(document.querySelectorAll(".item"));

const TIME_AUTO_NEXT = 3500; // 自动切换时间间隔，单位毫秒

function autoNext() {
  const sliderItems = list.querySelectorAll(".item");
  list.appendChild(sliderItems[0]); // 将第一个项移到末尾
}

setInterval(autoNext, TIME_AUTO_NEXT); // 每隔一段时间自动切换
