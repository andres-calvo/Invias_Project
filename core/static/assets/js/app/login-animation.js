document.addEventListener('DOMContentLoaded', () => {
    function animateSgv (id, delay, delayIncrement,duration){
        const logo = document.getElementById(id);
        const logoPaths = document.querySelectorAll(`#${id} path`);
        delay = delay;
        for(let i = 0; i < logoPaths.length;i++){
            logoPaths[i].style.strokeDasharray  = logoPaths[i].getTotalLength();
            logoPaths[i].style.strokeDashoffset = logoPaths[i].getTotalLength();
            logoPaths[i].style.animation = `line-anim ${duration}s ease forwards ${delay}s`;
            delay+=delayIncrement;
            console.log(delay)
        }
        logo.style.animation = `fill-black 1s ease forwards ${delay}s`;
    }
// Set the id of SVG, delay time in seconds to start animation and delay between each animation
    animateSgv('textup', 0, 0.385,2)
    animateSgv('textdown', 0, 0.1,0.5)  
}, false);

