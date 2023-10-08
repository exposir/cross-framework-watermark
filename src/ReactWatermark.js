import React, { useEffect, useRef } from 'react';
import './Watermark.css';

const Watermark = ({ children, text = 'Default Watermark' }) => {
    const watermarkRef = useRef(null);
    let animationFrameId = null;

    const draw = () => {
        const canvas = watermarkRef.current;
        const ctx = canvas.getContext('2d');

        // 清空Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 设置Canvas属性
        ctx.font = '30px Arial';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 获取父元素尺寸
        const parent = canvas.parentElement;
        const { width, height } = parent.getBoundingClientRect();

        // 设置Canvas尺寸
        canvas.width = width;
        canvas.height = height;

        // 绘制水印
        ctx.fillText(text, width / 2, height / 2);

        // 如果需要更复杂的动画或实时更新，这里可以重新调用requestAnimationFrame
        // animationFrameId = requestAnimationFrame(draw);
    };

    useEffect(() => {
        animationFrameId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [text]);

    return (
        <div className="watermark-container">
            {children}
            <canvas ref={watermarkRef} className="watermark"></canvas>
        </div>
    );
};

export default Watermark;
