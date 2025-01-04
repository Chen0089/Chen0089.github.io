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
    
