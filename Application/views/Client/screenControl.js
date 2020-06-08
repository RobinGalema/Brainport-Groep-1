const socket = io('http://localhost:8000');

let blackBox = document.getElementById("BlackScreen");

document.addEventListener("keyup", (e) => {
    if (e.code == "Space") {
        socket.emit("screenSwitch")
    }
})

socket.on("toggleBox", () => {
    if (blackBox.classList.contains("toggledOff")) 
    {
        blackBox.classList.remove("toggledOff");
    } 
    else if (!blackBox.classList.contains("toggledOff")) 
    {
        blackBox.classList.add("toggledOff");
    }
})