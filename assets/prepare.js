document.getElementById("sound0").addEventListener("click", () => {
    const audio = new Audio('sound/warning.mp3');
    audio.play();
});

document.getElementById("sound1").addEventListener("click", () => {
    const audio = new Audio('sound/interval.mp3');
    audio.play();
});

document.getElementById("practice").addEventListener("click", () => {
    const dom_name = document.getElementById("name");
    const dom_blow = document.getElementById("blow");
    const dom_train = document.getElementById("train");
    const dom_rest_time = document.getElementById("rest");
    const dom_train_time = document.getElementById("train_time");
    const dom_combo_time = document.getElementById("combo_time");
    const is_custom = dom_train[train.selectedIndex].value == 'custom;;';

    /** validate rest time **/
    if (dom_rest_time.value < 1 || dom_rest_time.value > 30) {
        return;
    }

    /** required train **/
    if (dom_train.selectedIndex == 0) {
        return;
    }

    /** validate combo time when custom train **/
    if(is_custom && dom_combo_time.value < 1) {
        return;
    }

    /** validate blow time when custom train **/
    if(is_custom && dom_blow.value.indexOf(';') == -1) {
        dom_blow.value = '';
        return;
    }

    /** decode select train **/
    const combos = dom_train[train.selectedIndex].value.split(';');
    const combo_name = combos.shift();
    const combo_time = combos.shift();
    const combos_array = is_custom? dom_blow.value.split(';'): combos;

    /** mout train **/
    const data = {
        combos: combos_array.map((combo) => combo.split(',')),
        name: dom_name.value && is_custom? dom_name.value: combo_name,
        combo_time: (dom_combo_time.value? dom_combo_time.value: combo_time) * 1000,
        train_time: (dom_train_time.value? dom_train_time.value: 3) * 60,
        rest_time: (dom_rest_time.value) * 60
    };

    /**  request app **/
    const base64 = btoa(JSON.stringify(data));
    window.location.assign(`app.html?training=${base64}`);
});

document.getElementById("train").addEventListener("change", () => {
    const train = document.getElementById("train");
    const elems = document.querySelectorAll('.custom');

    console.log(elems);
    if (train.value == 'custom;;') {
        elems.forEach(elem => elem.classList.remove('hide'));
    }
    else {
        elems.forEach(elem => elem.classList.add('hide'));
    }
});