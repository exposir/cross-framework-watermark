import React from 'react';
import ReactDOM from 'react-dom';
import { getReactWatermarkWithText } from './path-to-your-entry-file';

const ReactWatermarkWithText = getReactWatermarkWithText("My Custom Text");

const App = () => {
    return (
        <div>
            <ReactWatermarkWithText />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
