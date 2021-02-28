const irand = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const choose = (items) => {
    return items[irand(0, items.length - 1)];
};

const draw = (items) => {
    return `<p>${items.map(item => `<span>${item}</span>`).join(' ')}</p>`;
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
    let timeout;

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

    /** render training **/
    const training = () => {
        if (state != FSM.TRAINING) {
            return;
        }

        node.innerHTML = draw(choose(default_data.combos));
        timeout = setTimeout(training, default_data.combo_time);
    };

    /** main loop **/
    setInterval(() => {
        if (state == FSM.RESTING && time_left > 0) {
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
            clearTimeout(timeout);
            training();
        }
        else if (state == FSM.TRAINING && time_left <= 0) {
            time_left = default_data.rest_time;
            state = FSM.RESTING;
        }
    }, 
        1000
    );
});