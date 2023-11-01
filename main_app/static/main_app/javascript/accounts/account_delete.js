var agree_delete = document.getElementById('confirm');

agree_delete.addEventListener('input', element_changed_value);

function element_changed_value() {
    let btn_state = document.querySelector('.btn-remove');
    if (agree_delete.checked !== false) {
        btn_state.classList.remove('button-disabled');
        btn_state.classList.add('button');
        btn_state.disabled = false;
    }
    else {
        btn_state.classList.remove('button');
        btn_state.classList.add('button-disabled');
        btn_state.disabled = true;
    }
}
