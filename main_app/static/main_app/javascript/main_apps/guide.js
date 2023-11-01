function show_hide_element(element_id) {

    if (document.getElementById(element_id).style.display == 'block') {
        document.getElementById(element_id).style.display = 'none';

        if (element_id.slice(0, 6) == 'answer') {
            document.querySelector(`#show-hide-${element_id} span`).innerHTML = 'expand_more';
        };
    } else {
        document.getElementById(element_id).style.display = 'block';

        if (element_id.slice(0, 6) == 'answer') {
            document.querySelector(`#show-hide-${element_id} span`).innerHTML = 'expand_less';
        };
    };
};


function color_handler(element, vote_type) {
    if (vote_type) {
        var shift_pixels = "0px";
        var another_vote_ele = element.next().next();

        // отрабатывает при снятии оценки
        if (element.find('span')[0].classList.contains('vote-lime')) {
            element.find('span')[0].classList.remove('vote-lime');
            element.find('span')[0].classList.add('vote-white');
            element.find('span').css("color", "white");
            return shift_pixels;
        };

        // отрабатывает при добавлении/смене оценки
        if (element.find('span')[0].classList.contains('vote-white')) {
            element.find('span')[0].classList.remove('vote-white');
        } else if (element.find('span')[0].classList.contains('vote-red')) {
            element.find('span')[0].classList.remove('vote-red');
        };
        element.find('span')[0].classList.add('vote-lime');
        element.find('span').css("color", "lime");

    } else {
        var shift_pixels = "15px";
        var another_vote_ele = element.prev().prev();

        if (element.find('span')[0].classList.contains('vote-red')) {
            element.find('span')[0].classList.remove('vote-red');
            element.find('span')[0].classList.add('vote-white');
            element.find('span').css("color", "white");
            return shift_pixels;
        };

        if (element.find('span')[0].classList.contains('vote-white')) {
            element.find('span')[0].classList.remove('vote-white');
        } else if (element.find('span')[0].classList.contains('vote-lime')) {
            element.find('span')[0].classList.remove('vote-lime');
        };
        element.find('span')[0].classList.add('vote-red');
        element.find('span').css("color", "red");
    };

    // отрабатывает при добавлении/смене оценки
    if (another_vote_ele.find('span')[0].classList.contains('vote-red')) {
        another_vote_ele.find('span')[0].classList.remove('vote-red');
    } else if (another_vote_ele.find('span')[0].classList.contains('vote-lime')) {
        another_vote_ele.find('span')[0].classList.remove('vote-lime');
    };
    another_vote_ele.find('span')[0].classList.add('vote-white');
    another_vote_ele.find('span').css("color", "white");

    return shift_pixels;
}

function animateIcon(element, vote_type) {
    shift_pixels = color_handler(element, vote_type)

    element.animate(
        { top: shift_pixels },
        {
            duration: 100, queue: false,
            complete: function () {
                element.animate(
                    { top: "7.5px" },
                    { duration: 100, queue: false },
                );
            },
        },
    );
};

const lang_prefix = LANGUAGE_CODE === "ru" ? "" : "/en";
var csrftoken = Cookies.get('csrftoken');
function like() {
    var like = $(this);
    var type = like.data('type');
    var pk = like.data('id');
    var action = like.data('action');

    animateIcon(like, true)

    $.ajax({
        url: lang_prefix + "/api/" + type + "/" + pk + "/" + action + "/",
        type: 'POST',
        data: { 'obj': pk },
        headers: { 'X-CSRFToken': csrftoken },

        success: function (json) {
            like.next().text(json.like_count);
            like.next().next().next().text(json.dislike_count);
        }
    });

    return false;
}

function dislike() {
    var dislike = $(this);
    var type = dislike.data('type');
    var pk = dislike.data('id');
    var action = dislike.data('action');

    animateIcon(dislike, false)

    $.ajax({
        url: lang_prefix + "/api/" + type + "/" + pk + "/" + action + "/",
        type: 'POST',
        data: { 'obj': pk },
        headers: { 'X-CSRFToken': csrftoken },

        success: function (json) {
            dislike.next().text(json.dislike_count);
            dislike.prev().text(json.like_count);
        }
    });

    return false;
}

if (user_is_authenticated) {
    $(function () {
        $('[data-action="like"]').click(like);
        $('[data-action="dislike"]').click(dislike);
    });
};


let go_to_top_btn = document.getElementById("go-to-top-btn");
let go_to_comments_btn = document.getElementById("go-to-comments-btn");

function scroll_position() {
    // if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //   go_to_top_btn.style.display = "block";
    // } else {
    //   go_to_top_btn.style.display = "none";
    // };
    var guide_content_coord = document.querySelector('#guide-content-div').getBoundingClientRect();
    if (guide_content_coord.y < 0 || guide_content_coord.y > 1) {
        go_to_top_btn.style.display = "block";
    } else {
        go_to_top_btn.style.display = "none";
    };

    var comments_counter_coord = document.querySelector('#comments-counter').getBoundingClientRect();
    if (comments_counter_coord.y < 0 || comments_counter_coord.y > 1) {
        go_to_comments_btn.style.display = "block";
    } else {
        go_to_comments_btn.style.display = "none";
    };
};

window.onscroll = function () { scroll_position() };

function go_to_top() {
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    document.querySelector('#guide-content-div').scrollIntoView();
};

function go_to_comments() {
    document.querySelector('#comments-counter').scrollIntoView();
};


function fixTextareaSize(textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 2 + "px"
}
~function () {
    var textarea = document.querySelector('.first-textarea');
    if (textarea) {
        textarea.addEventListener('input', function (event) {
            fixTextareaSize(event.target);
        });
        fixTextareaSize(textarea);
    };
}();

$('.first-textarea').on('focus', function (e) {
    let hr = $('#myForm').find('hr')
    hr.css('background-color', 'white')
    hr.css('height', '1.5px')
    hr.css('margin-bottom', '5px')
})
$('.first-textarea').on('blur', function (e) {
    let hr = $('#myForm').find('hr')
    hr.css('background-color', 'grey')
    hr.css('height', '0px')
    hr.css('margin-bottom', '6.5px')
})
$('#myForm').find('hr').css('transition', 'all 0.2s ease')

function formExit() {
    document.getElementById("newForm").remove();
}

function myFunction(id, author, level) {

    if (document.contains(document.getElementById("newForm"))) {
        document.getElementById("newForm").remove();
    }

    var d1 = document.getElementById(`form-anchor-${id}`);

    // https://learn.javascript.ru/multi-insert
    // csrf_token в данном случае это элемент <input>
    d1.insertAdjacentHTML('afterEnd',
        `<form id="newForm" class="form-insert py-2" style="margin-bottom: -10px;" method="POST">
        ${csrf_token}
        <select name="parent" class="d-none" id="id_parentt">
          <option value="${id}" selected="${id}"></option>
        </select>
        <div class="d-flex">
          <img _ngcontent-xpp-c84="" class="img-avatar" src="${user_avatar}"
            style="width: 50px; height: 50px; position: relative; bottom: 10px; margin-right: 5px; border-radius: 50%; border-color: grey;">
          <textarea name="content" cols="40" rows="1" class="reply-textarea" placeholder="${trans_enter_answer}" required id="id_content"></textarea>
        </div>
        <hr>
        <div style="display: flex; justify-content: right;">
          <button type="button" style="margin-right: 5px;" class="btn btn-outline-secondary" onclick="formExit()"">${trans_cancel}</button>
          <button type="submit" class="btn btn-outline-secondary" id="reply_comment">${trans_send}</button>
        </div>
      </form>`
    );

    if (level != 0) {
        form_insert = document.querySelector('.form-insert')
        form_insert.classList.add('pl-md-5');
    }

    if (author) {
        document.querySelector('.reply-textarea').value = '@' + author + ' ';
    } else {
        document.querySelector('.reply-textarea').value = '';
    }

    document.querySelector('.reply-textarea').addEventListener('input', function (e) {
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 2 + "px"
    })

    $('.reply-textarea').on('focus', function (e) {
        let hr = $('#newForm').find('hr')
        hr.css('background-color', 'white')
        hr.css('height', '1.5px')
        hr.css('margin-bottom', '5px')
        hr.css('transition', 'all 0.2s ease')
    })
    $('.reply-textarea').on('blur', function (e) {
        let hr = $('#newForm').find('hr')
        hr.css('background-color', 'grey')
        hr.css('height', '0px')
        hr.css('margin-bottom', '6.5px')
    })
    document.querySelector('.reply-textarea').focus()

}

$('#myForm').trigger("reset");


const copy_text = new CopyText();

const window_coords = ['scrollX', 'scrollY'];
// Перед перезагрузкой страницы записываем в sessionStorage window.scrollX и window.scrollY как scrollX и scrollY
window.addEventListener('unload', event => window_coords.forEach(coord => sessionStorage[coord] = window[coord]));


function recurse_find_parent_element_by_prefix(prefix, element, max_tries = Infinity, tries_count = 0) {
    tries_count += 1;
    if (tries_count === max_tries) return;
    if (element.parentElement === null) return;
    if (element.parentElement.hasAttribute('id')
        && element.parentElement.id.split('-')[0] === prefix) return element.parentElement;
    return recurse_find_parent_element_by_prefix(prefix, element.parentElement, max_tries, tries_count);
};


let highlight_interval_id;

function highlight_animation(element, vertical_shift) {
    // Прокручиваем страницу к месту расположения комментария + vertical_shift вверх
    // $('html, body')[0].scrollTop = element.offset().top - vertical_shift;
    // window.scrollTo(0, element.offset().top - vertical_shift);
    window.scroll(0, element.offset().top - vertical_shift);
    $('.loader').css('display', 'none');

    let opacity = 1;
    if (highlight_interval_id) clearInterval(highlight_interval_id);
    highlight_interval_id = setInterval(function () {
        opacity -= 0.01;
        element.css({ 'box-shadow': `0 0 10px 10px rgba(31, 184, 255, ${opacity})` });
        if (opacity <= 0) clearInterval(highlight_interval_id);
    }, 20);
};


function highlight_hash_link() {

    const hash = document.location.hash.split('#')[1];

    // Если это загрузка страницы без указания hash в url
    if (typeof hash === "undefined") {
        // Прокручиваем страницу к scrollX и scrollY из данных sessionStorage (либо 0, 0 если там еще ничего нет)
        window.scroll(...window_coords.map(coord => sessionStorage[coord]));
        $('.loader').css('display', 'none');
        return false;
    };

    // Принудительно очищаю хэш после перехода по ссылке для того чтобы
    // при последующей перезагруке страницы не телепортировало к якорю этого хэша
    document.location.hash = "";
    // window.location.hash = "";
    // parent.location.hash = "";

    // если hash содержит символы отличные от цифр,
    // значит это не ссылка на комментарий, а переход по ссылке в гайде
    if (isNaN(hash)) {
        highlight_animation($(`#${hash}`), 15);
        return false;
    };

    const comment = $(`#notifying-border-${hash}`);

    if (!comment[0]) return false;

    const answers = recurse_find_parent_element_by_prefix('answers', comment[0]);
    if (answers) {
        answers.style.display = 'block';
        answers.previousElementSibling.children[0].textContent = 'expand_less';
    };

    highlight_animation(comment, 370);
};

const tooltipsLoadedCallbackTimeoutId = setTimeout(function () {
    window.WH.Tooltips.tooltipsLoadedCallback();
}, 500);

window.WH.Tooltips.tooltipsLoadedCallback = debounce(function () {
    clearTimeout(tooltipsLoadedCallbackTimeoutId);
    highlight_hash_link();
}, 50);

window.addEventListener('hashchange', function (event) {
    if (document.location.hash === "") return false;
    highlight_hash_link();
});
