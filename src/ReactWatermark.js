import React, { useEffect, useRef, useMemo } from 'react';
import debounce from 'lodash/debounce';

const Watermark = ({ children, text = 'Default Watermark' }) => {
    const watermarkRef = useRef(null);  // 为 canvas 元素创建 ref
    const containerRef = useRef(null);  // 为父容器创建 ref
    const dynamicColor = 'rgba(0, 0, 0, 0.7)';  // 水印的颜色

    // 使用防抖功能优化 draw 函数
    const debouncedDraw = useMemo(
        () => debounce(() => draw(), 200),
        []
    );

    // 绘制水印的函数
    const draw = () => {
        const canvas = watermarkRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // 清除之前的绘制

        // 设置文本样式
        ctx.font = '30px Arial';
        ctx.fillStyle = dynamicColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 根据父容器设置 canvas 尺寸
        const { width, height } = canvas.parentElement.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        // 绘制水印文本
        ctx.fillText(text, width / 2, height / 2);
    };

    useEffect(() => {
        draw();  // 初始绘制

        // 窗口大小变化时更新
        const onResize = () => draw();
        window.addEventListener('resize', onResize);

        // 监控父容器的 DOM 变化
        const config = { childList: true };
        const observer = new MutationObserver(() => debouncedDraw());
        observer.observe(containerRef.current, config);

        // 监控父容器的尺寸变化
        const resizeObserver = new ResizeObserver(() => draw());
        resizeObserver.observe(containerRef.current);

        // 清理
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', onResize);
            resizeObserver.disconnect();
        };
    }, [text, dynamicColor, debouncedDraw]);

    // 渲染容器和 canvas
    return (
        <div ref={containerRef} style={{ position: 'relative' }}>
            {children}
            <canvas ref={watermarkRef} style={{
                position: 'absolute',
                zIndex: 9999,
                pointerEvents: 'none'
            }}></canvas>
        </div>
    );
};

export default Watermark;



