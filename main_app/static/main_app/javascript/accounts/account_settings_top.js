function humanize_size(bytes, decimals = 1) {
    if (bytes === 0) return '0';
    var suffixes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var power = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, power)).toFixed(decimals))} ${suffixes[power]}`;
};

const cropper_image_box = document.getElementById('cropper-image-box');
const input_avatar = document.getElementById(form_avatar_auto_id);
const avatar_text = document.getElementById('avatar-text');
const avatar_name = document.getElementById('avatar-name');

input_avatar.addEventListener('change', (event) => {

    var avatar_url = URL.createObjectURL(input_avatar.files[0]);
    cropper_image_box.innerHTML = `<img src="${avatar_url}" id="avatar-img" style="max-width: 100%;">`;
    var $image = $('#avatar-img');

    avatar_name.innerHTML = $(`#${form_avatar_auto_id}`)[0].files[0].name;

    // https://github.com/fengyuanchen/cropperjs#options
    $image.cropper({
        viewMode: 3,
        aspectRatio: 1 / 1,
        strict: true,
        guides: false,
        dragMode: 'move',
        movable: true,
        rotatable: false,
        highlight: true,
        dragCrop: false,
        cropBoxResizable: true,
        autoCropArea: 0,
        crop: function (event) {
            var width = Math.round(event.detail.width);
            var height = Math.round(event.detail.height);

            avatar_text.innerHTML = `${width}x${height}&nbsp;&nbsp;${humanize_size($(`#${form_avatar_auto_id}`)[0].files[0].size)}`;

            debounce_replace_input_file(width, height);
        },
    });
    var cropper = $image.data('cropper');
    function replace_input_file(width, height) {
        cropper.getCroppedCanvas().toBlob((blob) => {
            if (blob) {
                var file_name = $(`#${form_avatar_auto_id}`)[0].files[0]['name'];
                var dt = new DataTransfer();
                dt.items.add(new File([blob], file_name, { type: blob['type'] }));
                var file_list = dt.files;
                $(`#${form_avatar_auto_id}`)[0].files = file_list;
                avatar_text.innerHTML = `${width}x${height}&nbsp;&nbsp;${humanize_size($(`#${form_avatar_auto_id}`)[0].files[0].size)}`;
            };
        });
    };
    let debounce_replace_input_file = debounce(replace_input_file, 300);
});


$('.img-delete-btn').hover(
    function () { $('#id_delete_avatar_btn').val("DELETE_AVATAR"); },
    function () { $('#id_delete_avatar_btn').val(""); },
);


// Лимит на выбор пунктов меню в select multiple на смартфонах c оповещением 
$(document).ready(function () {
    var last_valid_selection = $(`#${form_game_class_auto_id}`).val();
    $(`#${form_game_class_auto_id}`).change(function (event) {
        if ($(this).val().length > 3) {
            alert(trans_maximum_three_game_classes);
            $(this).val(last_valid_selection);
        } else {
            last_valid_selection = $(this).val();
        };
    });
});
