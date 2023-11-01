const modelIsLoaded = function (func, ignoreUserRights = false) {
    return function (...args) {
        // проверяет есть ли у пользователя разрешение на редактирование персонажа
        if (!ignoreUserRights && !window.dressUI.room_creator && !window.dressUI.allow_edit) {
            warnMessageHandler(3000, trans_prohibition_changes);
            return false;
            // проверяет, была ли создана модель.
        } else if (!window.model) {
            warnMessageHandler(4000, trans_error_model_not_created);
            return false;
            // проверяет, полностью ли загружена модель.
        } else if (!window.model.renderer || !window.model.renderer.models[0].modelIsLoaded
            || !window.model.renderer.viewer.method("isLoaded")) {
            warnMessageHandler(2000, trans_please_wait_for_loading_model);
            return false;
        } else if (!window.gameData) {
            warnMessageHandler(2000, trans_please_wait_for_loading_database);
            return false;
        };
        func.apply(this, args);
    };
};


const warning_toast_message = $('.warning-toast-message');

const warnMessageHandler = function (duration, message) {
    warning_toast_message.stop(true, true);

    warning_toast_message.find('div').text(message);
    warning_toast_message.css('display', 'block');

    warning_toast_message.animate(
        { opacity: 0 },
        {
            duration: duration, queue: false,
            complete: function () {
                warning_toast_message.css('opacity', '1');
                warning_toast_message.css('display', 'none');
            }
        }
    );
};


const my_saved_rooms_container = $('.my-saved-rooms-container')[0];
const my_saved_rooms = $('.my-saved-rooms')[0];

function generateRoomsListHtml() {
    if (!charData.my_saved_rooms || charData.my_saved_rooms.length === 0) {
        my_saved_rooms.textContent = trans_you_not_have_any_saved_rooms;
    } else {
        for (const roomData of charData.my_saved_rooms) {

            const race = ALL_RACES[roomData.race].toLowerCase();
            const gender = GENDERS[roomData.gender].toLowerCase();

            const race_gender_img_url = RACES_WITHOUT_ICON.indexOf(roomData.race) !== -1
                ? '/static/main_app/images/close.png'
                : `${DEFAULT_ICON_URL}race_${race}_${gender}.jpg`;

            const element_char_img = document.createElement('img');
            element_char_img.setAttribute('src', race_gender_img_url);
            element_char_img.classList.add('rooms-list-img');

            const element_patch_img = document.createElement('img');
            element_patch_img.setAttribute('src', `/static/main_app/images/${roomData.game_patch}.png`);
            element_patch_img.classList.add('rooms-list-img');
            element_patch_img.textContent = roomData.game_patch;

            const element_user_icon = document.createElement('div');
            element_user_icon.classList.add('fa');
            roomData.allow_edit ? element_user_icon.classList.add('fa-users') : element_user_icon.classList.add('fa-user');
            element_user_icon.style.display = 'inline-block';
            element_user_icon.style.fontSize = '23px';
            element_user_icon.style.marginRight = '5px';

            const element_span = document.createElement('span');
            element_span.textContent = ' ' + roomData.last_update_time;
            element_span.style.fontSize = '15px';

            const element_calendar_icon = document.createElement('div');
            element_calendar_icon.classList.add('fa', 'fa-calendar');
            element_calendar_icon.style.display = 'inline-block';
            element_calendar_icon.style.fontSize = '21px';
            element_calendar_icon.style.position = 'relative';
            element_calendar_icon.style.bottom = '1px';
            element_calendar_icon.appendChild(element_span);

            const element_a = document.createElement('a');
            // element_a.setAttribute('href', window.location.href.split('/').slice(0, -2).join('/') + '/' + roomData.room_id);
            element_a.setAttribute('href', window.location.origin + url_dressing_room + roomData.room_id);
            element_a.setAttribute('target', '_BLANK');
            element_a.classList.add('rooms-list-link');
            element_a.appendChild(element_char_img);
            element_a.appendChild(element_patch_img);
            element_a.appendChild(element_user_icon);
            element_a.appendChild(element_calendar_icon);
            if (roomData.room_id === window.location.pathname.split('/')[2]) element_a.style.color = 'lime';

            const delete_room_img = document.createElement('img');
            delete_room_img.setAttribute('src', `/static/main_app/images/close.png`);
            delete_room_img.classList.add('rooms-list-delete-img');

            const element_div = document.createElement('div');
            element_div.appendChild(element_a);
            element_div.appendChild(delete_room_img);

            my_saved_rooms.appendChild(element_div);

            delete_room_img.addEventListener('click', function (event) {
                sendAjaxRequest({ 'delete_room': event.target.previousElementSibling.href.split('/').at(-1) });
                event.target.parentElement.remove();
            });
        };
    };
};
generateRoomsListHtml();


$('#dr-my-saved-rooms').on('click', function (event) {
    window.dressUI.saved_rooms = !window.dressUI.saved_rooms;
    my_saved_rooms_container.style.display = window.dressUI.saved_rooms ? 'grid' : 'none';
});


$('#change_game_patch').on('click', modelIsLoaded(function (event) {
    window.dressUI.game_patch = window.dressUI.game_patch === 'wrath' ? 'live' : 'wrath';
    event.target.style.backgroundImage = `url(/static/main_app/images/${window.dressUI.game_patch}.png)`;

    if (window.dressUI.game_patch === 'wrath' && window.dressUI.model_opts.race > WRATH_RACES_LEN) {
        window.dressUI.model_opts.race = WRATH_RACES_LEN;
    };
    if (window.dressUI.game_patch === 'wrath' && window.dressUI.char.mount > WRATH_MOUNTS_LEN) {
        window.dressUI.char.mount = WRATH_MOUNTS_LEN;
    };

    // может возникать проблема при переключении патча и слишком быстрой перезагрузки страницы
    // изза этого происходит рассинхрон между патчем и количество настроек внешности для персонажа на этом патче
    sendAjaxRequest(get_actual_dressUI());

    warnMessageHandler(6000, interpolate(
        trans_reload_page_to_change_patch,
        [window.dressUI.game_patch.toUpperCase()]
    ));
}));

if (window.dressUI.game_patch === 'live') {
    $('#change_game_patch')[0].style.backgroundImage =
        `url(/static/main_app/images/${window.dressUI.game_patch}.png)`;
};


if (window.dressUI.room_creator) {
    $('.dressing-room-character-controls-general')[0].insertAdjacentHTML('beforeEnd',
        `<a _ngcontent-xpp-c94="" class="info">
        <button class="btn dress-btn btn-site fa fa-user" id="dr-allow-edit" type="button">${trans_allow_editing}</button>
        <span _ngcontent-xpp-c94="" class="info-text" style="color: #fff; margin-top: -93px; margin-left: -230px;"></span>
      </a>`
    );

    const dr_allow_edit = $('#dr-allow-edit');
    dr_allow_edit.on('click', function (event) {
        window.dressUI.allow_edit = !window.dressUI.allow_edit;
        setAllowEditIcon();
        window.dressUI.allow_edit
            ? warnMessageHandler(4000, trans_editing_is_now_allowed)
            : warnMessageHandler(4000, trans_now_only_you_can_edit);
    });

    function setAllowEditIcon() {
        if (window.dressUI.allow_edit) {
            dr_allow_edit[0].classList.remove('fa-user');
            dr_allow_edit[0].classList.add('fa-users');
            dr_allow_edit[0].parentElement.children[1].textContent = trans_prohibit_editing;
        } else {
            dr_allow_edit[0].classList.remove('fa-users');
            dr_allow_edit[0].classList.add('fa-user');
            dr_allow_edit[0].parentElement.children[1].textContent = trans_allow_editing_by_other_users;
        };
    };
    setAllowEditIcon();
};


const sortItemsFunc = (a, b) => {
    if (a.getAttribute('ilvl') == b.getAttribute('ilvl')) return -1;
};

function sortItems(items_menu, slot_data, arr = null) {
    if (!arr) {
        const slotItems = items_menu.children[1].getElementsByTagName("A");
        arr = Array.from(slotItems);
    };
    const sortedSlotItemsArray = arr.sort(sortItemsFunc);

    // sortedSlotItemsArray.forEach(element => {
    $(sortedSlotItemsArray).each(function (index, element) {

        if (element.getAttribute('type') == slot_data.type
            && element.getAttribute('quality') == slot_data.quality
            || element.getAttribute('visualId')) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        };

        items_menu.children[1].appendChild(element);
    });
    // items_menu.children[1].append(...arr);
};


function updateItemsMenuHandler(direction, slot_data, imit_select) {
    direction ? slot_data.index -= 1 : slot_data.index += 1;
    slot_data.type = slot_data.available_types[slot_data.index];
    imit_select.textContent = slot_data.type;
};


function clearItemSlotsIcon(...slotIds) {
    for (const slotId of slotIds) {
        let slot_btn = getSlotBtnBySlotId(slotId);
        let ins = slot_btn.children[0];

        ins.style.backgroundImage = `url(${DEFAULT_ICON_URL}${DEFAULT_SLOT_ICONS[slotId]}.jpg)`;
        slot_btn.children[2].href = 'javascript:';

        removeUnderlineFrom_A(slot_btn.parentElement.children[1].children[1].children[0]);
    };
};


function setItemSlotIcon(element, slot_btn) {
    let ins = slot_btn.children[0];
    const icon = element.children[0].children[0].style.backgroundImage.split('/').pop().split('.')[0];
    const itemId = element.href.split('=').pop();

    ins.style.backgroundImage = `url(${DEFAULT_ICON_URL}${icon}.jpg)`;
    slot_btn.children[2].href = `${WH_TOOLTIP_URL}item=${itemId}`;
};


function clearItemSlots(slotId) {

    if (window.dressUI.char.only_item) {
        warnMessageHandler(2000, trans_disabled_item_only_mode);
        return false;
    };

    // console.log('clearItemSlots_before_clearSlots -> window.dressUI.model_opts.items:', ...window.dressUI.model_opts.items);

    if (slotId === '021' || slotId === '022') {
        const index = slotIdIsExists(parseInt(slotId));

        if (index === false || !window.dressUI.model_opts.items[index][3]) {
            warnMessageHandler(1500, trans_selected_slot__already_empty);
        } else {
            const displayId = window.dressUI.model_opts.items[index][1];
            window.model.renderer.viewer.method("setItems", [[
                { slot: parseInt(slotId), display: displayId, visual: 0 }
            ]]);

            window.dressUI.model_opts.items[index].splice(3, 1, 0);
            clearItemSlotsIcon(slotId);
        };
        return false;
    };

    const index = slotIdIsExists(slotId);
    // если текущий slotId не записан в items тогда выходим из функции
    if (index === false) {
        warnMessageHandler(1500, trans_selected_slot__already_empty);
        return false;
    };
    // иначе удаляем итем из items
    window.dressUI.model_opts.items.splice(index, 1);

    clearItemSlotsIcon(slotId);

    switch (parseInt(slotId)) {
        case 21: clearItemSlotsIcon('021'); break;
        case 22: clearItemSlotsIcon('022'); break;
    };

    // Удалить итем с указанного айди слота
    window.model.renderer.viewer.method("clearSlots", slotId.toString());
    // удалить несколько итемов по айди слотов
    // передаётся строка в таком формате: "21,22" получается так: [21, 22].join()

    if (slotId == 21 || slotId == 22 || slotId == 23) updateSheathInfo();

    // console.log('clearItemSlots_after_clearSlots -> window.dressUI.model_opts.items:', ...window.dressUI.model_opts.items);
};


function setItemSlots(element_a) {
    const slot_btn = element_a.parentElement.parentElement.parentElement.children[0];
    let slotId = parseInt(slot_btn.getAttribute('data-character-slot'));
    let displayId = parseInt(element_a.getAttribute('display-id'));
    let itemId = parseInt(element_a.href.split('=').pop());
    let visualId = parseInt(element_a.getAttribute('visualId')) || 0;

    // Временная заглушка
    if (window.dressUI.char.only_item && slotId != 1 && slotId != 3 && slotId != 21 && slotId != 22 && slotId != 23) {
        warnMessageHandler(3000, trans_not_all_items_available_for_viewing);
        return false;
    } else if (window.dressUI.char.only_item && visualId !== 0) {
        warnMessageHandler(3000, trans_weapon_enchantment_not_available);
        return false;
    };

    // console.log('setItemSlots_before_setItems -> window.dressUI.model_opts.items:', ...window.dressUI.model_opts.items);

    let index = slotIdIsExists(slotId);

    if (visualId !== 0) {
        if (index !== false) {
            if (window.dressUI.model_opts.items[index][3] == visualId) {
                // warnMessageHandler(1500, 'Надетый и выбранный итемы имеют одинаковые модели.');
                return false;
            };
            displayId = window.dressUI.model_opts.items[index][1];
            itemId = window.dressUI.model_opts.items[index][2];
        } else {
            warnMessageHandler(2000, trans_take_weapon_in_your_hand);
            return false;
        };
    };

    if (!window.dressUI.char.only_item) {
        // если текущий slotId уже записан в items тогда
        if (index !== false) {
            // если текущий displayId равен записаному в items тогда выходим из функции
            if (window.dressUI.model_opts.items[index][1] == displayId && visualId === 0) {
                // warnMessageHandler(1500, 'Надетый и выбранный итемы имеют одинаковые модели.');
                return false;
            };
            // иначе обновляем displayId, itemId и visualId на новый
            window.dressUI.model_opts.items[index][1] = displayId;
            window.dressUI.model_opts.items[index][2] = itemId;
            if (visualId !== 0) window.dressUI.model_opts.items[index][3] = visualId;
            // иначе добавляем новый итем в items
        } else {
            window.dressUI.model_opts.items.push([slotId, displayId, itemId, visualId]);
        };

        switch (slotId) {
            case 22: if (slotIdIsExists(23) !== false) clearItemSlots(23); break;
            case 23: if (slotIdIsExists(22) !== false) clearItemSlots(22); clearItemSlotsIcon('022'); break;
        };

    } else {
        if (window.dressUI.char.only_item_data.id === displayId) {
            // warnMessageHandler(1500, 'Надетый и выбранный итемы имеют одинаковые модели.');
            return false;
        };
        window.dressUI.char.only_item_data =
            { type: TYPEID_BY_SLOTID[slotId], id: displayId, itemId: itemId, slotId: slotId };
    };

    removeUnderlineFrom_A(element_a);
    element_a.classList.add('text-uline');

    setItemSlotIcon(element_a, slot_btn);

    if (window.dressUI.char.only_item) {
        switch (slotId) {
            case 1: clearItemSlotsIcon(3, 21, 22, 23); break;
            case 3: clearItemSlotsIcon(1, 21, 22, 23); break;
            case 21: clearItemSlotsIcon(1, 3, 22, 23); break;
            case 22: clearItemSlotsIcon(1, 3, 21, 23); break;
            case 23: clearItemSlotsIcon(1, 3, 21, 22); break;
        };
        window.generateItemModel({ type: TYPEID_BY_SLOTID[slotId], id: displayId });

    } else {
        window.model.renderer.viewer.method("clearSlots", slotId.toString());

        index = slotIdIsExists(slotId);

        // Установить итемы на модель (можно устанавливать несколько итемов за раз)
        window.model.renderer.viewer.method("setItems", [[
            { slot: slotId, display: displayId, visual: window.dressUI.model_opts.items[index][3] },
        ]]);

        if (slotId == 21 || slotId == 22 || slotId == 23) updateSheathInfo();

        // console.log('setItemSlots_after_setItems -> window.dressUI.model_opts.items:', ...window.dressUI.model_opts.items);
    };
};


function getSlotBtnBySlotId(slotId) {
    let toReturn;
    $('.iconlarge').each(function (index, slot_btn) {
        if (slotId.toString() === slot_btn.getAttribute('data-character-slot')) {
            toReturn = slot_btn;
            return false;
        };
    });
    return toReturn;
};


function slot_switcher(slotId, items_menu) {
    window.dressUI.gear.items_menu[`slot${slotId}`].opened = !window.dressUI.gear.items_menu[`slot${slotId}`].opened;
    window.dressUI.gear.items_menu[`slot${slotId}`].opened ? $(items_menu).css('display', 'block') : $(items_menu).css('display', 'none');
};


function removeUnderlineFrom_A(target) {
    for (let element of target.parentElement.getElementsByTagName("A")) {
        if (element.classList.contains('text-uline')) element.classList.remove('text-uline');
    };
};


function itemQualityCheckMarkUpdate(target) {
    for (let element of target.parentElement.getElementsByTagName("A")) {
        if (element.classList.contains('fa-check-square')) {
            element.classList.remove('fa-check-square');
            element.classList.add('fa-square');
        };
    };
    target.classList.add('fa-check-square');
};


function generateItemsMenuHtml(slotId) {
    let elements_list = [];

    if (slotId === '021' || slotId === '022') slotId = 'enchants';

    for (const itemData of window.gameData[0][slotId]) {

        const element_ins_icon = document.createElement('ins');
        element_ins_icon.style.backgroundImage = `url(${DEFAULT_ICON_URL}${itemData.icon}.jpg)`;

        const element_del_icon = document.createElement('del');

        const element_span_icon = document.createElement('span');
        element_span_icon.classList.add('iconlarge'); // iconsmall // iconmedium // iconlarge
        element_span_icon.appendChild(element_ins_icon);
        element_span_icon.appendChild(element_del_icon);

        const element_span_text = document.createElement('span');
        element_span_text.textContent = itemData.name;

        const element_a = document.createElement('a');
        if (slotId === 'enchants') {
            element_a.setAttribute('visualId', itemData.visualId);
            itemData.quality = 1;
        };
        element_a.classList.add(ITEM_QUALITIES[itemData.quality]);
        element_a.setAttribute('href', `${WH_TOOLTIP_URL}item=${itemData.itemId}`);
        element_a.setAttribute('display-id', itemData.displayId);
        element_a.setAttribute('quality', itemData.quality);
        element_a.setAttribute('type', itemData.type);
        element_a.setAttribute('ilvl', itemData.ilvl);
        element_a.appendChild(element_span_icon);
        element_a.appendChild(element_span_text);

        elements_list.push(element_a);
    };
    return elements_list;
};


function generateItemsMenu(slotId, items_menu) {

    const slot_data = window.dressUI.gear.items_menu[`slot${slotId}`];
    const item_types_len = slot_data.available_types.length - 1;
    const elements_list = generateItemsMenuHtml(slotId);

    setAlphaForExtremeButtonPosition(
        items_menu.getElementsByClassName("fa-caret-left")[0],
        0,
        item_types_len
    );

    items_menu.children[0].addEventListener('click', modelIsLoaded(function (event) {

        if (event.target.classList.contains('caret-disabled')) return;

        if (event.target.classList.contains('fa-caret-left') && slot_data.index > 0) {

            updateItemsMenuHandler(true, slot_data, event.target.parentElement.children[1]);
            sortItems(items_menu, slot_data);
            setAlphaForExtremeButtonPosition(event.target, slot_data.index, item_types_len);

        } else if (event.target.classList.contains('fa-caret-right') && slot_data.index < item_types_len) {

            updateItemsMenuHandler(false, slot_data, event.target.parentElement.children[1]);
            sortItems(items_menu, slot_data);
            setAlphaForExtremeButtonPosition(event.target, slot_data.index, item_types_len);
        };

        const quality = event.target.getAttribute('data-quality');
        if (quality && slot_data.quality != quality) {

            itemQualityCheckMarkUpdate(event.target);
            slot_data.quality = quality;
            sortItems(items_menu, slot_data);
        };
    }));

    items_menu.children[1].addEventListener('click', modelIsLoaded(function (event) {
        event.preventDefault(); // блокирует переход по ссылке но обрабатывает клик и отображает тултип
        if (event.target.tagName === 'SPAN') { setItemSlots(event.target.parentElement); }
        else if (event.target.tagName === 'A') { setItemSlots(event.target); };
    }));

    $(items_menu.children[0].children[0]).find('div')[0].children[1].textContent = slot_data.type;
    sortItems(items_menu, slot_data, elements_list);
};


function creatingItemsMenu() {
    const itemsMenus = document.querySelector('#dressing-room-paperdoll').getElementsByClassName('items-menu');
    for (const items_menu of itemsMenus) {
        const slotId = items_menu.parentElement.children[0].getAttribute('data-character-slot');
        if (slotId != 2 && slotId != 11 && slotId != 12 && slotId != 13 && slotId != 14) {
            generateItemsMenu(slotId, items_menu);
        };
    };
};


function slots_handler(event) {
    if (!event.target.parentElement.hasAttribute('data-character-slot')) return false;

    event.preventDefault(); // блокирует переход по ссылке но обрабатывает клик и отображает тултип

    const slotId = event.target.parentElement.getAttribute('data-character-slot');
    const items_menu = event.target.parentElement.parentElement.children[1];

    slot_switcher(slotId, items_menu);
};


$('.paperdoll-left a').on('click touchstart', modelIsLoaded(function (event) {
    slots_handler(event);
}));


$('.paperdoll-right a').on('click touchstart', modelIsLoaded(function (event) {
    slots_handler(event);
}));


$('.paperdoll-bottom a').on('click touchstart', modelIsLoaded(function (event) {
    slots_handler(event);
}));


function setDefaultText() {
    $('#select_race_btn').find('a')[1].textContent = RACES[window.dressUI.char.race_id];
    $('#select_gender_btn').find('a')[1].textContent = GENDERS[window.dressUI.char.gender_id];

    updateSheathText();

    $('#select_animation_btn').find('a')[1].textContent =
        window.dressUI.char.anims_list[window.dressUI.char.anim];

    $('#select_mount_btn').find('a')[1].textContent =
        window.gameData[0].mounts[window.dressUI.char.mount].name;
};


// Character HANDLERS

$('#select_race_btn a').on('click', modelIsLoaded(function (event) {

    if (this.classList.contains('imitation-select')) {
        races_menu_switcher(event.target.parentElement.parentElement.children[2]);
        return false;
    };

    if (event.target.classList.contains('caret-disabled')) return;

    if (this.classList.contains('fa-caret-left') && window.dressUI.char.race_id > 1) {

        switch (window.dressUI.char.race_id) {
            case 24: window.dressUI.char.race_id -= 2; break;
            case 27: window.dressUI.char.race_id -= 3; break;
            default: window.dressUI.char.race_id -= 1;
        };
    } else if (this.classList.contains('fa-caret-right') && window.dressUI.char.race_id < RACES_LEN) {

        switch (window.dressUI.char.race_id) {
            case 22: window.dressUI.char.race_id += 2; break;
            case 24: window.dressUI.char.race_id += 3; break;
            default: window.dressUI.char.race_id += 1;
        };
    };
    setRace(window.dressUI.char.race_id);
}));


function getImgUrlByRaceId(race_id) {
    const race = RACES[race_id].toLowerCase();
    const gender = GENDERS[window.dressUI.char.gender_id].toLowerCase();

    const race_gender_img_url = RACES_WITHOUT_ICON.indexOf(parseInt(race_id)) !== -1
        ? '/static/main_app/images/close.png'
        : `${DEFAULT_ICON_URL}race_${race}_${gender}.jpg`;

    return race_gender_img_url;
};

function updateGenderImagesInRacesMenu() {
    const elements_a = races_menu.getElementsByTagName("A");

    for (let i = 0; i < elements_a.length; i++) {

        const race_id = elements_a[i].getAttribute('race_id');
        elements_a[i].children[0].src = getImgUrlByRaceId(race_id);
    };
};

const races_menu = $('.races-menu')[0].children[0];

function generateRacesMenuHtml() {

    for (const race_id in RACES) {

        const element_char_img = document.createElement('img');
        element_char_img.setAttribute('src', getImgUrlByRaceId(race_id));
        element_char_img.classList.add('races-menu-img');

        const element_span = document.createElement('span');
        element_span.textContent = RACES[race_id];
        element_span.style.fontSize = '15px';

        const element_a = document.createElement('a');
        element_a.setAttribute('href', 'javascript:');
        element_a.setAttribute('race_id', race_id);
        element_a.classList.add('q1');
        element_a.appendChild(element_char_img);
        element_a.appendChild(element_span);

        races_menu.appendChild(element_a);
    };

    races_menu.addEventListener('click', modelIsLoaded(function (event) {
        event.preventDefault(); // блокирует переход по ссылке но обрабатывает клик и отображает тултип

        if (event.target.tagName === 'A') {
            checkDuplicateRace(event.target.getAttribute('race_id'));
        } else if (event.target.tagName === 'IMG' || event.target.tagName === 'SPAN') {
            checkDuplicateRace(event.target.parentElement.getAttribute('race_id'));
        };
    }));
};
generateRacesMenuHtml();


function checkDuplicateRace(current_index) {
    if (window.dressUI.model_opts.race == current_index) {
        // warnMessageHandler(1500, 'Текущая и выбранная раса одинаковая.');
        return false;
    };
    setRace(current_index);
};


function setRace(current_index) {
    window.dressUI.char.race_id = parseInt(current_index);
    window.dressUI.model_opts.race = window.dressUI.char.race_id;

    const current_element_a = findElementByRaceId(window.dressUI.model_opts.race);
    removeUnderlineFrom_A(current_element_a);
    current_element_a.classList.add('text-uline');

    const caret_element_a = $('#select_race_btn').find('a')[1];

    const anim_name = RACES[window.dressUI.model_opts.race];

    caret_element_a.textContent = anim_name;

    setAlphaForExtremeButtonPosition(
        caret_element_a,
        window.dressUI.model_opts.race,
        RACES_LEN,
        1
    );
    window.dressUI.face.current = [];
    window.generateCharModel();
};


function races_menu_switcher(races_menu) {
    window.dressUI.char.races_menu_opened = !window.dressUI.char.races_menu_opened;
    window.dressUI.char.races_menu_opened ? $(races_menu).css('display', 'block') : $(races_menu).css('display', 'none');
};



$('#select_gender_btn a').on('click', modelIsLoaded(function (event) {

    if (event.target.classList.contains('caret-disabled')) return;

    if (this.classList.contains('fa-caret-left') && window.dressUI.char.gender_id === 1) {

        window.dressUI.char.gender_id -= 1;

    } else if (this.classList.contains('fa-caret-right') && window.dressUI.char.gender_id === 0) {

        window.dressUI.char.gender_id += 1;
    };
    window.dressUI.model_opts.gender = window.dressUI.char.gender_id;
    setAlphaForExtremeButtonPosition(event.target, window.dressUI.char.gender_id, 1);
    event.target.parentElement.children[1].textContent = GENDERS[window.dressUI.char.gender_id];
    updateGenderImagesInRacesMenu();
    window.dressUI.face.current = [];
    window.generateCharModel();
}));



$('#select_sheathed_btn a').on('click', modelIsLoaded(function (event) {

    if (event.target.classList.contains('caret-disabled')) return;

    if (this.classList.contains('fa-caret-left')
        && window.dressUI.char.sheath > 0) {

        window.dressUI.char.sheath -= 1;

    } else if (this.classList.contains('fa-caret-right')
        && window.dressUI.char.sheath < window.dressUI.char.sheath_opts.length - 1) {

        window.dressUI.char.sheath += 1;
    };
    setSheath();
}, true));

function updateSheathText() {
    $('#select_sheathed_btn').find('a')[1].textContent = window.dressUI.char.sheath == 0
        ? 'Unsheathed'
        : `Sheathed-${window.dressUI.char.sheath}`;
    window.dressUI.model_opts.sheathMain = window.dressUI.char.sheath_opts[window.dressUI.char.sheath][0];
    window.dressUI.model_opts.sheathOff = window.dressUI.char.sheath_opts[window.dressUI.char.sheath][1];
};

function setSheath() {
    const sheath_opts_len = window.dressUI.char.sheath_opts.length - 1;
    window.dressUI.char.sheath = Math.min(window.dressUI.char.sheath, sheath_opts_len);

    updateSheathText();
    setAlphaForExtremeButtonPosition($('#select_sheathed_btn').find('a')[1], window.dressUI.char.sheath, sheath_opts_len);

    window.model.renderer.viewer.method("setSheath", window.dressUI.char.sheath_opts[window.dressUI.char.sheath]);
};



$('#select_animation_btn a').on('click', modelIsLoaded(function (event) {

    if (this.classList.contains('imitation-select')) {
        anims_menu_switcher(event.target.parentElement.parentElement.children[2]);
        return false;
    };

    if (event.target.classList.contains('caret-disabled')) return;

    if (this.classList.contains('fa-caret-left')
        && window.dressUI.char.anim > 0) {

        window.dressUI.char.anim -= 1;

    } else if (this.classList.contains('fa-caret-right')
        && window.dressUI.char.anim < window.dressUI.char.anims_list.length - 1) {

        window.dressUI.char.anim += 1;
    };
    setAnim(window.dressUI.char.anim);
}, true));

function generateAnimsMenuHtml() {
    const anims_menu = $('.anims-menu')[0].children[0];

    for (const i in window.dressUI.char.anims_list) {

        anims_menu.insertAdjacentHTML('beforeEnd',
            `
                <a class="q1" href="javascript:" index="${i}">${window.dressUI.char.anims_list[i]}</a>
                `
        );
    };

    anims_menu.addEventListener('click', modelIsLoaded(function (event) {
        event.preventDefault(); // блокирует переход по ссылке но обрабатывает клик и отображает тултип

        if (event.target.tagName === 'A') checkDuplicateAnim(event.target.getAttribute('index'));
    }, true));
};

function checkDuplicateAnim(current_index) {
    if (window.dressUI.char.anim == current_index) {
        // warnMessageHandler(1500, 'Текущая и выбранная анимация одинаковая.');
        return false;
    };
    setAnim(current_index);
};


function setAnim(current_index) {
    window.dressUI.char.anim = parseInt(current_index);

    const current_element_a = $('.anims-menu-table')[0].getElementsByTagName("A")[window.dressUI.char.anim];
    removeUnderlineFrom_A(current_element_a.parentElement);
    current_element_a.classList.add('text-uline');

    const caret_element_a = $('#select_animation_btn').find('a')[1];

    const anim_name = window.dressUI.char.anims_list[window.dressUI.char.anim];

    caret_element_a.textContent = anim_name;

    setAlphaForExtremeButtonPosition(
        caret_element_a,
        window.dressUI.char.anim,
        window.dressUI.char.anims_list.length - 1
    );

    window.model.renderer.viewer.method("setAnimation", anim_name);
    // window.model.renderer.viewer.method("resetAnimation"); // Отменить анимацию
};

function anims_menu_switcher(anims_menu) {
    window.dressUI.char.anims_menu_opened = !window.dressUI.char.anims_menu_opened;
    window.dressUI.char.anims_menu_opened ? $(anims_menu).css('display', 'block') : $(anims_menu).css('display', 'none');
};



$('#select_mount_btn a').on('click', modelIsLoaded(function (event) {

    if (this.classList.contains('imitation-select')) {
        mounts_menu_switcher(event.target.parentElement.parentElement.children[2]);
        return false;
    };

    if (event.target.classList.contains('caret-disabled')) return;

    if (this.classList.contains('fa-caret-left')
        && window.dressUI.char.mount > 0) {

        window.dressUI.char.mount -= 1;

    } else if (this.classList.contains('fa-caret-right')
        && window.dressUI.char.mount < window.gameData[0].mounts.length - 1) {

        window.dressUI.char.mount += 1;
    };

    setCurrentMount(window.dressUI.char.mount);
}));

function generateMountsMenuHtml() {
    const listview_mode_tiled = $('.listview-mode-tiled')[0];
    const mounts = window.gameData[0].mounts;
    const whTooltipUrl = window.dressUI.game_patch === 'wrath'
        ? `https://www.wowhead.com/wrath/${LANG_POSTFIX}spell=`
        : `https://www.wowhead.com/${LANG_POSTFIX}spell=`;

    for (const i in mounts) {
        if (mounts[i].displayId === 0) continue;

        const hash = mounts[i].displayId & 255; // Побитовая операция

        listview_mode_tiled.insertAdjacentHTML('beforeEnd',
            `
                <div class="screenshot-cell" index="${i}">
                  <img src="https://wow.zamimg.com/modelviewer/${window.dressUI.game_patch}/webthumbs/npc/${hash}/${mounts[i].displayId}.webp">
                  <div class="screenshot-caption-wrapper">
                    <div class="screenshot-caption">
                      <a class="q" href="${whTooltipUrl}${mounts[i].spellId}">${mounts[i].name}</a>
                    </div>
                  </div>
                </div>
                `
        );
    };

    listview_mode_tiled.addEventListener('click', modelIsLoaded(function (event) {
        event.preventDefault(); // блокирует переход по ссылке но обрабатывает клик и отображает тултип

        if (event.target.classList.contains('screenshot-cell')) {
            checkDuplicateMount(event.target.getAttribute('index'));
        } else if (event.target.tagName === 'IMG') {
            checkDuplicateMount(event.target.parentElement.getAttribute('index'));
        } else if (event.target.classList.contains('screenshot-caption-wrapper')) {
            checkDuplicateMount(event.target.parentElement.getAttribute('index'));
        } else if (event.target.classList.contains('screenshot-caption')) {
            checkDuplicateMount(event.target.parentElement.parentElement.getAttribute('index'));
        } else if (event.target.tagName === 'A') {
            checkDuplicateMount(event.target.parentElement.parentElement.parentElement.getAttribute('index'));
        };
    }));
};

function checkDuplicateMount(current_index) {
    if (window.dressUI.char.mount == current_index) {
        // warnMessageHandler(1500, 'Текущий и выбранный маунт одинаковые.');
        return false;
    };
    setCurrentMount(current_index);
};

async function setCurrentMount(current_index) {
    window.dressUI.char.mount = parseInt(current_index);

    const current_element_a = $('.listview-mode-tiled')[0].getElementsByTagName("A")[window.dressUI.char.mount];
    removeUnderlineFrom_A(current_element_a.parentElement.parentElement.parentElement);
    current_element_a.classList.add('text-uline');

    const caret_element_a = $('#select_mount_btn').find('a')[1];
    caret_element_a.textContent = window.gameData[0].mounts[window.dressUI.char.mount].name;

    setAlphaForExtremeButtonPosition(
        caret_element_a,
        window.dressUI.char.mount,
        window.gameData[0].mounts.length - 1
    );

    window.dressUI.model_opts.generalOptions.mount.id =
        window.gameData[0].mounts[window.dressUI.char.mount].displayId;

    debounce_sendAjaxRequest(get_actual_dressUI());

    $('.paperdoll-model').css('background', 'url(https://wow.zamimg.com/images/icons/ajax.gif) center no-repeat');
    await _generateCharModel();
};

function mounts_menu_switcher(mounts_menu) {
    window.dressUI.char.mounts_menu_opened = !window.dressUI.char.mounts_menu_opened;
    window.dressUI.char.mounts_menu_opened ? $(mounts_menu).css('display', 'block') : $(mounts_menu).css('display', 'none');
};


function setAlphaForExtremeButtonPosition(element_a, cur, max, min = 0) {

    let caret_left = element_a.parentElement.children[0].classList;
    let imit_select = element_a.parentElement.children[1].classList;
    let caret_right = element_a.parentElement.children[2].classList;

    if (min == max) {
        if (!caret_left.contains('caret-disabled')) caret_left.add('caret-disabled');

        window.dressUI.char.only_item && !imit_select.contains('caret-disabled')
            ? imit_select.add('caret-disabled')
            : imit_select.remove('caret-disabled');

        if (!caret_right.contains('caret-disabled')) caret_right.add('caret-disabled');
        return false;
    };

    if (cur == min) {
        if (!caret_left.contains('caret-disabled')) caret_left.add('caret-disabled');
        if (imit_select.contains('caret-disabled')) imit_select.remove('caret-disabled');
        if (caret_right.contains('caret-disabled')) caret_right.remove('caret-disabled');

    } else if (cur == max) {
        if (caret_left.contains('caret-disabled')) caret_left.remove('caret-disabled');
        if (imit_select.contains('caret-disabled')) imit_select.remove('caret-disabled');
        if (!caret_right.contains('caret-disabled')) caret_right.add('caret-disabled');

    } else {
        if (caret_left.contains('caret-disabled')) caret_left.remove('caret-disabled');
        if (imit_select.contains('caret-disabled')) imit_select.remove('caret-disabled');
        if (caret_right.contains('caret-disabled')) caret_right.remove('caret-disabled');
    };
};

function refreshAlphaForExtremeButtonPosition(data) {

    const carets = document.querySelector(data.id).getElementsByClassName("fa-caret-left");

    for (let i = 0; i < carets.length; i++) {

        const current = data.key === "char"
            ? window.dressUI[data.key][data.fields[i]]
            : window.dressUI[data.key].current[i];

        setAlphaForExtremeButtonPosition(
            carets[i],
            current,
            data.max_len[i],
            data.min_len[i]
        );
    };
};


function findElementByItemId(itemId, slot_btn) {
    const slotItems = slot_btn.parentElement.getElementsByClassName('items-menu-table')[0].getElementsByTagName("A");
    for (let i = 0; i < slotItems.length; i++) {
        if (slotItems[i].href.split('=').pop() == itemId) return slotItems[i];
    };
};

function findElementByVisualId(visualId, slot_btn) {
    const slotItems = slot_btn.parentElement.getElementsByClassName('items-menu-table')[0].getElementsByTagName("A");
    for (let i = 0; i < slotItems.length; i++) {
        if (slotItems[i].getAttribute('visualId') == visualId) return slotItems[i];
    };
};

function findElementByRaceId(race_id) {
    const races = document.querySelector('.races-menu-table').getElementsByTagName("A");
    for (let i = 0; i < races.length; i++) {
        if (races[i].getAttribute('race_id') == race_id) return races[i];
    };
};


function updateItemSlotIcon(flag) {
    // Убрать подчеркивания и иконки выбранных итемов при выходе из режима "Только итемы"
    if (!flag) {
        for (const slotId of [1, 3, 21, 22, 23]) {
            const slot_btn = getSlotBtnBySlotId(slotId);
            const first_element_a = slot_btn.parentElement.getElementsByClassName('items-menu-table')[0].children[0];
            clearItemSlotsIcon(slotId);
            removeUnderlineFrom_A(first_element_a);
        };

        const current_element_a = $('.listview-mode-tiled')[0].getElementsByTagName("A")[window.dressUI.char.mount];
        current_element_a.classList.add('text-uline');
    };

    for (const itemData of window.dressUI.model_opts.items) {
        if (flag) {
            // очищаем иконки слот буттонов от итемов при переключении на режим "Только итемы"
            clearItemSlotsIcon(itemData[0]);
            if (itemData[0] == 21 || itemData[0] == 22) clearItemSlotsIcon(`0${itemData[0]}`);
        } else {
            let slot_btn = getSlotBtnBySlotId(itemData[0]);
            let element_a = findElementByItemId(itemData[2], slot_btn);

            removeUnderlineFrom_A(element_a);
            element_a.classList.add('text-uline');

            setItemSlotIcon(element_a, slot_btn);

            // Установить иконку для enchant слотов совместно со слотами оружия
            if (itemData[0] == 21 || itemData[0] == 22) {
                slot_btn = getSlotBtnBySlotId(`0${itemData[0]}`);
                element_a = findElementByVisualId(itemData[3], slot_btn);

                if (element_a) {
                    removeUnderlineFrom_A(element_a);
                    element_a.classList.add('text-uline');

                    setItemSlotIcon(element_a, slot_btn);
                };
            };
        };
    };

    if (flag) {
        const slot_btn = getSlotBtnBySlotId(window.dressUI.char.only_item_data.slotId);
        let element_a = findElementByItemId(window.dressUI.char.only_item_data.itemId, slot_btn);
        element_a.classList.add('text-uline');
        setItemSlotIcon(element_a, slot_btn);
    };
};


function set_race_gender_image() {
    const race = RACES[window.dressUI.char.race_id].toLowerCase();
    const gender = GENDERS[window.dressUI.char.gender_id].toLowerCase();

    const race_gender_img_url = RACES_WITHOUT_ICON.indexOf(window.dressUI.char.race_id) !== -1
        ? '/static/main_app/images/close.png'
        : `${DEFAULT_ICON_URL}race_${race}_${gender}.jpg`;

    $('#character_button').css('background-image', `url(${race_gender_img_url})`);
};


const gear_button = $('#gear_button')[0];
const face_button = $('#face_button')[0];
const char_button = $('#character_button')[0];
const patch_button = $('#change_game_patch')[0];

const paperdoll_left = $('.paperdoll-left')[0];
const paperdoll_right = $('.paperdoll-right')[0];
const paperdoll_bottom = $('.paperdoll-bottom')[0];

const face_settings = $('#dressing-room-face-settings')[0];
const char_settings = $('#dressing-room-character-settings')[0];

$('.dressing-room-character-controls-category-switchers a').on('click', modelIsLoaded(function (event) {

    const category = event.target.getAttribute('data-category');
    event.target.setAttribute('data-active', 'true');

    if (category === 'gear') {
        removeAttr('data-active', face_button, char_button);
        setDisplayState('block', paperdoll_left, paperdoll_right, paperdoll_bottom);
        setDisplayState('none', face_settings, char_settings);
        window.dressUI.active_cat = 'gear';

        if (!window.dressUI.char.only_item) {
            window.model.renderer.viewer.setZoom(CUR_MODEL_ZOOM);
            window.model.renderer.viewer.setOffset(0, 0);
        };

    } else if (category === 'face') {
        removeAttr('data-active', gear_button, char_button);
        setDisplayState('block', face_settings);
        setDisplayState('none', paperdoll_left, paperdoll_right, paperdoll_bottom, char_settings);
        window.dressUI.active_cat = 'face';

        if (!window.dressUI.char.only_item) setFaceZoom();

    } else if (category === 'character') {
        removeAttr('data-active', gear_button, face_button);
        setDisplayState('block', char_settings);
        setDisplayState('none', paperdoll_left, paperdoll_right, paperdoll_bottom, face_settings);
        window.dressUI.active_cat = 'character';

        if (!window.dressUI.char.only_item) {
            window.model.renderer.viewer.setZoom(CUR_MODEL_ZOOM);
            window.model.renderer.viewer.setOffset(0, 0);
        };
    };
}));


function setFaceZoom() {
    let zoom = CUR_MODEL_ZOOM;
    let X = 0;
    let Y = 0;
    switch (window.dressUI.model_opts.race) { //          Female                      Male
        case 1: window.dressUI.model_opts.gender ? (zoom = 12.6, Y = 0.75) : (zoom = 12.6, Y = 0.80); break; // Human
        case 2: window.dressUI.model_opts.gender ? (zoom = 12.6, Y = 0.75) : (zoom = 8, Y = 0.80); break; // Orc
        case 3: window.dressUI.model_opts.gender ? (zoom = 9, Y = 0.55) : (zoom = 9, Y = 0.55); break; // Dwarf
        case 4: window.dressUI.model_opts.gender ? (zoom = 12.6, Y = 0.95) : (zoom = 12.6, Y = 1.00); break; // Nightelf
        case 5: window.dressUI.model_opts.gender ? (zoom = 12.6, Y = 0.75) : (zoom = 12.6, Y = 0.80); break; // Scourge
        case 6: window.dressUI.model_opts.gender ? (zoom = 9, Y = 0.80) : (zoom = 6, Y = 0.65); break; // Tauren
        case 7: window.dressUI.model_opts.gender ? (zoom = 8, Y = 0.25) : (zoom = 7, Y = 0.35); break; // Gnome
        case 8: window.dressUI.model_opts.gender ? (zoom = 12.6, Y = 0.90) : (zoom = 11, Y = 0.80); break; // Troll
        case 9: window.dressUI.model_opts.gender ? (zoom = 9, Y = 0.45) : (zoom = 9, Y = 0.45); break; // Goblin
        case 10: window.dressUI.model_opts.gender ? (zoom = 12.6, Y = 0.75) : (zoom = 12.6, Y = 0.80); break; // Bloodelf
        case 11: window.dressUI.model_opts.gender ? (zoom = 12.6, Y = 0.95) : (zoom = 10, Y = 0.95); break; // Draenei
        case 12: (zoom = 9, Y = 0.70); break; // Felorc
        case 13: window.dressUI.model_opts.gender ? (zoom = 9, Y = 0.60) : (zoom = 8, Y = 0.65); break; // Naga_
        case 14: (zoom = 8, Y = 0.85); break; // Broken
        case 15: (zoom = 9, Y = 0.75); break; // Skeleton
        case 16: (zoom = 8, Y = 1.60); break; // Vrykul
        case 17: (zoom = 5, Y = 0.75); break; // Tuskarr
        case 18: (zoom = 6, Y = 0.75); break; // Foresttroll
        case 19: (zoom = 5, Y = 0.65); break; // Taunka
        case 20: (zoom = 5, Y = 1.30); break; // Northrendskeleton
        case 21: (zoom = 6, Y = 0.75); break; // Icetroll
        case 22: window.dressUI.model_opts.gender ? (zoom = 9, Y = 0.85) : (zoom = 8, Y = 0.75); break; // Worgen
        // case 23: window.dressUI.model_opts.gender ? (zoom = 12.6, Y = 0.75) : (zoom = 12.6, Y = 0.80); break; // Gilnean
        case 24: window.dressUI.model_opts.gender ? (zoom = 10, Y = 0.80) : (zoom = 9, Y = 0.85); break; // Pandaren
        // case 25: window.dressUI.model_opts.gender ? (zoom = 10, Y = 0.80) : (zoom = 9, Y = 0.85); break; // Pandarena
        // case 26: window.dressUI.model_opts.gender ? (zoom = 10, Y = 0.80) : (zoom = 9, Y = 0.85); break; // Pandarenh
        case 27: window.dressUI.model_opts.gender ? (zoom = 12, Y = 0.85) : (zoom = 12, Y = 0.90); break; // Nightborne
        case 28: window.dressUI.model_opts.gender ? (zoom = 9, Y = 0.95) : (zoom = 6, Y = 0.60); break; // Highmountaintauren
        case 29: window.dressUI.model_opts.gender ? (zoom = 12.6, X = -0.10, Y = 0.75) : (zoom = 12.6, Y = 0.80); break; // Voidelf
        case 30: window.dressUI.model_opts.gender ? (zoom = 12.6, Y = 0.95) : (zoom = 10, Y = 0.95); break; // Lightforgeddraenei
        case 31: window.dressUI.model_opts.gender ? (zoom = 11, Y = 1.05) : (zoom = 10, Y = 0.95); break; // Zandalaritroll
        case 32: window.dressUI.model_opts.gender ? (zoom = 11, Y = 0.95) : (zoom = 10, Y = 0.95); break; // Kultiran
        case 33: (zoom = 13, Y = 0.75); break; // Thinhuman
        case 34: window.dressUI.model_opts.gender ? (zoom = 9, Y = 0.55) : (zoom = 9, Y = 0.55); break; // Darkirondwarf
        case 35: window.dressUI.model_opts.gender ? (zoom = 7, Y = 0.35) : (zoom = 8, Y = 0.40); break; // Vulpera
        case 36: window.dressUI.model_opts.gender ? (zoom = 12.6, Y = 0.75) : (zoom = 8, Y = 0.80); break; // Magharorc
        case 37: window.dressUI.model_opts.gender ? (zoom = 6, Y = 0.30) : (zoom = 7, Y = 0.35); break; // Mechagnome
    };
    window.model.renderer.viewer.setZoom(zoom);
    window.model.renderer.viewer.setOffset(X, Y);
};


$('#dr-toggle-ui').on('click', function (event) {
    window.dressUI.show = !window.dressUI.show;

    if (window.dressUI.show) {
        setDisplayState('none', gear_button, face_button, char_button, patch_button,
            paperdoll_left, paperdoll_right, paperdoll_bottom, face_settings, char_settings, my_saved_rooms_container);
    } else {
        setDisplayState('block', gear_button, face_button, char_button, patch_button);
        if (window.dressUI.saved_rooms) my_saved_rooms_container.style.display = 'grid';

        if (window.dressUI.active_cat === 'gear') {
            setDisplayState('block', paperdoll_left, paperdoll_right, paperdoll_bottom);
        } else if (window.dressUI.active_cat === 'face') {
            setDisplayState('block', face_settings);
        } else if (window.dressUI.active_cat === 'character') {
            setDisplayState('block', char_settings);
        };
    };
});


function removeAttr(attr, ...elements) { for (let element of elements) element.removeAttribute(attr); };

function setDisplayState(state, ...elements) { for (let element of elements) element.style.display = state; };


const copy_text = new CopyText();
