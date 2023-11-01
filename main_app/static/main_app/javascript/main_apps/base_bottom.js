// скрипт для установки цвета кнопки текущей страницы
let location_pathname = document.location.pathname;
$('.navbar-nav li a').each(function (index, element) {
    if (['/', '/en/'].indexOf(element.pathname) !== -1 && element.pathname === location_pathname
        || ['/', '/en/'].indexOf(element.pathname) === -1 && location_pathname.slice(0, element.pathname.length) === element.pathname) {
        element.classList.add('active');
    };
});


const notify_audio = new Audio();
notify_audio.src = notify_sonic_ring;
// notify_audio.volume = 0.3;

let notify_unread_count;
let notify_all_count;
let notify_first_run = true;
let notify_timeout_id;

function notification_callback(data) {

    const existing_notification_ids = Array.from($('.notifications-table')[0]
        .getElementsByClassName('notify-item')).map(item => parseInt(item.id));

    notify_unread_count = 0;
    notify_all_count = 0;

    data.all_list.sort(function (a, b) {
        // return new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1;
        return new Date(a.timestamp) - new Date(b.timestamp);
    });

    for (let i = 0; i < data.all_list.length; i++) {
        const msg = data.all_list[i];

        if (msg.unread) notify_unread_count += 1;

        if (msg.deleted) continue;

        notify_all_count += 1;

        if (existing_notification_ids.indexOf(msg.slug) !== -1) {
            // Обновляю время для уже созданных уведомлений
            const notify_time = $(`.notifications-table #${msg.slug} .notify-time`);
            if (notify_time.length > 0) {
                notify_time.text(getRelativeTimeString(msg.timestamp, LANGUAGE_CODE));
            };
            continue;
        };

        // const datetime = new Date(msg.timestamp).toLocaleString();
        const relative_time = getRelativeTimeString(msg.timestamp, LANGUAGE_CODE);

        const notify_html = `
              <div class="notify-item" id="${msg.slug}" unread="${msg.unread || ''}">
                <div class="unread-notify-line" style="background-color: rgba(103, 106, 247, ${msg.unread ? 1 : 0});"></div>
                <a class="notify-link" href="${document.location.origin}${msg.data.notify_href}">
                  <img _ngcontent-xpp-c84="" class="img-avatar notify-img-avatar" src="${msg.data.actor_avatar}">
                  <div class="notify-link-wrap">
                    <div><label class="notify-sender">${msg.actor}</label></div>
                    <div class="notify-time">${relative_time}</div>
                    <span class="fa fa-eye-slash hide-notify-icon" onclick="delete_notify(this);"></span>
                    <div class="notify-content">${msg.verb}</div>
                  </div>
                </a>
              </div>
            `;
        $('.notifications-table')[0].insertAdjacentHTML('afterBegin', notify_html);

        if (!notify_first_run) {
            // сработает только после любого взаимодействия пользователя со страницей, (например клик)
            notify_audio.play().catch(error => { });
            // https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
            window.navigator.vibrate([200, 100, 200]);

            const notify_push_popup = $('#notify-push-popup');

            if (notify_timeout_id) clearTimeout(notify_timeout_id);
            notify_push_popup.stop(true, true);

            notify_push_popup.html(notify_html);
            notify_push_popup.css('display', 'block');

            notify_push_popup.animate(
                { opacity: 1 }, {
                    duration: 500, queue: false, complete: function () {
                        notify_timeout_id = setTimeout(function () {
                            notify_push_popup.animate(
                                { opacity: 0 }, {
                                    duration: 500, queue: false, complete: function () {
                                        notify_push_popup.css('opacity', '0');
                                        notify_push_popup.css('display', 'none');
                                    }
                            },
                            );
                        }, 7000);
                    }
            },
            );
        };
    };

    notify_first_run = false;

    $(".notifications-h3-text").text(notify_all_count);

    // Есть/Нет непрочитанные уведомления при любом раскладе скрываем счётчик
    $('#notify-counter').css('opacity', '0');
    // Если есть непрочитанные уведомления обновляем текст и показываем анимацию счётчика
    if (notify_unread_count !== 0) {
        $('#notify-counter')
            .text(notify_unread_count)
            .css({ top: '-10px' })
            .animate({ top: '-2px', opacity: 1 }, 500);
    };
};


$(document).ready(function () {
    $('.notifications-table, #notify-push-popup').on('click', function (event) {
        if (event.target.tagName !== 'A') return false;

        if (event.target.parentElement.getAttribute('unread') !== "") {

            fetch(`${document.location.origin}/inbox/notifications/mark-as-read/${event.target.parentElement.id}/`);

            const selected_notify_items = $(`.notify-item[id="${event.target.parentElement.id}"]`);
            for (const notify_item of selected_notify_items) {
                notify_item.children[0].style.backgroundColor = 'rgba(103, 106, 247, 0)';
                notify_item.setAttribute('unread', '');
            };

            notify_unread_count -= 1;
            if (notify_unread_count === 0) $('#notify-counter').css('opacity', '0');
        };
    });
});


function delete_notify(_this) {
    fetch(`${document.location.origin}/inbox/notifications/mark-as-read/${_this.parentElement.parentElement.parentElement.id}/`).then(response => {
        fetch(`${document.location.origin}/inbox/notifications/delete/${_this.parentElement.parentElement.parentElement.id}/`);
    });

    notify_all_count -= 1;
    $(".notifications-h3-text").text(notify_all_count);

    notify_unread_count -= 1;
    if (notify_unread_count === 0) $('#notify-counter').css('opacity', '0');

    $('#notify-counter').text(notify_unread_count);

    const notify_items_to_delete = $(`.notify-item[id="${_this.parentElement.parentElement.parentElement.id}"]`);
    for (const notify_item of notify_items_to_delete) notify_item.remove();
};


$('#notify-bell').click(function () {
    const notifications = $('#notifications');

    if (!notifications.is(':animated')) {

        notifications.css('display') === 'none'
            ? $('#notify-bell').css('color', '#1fb8ff')
            : $('#notify-bell').css('color', '#fff');

        notifications.fadeToggle({ duration: 'fast', easing: 'linear', queue: false });
    };
});


function toggleImage() {
    var message = document.getElementsByClassName('toast-bottom-right')[0];
    if (!message.style.display || message.style.display === 'block') {
        message.style.display = 'none';
    }
}
