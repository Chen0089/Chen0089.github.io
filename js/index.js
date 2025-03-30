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
const { Leafer } = LeaferUI // 全局变量，包含 leafer-ui 的所有功能

// Image、PointerEvent、DragEvent 会与浏览器的全局变量冲突，请使用以下别名代替
const { MyImage, MyPointerEvent, MyDragEvent } = LeaferUI

import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
  x: 100,
  y: 100,
  width: 200,
  height: 200,
  fill: '#32cd79', // 背景色
  stroke: 'black', // 边框
  strokeWidth: 2, // 边框粗细
  draggable: true,
})

leafer.add(rect)

// 事件
rect.on(PointerEvent.ENTER, (e: PointerEvent) => {
  rect.fill = '#42dd89'
  rect.strokeWidth = 4
})

rect.on(PointerEvent.LEAVE, (e: PointerEvent) => {
  rect.fill = '#32cd79'
  rect.strokeWidth = 2
})

rect.on(PointerEvent.DOWN, (e: PointerEvent) => {
  rect.fill = '#229d49'
})

rect.on(PointerEvent.UP, (e: PointerEvent) => {
  rect.fill = '#32cd79'
})
document.addEventListener('DOMContentLoaded', function() {
const container = document.getElementById('gallery-container');
let photos = [];

// 示例照片数据 - 替换为你自己的作品链接
const samplePhotos = [
    { 
    	url: 'https://github.com/chen0089/operatingsystem', 
    	image: 'https://source.unsplash.com/random/300x200?1', 
    	title: '操作系统' 
    },
    { 
    	url: 'chen0089.github.io', 
    	image: 'https://source.unsplash.com/random/300x200?2', 
    	title: '个人网站' 
    },
    { 
    	url: 'https://chen0089.github.io/mcFastPack/', 
    	image: 'https://source.unsplash.com/random/300x200?3', 
    	title: 'MC快速制作资源包工具（未完成）' 
    }
];

// 初始化照片
samplePhotos.forEach(photoData => {
addPhoto(photoData);
});

// 添加照片函数
function addPhoto(photoData) {
const photo = document.createElement('div');
photo.className = 'photo';

// 随机3D位置
const radius = Math.random() * 300 + 300;
const theta = Math.random() * Math.PI * 2;
const phi = Math.random() * Math.PI;

const x = radius * Math.sin(phi) * Math.cos(theta);
const y = radius * Math.cos(phi);
const z = radius * Math.sin(phi) * Math.sin(theta);

photo.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;

// 照片内容
photo.innerHTML = `
    <a href="${photoData.url}" target="_blank">
    <img src="${photoData.image}" alt="${photoData.title}">
    <div class="caption">${photoData.title}</div>
    </a>
`;

container.appendChild(photo);
photos.push({ element: photo, radius, theta, phi });
}

// 动画循环
function animate() {
// 让照片轻微浮动
photos.forEach(photo => {
    photo.theta += 0.001;
    const x = photo.radius * Math.sin(photo.phi) * Math.cos(photo.theta);
    const y = photo.radius * Math.cos(photo.phi) + Math.sin(Date.now() * 0.001) * 20;
    const z = photo.radius * Math.sin(photo.phi) * Math.sin(photo.theta);
    
    photo.element.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
});

requestAnimationFrame(animate);
}

animate();
});
