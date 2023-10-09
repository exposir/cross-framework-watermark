import React, { useEffect, useRef, useMemo } from 'react';
import debounce from 'lodash/debounce';

const Watermark = ({ children, text = 'Default Watermark' }) => {
    // 为canvas和其容器创建引用
    const watermarkRef = useRef(null);
    const containerRef = useRef(null);

    // 用于水印的颜色
    const dynamicColor = 'rgba(0, 0, 0, 0.7)';

    // 创建防抖函数
    const debouncedDraw = useMemo(
        () => debounce(() => draw(), 200),
        []
    );

    // 绘制水印的函数
    const draw = () => {
        const canvas = watermarkRef.current;
        const ctx = canvas.getContext('2d');
        // 清除之前的绘制
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 设置文本样式
        ctx.font = '30px Arial';
        ctx.fillStyle = dynamicColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 根据父容器设置canvas尺寸
        const { width, height } = canvas.parentElement.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        // 绘制水印文本
        ctx.fillText(text, width / 2, height / 2);
    };

    // 如果水印被从DOM中删除，重新绘制
    const drawIfRemoved = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.removedNodes.length > 0) {
                for (const node of mutation.removedNodes) {
                    if (node === watermarkRef.current) {
                        draw();
                        return;
                    }
                }
            }
        }
    };

    // 初始化和更新绘制，以及事件监听
    useEffect(() => {
        draw();  // 初始绘制

        // 窗口大小变化时更新
        const onResize = () => draw();
        window.addEventListener('resize', onResize);

        // 监控父容器的DOM变化
        const config = { childList: true };
        const observer = new MutationObserver((mutationsList) => {
            debouncedDraw();
            drawIfRemoved(mutationsList);
        });
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

    // 渲染容器和canvas
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
