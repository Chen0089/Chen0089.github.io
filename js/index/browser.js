if (BrowserUtils.isLegacyEdge()) {
    alert("您好!\n您正在使用旧版Edge进行浏览！请更新您的浏览器！");
} else if(BrowserUtils.isEdge()) {
    if(BrowserUtils.isChromiumEdge()) {
        console.log("检测通过！");
    }
} else if (
    // 使用其他浏览器 检测是否能正常访问
    BrowserUtils.supports('css:display', 'grid')
    && BrowserUtils.supportsWebP()
) {
    console.log("检测通过！");
} else {
    alert("您好！\n您现在在使用其他浏览器进行浏览，请更新你的浏览器或者换个主流浏览器？");
}
