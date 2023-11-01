function getRelativeTimeString(datetime, lang_code = 'ru') {
    // https://stackoverflow.com/a/53800501/19276507
    if (typeof datetime !== 'object') datetime = new Date(datetime);

    const timeMs = typeof datetime === "number" ? datetime : datetime.getTime();

    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

    const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];

    const units = ["second", "minute", "hour", "day", "week", "month", "year"];

    const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));

    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

    // https://www.js-howto.com/how-to-format-dates-with-intl-relativetimeformat/
    const rtf = new Intl.RelativeTimeFormat(lang_code, {
        localeMatcher: "best fit", // "lookup", "best fit"
        numeric: "always",         // "auto", "always"
        style: "short",            // "narrow", "short", "long"
    });
    return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
};


// создание задержки перед вызовом функции
const debounce = function (func, delay) {
    let inDebounce;
    return function () {
        const _this = this;
        const _args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(function () {
            func.apply(_this, _args);
        }, delay);
    };
};


// https://professorweb.ru/my/javascript/jquery/level1/1_4.php
class CopyText {

    constructor() {
        this.lock = false;
        this.span_text = '';
        this.span_color = '#fff';
        this.debounce = debounce(this.schedule, 1500);
    };

    // метод copy можно размещать как в теге <a> так и внутри элемента внутри тега <a>
    copy(text) {
        let element = window.event.target || window.event.srcElement;

        this.span = element.tagName === 'A' ? $(element).find("span") : $(element).parent().find("span");

        if (!this.lock) {
            this.lock = true;
            this.span_text = this.span.text();
            this.span_color = this.span.css("color");
        };

        let temp_ele = $("<textarea>");
        $("body").append(temp_ele);
        temp_ele.val(text).select();
        document.execCommand("copy");
        temp_ele.remove();

        this.anim();
    };

    anim() {
        this.span.html(trans_text_copied);
        this.span.css("color", "lime");

        this.debounce();
    };

    schedule() {
        this.span.html(this.span_text);
        this.span.css("color", this.span_color);

        this.lock = false;
    };
};


function get_rand_int(min = 0, max = 255) {
    min = Math.ceil(min);
    return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min;
};


const getTaskStatusById = function (task_id, success_callback,
    polling_delay = 2000, max_retries = 3, retries_counter = 1) {
    if (task_id === "") return false;
    $.ajax({
        url: `/tasks/${task_id}/`,
        method: 'GET',
        timeout: 5000
    })
    .done((res) => {

        if (res.task_status === 'SUCCESS') {
            success_callback(res.task_result);
            return false;
        } else if (res.task_status === 'FAILURE'
            || retries_counter === max_retries)
            return false;

        setTimeout(function () {
            getTaskStatusById(task_id, success_callback, polling_delay, max_retries, retries_counter + 1);
        }, polling_delay);
    })
    .fail((err) => {
        console.log(err);
    });
};


getTaskStatusById(twitch_stream_count_task_id, function (task_result) {
    $('#twitch-stream-count').text(task_result.length);
});
