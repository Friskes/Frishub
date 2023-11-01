var game_classes_selected_data = Cookies.getJSON('streams_selected_classes');

if (!game_classes_selected_data) {
    game_classes_selected_data = {};
};

$('.filter-card span').each(function (index, element) {
    if (element.id in game_classes_selected_data) {
        element.classList.remove('ranking-filter-class');
        element.classList.add('ranking-filter-class-active');
    };
});

var changeTimer = false;
$('.filter-card span').on('click', function (event) {

    var element = event.currentTarget;
    if (element.classList[1] == 'ranking-filter-class-active') {
        element.classList.remove('ranking-filter-class-active');
        element.classList.add('ranking-filter-class');
    } else {
        element.classList.remove('ranking-filter-class');
        element.classList.add('ranking-filter-class-active');
    };

    $(this).each(function (index, element) {
        if (element.classList[1] == 'ranking-filter-class-active') {
            game_classes_selected_data[element.id] = '';
        } else {
            delete game_classes_selected_data[element.id];
        };
    });

    if (changeTimer !== false) {
        clearTimeout(changeTimer);
    };
    changeTimer = setTimeout(function () {

        $('.streams-container').animate(
            { opacity: 0 },
            {
                duration: 50, queue: false,
                complete: function () { send_ajax_request(); }
            },
        );

        changeTimer = false;
    }, 300);
});

var csrftoken = Cookies.get('csrftoken');

function send_ajax_request() {

    // Устанавливаю одинаковый файл Cookies сразу на 2 локализации
    // для того чтобы при переключении языка оставались прежние настройки.
    const another_lang_path = LANGUAGE_CODE === 'en'
        ? url_streams.replace('/en', '', 1)
        : '/en' + url_streams;

    Cookies.set('streams_selected_classes', game_classes_selected_data, {
        expires: 365,
        domain: PARENT_DOMAIN,
        path: url_streams
    });
    Cookies.set('streams_selected_classes', game_classes_selected_data, {
        expires: 365,
        domain: PARENT_DOMAIN,
        path: another_lang_path
    });

    // https://api.jquery.com/jquery.ajax/
    $.ajax({
        type: 'POST',
        dataType: 'html',
        url: url_streams,
        data: game_classes_selected_data,
        headers: { 'X-CSRFToken': csrftoken },

        success: function (data, textStatus, jqXHR) {
            // console.log('data:', data);
            // console.log('jqXHR.responseText:', jqXHR.responseText);

            $('.streams-container').html(data);

            $('.streams-container').animate(
                { opacity: 1 },
                { duration: 150, queue: false },
            );

        },
    });
};
