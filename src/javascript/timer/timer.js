// clock(1000, 1000);        
function clock(i, j) {
    if (i > 0 && j > 0) {
        times.innerText = i;
        i--;
        setTimeout(function() {
            clock(i, j);
        }, j);
    }
}