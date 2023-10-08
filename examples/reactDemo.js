import React from 'react';
import { getReactWatermarkWithText } from './WatermarkFactory';

const CustomizedReactWatermark = getReactWatermarkWithText("React Watermark");

const ReactDemo = () => {
    return (
        <div>
            <CustomizedReactWatermark>
                <p>This is a content wrapped with a watermark.</p>
            </CustomizedReactWatermark>
        </div>
    );
};

export default ReactDemo;
