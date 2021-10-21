import './App.css';
import React, {Component, useRef, useEffect} from 'react';


const PunchCafeBar = (props, state) => {

    // extract when you know how lol
    const repeated_with = 300;
    const bar_height = 30;

    const total_pixels = repeated_with * bar_height;
    const noise_fraction = 0.05;
    const noise_range = 0.2; // limit of change of percentage of color shift

    const canvasRef = useRef(null)

    useEffect(() => {
        
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.height = bar_height;
        canvas.width = repeated_with;


        const fillStyles = ['#FFFFFF', '#FF0000', '#00FF00', '#0000FF']

        context.fillStyle = '#000000'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        // randomise the distribution of different alpha fractions, set fillStyle then do one at a time
        for(var i = 0; i < Math.floor(noise_fraction * total_pixels); i++) {
            const randomX = Math.floor(Math.random() * repeated_with); // consider randomising with single seed and modulusing
            const randomY = Math.floor(Math.random() * bar_height);
            const fillIndex = Math.floor(Math.random() * 3);
            context.fillStyle = fillStyles[fillIndex]
            context.fillRect(randomX, randomY, 1, 1)
        }
    });

    return (<canvas ref={canvasRef}/>);
}

export default PunchCafeBar;