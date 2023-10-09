import React, { useEffect, useRef, useMemo } from 'react';
import debounce from 'lodash/debounce';

const Watermark = ({ children, text = 'Default Watermark' }) => {
    const watermarkRef = useRef(null);
    const containerRef = useRef(null);
    const dynamicColor = 'rgba(0, 0, 0, 0.7)';

    const debouncedDraw = useMemo(
        () => debounce(() => draw(), 200),
        []
    );

    const draw = () => {
        const canvas = watermarkRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = '30px Arial';
        ctx.fillStyle = dynamicColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const { width, height } = canvas.parentElement.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        ctx.fillText(text, width / 2, height / 2);
    };

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

    useEffect(() => {
        draw();

        const onResize = () => draw();
        window.addEventListener('resize', onResize);

        const config = { childList: true };
        const observer = new MutationObserver((mutationsList) => {
            debouncedDraw();
            drawIfRemoved(mutationsList);
        });
        observer.observe(containerRef.current, config);

        const resizeObserver = new ResizeObserver(() => draw());
        resizeObserver.observe(containerRef.current);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', onResize);
            resizeObserver.disconnect();
        };
    }, [text, dynamicColor, debouncedDraw]);

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
