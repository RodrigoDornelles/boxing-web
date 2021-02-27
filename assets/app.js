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
        if (state == FSM.RESTING && time_left == 0) {
            state = FSM.PREPARE;
        }
        else if (state == FSM.PREPARE && time_left < 0) {
            time_left = default_data.train_time;
            state = FSM.TRAINING;
        }
        else if (state == FSM.TRAINING && time_left < 0) {
            time_left = default_data.rest_time;
            state = FSM.RESTING;
        }
    }, 1000);

    /** render loop **/
    setInterval(() => {
        switch(state) {
            case FSM.RESTING:
                node.innerHTML = `<h1>Començando em ${time_left} ...</h1>`;
                break;

            case FSM.PREPARE:
                node.innerHTML = `<h1>Vamos treinar!</h1>`;
                break;

            case FSM.TRAINING:
                node.innerHTML = `treinando!`;
                break;
        }
    }, 500);
});