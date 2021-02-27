document.getElementById("sound0").addEventListener("click", () => {
    alert('sound 0');
});

document.getElementById("sound1").addEventListener("click", () => {
    alert('sound 1');
});

document.getElementById("practice").addEventListener("click", () => {
    const rest = document.getElementById("rest");
    const name = document.getElementById("name");

    /** validate rest time **/
    if (rest.value < 1 || rest.value > 30) {
        return;
    }
    
    const data = {
        name: name.value,
        rest_time: 60 * rest.value,
        train_time: 60 * 3,
    };

    const base64 = btoa(JSON.stringify(data));
    window.location.assign(`/app.html?training=${base64}`);
});