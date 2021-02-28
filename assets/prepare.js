document.getElementById("sound0").addEventListener("click", () => {
    alert('sound 0');
});

document.getElementById("sound1").addEventListener("click", () => {
    alert('sound 1');
});

document.getElementById("practice").addEventListener("click", () => {
    const rest = document.getElementById("rest");
    const name = document.getElementById("name");
    const train = document.getElementById("train");

    /** validate rest time **/
    if (rest.value < 1 || rest.value > 30) {
        return;
    }

    /** required train **/
    if (train.selectedIndex == 0){
        return;
    }

    /** decode select train **/
    const combos = train[train.selectedIndex].value.split(';');
    const combo_name = combos.shift();
    const combo_time = combos.shift();

    /** mout train **/
    const data = {
        combos: combos.map((combo) => combo.split(',')),
        name: name.value? name.value: combo_name,
        combo_time: 1000 * combo_time,
        rest_time: 60 * rest.value,
        train_time: 60 * 3
    };

    /**  request app **/
    const base64 = btoa(JSON.stringify(data));
    window.location.assign(`app.html?training=${base64}`);
});