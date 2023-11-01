$(".chosen-select").chosen({
    // https://harvesthq.github.io/chosen/
    // макс количество элементов доступных для выбора
    max_selected_options: 3,
    // текст при отсутствии выбранных элементов
    placeholder_text_multiple: " ",
    // текст при отсутствии элемента с указанным названием
    no_results_text: trans_not_found,
    // переместить кнопку и текст вправо
    // rtl: true,
    // ширина виджета
    width: "74%",
    // поиск по всем символам в названиях элементов (по дефолту только по первому)
    // search_contains: true,
    // для удаления элемента необходимо повторное нажатие кнопки удалить
    // single_backstroke_delete: false,
    // скрывать выбранные элементы в списке
    display_selected_options: false,
    // не скрывать список после выбора элемента
    hide_results_on_select: false,
});


var dp_hide;
var select_array;
$('.chosen-container').on('click', function (e) {
    if ($('.no-results').text()) { return };
    if (select_array != 3) {
        if (dp_hide) {
            dp_hide = false;
            $('.chosen-select').trigger('chosen:close');
            return;
        };
        dp_hide = true;
    };
});
if (dp_hide) {
    $('.chosen-select').on('chosen:showing_dropdown', function (e, p) { dp_hide = true; });
};
$('.chosen-select').on('chosen:hiding_dropdown', function (e, p) { dp_hide = false; });
$('.chosen-select').on('change', function (e, p) {
    var array = $('.chosen-select').serializeArray();
    select_array = array['length'];
    if (select_array == 3) {
        $('.chosen-select').trigger('chosen:close');
    };
});


const CLASS_COLORS = {
    '0': '198, 155, 109', '1': '244, 140, 186',
    '2': '170, 211, 114', '3': '255, 244, 104',
    '4': '255, 255, 255', '5': '196, 30, 58',
    '6': '0, 112, 221', '7': '63, 199, 235',
    '8': '135, 136, 238', '9': '255, 124, 10',
};
const enable_class_colors = true;
const disable_input_search = true;
function text_color_changer(element) {
    if (enable_class_colors) { var text_color = '0, 0, 0'; } else { var text_color = '185, 185, 185'; };
    $(element).css("color", `rgb(${text_color})`);
    $(element).hover(
        function () { $(element).css("color", "rgb(255, 255, 255)"); }, // mouseenter
        function () { $(element).css("color", `rgb(${text_color})`); }, // mouseleave
    );
};
function set_class_attr(element, array_index, width) {
    $(element).css("background", `url(/static/main_app/images/class_icons/class_${array_index}.png) ${width} no-repeat`);
    $(element).css("background-size", "25.5px");
    if (enable_class_colors) {
        $(element).css("background-color", `rgba(${CLASS_COLORS[array_index]}, 0.6)`);
    };
};
function class_attr_changer() {
    $('.active-result').each(function (index, element) {
        let array_index = element.getAttribute('data-option-array-index');
        set_class_attr(element, array_index, '100%');
        text_color_changer(element);
    });
};
$('.chosen-search-input').on('keyup', function (event) {
    class_attr_changer();
});
$('.chosen-select').on('change chosen:showing_dropdown', function (event, params) {

    if (disable_input_search) {
        $('.chosen-choices').css("min-height", "29px");
        $('.search-field').css("display", "none");
    }

    class_attr_changer();
    $('.search-choice').each(function (index, element) {
        let array_index = element.querySelector('.search-choice-close').getAttribute('data-option-array-index');
        set_class_attr(element, array_index, '88.5%');
        text_color_changer(element);

        if (params && params['selected'] && !element.querySelector('span').style['opacity']) {

            $(element).css("transition", "all 1s ease");

            $(element.querySelector('span')).css("opacity", "0");
            // https://mkr-novo2.ru/problems/jquery-plavnoe-izmenenie-prozrachnosti-kak-sdelat-plavnuyu-prozrachnost-veb-elementa-s-pomoshchyu-jqu.html
            $(element.querySelector('span')).fadeTo(1000, 1);
        };
    });
});
$('.search-choice').each(function (index, element) {
    let array_index = element.querySelector('.search-choice-close').getAttribute('data-option-array-index');
    set_class_attr(element, array_index, '88.5%');
    text_color_changer(element);

    $(element.querySelector('span')).css("opacity", "1");

    if (disable_input_search) {
        $('.chosen-choices').css("min-height", "29px");
        $('.search-field').css("display", "none");
    }

    $(element).hover(
        function () {
            $(element).css("transition", "all 1s ease");
            if (!enable_class_colors) { $(element).css("background-color", "rgb(35, 35, 35)"); };
        },
        function () {
            if (!enable_class_colors) { $(element).css("background-color", "rgb(45, 45, 45)"); };
        },
    );
});


document.addEventListener('input', input_value_changed);
$('.chosen-select').on('change', function (event, params) { input_value_changed() });

function input_value_changed() {
    var btn_state = document.querySelector('.btn-custom');
    btn_state.classList.remove('button-disabled');
    btn_state.classList.add('button');
    btn_state.disabled = false;
}
