// https://learn.javascript.ru/websockets
// при запуске сервера локально порт уже присутствует в URL.
// при запуске сервера с доменным именем в качестве URL необходимо добавить порт.
const port = debug_mode ? "" : ":8001";
const ws_scheme = window.location.protocol == "https:" ? "wss://" : "ws://";
const chatSocket = new WebSocket(
    ws_scheme + window.location.host + port + "/ws/game-chat/"
);


const chat_log_area = $('#chat-log');
const chat_btns_box_btn = $('.chat-buttons-box button');
const player_nickname_input = $('.player-nickname');
const nickname_del_btn = $('.nickname-delete-btn');
const go_to_bottom = $('#go-to-bottom');
const only_twitch = document.querySelector('#only-twitch');
const wotlk_x1 = document.getElementById('wotlk-x1');

const storage_server_name = window.localStorage.getItem('server_name');
const storage_only_twitch_checked = JSON.parse(window.localStorage.getItem('only_twitch_checked'));
const storage_player_nickname = window.localStorage.getItem('player_nickname');

let first_line = true;
let nick_del_btn_lock = false;

let chat_bottom = true;
let animation_state = false;
let scroll_position = 0;


chat_btns_box_btn.on('click', function (event) {
    chat_send_handler(event.currentTarget, event);
});

function chat_send_handler(button, event) {
    if (!chatSocket.readyState) return;

    chat_buttons_handler(button);

    // очистить чат и напечатать текущий выбранный сервер
    first_line = true;
    chat_log_area[0].value = trans_server_chat + button.value + '\n';

    if (event) window.localStorage.setItem('server_name', button.value);

    chatSocket.send(JSON.stringify({
        'server_name': button.value,
        'player_nickname': window.localStorage.getItem('player_nickname'),
        'only_twitch': JSON.parse(window.localStorage.getItem('only_twitch_checked'))
    }));
};


only_twitch.addEventListener('input', function (event) {
    if (!chatSocket.readyState) return;

    window.localStorage.setItem('only_twitch_checked', only_twitch.checked);

    chatSocket.send(JSON.stringify({
        'player_nickname': window.localStorage.getItem('player_nickname'),
        'only_twitch': only_twitch.checked
    }));
});


function set_player_nickname() {
    if (!chatSocket.readyState) return;

    if (player_nickname_input[0].value.match(/[^\а-яёА-ЯЁa-zA-Z]/g)) return;

    let clean_player_nickname = player_nickname_input[0].value.replace(/[^\а-яёА-ЯЁa-zA-Z]/g, '');

    if (clean_player_nickname) {
        const first_char = clean_player_nickname[0].toUpperCase();
        const other_chars = clean_player_nickname.slice(1, clean_player_nickname.length).toLowerCase();
        clean_player_nickname = first_char + other_chars;

        player_nickname_input.css("border-color", "#28e219");
        player_nickname_input.css("box-shadow", "inset 0 0 5px #28e219");
        nickname_del_btn.css("visibility", "visible");
    } else {
        player_nickname_input.css("border-color", "rgba(255, 255, 255, 0.4)");
        player_nickname_input.css("box-shadow", "inset 0 0 5px rgba(255, 255, 255, 0.4)");
        nickname_del_btn.css("visibility", "hidden");

        nick_del_btn_lock = false;
    };

    window.localStorage.setItem('player_nickname', clean_player_nickname);

    chatSocket.send(JSON.stringify({
        'player_nickname': clean_player_nickname,
        'only_twitch': JSON.parse(window.localStorage.getItem('only_twitch_checked'))
    }));
};
const debounce_set_player_nickname = debounce(set_player_nickname, 400);

player_nickname_input.on('change input', function (event) {
    debounce_set_player_nickname();
});

nickname_del_btn.click(function (event) {
    if (nick_del_btn_lock) return;

    nick_del_btn_lock = true;
    player_nickname_input[0].value = '';

    // вручную генерируем ивент для того чтобы сработал обработчик никнейма
    player_nickname_input[0].dispatchEvent(new Event('change'));
});


chatSocket.onopen = function (event) {

    chat_send_handler(storage_server_name ? document.getElementById(storage_server_name) : wotlk_x1);

    if (storage_only_twitch_checked) only_twitch.checked = true;

    if (storage_player_nickname) {
        player_nickname_input[0].value = storage_player_nickname;
        player_nickname_input.css("border-color", "#28e219");
        player_nickname_input.css("box-shadow", "inset 0 0 5px #28e219");
        nickname_del_btn.css("visibility", "visible");
    } else {
        player_nickname_input.css("border-color", "rgba(255, 255, 255, 0.4)");
        player_nickname_input.css("box-shadow", "inset 0 0 5px rgba(255, 255, 255, 0.4)");
    };

    chatSocket.send(JSON.stringify({
        'player_nickname': storage_player_nickname ? storage_player_nickname : '',
        'only_twitch': storage_only_twitch_checked ? true : false
    }));
};


chatSocket.onmessage = function (event) {

    const data = JSON.parse(event.data);

    if (first_line) {
        first_line = false;
        chat_log_area[0].value += data.message;
    } else {
        chat_log_area[0].value += ('\n' + data.message);
    };

    scroll_chat_text();
};


function chat_buttons_handler(button) {

    chat_btns_box_btn.each(function (index, element) {
        element = $(element);

        if (element[0] != button) {
            element.css("border-color", "rgb(60, 60, 60)");
            element.css("box-shadow", "none");
            element.css("pointer-events", "all");
            element.hover(
                function (event) { // mouseenter
                    element.css("border-color", "rgba(0, 200, 255, 1)");
                    element.css("box-shadow", "inset 0 0 5px rgba(0, 200, 255, 1)");
                },
                function (event) { // mouseleave
                    element.css("border-color", "rgb(60, 60, 60)");
                    element.css("box-shadow", "none");
                },
            );
        } else {
            element.css("border-color", "rgba(0, 200, 255, 1)");
            element.css("box-shadow", "inset 0 0 5px rgba(0, 200, 255, 1)");
            element.css("pointer-events", "none");
            element.hover(
                function (event) { // mouseenter
                    element.css("border-color", "rgba(0, 200, 255, 1)");
                    element.css("box-shadow", "inset 0 0 5px rgba(0, 200, 255, 1)");
                },
            );
        };
    });
};


jQuery(function ($) {
    chat_log_area.on('scroll', function (event) {

        // для отключения автоматической прокрутки лучше использовать ивент scroll а не wheel
        // т.к. scroll работает как с мышью так и с тачскрином, wheel только с мышью.
        const scroll_top = $(this).scrollTop();
        if (animation_state && scroll_top < scroll_position) {
            $(this).stop();
            animation_state = false;
        };
        scroll_position = scroll_top;

        const check_location = $(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight;
        if (check_location) {
            chat_bottom = true;
            go_to_bottom.css("visibility", "hidden");

        } else if (!check_location && !animation_state) {
            chat_bottom = false;
            go_to_bottom.css("visibility", "visible");
        };
    });
});

function scroll_chat_text() {
    if (!chat_bottom) return;

    // https://basicweb.ru/jquery/jquery_effect_animate.php
    chat_log_area.animate(
        { scrollTop: chat_log_area.get(0).scrollHeight },
        {
            duration: 600, queue: false,
            start: function (event) { animation_state = true; },
            complete: function (event) { animation_state = false; },
        },
    );
};

go_to_bottom.click(function (event) {
    chat_log_area.animate(
        { scrollTop: chat_log_area.get(0).scrollHeight, },
        { duration: 600, queue: false, },
    );
});
