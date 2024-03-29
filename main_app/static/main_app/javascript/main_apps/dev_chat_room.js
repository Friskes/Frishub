class Player {

    constructor(messages) {
        this.__init__(messages);
        // костыль для получения истинной ширины контейнера
        // получать ширину надо после того как dev-chat-container стал display: block
        let _this = this;
        $('#dev-chat-container').on('re_init_player', function (event) {
            _this.__init__(messages);
        });
    };

    reuse(dc_messages) {
        this.messages = dc_messages;
        this.startTime = parseFloat(this.get_create_time(0));
        this.endTime = parseFloat(this.get_create_time(this.messages_len));
        this.totalTime = this.endTime - this.startTime;
    };

    __init__(messages) {
        let dc_messages = JSON.parse(JSON.stringify(messages));

        this.messages_len = dc_messages.length - 1;
        this.bar_width = $('.player__progress')[0].getBoundingClientRect().width;

        // добавляю временной сдвиг для всех сообщений в которых координаты курсора null
        this.reuse(dc_messages);
        for (let i in dc_messages) {
            if (this.get_sender_cur_pos(i) === null) {
                dc_messages[i]['create_time'] -= this.totalTime / this.bar_width;
            };
        };
        this.reuse(dc_messages);

        this.pointer_width = (this.bar_width / 100) * 1; // 1%
        $('.player__time_start').text('00:00');
        $('.player__time_end').text(this.humanize_time(this.totalTime));
        this.minOffsetX = null;
        this.maxOffsetX = null;
        this._pause = false;
        this._playing = false;
        this.currentTime = this.startTime;
        this.speed = 1;
        $('.player__button_type_speed').children().text(`${this.speed}x`);
        this.actual_pointer_offsetX = 0;
        this.remove_pointer();
        this.remove_frames();
        this.frames_offsetX = [];
        this.generate_frames();
    };

    remove_pointer() {
        let pointer = document.querySelector('.player__pointer');
        if (pointer) {
            pointer.remove();
        };
    };

    remove_frames() {
        // удаляем все старые фреймы перед добавлением новых
        $('.player__frame-container div').each(function (index, element) {
            element.remove();
        });
    };

    generate_frames() {
        // пустые зоны слева и справа должны соответствовать ширине поинтера
        // рассчитываем ширину бара с учётом ширины поинтера
        let bar_width = this.bar_width - this.pointer_width;
        // рассчитываем ширину фреймов на основе длины записи и коэффициента
        let frame_width = (bar_width / this.totalTime) / 15;
        // рассчитываем минимальную ширину фреймов на основе коэффициента
        frame_width = Math.max(bar_width / 500, frame_width);
        // т.к. все фреймы будут сдвинуты вправо на ширину поинтера, учитываем эту ширину вместе с шириной фрейма
        bar_width -= this.pointer_width + frame_width;

        for (let i in this.messages) {

            let currentTime = this.get_create_time(i);

            // получение позиции фрейма на таймлайне, сдвиг которого высчитывается
            // относительно ширины прогресс бара и текущего времени
            let frame_offsetX = bar_width * ((currentTime - this.startTime) / this.totalTime);

            frame_offsetX += this.pointer_width; // сдвигаем все фреймы вправо на ширину поинтера

            this.frames_offsetX.push(frame_offsetX);

            $('.player__frame-container')[0].insertAdjacentHTML('beforeEnd',
                `<div class="player__frame" draggable="false"
          style="transform: translateX(${frame_offsetX}px); width: ${frame_width}px;
          background-color:${this.get_sender_color(i)};"></div>`
            );
        };
    };

    get_chat_text(index = 0) {
        return this.messages[index]['chat_text'];
    };

    get_create_time(index = 0) {
        return this.messages[index]['create_time'];
    };

    get_sender_data(index = 0) {
        return this.messages[index]['sender'];
    };

    get_sender_color(index = 0) {
        return Object.values(this.get_sender_data(index))[0]['user_color'];
    };

    get_sender_cur_pos(index = 0) {
        return Object.values(this.get_sender_data(index))[0]['cur_pos'];
    };

    play() {
        // обновляю позицию поинтера на случай если его двигали вручную во время паузы
        this.currentTime = this.calculate_time_by_offsetX(this.actual_pointer_offsetX, true);

        if (this.actual_pointer_offsetX == 0) {
            update_dev_chat_text(this.get_chat_text(0));
            update_dev_chat_cursors(this.get_sender_data(0), false);
        };

        this._playing = true;
        this._pause = false;
        this.playback_in_automatic_mode();
    };

    pause() {
        this._playing = false;
        this._pause = true;
    };

    skip() {
        this.currentTime = this.endTime;
        this.actual_pointer_offsetX = 0;

        this.set_pointer_by_offsetX(this.bar_width);
        this.set_timer_by_offsetX(this.bar_width);

        for (let i in this.messages) {
            update_dev_chat_text(this.get_chat_text(i));
            update_dev_chat_cursors(this.get_sender_data(i), false);
        };
    };

    set_speed(speed) {
        this.speed = speed;
    };

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    async playback_in_automatic_mode() {

        // если после перемещения в ручном режиме поинтер оказался в крайней правой точке, начинаем отсчёт с начала
        let last_offsetX = this.bar_width * ((this.currentTime - this.startTime) / this.totalTime);
        if (last_offsetX >= this.maxOffsetX) {
            this.currentTime = this.startTime;
        };

        while (this._pause == false && this.currentTime < this.endTime) {

            let offsetX = this.bar_width * ((this.currentTime - this.startTime) / this.totalTime);
            this.actual_pointer_offsetX = offsetX;

            this.set_pointer_by_offsetX(offsetX);
            this.set_timer_by_offsetX(offsetX);

            this.set_text_by_offsetX(offsetX);

            // костыль для корректировки времени, неточность будет составлять не менее 4мс,
            // т.к. меньше этого интервала setTimeout/setInterval не переваривают.
            let timeStamp = Date.now();
            await this.sleep(4);
            this.currentTime += (Date.now() - timeStamp) / (1000 / this.speed);
        };

        // обновляем все переменные после полного завершения проигрывания
        if (this.currentTime >= this.endTime) {
            this._playing = false;
            $('.player__button_type_play').children().text('play_arrow');
            this.currentTime = this.startTime;
            this.actual_pointer_offsetX = 0;
        };
    };

    playback_in_manual_mode(offsetX) {
        this.actual_pointer_offsetX = offsetX;

        // обновляю позицию поинтера при движении в ручном режиме
        if (this._playing) {
            this._pause = true; // блокирую цикл пока происходит перемещение поинтера в ручном режиме
            $('.player__button_type_play').children().text('play_arrow');
            this.currentTime = this.calculate_time_by_offsetX(offsetX, true);
        };

        this.set_pointer_by_offsetX(offsetX);

        this.set_text_by_offsetX(offsetX);
    };

    // форматируем время в человекочитаемый вид
    humanize_time(seconds) {
        seconds = Math.round(seconds);

        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        let hours = Math.floor(minutes / 60);
        minutes = minutes % 60;

        if (hours > 0) {
            return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
        };
        return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
    };

    // вычисляем время на основе offsetX
    calculate_time_by_offsetX(offsetX, reverse = false) {
        let progress;
        if (reverse) {
            progress = offsetX / this.bar_width; // процент заполнения бара от начала до offsetX (от 0 до 1)
        } else {
            progress = (this.bar_width - offsetX) / this.bar_width; // процент заполнения бара от offsetX до конца (от 1 до 0)
        };
        return this.startTime + progress * this.totalTime;
    };

    // устанавливаем текст на основе offsetX
    set_text_by_offsetX(offsetX) {
        for (let i in this.frames_offsetX) {
            if (offsetX > this.frames_offsetX[i]) {
                update_dev_chat_text(this.get_chat_text(i));
                update_dev_chat_cursors(this.get_sender_data(i), false);
            };
        };
    };

    // устанавливаем время для таймера основанное на offsetX
    set_timer_by_offsetX(offsetX) {
        let start_time = this.calculate_time_by_offsetX(offsetX);
        let formatted_time = this.humanize_time(this.endTime - start_time);
        $('.player__time_start').text(formatted_time);
    };

    // создаём либо устанавливаем позицию для pointer
    set_pointer_by_offsetX(offsetX) {

        let pointer = document.querySelector('.player__pointer');
        if (!pointer) {
            $('.player__progress')[0].insertAdjacentHTML('beforeEnd',
                `<div draggable="false" class="player__pointer"
          style="transform: translateX(${offsetX}px);
          width: ${this.pointer_width}px; left: -${this.pointer_width / 2}px;"></div>`
            );
            pointer = document.querySelector('.player__pointer');
        };
        // не позволяем pointer выходить за границу бара изза собственной длины
        if (!this.minOffsetX || !this.maxOffsetX) {
            let pointer_shift = this.pointer_width / 2;
            this.minOffsetX = pointer_shift;
            this.maxOffsetX = this.bar_width - pointer_shift;
        };
        offsetX = Math.max(this.minOffsetX, Math.min(this.maxOffsetX, offsetX));

        pointer.style.transform = `translateX(${offsetX}px)`;

        // делаю кнопку промотки активной/неактивной в зависимости от позиции поинтера
        if (offsetX >= this.maxOffsetX) {
            disable_skip_btn();
        } else {
            enable_skip_btn();
        };
    };

    bar_mouseup() {
        // после завершения передвижения поинтера разблокируем цикл
        if (this._playing) {
            $('.player__button_type_play').children().text('pause');
            this._pause = false;
            this.playback_in_automatic_mode();
        };
    };

    // при движении курсора по прогресс бару временно устанавливаем время исходя из позиции
    bar_mousemove(offsetX) {
        if (this._playing && this._pause
            || !this._playing && !this._pause
            || !this._playing && this._pause) {
            this.set_timer_by_offsetX(offsetX);
        };
    };

    // при уходе курсора за границы прогресс бара
    // возвращаем время которое было записано ранее на основе реальной позиции pointer
    bar_mouseout() {
        this.set_timer_by_offsetX(this.actual_pointer_offsetX);
    };
};


let mousedown = false;

// добавление микро задержки для фикса бага когда во время работы плеера тапаешь для промотки
// и плеер сам по себе ускоряется (только на смартфоне)
let debounce_bar_mouseup = debounce(() => { player.bar_mouseup(); }, 4);

// компьютер
$('.player__progress').on('mousedown', function (event) {
    if (event.button == 0) { // пропускаем только левую кнопку мыши
        mousedown = true;
        player.playback_in_manual_mode(event.offsetX);
    };
});
$(document).on('mouseup', function (event) {
    if (event.button == 0 && mousedown) {
        mousedown = false;
        debounce_bar_mouseup();
    };
});
// обход для того чтобы можно было менять положение поинтера за пределами границ бара
$(document).on('mousemove', function (event) {
    if (mousedown) {
        let bar = $('.player__progress')[0];
        let offsetX = Math.round(event.clientX - bar.getBoundingClientRect().left);
        offsetX = Math.max(0, Math.min(bar.offsetWidth, offsetX));
        // let offsetY = Math.round(event.clientY - bar.getBoundingClientRect().top);
        // offsetY = Math.max(0, Math.min(bar.offsetHeight, offsetY));

        player.bar_mousemove(offsetX);
        player.playback_in_manual_mode(offsetX);
    };
});
$('.player__progress').on('mousemove', function (event) {
    player.bar_mousemove(event.offsetX);
});
$('.player__progress').on('mouseout', function (event) {
    player.bar_mouseout();
});


// смартфон
$('.player__progress').on('touchstart', function (event) {
    mousedown = true;

    let offsetX = Math.round(event.changedTouches[0].clientX - this.getBoundingClientRect().left);
    offsetX = Math.max(0, Math.min(this.offsetWidth, offsetX));

    player.playback_in_manual_mode(offsetX);
});
$(document).on('touchend', function (event) {
    if (mousedown) {
        mousedown = false;
        debounce_bar_mouseup();
    };
});
$('.player__progress').on('touchmove', function (event) {
    event.preventDefault(); // отменяем скролл страницы на время пока выполняется перемещение поинтера

    let offsetX = Math.round(event.changedTouches[0].clientX - this.getBoundingClientRect().left);
    offsetX = Math.max(0, Math.min(this.offsetWidth, offsetX));

    player.bar_mousemove(offsetX);
    if (mousedown) {
        player.playback_in_manual_mode(offsetX);
    };
});


function room_state_unlock() {

    let close_room_btn = $('#close_room_btn')[0];
    close_room_btn.classList.remove('close-room-yes');
    close_room_btn.classList.add('close-room-no');
    close_room_btn.textContent = trans_stop_chat;

    let close_room_info = $('#close_room_info')[0];
    close_room_info.classList.remove('close-room-no');
    close_room_info.classList.add('close-room-yes');
    close_room_info.textContent = trans_opened_chat;

    code_editor.setReadOnly(false);

    player.skip();
    remove_all_cursors();

    lock_room = false;

    let player_container = $('.player-container');
    player_container.css('display', 'none');
};

function room_state_lock(chat_history) {

    let close_room_btn = $('#close_room_btn')[0];
    close_room_btn.classList.remove('close-room-no');
    close_room_btn.classList.add('close-room-yes');
    close_room_btn.textContent = trans_resume_chat;

    let close_room_info = $('#close_room_info')[0];
    close_room_info.classList.remove('close-room-yes');
    close_room_info.classList.add('close-room-no');
    close_room_info.textContent = trans_closed_chat;

    let player_container = $('.player-container');
    if (window.screen.width > 800) {
        player_container.css('display', 'flex');
    } else {
        player_container.css('display', 'block');
    };

    code_editor.setReadOnly(true);

    player = new Player(chat_history); // создаю глобальную переменную которую будет видно во всём документе

    lock_room = true;
};

$('#close_room_btn').on('click', function (event) {
    // можно было бы сделать так:
    // создаём переменную в которой хранится блокировка этого ивентера
    // отправляем сообщение на серв, одновременно с этим создаём отложенный вызов с помощью setTimeout на секунды 2
    // если сообщение с серва пришло разблокируем ивентер изменяя значение переменной
    // если сообщение не пришло значит по истечению таймаута эта переменная автоматически изменится и разблокирует ивентер
    if (lock_room) {
        chatSocket.send(JSON.stringify(
            { 'room_state': 'unlock' }
        ));
    } else {
        chatSocket.send(JSON.stringify(
            { 'room_state': 'lock' }
        ));
    };
});

$('.player__button_type_play').on('click', function (event) {
    let child = $(this).children();

    if (child.text() == 'play_arrow') {

        child.text('pause');
        enable_skip_btn();
        player.play();

    } else {
        child.text('play_arrow');
        player.pause();
    };
});

$('.player__button_type_speed').on('click', function (event) {
    let child = $(this).children();
    let speed;
    if (child.text() == '0.25x') { speed = 0.5; }
    else if (child.text() == '0.5x') { speed = 1; }
    else if (child.text() == '1x') { speed = 2; }
    else if (child.text() == '2x') { speed = 4; }
    else if (child.text() == '4x') { speed = 8; }
    else if (child.text() == '8x') { speed = 16; }
    else if (child.text() == '16x') { speed = 0.25; };
    child.text(`${speed}x`);
    // изменяем скорость воспроизведения
    player.set_speed(speed);
});

$('.player__button_type_skip').on('click', function (event) {

    $('.player__button_type_play').children().text('play_arrow');
    disable_skip_btn()
    // $('.player__pointer').remove(); // удаляем курсор после промотки
    player.skip();
});

function enable_skip_btn() {
    let skip = $('.player__button_type_skip');
    skip.removeClass('disabled_skip');
    skip[0].disabled = false;
};
function disable_skip_btn() {
    let skip = $('.player__button_type_skip');
    skip.addClass('disabled_skip');
    skip[0].disabled = true;
};


// оптимизатор
(function () {
    let throttle = function (type, name, obj) {
        obj = obj || window;
        let running = false;
        let func = function () {
            if (running) { return; };
            running = true;
            requestAnimationFrame(function () {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    throttle('resize', 'resize2');
})();

$(window).on('load', function (event) {
    // защита от скролла на смартфоне
    let prevCW = document.documentElement.clientWidth; // Ширина экрана
    let prevCH = document.documentElement.clientHeight; // Высота экрана

    $(window).on('resize2', function (event) {
        let curCW = document.documentElement.clientWidth;
        let curCH = document.documentElement.clientHeight;
        if (prevCW != curCW || prevCH != curCH) {
            prevCW = curCW;
            prevCH = curCH;
            // при изменении масштаба страницы вручную генерируем ивент
            // для того чтобы повторно обновить длину прогресс бара
            $('#dev-chat-container')[0].dispatchEvent(new Event('re_init_player'));
        };
    });
});


var code_editor = ace.edit("code_editor");

code_editor.setTheme("ace/theme/cloud9_night_low_color");

code_editor.setShowPrintMargin(false); // убрать вертикальную полосу по центру редактора

code_editor.setOptions({
    customScrollbar: true,
    // enableAutoIndent: false, // отключить автоматический TAB
});

// code_editor.session.gutterRenderer = {
//   getWidth: function(session, lastLineNumber, config) {
//     return lastLineNumber.toString().length * config.characterWidth; // ширина gutter
//   },
//   getText: function(session, row) {
//     // return String.fromCharCode(row + 65); // заглавные буквы алфавита вместо цифр
//     return row + 1;
//   }
// };

const cursorManager = new AceCollabExt.AceMultiCursorManager(code_editor.getSession());

const selectionManager = new AceCollabExt.AceMultiSelectionManager(code_editor.getSession());


function search_element(id, target) {
    let found_element = null;
    $(`#${id} option`).each(function (index, element) {
        if (target == 'selected' && target in element.attributes) {
            found_element = element;
            return false;
        } else if (target != 'selected' && target == element.value) {
            found_element = element;
            return false;
        };
    });
    return found_element;
};

function change_select_attr(id, val) {
    var element = search_element(id, 'selected');
    if (element) { element.removeAttribute('selected'); };
    var element = search_element(id, val);
    if (element) { element.setAttribute('selected', ''); };
};

function update_saved_rooms(key, val) {
    let saved_rooms = JSON.parse(localStorage.getItem('saved_rooms'));
    if (saved_rooms && context_room_id in saved_rooms) {
        saved_rooms[context_room_id][key] = val;
        localStorage.setItem('saved_rooms', JSON.stringify(saved_rooms));
    };
};

$('#id_programming_languages').on('input', function (event) {
    change_select_attr(this.id, event.target.value);
    code_editor.session.setMode(`ace/mode/${event.target.value}`);
    update_saved_rooms('language', event.target.value);
});

function set_dev_chat_language(id, lang) {
    change_select_attr(id, lang);
    code_editor.session.setMode(`ace/mode/${lang}`);
};

$('#id_select_pixels').on('input', function (event) {
    change_select_attr(this.id, event.target.value);
    code_editor.setFontSize(event.target.value);
    update_saved_rooms('font_size', event.target.value);
});

function set_dev_chat_font_size(id, font_size) {
    change_select_attr(id, font_size);
    code_editor.setFontSize(font_size);
};


const copy_text = new CopyText();


const login_popup = document.querySelector("#login-popup");
const dev_chat_container = document.querySelector("#dev-chat-container");
const dev_chat_username = $('#dev_chat_username');
const login_popup_btn_state = document.querySelector('#login-popup-btn');

dev_chat_username.on('input', function (event) {
    if (event.target.value !== '') {
        login_popup_btn_state.classList.remove('disabled');
        login_popup_btn_state.classList.add('enabled');
        login_popup_btn_state.disabled = false;
    } else {
        login_popup_btn_state.classList.remove('enabled');
        login_popup_btn_state.classList.add('disabled');
        login_popup_btn_state.disabled = true;
    };
});

function get_random_hex_color(min = 0, max = 255, alpha = '') {
    return '#' + get_rand_int(min, max).toString(16) + get_rand_int(min, max).toString(16) + get_rand_int(min, max).toString(16) + alpha.toString();
};

// https://learn.javascript.ru/websockets
// при запуске сервера локально порт уже присутствует в URL.
// при запуске сервера с доменным именем в качестве URL необходимо добавить порт.
const port = debug_mode ? "" : ":8001";
const ws_scheme = window.location.protocol == "https:" ? "wss://" : "ws://";
const websocket_pathname = "/ws/dev-chat/" + context_room_id + "/";
const chatSocket = new WebSocket(
    ws_scheme + window.location.host + port + websocket_pathname
);

$('#chat-path-input')[0].value = window.location.href;

chatSocket.onopen = function (event) {
    console.info('Чат-сокет открылся.');
};
chatSocket.onclose = function (event) {
    console.error('Чат-сокет неожиданно закрылся.');
};

var userid = null;
var room_creator = null;
var event_lock = false; // защита от зацикливания
var one_time_change = false;
var users_curs_pos = {};
var lock_room = false;

// убираем выделение у всех пользователей при любом вводе текста
function clear_all_selections() {
    for (let user_id in selectionManager._selections) {
        selectionManager.clearSelection(user_id);
    };
};

function remove_all_cursors() {
    for (let user_id in cursorManager._cursors) {
        remove_cursor(user_id);
    };
};

function remove_cursor(user_id) {
    // костыль для удаления DOM элемента курсора пользователя который вышел из комнаты
    $('.ace-multi-cursor-tooltip').each(function (index, element) {
        if (element.textContent == cursorManager._cursors[user_id]._label) {
            element.parentElement.remove();
        };
    });
    cursorManager.removeCursor(user_id); // удаляем курсор пользователя который вышел из комнаты
};

function update_dev_chat_text(message) {
    // перед изменением содержимого code_editor необходимо
    // заблокировать ивент change с помощью переменной event_lock для предотвращения зацикливания
    event_lock = true;

    // получение позиции курсора
    let cur_pos = code_editor.selection.getCursor();
    // let cur_pos = code_editor.getCursorPosition();

    // добавление текста в редактор (1)
    code_editor.session.setValue(message);

    // добавление текста в редактор (2)
    // let sel_text = code_editor.setValue(message);
    // code_editor.clearSelection(); // убрать выделение текста редактора
    // code_editor.selection.clearSelection();

    // добавление текста в редактор (3)
    // code_editor.session.setValue('');
    // let sel_text = code_editor.setValue('');
    // let end_pos = code_editor.session.insert(cur_pos, message);

    // установка курсора в указанную позицию
    code_editor.selection.moveTo(cur_pos['row'], cur_pos['column']);
    // code_editor.moveCursorTo(cur_pos['row'], cur_pos['column']);
    // code_editor.gotoLine(cur_pos['row']+1, cur_pos['column']);

    // переместить курсор в конец строки на которой он находится
    // code_editor.navigateLineEnd();

    event_lock = false;
};

function update_dev_chat_cursors(cursor_data, skip_self = true) {
    for (let user_id in cursor_data) {
        if (skip_self && user_id == userid) { continue; };
        let user_data = cursor_data[user_id];

        if (user_data['cur_pos']) { // проверка на то если пользователь ранее двигал курсор
            let row = user_data['cur_pos']['row'];
            let column = user_data['cur_pos']['column'];

            // создаём курсор для всех пользователей кроме себя (т.к. свой курсор нам видеть нет необходимости)
            if (user_id in cursorManager._cursors) {
            } else {
                cursorManager.addCursor(
                    user_id,
                    user_data['username'],
                    user_data['user_color'],
                    { row: row, column: column }
                );
            };
            cursorManager.setCursor(user_id, { row: row, column: column });

            if (skip_self) {
                users_curs_pos[user_id] = { 'row': row, 'column': column };
            };

            // принудительное перемещение настоящего курсора в его истинную позицию
            // при воспроизведении плеером
            if (!skip_self && user_id == userid) {
                code_editor.selection.moveTo(row, column);
            };
        } else {
            // при отмотке плеера назад, убираем курсоры которых не должно существовать в текущий момент времени
            if (!skip_self && user_id in cursorManager._cursors) {
                remove_cursor(user_id);
            };
        };
    };
};

chatSocket.onmessage = function (event) {
    const data = JSON.parse(event.data);

    if (data.userid) {
        userid = data.userid;
    };

    if (data.room_creator) {
        room_creator = data.room_creator;

        // показываем кнопку закрытия комнаты только для создателя комнаты
        if (room_creator == userid) {
            $('#close_room_btn').css('display', 'block');
        } else {
            $('#close_room_info').css('display', 'block');
        };
    };

    if (data.chat_history) {
        if (data.chat_history == 'unlock') {
            room_state_unlock();
        } else {
            room_state_lock(data.chat_history);
        };
    };

    if (data.cursor_data) {
        update_dev_chat_cursors(data.cursor_data, true);
    };

    if (data.selection_data) {
        let user_id = Object.keys(data.selection_data)[0];
        if (user_id != userid) { // защита от данных с другой вкладки
            let user_data = Object.values(data.selection_data)[0];
            let sel_range = user_data['selection_range'];
            let ace_range = new ace.Range(
                sel_range['start']['row'],
                sel_range['start']['column'],
                sel_range['end']['row'],
                sel_range['end']['column']
            )
            if (user_id in selectionManager._selections) {
            } else {
                selectionManager.addSelection(user_id, user_data['username'], user_data['user_color'], ace_range);
            };
            selectionManager.setSelection(user_id, ace_range);
        };
    };

    if (data.message != undefined) { // условие для включения обработки пустой строки
        update_dev_chat_text(data.message);
        clear_all_selections();

        // одноразовый костыль для синхронизации чата при входе в комнату на второй вкладке
        if (one_time_change == false) {
            one_time_change = true;
            update_saved_rooms('message', data.message);
        };
    };

    if (data.active_consumers) {

        // удаляем все старые никнеймы перед добавлением новых
        $('#active-clients span').each(function (index, element) {
            element.remove();
        });

        for (let user_id in cursorManager._cursors) {
            if (user_id in data.active_consumers) {
            } else {
                remove_cursor(user_id);
            };
        };

        for (let user_id in selectionManager._selections) {
            if (user_id in data.active_consumers) {
            } else {
                selectionManager.removeSelection(user_id);
            };
        };

        for (let user_id in data.active_consumers) {
            if (data.active_consumers[user_id]['username'] == null) { continue; };

            for (let i = 0; i < data.active_consumers[user_id]['page_count']; i++) {
                let username = data.active_consumers[user_id]['username'];
                if (i > 0) {
                    username += `(${String(i)})`;
                };
                if (user_id == room_creator) {
                    username = '👑' + username;
                };
                document.getElementById('active-clients').insertAdjacentHTML('beforeEnd',
                    `<span id="${user_id}" style="color: ${data.active_consumers[user_id]['user_color']};
            margin-left: 15px;">${username}</span>`
                );
            };
        };
    };
};

const time_delta = 1000 * 60 * 60 * 24 * 30; // 30 дней
const cookie_saved_room_expires = 30; // 30 дней

const current_datetime = Date.now(); // разный синтаксис получения времени +new Date();

let saved_rooms = localStorage.getItem('saved_rooms');
if (saved_rooms) {

    saved_rooms = JSON.parse(saved_rooms);

    if (context_room_id in saved_rooms) {
        set_dev_chat_language('id_programming_languages', saved_rooms[context_room_id]['language']);
        set_dev_chat_font_size('id_select_pixels', saved_rooms[context_room_id]['font_size']);

        saved_rooms[context_room_id]['time_stamp'] = current_datetime;

        dev_chat_container.style.display = 'block';
        code_editor.focus();
    } else {
        login_popup.style.display = 'block';
        dev_chat_username.focus();
    };

    for (let room_id in saved_rooms) {
        if (current_datetime - time_delta >= saved_rooms[room_id]['time_stamp']) { // 14:00 - 1:00 = 13:00 >= 13:00
            // if (current_datetime - saved_rooms[room_id]['time_stamp'] >= time_delta) { // 14:00 - 13:00 = 1:00 >= 1:00
            delete saved_rooms[room_id];
        };
    };

    localStorage.setItem('saved_rooms', JSON.stringify(saved_rooms));
} else {
    login_popup.style.display = 'block';
    dev_chat_username.focus();
};

document.querySelector('#login-popup-btn').onclick = function (event) {
    const username = document.querySelector('#dev_chat_username').value;
    const user_color = get_random_hex_color(105);

    chatSocket.send(JSON.stringify(
        { 'user_data': { 'username': username, 'user_color': user_color } }
    ));

    set_dev_chat_language('id_programming_languages', 'plain_text');
    set_dev_chat_font_size('id_select_pixels', '17px');

    cookie_saved_room = {
        'userid': userid,
        'username': username,
        'user_color': user_color
    };


    Cookies.set('dev_chat_saved_room', cookie_saved_room, {
        expires: cookie_saved_room_expires,
        domain: PARENT_DOMAIN,
        path: websocket_pathname
    });


    let saved_rooms = localStorage.getItem('saved_rooms');

    saved_rooms = saved_rooms ? JSON.parse(saved_rooms) : {};

    saved_rooms[context_room_id] = {
        'time_stamp': current_datetime,
        'username': username,
        'language': 'plain_text',
        'font_size': '17px',
        'message': ''
    };
    localStorage.setItem('saved_rooms', JSON.stringify(saved_rooms));

    login_popup.style.display = 'none';
    dev_chat_container.style.display = 'block';
    code_editor.focus();

    // при вводе никнейма вручную генерируем ивент
    // для того чтобы повторно обновить длину прогресс бара
    $('#dev-chat-container')[0].dispatchEvent(new Event('re_init_player'));
};

// https://learn.javascript.ru/localstorage
// принимаю переданный актуальный чат на другой вкладке (на вкладке отправителе ивент не файрится)
window.onstorage = (event) => {
    if (event.key == 'saved_rooms') {
        // if (event.storageArea != localStorage) return;
        let saved_rooms = JSON.parse(event.newValue);

        login_popup.style.display = 'none';
        dev_chat_container.style.display = 'block';

        set_dev_chat_language('id_programming_languages', saved_rooms[context_room_id]['language']);
        set_dev_chat_font_size('id_select_pixels', saved_rooms[context_room_id]['font_size']);

        update_dev_chat_text(saved_rooms[context_room_id]['message']);
    };
};

// пришлось прикрутить микро задержку для того чтобы исключить дублирующий ивент
// который при первом выстреле вызывая getValue получал пустое значение ''
function send_curs_pos_and_message_data(event) {
    if (users_curs_pos) {
        for (let user_id in users_curs_pos) {
            if (user_id in cursorManager._cursors) {
                let row = users_curs_pos[user_id]['row'];
                let column = users_curs_pos[user_id]['column'];
                // повторяем логику движения курсора как на удалённом компьютере, при изменении содержимого редактора
                // если курсор находится на последней линии редактора, значит он может быть сдвинут при удалении любой из линий
                const lines_count = code_editor.session.getLength() - 1; // количество строк
                if (row > lines_count) {
                    row = lines_count;
                    // костыль для запрыгивания на длинну строки при удалении последней пустой строки
                    if (event.start.row == lines_count) { column = code_editor.session.getLine(row).length; };
                } else {
                    // если курсор не находится на последней линии редактора, и длинна строки больше чем позиция курсора - ничего не делаем
                    // если длинна строки меньше чем позиция курсора - устанавливаем курсор на позицию равную длинне строки
                    const line_length = code_editor.session.getLine(row).length; // длинна строки
                    if (column > line_length) { column = line_length; };
                };
                cursorManager.setCursor(user_id, { row: row, column: column });
                users_curs_pos[user_id]['row'] = row;
                users_curs_pos[user_id]['column'] = column;
            };
        };
        clear_all_selections();
        chatSocket.send(JSON.stringify(
            { 'users_curs_pos': users_curs_pos }
        ));
    };

    let message = code_editor.session.getValue();
    // отправляем актуальный текст на сервер который в свою очередь
    // отправит текст всем пользователям кроме отправителя
    chatSocket.send(JSON.stringify(
        { 'message': message }
    ));
    // но т.к. у меня может быть открыто несколько вкладок, надо сообщить другим вкладкам
    // что текст обновился с помощью ивента локального хранилища.
    update_saved_rooms('message', message); // записываю актуальный чат в локальное хранилище
};
let debounce_send_curs_pos_and_message_data = debounce(send_curs_pos_and_message_data, 4);

code_editor.session.on('change', function (event) {
    // когда одновременно со мной другой пользователь комнаты пишет в чат
    // он блокирует этот ивент из функции update_dev_chat_text
    // и я теряю часть данных здесь которые проходят мимо условия

    if (!event_lock) {
        debounce_send_curs_pos_and_message_data(event);
    };
});

// пришлось прикрутить микро задержку для того чтобы исключить дублирующий ивент на смартфонах
// который при первом выстреле вызывая getCursor получал значение являющееся
// координатами начала строки на которой находится курсор
function send_cur_pos_data() {
    let cur_pos = code_editor.selection.getCursor();
    let cur_pos_data = {};
    cur_pos_data[userid] = { 'row': cur_pos['row'], 'column': cur_pos['column'] };
    chatSocket.send(JSON.stringify(
        { 'users_curs_pos': cur_pos_data }
    ));
};
let debounce_send_cur_pos_data = debounce(send_cur_pos_data, 4);

code_editor.session.selection.on('changeCursor', function (event) {
    if (!event_lock && !lock_room) {
        debounce_send_cur_pos_data();
    };
});

// ивент файрится от любого взаимодействия с редактором но нам необходимо впоймать именно выделение текста
// поэтому приходится использовать микро задержку и метод getTextRange который возвращает выделенный текст
let prev_sel_text = '';
function send_sel_range_data() {
    let sel_range = code_editor.getSelectionRange();
    let sel_text = code_editor.session.getTextRange(sel_range);
    if (prev_sel_text != sel_text) {
        chatSocket.send(JSON.stringify(
            { 'selection_range': sel_range }
        ));
    };
    prev_sel_text = sel_text;
};
let debounce_send_sel_range_data = debounce(send_sel_range_data, 4);

code_editor.session.selection.on('changeSelection', function (event) {
    if (!event_lock && !lock_room) {
        debounce_send_sel_range_data();
    };
});
