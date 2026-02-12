import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
    const [shapes, setShapes] = useState([]);
    const [currentShape, setCurrentShape] = useState(null);
    const [color, setColor] = useState('#000000');
    const [selectedType, setSelectedType] = useState('rect');
    const canvasRef = useRef(null);

    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x1 = e.clientX - rect.left;
        const y1 = e.clientY - rect.top;
        setCurrentShape({ 
            id: Date.now(), 
            type: selectedType, 
            x1, 
            y1, 
            x2: x1, 
            y2: y1, 
            color 
        });
    };

    const handleMouseMove = (e) => {
        if (!currentShape) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x2 = e.clientX - rect.left;
        const y2 = e.clientY - rect.top;
        setCurrentShape({ ...currentShape, x2, y2 });
    };

    const handleMouseUp = () => {
        if (currentShape) {
            setShapes([...shapes, currentShape]);
            setCurrentShape(null);
        }
    };

    const handleUndo = () => {
        setShapes(shapes.slice(0, -1));
    };

    const handleClearAll = () => {
        setShapes([]);
    };

    const renderShape = (shape) => {
        const { id, type, x1, y1, x2, y2, color } = shape;
        const minX = Math.min(x1, x2);
        const minY = Math.min(y1, y2);
        const width = Math.abs(x2 - x1);
        const height = Math.abs(y2 - y1);
        const radius = Math.sqrt(width * width + height * height) / 2;

        if (type === 'rect') {
            return (
                <rect 
                    key={id} 
                    x={minX} 
                    y={minY} 
                    width={width} 
                    height={height} 
                    fill={color} 
                    stroke="#000"
                    strokeWidth="1"
                />
            );
        } else if (type === 'circle') {
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2;
            return (
                <circle 
                    key={id} 
                    cx={cx} 
                    cy={cy} 
                    r={radius} 
                    fill={color}
                    stroke="#000"
                    strokeWidth="1"
                />
            );
        } else if (type === 'line') {
            return (
                <line 
                    key={id} 
                    x1={x1} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    stroke={color}
                    strokeWidth="2"
                />
            );
        }
        return null;
    };

    const circleCount = shapes.filter(s => s.type === 'circle').length;
    const rectCount = shapes.filter(s => s.type === 'rect').length;
    const lineCount = shapes.filter(s => s.type === 'line').length;

    return (
        <div className="app">
            <div className="toolbar">
                <div className="toolbar-group">
                    <label>Shape:</label>
                    <div className="button-group">
                        <button 
                            className={selectedType === 'rect' ? 'active' : ''} 
                            onClick={() => setSelectedType('rect')}
                        >
                            Rectangle
                        </button>
                        <button 
                            className={selectedType === 'circle' ? 'active' : ''} 
                            onClick={() => setSelectedType('circle')}
                        >
                            Circle
                        </button>
                        <button 
                            className={selectedType === 'line' ? 'active' : ''} 
                            onClick={() => setSelectedType('line')}
                        >
                            Line
                        </button>
                    </div>
                </div>

                <div className="toolbar-group">
                    <label>Color:</label>
                    <input 
                        type="color" 
                        value={color} 
                        onChange={(e) => setColor(e.target.value)}
                        className="color-picker"
                    />
                    <span className="color-display" style={{ backgroundColor: color }}></span>
                </div>

                <div className="toolbar-group">
                    <button onClick={handleUndo} className="btn-undo">Undo</button>
                    <button onClick={handleClearAll} className="btn-clear">Clear All</button>
                </div>

                <div className="toolbar-group stats">
                    <span>Circles drawn: <strong>{circleCount}</strong></span>
                    <span>Rectangles: <strong>{rectCount}</strong></span>
                    <span>Lines: <strong>{lineCount}</strong></span>
                </div>
            </div>

            <svg
                ref={canvasRef}
                className="canvas"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e0e0e0" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {shapes.map(renderShape)}
                
                {currentShape && renderShape({ ...currentShape, id: 'preview' })}
            </svg>
        </div>
    );
};

export default App;
