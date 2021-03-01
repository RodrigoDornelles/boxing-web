const irand = (min, max) => Math.round(Math.random() * (max - min) + min);

const choose = (items) => items[irand(0, items.length - 1)];

const draw = (items) => `<p>${items.map(item => `<span>${item}</span>`).join(' ')}</p>`;

const FSM = {
    RESTING: 0,
    TRAINING: 1,
    PREPARE: 2
};

document.addEventListener('DOMContentLoaded', function() {
    const audio_warning = new Audio('sound/warning.mp3');
    const audio_interval = new Audio('sound/interval.mp3');
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
        nav_clock.innerHTML = clock.toLocaleTimeString('pt-BR', {hour12: true});
    }, 1000);

    /** chronometer **/
    setInterval(() => time_left -= 1, 1000);

    /** render training **/
    const training = () => {
        if (state !== FSM.TRAINING) {
            return;
        }

        clearTimeout(timeout);
        node.innerHTML = draw(choose(default_data.combos));
        timeout = setTimeout(training, default_data.combo_time);
    };

    /** main loop **/
    setInterval(() => {
        if (state === FSM.RESTING && time_left > 0) {
            node.innerHTML = `<p>Começando em ${time_left} ...</p>`;
        }
        else if (state === FSM.RESTING && time_left <= 0) {
            node.innerHTML = `<p>Vamos treinar!</p>`;
            state = FSM.PREPARE;
        }
        else if (state === FSM.PREPARE) {
            audio_interval.play();
            time_left = default_data.train_time;
            state = FSM.TRAINING;
            training();
        }
        else if (state === FSM.TRAINING && time_left == 11) {
            audio_warning.play();
        }
        else if (state === FSM.TRAINING && time_left <= 0) {
            audio_interval.play();
            time_left = default_data.rest_time;
            state = FSM.RESTING;
        }
    }, 
        1000
    );
});