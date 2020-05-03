import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
	return (
		<div>
			<HookSwitcher />
		</div>
	)
};

const HookSwitcher = () => {

	const [ color, setColor ] = useState('gray');
	const [ fontSize, setFontSize ] = useState(14);

	return (
		<div style={{
			padding: '10px',
			backgroundColor: color,
			fontSize: `${fontSize}px`}}>
				Hooook
			<button onClick={() => setColor('gray')}>
				Dark
			</button>
			<button onClick={() => setColor('white')}>
				Light
			</button>
			<button onClick={() => setFontSize((state) => state + 2)}>
				+
			</button>
		</div>
	);
};
 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
