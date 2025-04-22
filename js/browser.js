// 浏览器检测工具
const BrowserUtils = {
    /**
     * 检测是否为Edge浏览器
     * @returns {boolean}
     */
    isEdge: function() {
        const ua = navigator.userAgent;
        return /Edg\//i.test(ua) || /Edge\//i.test(ua) || !!window.navigator.msSaveBlob;
    },

    /**
     * 检测是否为Chromium版Edge
     * @returns {boolean}
     */
    isChromiumEdge: function() {
        return /Edg\//i.test(navigator.userAgent);
    },

    /**
     * 检测是否为旧版Edge(EdgeHTML)
     * @returns {boolean}
     */
    isLegacyEdge: function() {
            return /Edge\//i.test(navigator.userAgent) || !!window.navigator.msSaveBlob;
    },

    /**
     * 特性检测方法
     * @param {string} feature 要检测的特性名称
     * @returns {boolean}
     */
    supports: function(feature) {
        if (feature.startsWith('css:')) {
            const cssFeature = feature.replace('css:', '');
            return CSS.supports(cssFeature);
        }
        return feature in window;
    },

    /**
     * 检测WebP图片支持
     * @returns {Promise<boolean>}
     */
    supportsWebP: async function() {
        try {
            const response = await fetch('data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=');
            const blob = await response.blob();
            return blob.type === 'image/webp';
        } catch {
            return false;
        }
    },

    // 全部检测
    ALLdebug: async function() {
        console.log('当前浏览器是Edge吗？', BrowserUtils.isEdge());
        console.log('当前浏览器是Chromium版Edge吗？', BrowserUtils.isChromiumEdge());
        console.log('当前浏览器是旧版Edge吗？', BrowserUtils.isLegacyEdge());
        console.log('支持CSS Grid吗？', BrowserUtils.supports('css:display', 'grid'));
        console.log('支持WebP吗？', await BrowserUtils.supportsWebP());
    }
};
