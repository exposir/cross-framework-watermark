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



// 这个水印组件有以下几个主要特点：

// 1. **动态绘制**：使用 canvas API 进行水印文本的绘制。
// 2. **可配置性**：接受 **`children`** 和 **`text`** 参数，使得水印文本和子元素都可以动态设置。
// 3. **自适应**：水印组件会自动适应父容器的尺寸，并在窗口或容器尺寸变化时重新绘制水印。
// 4. **防抖优化**：利用 lodash 的 **`debounce`** 函数，防止在短时间内多次重绘。
// 5. **DOM 监控**：使用 **`MutationObserver`** 和 **`ResizeObserver`** 来监测父容器的 DOM 变化和尺寸变化，从而实时更新水印。
// 6. **样式隔离**：使用了 **`position: 'absolute'`** 和 **`pointerEvents: 'none'`** 等样式，确保水印不影响其他 UI 元素。
// 7. **组件解耦**：通过 React 的 **`useEffect`** 和 **`useRef`** 等 Hook，使逻辑与 UI 渲染良好地解耦。
// 8. **清理机制**：在 **`useEffect`** 的返回函数中清理事件监听和 observer，防止内存泄漏。

// 综合来看，这是一个功能全面、易于集成、并具有一定性能优化的水印组件。