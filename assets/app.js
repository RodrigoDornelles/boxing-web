const irand = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const choose = (items) => {
    return items[irand(0, items.length - 1)];
};

const FSM = {
    RESTING: 0,
    TRAINING: 1,
    PREPARE: 2
};

document.addEventListener('DOMContentLoaded', function() {
    const url_current = new URL(window.location.href);
    const url_params = new URLSearchParams(url_current.search);
    const default_data = JSON.parse(atob(url_params.get('training')));
    const nav_clock = document.getElementById('nav-clock');
    const nav_name = document.getElementById('nav-name');
    const node = document.getElementById('node');
    let state = FSM.RESTING;
    let time_left = 10;
    let combo = false;

    /** set train name */
    document.title = default_data.name;
    nav_name.innerHTML = default_data.name;

    /** create real clock */
    setInterval(() => {
        const clock = new Date();
        nav_clock.innerHTML = `${clock.getHours()}:${clock.getMinutes()}:${clock.getSeconds()}`
    }, 1000);

    /** chronometer **/
    setInterval(() => time_left -= 1, 1000);

    /** main loop **/
    setInterval(() => {
        if (state == FSM.RESTING && time_left) {
            node.innerHTML = `<p>Començando em ${time_left} ...</p>`;
        }
        else if (state == FSM.RESTING && time_left <= 0) {
            node.innerHTML = `<p>Vamos treinar!</p>`;
            state = FSM.PREPARE;
        }
        else if (state == FSM.PREPARE) {
            time_left = default_data.train_time;
            state = FSM.TRAINING;
            combo = false;
        }
        else if (state == FSM.TRAINING && time_left <= 0) {
            time_left = default_data.rest_time;
            state = FSM.RESTING;
        }
    }, 
        1000
    );

    /** render training **/
    setInterval(() => {
        if (state != FSM.TRAINING) {
            return;
        }

        if (combo && irand(0, 1)){
            return;
        }

        node.innerHTML = `<p>${choose(default_data.combos).join(' ')}</p>`;
        combo = true;
    },
        5000
    );
});