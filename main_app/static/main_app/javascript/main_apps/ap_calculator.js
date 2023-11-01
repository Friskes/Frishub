var choosing_server_type = document.querySelector('#choosing-server-type');
var current_server_type;
let event = new Event('input');
choosing_server_type.addEventListener('input', function () {
    window.localStorage.setItem('choosing_server_type', choosing_server_type.checked);
    current_server_type = choosing_server_type.checked;

    // вручную генерируем ивент для того чтобы сработала отправка данных на сервер
    $('.calculator-table input')[0].dispatchEvent(event);
});

var choosing_server_type_from_local_storage = JSON.parse(window.localStorage.getItem('choosing_server_type'));
if (choosing_server_type_from_local_storage) {
    choosing_server_type.checked = true;
    current_server_type = true;
} else {
    choosing_server_type.checked = false;
    current_server_type = false;
};


var changeTimer = false;
var csrftoken = Cookies.get('csrftoken');

$('.calculator-table input').on('input', function (event) {

    let data = {};

    $('.calculator-table input').each(function (index, element) {
        const clean_value = element.value.replace(/[^\d]/g, '');
        if (clean_value) {
            data[element.name] = clean_value;
        } else {
            data[element.name] = '0';
        };
    });

    data['server_type'] = current_server_type;

    if (changeTimer !== false) {
        clearTimeout(changeTimer);
    };
    changeTimer = setTimeout(function () {

        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: url_ap_calculator,
            data: data,
            headers: { 'X-CSRFToken': csrftoken },

            success: function (data, textStatus, jqXHR) {
                for (var bracket in data) {
                    $(`#${bracket}-points`).text(data[bracket]);
                };
            },
        });
        changeTimer = false;
    }, 500);
});
