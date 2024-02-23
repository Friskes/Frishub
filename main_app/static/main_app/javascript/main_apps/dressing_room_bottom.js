// фикс ошибки: Uncaught ReferenceError: ZamModelViewer is not defined
const viewer_utils = document.querySelector('#viewer-utils');

const waitLibraryIsLoading = function (callback_func, ...args) {
    window.requestAnimationFrame(callback_func.bind(callback_func, ...args));
    return;
};

const isLibraryLoaded = function (obj) {
    return obj !== undefined;
};

const loadingLibraries = function (...args) {

    if (!isLibraryLoaded(window.ZamModelViewer)) {
        waitLibraryIsLoading(loadingLibraries, ...args);
        return;
    };

    if (!viewer_utils.src) viewer_utils.src = model_viewer_utils;

    if (!isLibraryLoaded(window.WowModelViewer)) {
        waitLibraryIsLoading(loadingLibraries, ...args);
        return;
    };

    if (!isLibraryLoaded(window.gameData)) {
        waitLibraryIsLoading(loadingLibraries, ...args);
        return;
    };

    $(document).ready(function () {

        window.generateCharModel();

        //////////////// TEST №1 STRESS TEST CHAR MODEL ////////////////
        // window.dressUI.model_opts.items = [
        //   [1,  64897,  51281, 0],
        //   [3,  64896,  51284, 0],
        //   [16, 22996,  54583, 0],
        //   [5,  64859,  51283, 0],
        //   [4,  11977,  45280, 0],
        //   [19, 65733,  52252, 0],
        //   [9,  63901,  54582, 0],
        //   [21, 65153,  49623, 155],
        //   [22, 45146,  32838, 165],
        //   [10, 63910,  51280, 0],
        //   [6,  109302, 50702, 0],
        //   [7,  64246,  51282, 0],
        //   [8,  63825,  50699, 0]
        // ];
        // window.generateCharModel();
        // setInterval(function() { modelIsLoaded(window.generateCharModel)(); }, 4);
        //////////////// TEST №1 STRESS TEST CHAR MODEL ////////////////

        //////////////// TEST №2 STRESS TEST ITEM MODEL ////////////////
        // window.dressUI.char.only_item = true;
        // window.generateItemModel({type: 1, id: 65153, itemId: 49623, slotId: 21});
        // setInterval(function() { modelIsLoaded(window.generateItemModel)({type: 1, id: 65153, itemId: 49623, slotId: 21}); }, 4);
        //////////////// TEST №2 STRESS TEST ITEM MODEL ////////////////
    });
};
$('.paperdoll-model').css('background', 'url(https://wow.zamimg.com/images/icons/ajax.gif) center no-repeat');
loadingLibraries();


window.generateFaceOptionHtml = function (i, optionName) {
    const caret_left = document.createElement('a');
    caret_left.classList.add('btn', 'dress-btn', 'fa', 'fa-caret-left');
    caret_left.setAttribute('href', 'javascript:');
    caret_left.setAttribute('tabindex', '-1');

    const imit_sel = document.createElement('a');
    imit_sel.classList.add('imitation-select');
    imit_sel.setAttribute('data-field-filled', 'true');
    imit_sel.setAttribute('href', 'javascript:');
    imit_sel.setAttribute('tabindex', '-1');
    // если опция без названий будем использовать просто индексы
    imit_sel.textContent = window.dressUI.face.have_text_opt[i]
        ? window.dressUI.face.have_text_opt[i]
        : window.dressUI.face.current[i] + 1;

    const caret_right = document.createElement('a');
    caret_right.classList.add('btn', 'dress-btn', 'fa', 'fa-caret-right');
    caret_right.setAttribute('href', 'javascript:');
    caret_right.setAttribute('tabindex', '-1');

    const caret_div = document.createElement('div');
    caret_div.setAttribute('tabindex', '0');
    caret_div.setAttribute('data-role', 'control');
    caret_div.appendChild(caret_left);
    caret_div.appendChild(imit_sel);
    caret_div.appendChild(caret_right);

    const label = document.createElement('div');
    label.setAttribute('data-role', 'label');
    label.textContent = optionName;

    const cat_opt_div = document.createElement('div');
    cat_opt_div.classList.add('dressing-room-character-controls-category-option');
    cat_opt_div.setAttribute('data-character-customization-type', window.dressUI.face.fields[i]);
    cat_opt_div.appendChild(label);
    cat_opt_div.appendChild(caret_div);

    face_settings.appendChild(cat_opt_div);

    return cat_opt_div;
};


const generateFaceOptions = function () {
    const NOT_ALLOWED_CHAR_OPTS = [  // вызывает ошибки
        // 'Eyesight', 'Bear Form', 'Cat Form', 'Moonkin Form', 'Aquatic Form', 'Flight Form', 'Travel Form'
    ];
    const race_gender_opts = window.dressUI.face.race_gender_opts;

    // очистка настроек при создании новой модели
    window.dressUI.face.fields = [];
    window.dressUI.face.max_len = [];
    window.dressUI.face.min_len = [];
    window.dressUI.face.have_text_opt = [];

    if (window.dressUI.face.current.length === 0) {
        window.dressUI.face.current =
            ((len, char) => Array.from({ length: len }, () => char))(race_gender_opts.length, 0);
    };

    for (const i in race_gender_opts) {
        const option = race_gender_opts[i];

        if (NOT_ALLOWED_CHAR_OPTS.indexOf(option.Name) !== -1) continue;

        const opt_name = option.Name.replace(' ', '_').toLowerCase();

        const choice_name = option.Choices[window.dressUI.face.current[i]].Name;

        const max_len = option.Choices.length - 1;

        window.dressUI.face.fields.push(opt_name);
        window.dressUI.face.max_len.push(max_len);
        window.dressUI.face.min_len.push(0);
        window.dressUI.face.have_text_opt.push(choice_name);

        window.dressUI.model_opts[opt_name] = window.dressUI.face.current[i];

        const cat_opt_div = window.generateFaceOptionHtml(i, option.Name);


        cat_opt_div.addEventListener('click', modelIsLoaded(function (event) {

            if (event.target.classList.contains('caret-disabled')) return;

            if (event.target.classList.contains('fa-caret-left') && window.dressUI.face.current[i] > 0) {
                window.dressUI.face.current[i] -= 1;
            } else if (event.target.classList.contains('fa-caret-right') && window.dressUI.face.current[i] < max_len) {
                window.dressUI.face.current[i] += 1;
            };
            setAlphaForExtremeButtonPosition(event.target, window.dressUI.face.current[i], max_len);

            event.target.parentElement.children[1].textContent = choice_name
                ? race_gender_opts[i].Choices[window.dressUI.face.current[i]].Name
                : window.dressUI.face.current[i] + 1;

            window.dressUI.model_opts[opt_name] = window.dressUI.face.current[i];
            window.model.updateAppearance(window.dressUI.model_opts);
        }));
    };
};


const _generateCharModel = async function () {
    if (window.model) window.model.renderer.models[0].modelIsLoaded = false;

    CUR_MODEL_ZOOM = window.dressUI.model_opts.generalOptions.mount.id === 0 ? -3 : 0;

    // Полная очистка html старых анимаций
    $('.anims-menu-table a').each(function (index, option) { option.remove(); });

    // глубокая копия window.dressUI.model_opts для удаления itemId и visualId из items перед генерацией модели
    let dc_model_opts = JSON.parse(JSON.stringify(window.dressUI.model_opts));
    dc_model_opts.items = [];
    dc_model_opts.items = window.dressUI.model_opts.items.map(item => [item[0], item[1]]);

    // console.log(...dc_model_opts.items);
    // console.log(...window.dressUI.model_opts.items);

    // Принудительно удаляю 21, 22, 23 слоты из dc_model_opts для того
    // чтобы у маунта при загрузке не было оружия в копытах..
    // после загрузки модели, оружие будет установлено обратно на персонажа.
    if (dc_model_opts.generalOptions.mount.id !== 0) {
        for (const slotId of [21, 22, 23]) {
            const index = slotIdIsExists(slotId, dc_model_opts.items);
            if (index !== false) dc_model_opts.items.splice(index, 1);
        };
    };

    window.model = await generateModels(
        '#paperdoll-model-dressing-room-paperdoll',
        dc_model_opts
    );

    // console.log(window.model.renderer) // class gl
    // console.log(window.model.renderer.viewer) // class dl
    // console.log(window.model.renderer.models[0]) // class ul

    window.model.setCustomModelLoadedCallback(async function () {
        $('.paperdoll-model').css('background', 'none');

        // Установить оружие и визуальный эффект на оружие после загрузки модели
        const setGameData = [];
        for (const slotId of [21, 22, 23]) {
            const index = slotIdIsExists(slotId);
            if (index !== false) setGameData.push({
                slot: window.dressUI.model_opts.items[index][0],
                display: window.dressUI.model_opts.items[index][1],
                visual: window.dressUI.model_opts.items[index][3]
            });
        };
        setTimeout(function () {
            window.model.renderer.viewer.method("setItems", [setGameData]);
        }, dc_model_opts.generalOptions.mount.id !== 0 ? 150 : 4);

        updateSheathInfo();

        updateAnimPaused(true);

        window.model.renderer.viewer.setZoom(CUR_MODEL_ZOOM);


        await window.model.getListAnimations(function ({ animNames, defaultIndex }) {
            window.dressUI.char.anims_list = animNames;
            window.dressUI.char.default_anim = defaultIndex;
            window.dressUI.char.anim = defaultIndex;

            setDefaultText();

            const char_data = {
                id: '#dressing-room-character-settings',
                key: 'char',
                fields: ['race_id', 'gender_id', 'sheath', 'anim', 'mount'],
                max_len: [RACES_LEN, 1, window.dressUI.char.sheath_opts.length - 1,
                    window.dressUI.char.anims_list.length - 1, window.gameData[0].mounts.length - 1],
                min_len: [1, 0, 0, 0, 0]
            };

            if (ONLY_MALE_RACES.indexOf(window.dressUI.model_opts.race) !== -1) {
                char_data.max_len[1] = 0;
            };

            refreshAlphaForExtremeButtonPosition(char_data);

            generateAnimsMenuHtml();

            const current_element_a = $('.anims-menu-table')[0].getElementsByTagName("A")[window.dressUI.char.anim];
            current_element_a.classList.add('text-uline');
        });
    });

    // window.model.renderer.viewer.method("setCustomizationsLoadedCallback", function(t) { console.log('setCustomizationsLoadedCallback', t); });
    // window.model.renderer.screenshotCallback = function() { console.log('screenshotCallback'); };

    set_race_gender_image();
};


window.generateCharModel = function () {
    if (window.model) window.model.renderer.models[0].modelIsLoaded = false;

    window.dressUI.model_opts.generalOptions.mount.id =
        window.gameData[0].mounts[window.dressUI.char.mount].displayId;

    $('.paperdoll-model').css('background', 'url(https://wow.zamimg.com/images/icons/ajax.gif) center no-repeat');

    $('#dressing-room-face-settings div').each(function (index, option) {
        if (option.classList.contains('dressing-room-character-controls-category-option')) {
            delete window.dressUI.model_opts[option.getAttribute('data-character-customization-type')];
            option.remove();
        };
    });

    if (ONLY_MALE_RACES.indexOf(window.dressUI.model_opts.race) !== -1) {
        window.dressUI.model_opts.gender = 0;
        window.dressUI.char.gender_id = 0;
        updateGenderImagesInRacesMenu();
    };

    updateItemSlotIcon(false);

    const current_element_a = findElementByRaceId(window.dressUI.model_opts.race);
    current_element_a.classList.add('text-uline');

    // Получить все доступные опции для указанной расы и гендера
    findRaceGenderOptions(window.dressUI.model_opts.race, window.dressUI.model_opts.gender).then((fullOptions) => {
        window.dressUI.face.race_gender_opts = fullOptions.Options;

        generateFaceOptions();

        refreshAlphaForExtremeButtonPosition(window.dressUI.face);

        _generateCharModel();
    });
};


window.generateItemModel = async function (opts) {
    if (window.model) window.model.renderer.models[0].modelIsLoaded = false;

    $('.paperdoll-model').css('background', 'url(https://wow.zamimg.com/images/icons/ajax.gif) center no-repeat');

    window.model = await generateModels(
        '#paperdoll-model-dressing-room-paperdoll',
        opts
    );

    window.model.setCustomModelLoadedCallback(function () {
        $('.paperdoll-model').css('background', 'none');

        window.dressUI.AnimIsPaused = false;
        updateAnimPaused();

        document.documentElement.clientWidth < 800
            ? window.model.renderer.viewer.setZoom(-3)
            : window.model.renderer.viewer.setZoom(-8);
    });
};


$('#only-item').on('click', modelIsLoaded(function (event) {
    window.dressUI.char.only_item = event.target.checked;

    if (window.dressUI.char.only_item) {
        const char_data = {
            id: '#dressing-room-character-settings',
            key: 'char',
            fields: ['race_id', 'gender_id', 'sheath', 'anim', 'mount'],
            max_len: [1, 0, 0, 0, 0],
            min_len: [1, 0, 0, 0, 0]
        };
        refreshAlphaForExtremeButtonPosition(char_data);

        let dc_face_data = JSON.parse(JSON.stringify(window.dressUI.face));
        dc_face_data.max_len = [];
        for (const _ in dc_face_data.fields) dc_face_data.max_len.push(0);
        refreshAlphaForExtremeButtonPosition(dc_face_data);

        warnMessageHandler(4000, trans_you_can_view_items_without_char);
        updateItemSlotIcon(true);
        window.generateItemModel(window.dressUI.char.only_item_data);
    } else {
        warnMessageHandler(4000, trans_you_can_view_items_with_char);
        updateItemSlotIcon(false);
        window.generateCharModel();
    };
}));


function get_game_data_from_database_file() {
    fetch(path_to_gameData)
        .then((response) => response.json())
        // .then((json) => json.map((x) => {
        //   x.icon = `${DEFAULT_ICON_URL}${x.icon}.jpg`;
        //   return x;
        // }))
        .then((data) => {
            window.gameData = data;

            if (window.dressUI.game_patch === 'wrath') {
                // только первые 290шт. массива wrath маунты
                window.gameData[0].mounts = window.gameData[0].mounts.slice(0, WRATH_MOUNTS_LEN);
                // только первые 28шт. массива wrath чарки
                window.gameData[0].enchants = window.gameData[0].enchants.slice(0, WRATH_ENCHANTS_LEN);
            };

            // по дефолту маунты отсортированы от ванилы к лайву,
            // сортируем их в обратном порядке
            window.gameData[0].mounts.reverse();

            // добавляю первый элемент пустышку для возможности отключения маунта
            window.gameData[0].mounts.unshift({ "spellId": 0, "displayId": 0, "name": "None" });
            creatingItemsMenu();
            generateMountsMenuHtml();
        });
};
get_game_data_from_database_file();


function updateFaceFields(random_vals = true) {
    const NOT_ALLOWED_FACE_FIELDS = [
    ];

    const face_data = window.dressUI.face;

    for (const i in face_data.fields) {

        const field_name = face_data.fields[i];

        if (NOT_ALLOWED_FACE_FIELDS.indexOf(field_name) !== -1) continue;

        const max_len = face_data.max_len[i];

        let int_param = random_vals ? get_rand_int(0, max_len) : face_data.current[i];

        // эта настройка больше 19 выглядит не красиво
        if (field_name === 'eye_color' && int_param > 19) int_param = get_rand_int(0, 18);

        window.dressUI.model_opts[field_name] = int_param;
        face_data.current[i] = int_param;

        const imit_sel = $(`.dressing-room-character-controls-category-option[data-character-customization-type="${field_name}"]`).find('a')[1];
        imit_sel.textContent = face_data.have_text_opt[i]
            ? window.dressUI.face.race_gender_opts[i].Choices[int_param].Name
            : int_param + 1;

        setAlphaForExtremeButtonPosition(imit_sel, int_param, max_len);
    };
};


$('#dr-randomize').on('click', modelIsLoaded(function (event) {
    if (window.dressUI.char.only_item) return false;
    updateFaceFields();
    window.model.updateAppearance(window.dressUI.model_opts);
}));


$('#dr-reset').on('click', modelIsLoaded(function (event) {

    if (document.documentElement.clientWidth < 800) {
        window.dressUI.char.only_item
            ? window.model.renderer.viewer.setZoom(-3)
            : window.model.renderer.viewer.setZoom(CUR_MODEL_ZOOM); // range(-14.5, 12.6)
    } else {
        window.dressUI.char.only_item
            ? window.model.renderer.viewer.setZoom(-8)
            : window.model.renderer.viewer.setZoom(CUR_MODEL_ZOOM);
    };

    // window.model.renderer.distance = 6;
    window.model.renderer.azimuth = 1.5 * Math.PI; // горизонталь
    window.model.renderer.zenith = Math.PI / 2; // вертикаль
    window.model.renderer.viewer.setOffset(0, 0); // X, Y

    if (!window.dressUI.char.only_item) {
        window.dressUI.char.anim = window.dressUI.char.default_anim;

        setAlphaForExtremeButtonPosition(
            $('#select_animation_btn')[0].children[0],
            window.dressUI.char.anim,
            window.dressUI.char.anims_list.length - 1,
            0
        );
        setAnim(window.dressUI.char.anim);
    };
}, true));


$('#dr-screenshot').on('click', modelIsLoaded(function (event) {
    window.model.makeScreenshot();
}, true));


const dr_pause = $('#dr-pause');
dr_pause.on('click', modelIsLoaded(function (event) {
    window.dressUI.AnimIsPaused = !window.dressUI.AnimIsPaused;
    updateAnimPaused(true);
}, true));

function updateAnimPaused(flag) {
    if (window.dressUI.AnimIsPaused) {
        dr_pause[0].classList.remove('fa-pause');
        dr_pause[0].classList.add('fa-play');
    } else {
        dr_pause[0].classList.remove('fa-play');
        dr_pause[0].classList.add('fa-pause');
    };
    if (flag) setTimeout(() => {
        window.model.renderer.viewer.method("setAnimPaused", window.dressUI.AnimIsPaused);
    }, 10);
};
