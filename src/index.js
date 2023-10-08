import VueWatermark from './VueWatermark.vue';
import ReactWatermark from './ReactWatermark';
import React from 'react';

export const getVueWatermarkWithText = (text) => {
    return {
        ...VueWatermark,
        props: {
            ...VueWatermark.props,
            text: {
                type: String,
                default: text,
            },
        },
    };
};

export const getReactWatermarkWithText = (text) => {
    return (props) => <ReactWatermark {...props} text={text || props.text} />;
};



