var btn_state = document.querySelector('.btn-custom');

var email = document.getElementById('id_email');
var message = document.getElementById('id_message');

email.addEventListener('input', form_changed_value);
message.addEventListener('input', form_changed_value);

var interval_id = null;
function form_changed_value() {
    if (email.value !== '' && message.value !== '') {
        if (!interval_id) {
            // не смог зарегистрировать активацию/просрочку капчи,
            // поэтому сделал обновление каждую секунду после заполнения формы
            interval_id = setInterval(change_btn_state, 1000); // миллисекунды
        }
    }
    else {
        if (interval_id) {
            clearInterval(interval_id);
            interval_id = null;

            btn_state.classList.remove('enabled');
            btn_state.classList.add('disabled');
            btn_state.disabled = true;
        }
    }
}
function change_btn_state() {
    if (grecaptcha.getResponse() !== '') {
        btn_state.classList.remove('disabled');
        btn_state.classList.add('enabled');
        btn_state.disabled = false;
    }
    else {
        btn_state.classList.remove('enabled');
        btn_state.classList.add('disabled');
        btn_state.disabled = true;
    }
}


var reCaptchaOnLoadCallback = function () {
    updateGoogleCaptchaLanguage(LANGUAGE_CODE);
};

function updateGoogleCaptchaLanguage(selectedLanguage) {
    let iframeGoogleCaptcha = $('#id_captcha').find('iframe');
    let language = iframeGoogleCaptcha.attr("src").match(/hl=(.*?)&/).pop();
    if (language !== selectedLanguage) {
        iframeGoogleCaptcha.attr("src",
            iframeGoogleCaptcha.attr("src").replace(/hl=(.*?)&/, 'hl=' + selectedLanguage + '&')
        );
    };
};
