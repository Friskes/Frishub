window.WH.debug = function(...args) {
    // console.log(args);
};

const CONTENT_PATH = window.GAME_PATCH
? `https://wow.zamimg.com/modelviewer/${window.GAME_PATCH}/`
: 'https://wow.zamimg.com/modelviewer/wrath/';

const _RACES = {
    1: 'human',
    2: 'orc',
    3: 'dwarf',
    4: 'nightelf',
    5: 'scourge',
    6: 'tauren',
    7: 'gnome',
    8: 'troll',
    10: 'bloodelf',
    11: 'draenei'
};

const AVAILABLE_CHAR_OPTS = {
    'Jaw Features':     'jaw_features',
    'Hair Decoration':  'hair_decoration',
    'Sideburns':        'sideburns',
    'Beard':            'beard',
    'Earrings':         'earrings',
    'Circlet':          'circlet',
    'Tusks':            'tusks',
    'Armbands':         'armbands',
    'Skin Color':       'skin_color',
    'Markings Color':   'markings_color',
    'Blindfold':        'blindfold',
    'Eye Color':        'eye_color',
    'Body Paint':       'body_paint',
    'Foremane':         'foremane',
    'Features':         'features',
    'Tattoo':           'tattoo',
    'Headdress':        'headdress',
    'War Paint':        'war_paint',
    'Ears':             'ears',
    'Aquatic Form':     'aquatic_form',
    'Earring Color':    'earring_color',
    'Piercing':         'piercing',
    'Scars':            'scars',
    'Horns':            'horns',
    'Upright':          'upright',
    'Grime':            'grime',
    'Horn Color':       'horn_color',
    'Hair Style':       'hair_style',
    'Markings':         'markings',
    'Eyebrows':         'eyebrows',
    'Body Paint Color': 'body_paint_color',
    'Face Paint':       'face_paint',
    'Vines':            'vines',
    'Tail':             'tail',
    'Facial Hair':      'facial_hair',
    'Flight Form':      'flight_form',
    'Face Paint Color': 'face_paint_color',
    'Makeup':           'makeup',
    'Face Features':    'face_features',
    'Cat Form':         'cat_form',
    'Horn Style':       'horn_style',
    'Piercings':        'piercings',
    'Necklace':         'necklace',
    'Moonkin Form':     'moonkin_form',
    'Mustache':         'mustache',
    'Hair Color':       'hair_color',
    'Flower':           'flower',
    'Vine Color':       'vine_color',
    'Tendrils':         'tendrils',
    'Face':             'face',
    'Jewelry Color':    'jewelry_color',
    'Nose Ring':        'nose_ring',
    'Bear Form':        'bear_form',
    'Skin Type':        'skin_type',
    'Travel Form':      'travel_form',
    'Face Shape':       'face_shape',
    'Eyesight':         'eyesight',
    'Tattoo Color':     'tattoo_color',
    'War Paint Color':  'war_paint_color',
    'Horn Decoration':  'horn_decoration',
    'Bracelets':        'bracelets',
    'Paint Color':      'paint_color',
    'Hair':             'hair'
};


/**
 * Возвращает двумерный список, внутренний список содержит в первой позиции - slotId,
 * во второй позиции - displayId [[1,1170], [3,4925]]
 * @param {*[{item: {entry: number, displayid: number}, transmog: {entry: number, displayid: number}, slot: number}]} equipments
 * @returns {Promise<number[]>}
 */
async function findItemsInEquipments(equipments) {

    for (const equipment of equipments) {

        const displayedItem = (Object.keys(equipment.transmog).length !== 0) ? equipment.transmog : equipment.item;

        const displaySlot = await getDisplaySlot(displayedItem.entry, equipment.slot, displayedItem.displayid);

        equipment.displaySlot = displaySlot.displaySlot;
        equipment.displayId = displaySlot.displayId;

        Object.assign(displaySlot, equipment);
    };
    return equipments.filter(e => e.displaySlot).map(e => [e.displaySlot, e.displayId]);
};


/**
 *
 * @param {number} race
 * @param {number} gender
 * @returns {Promise<Object>}
 */
async function findRaceGenderOptions(race, gender) {
    const options = await fetch(`${CONTENT_PATH}meta/charactercustomization2/${race}_${gender}.json`).then((response) => response.json());

    if (options.data) return options.data;
    return options;
};


/**
 *
 * @param {number} item: ItemId
 * @param {number} slot: slotId
 * @param {number} displayId: displayId
 * @return {Promise<boolean|*>}
 */
async function getDisplaySlot(item, slot, displayId) {
    if (typeof item !== `number`) throw new Error(`item must be a number`);
    if (typeof slot !== `number`) throw new Error(`slot must be a number`);
    if (typeof displayId !== `number`) throw new Error(`displayId must be a number`);

    try {
        await fetch(`${CONTENT_PATH}meta/armor/${slot}/${displayId}.json`).then(response => response.json());

        return {displaySlot: slot, displayId: displayId};
    } catch (e) {
        const contentPath = CONTENT_PATH.split('/').at(-2) == 'wrath'
        ? 'https://wow.zamimg.com/modelviewer/live/'
        : 'https://wow.zamimg.com/modelviewer/wrath/';

        try {
            await fetch(`${contentPath}meta/armor/${slot}/${displayId}.json`).then(response => response.json());

            return {displaySlot: slot, displayId: displayId};
        } catch (e) {
            console.error('[async function getDisplaySlot] -> await fetch -> *FAILED*');
        };
    };
};


/**
 *
 * @param model: {{}|{{id, type}}}
 * @returns {Promise<{models: {id: string, type: number}, charCustomization: {options: []}, items: (*|*[])}|{models: {id, type}}>}
 */
async function optionsFromModel(model) {
    if (model.id && model.type) {
        // NPC or item
        const {id, type} = model;
        return {models: {id, type}};
    };

    const {race, gender} = model;

    // CHARACTER OPTIONS
    const fullOptions = await findRaceGenderOptions(race, gender);

    const characterItems = (model.items) ? model.items : [];

    const options = getOptions(model, fullOptions);

    const retGender = (gender === 1) ? `female` : `male`;

    const raceToModelId = _RACES[race] + retGender;

    const {sheathMain, sheathOff} = model;

    return {
        items: characterItems,
        charCustomization: {
            options: options,
            sheathMain: sheathMain,
            sheathOff: sheathOff
        },
        models: {
            id: raceToModelId,
            type: 16
        }
    };
};


/**
 *
 * @param {number} aspect: Размер персонажа
 * @param {string} containerSelector: Селектор jQuery для контейнера
 * @param {{}|{id: number, type: number}} model: Представление персонажа в формате json
 * @returns {Promise<WowModelViewer>}
 */
async function generateModels(containerSelector, model) {

    if (!model.generalOptions) model.generalOptions = {};

    const container = jQuery(containerSelector);
    const aspect = container[0].offsetWidth / container[0].offsetHeight;

    const modelOptions = await optionsFromModel(model);

    const models = {
        type: 2,
        container: container,
        aspect: aspect,
        hd: true,
        contentPath: CONTENT_PATH,
        ...model.generalOptions,
        ...modelOptions
    };

    window.models = models;

    // для изменения race и gender требуется полное пересоздание модели
    // Полностью удаляем модель (включая DOM дерево)
    if (window.model) window.model.renderer.viewer.destroy();

    return new WowModelViewer(models);
};


function optionalChaining(choice) {
    return choice ? choice.Id : undefined;
};


/**
 *
 * @param character
 * @param {{}}fullOptions: Полезная нагрузка от Zaming API с параметрами персонажа
 * @return {Promise<[]>}
 */
function getOptions(character, fullOptions) {

    // Для удобного просмотра поля Name из fullOptions
    // const GENDERS = {0: 'Male', 1: 'Female'};
    // let dct = {};
    // dct[`${_RACES[character.race]}_${GENDERS[character.gender]}`] = [...new Set(fullOptions.Options.map(opt => opt.Name))];
    // console.log(dct);

    const ret = [];
    for (const prop in AVAILABLE_CHAR_OPTS) {

        const part = fullOptions.Options.find(e => e.Name === prop);

        if (!part) continue;

        const newOption = {
            optionId: part.Id,
            choiceId: (AVAILABLE_CHAR_OPTS[prop]) ? optionalChaining(part.Choices[character[AVAILABLE_CHAR_OPTS[prop]]]) : part.Choices[0].Id
        };
        ret.push(newOption);
    };
    return ret;
};


class WowModelViewer extends ZamModelViewer {

    constructor(...args) {
        super(...args);

        this.zoom_coeff = 0.05;
        this.offset_coeff = 0.004;

        this.X_offset = 0;
        this.Y_offset = 0;

        this.renderer.canvas[0].style.touchAction = 'none';

        this.addEventListeners();
    };

    onTouchStart(event) {
        if (event.touches.length === 2) {

            this.X_start = event.touches[0].clientX;
            this.Y_start = event.touches[0].clientY;

            this.prev_distance = Math.hypot(
                event.touches[0].pageX - event.touches[1].pageX,
                event.touches[0].pageY - event.touches[1].pageY
            );
            this.twoFingers = true;
        };
    };

    onTouchMove(event) {
        if (!this.twoFingers) return false;

        event.stopPropagation(); // отключаем изменение azimuth/zenith во время движения/кропа модели

        const distance = Math.hypot(
            event.touches[0].pageX - event.touches[1].pageX,
            event.touches[0].pageY - event.touches[1].pageY
        );

        // Если расстояние между пальцами более 85 тогда это возможно кроп
        if (distance > 85) {

            if (distance > this.prev_distance) { // IN
                this.renderer.zoom.rateCurrent += this.zoom_coeff; // range(-0.15, 0.15)
            } else { // OUT
                this.renderer.zoom.rateCurrent -= this.zoom_coeff;
            };
            this.prev_distance = distance;

        // Если расстояние между пальцами менее 85 тогда это возможно мув
        } else {

            const X_difference = this.X_start - event.touches[0].clientX;
            const Y_difference = this.Y_start - event.touches[0].clientY;

            if (Math.abs(X_difference) > Math.abs(Y_difference)) { // Horizontal
                if (X_difference > 0) { // L
                    if (Y_difference > 0) this.Y_offset = Math.max(-1, Math.min(1, this.Y_offset - this.offset_coeff)); // TL
                    this.X_offset = Math.max(-1, Math.min(1, this.X_offset - this.offset_coeff));
                } else { // R
                    if (Y_difference < 0) this.Y_offset = Math.max(-1, Math.min(1, this.Y_offset + this.offset_coeff)); // BR
                    this.X_offset = Math.max(-1, Math.min(1, this.X_offset + this.offset_coeff));
                };
            } else { // Vertical
                if (Y_difference > 0) { // T
                    if (X_difference < 0) this.X_offset = Math.max(-1, Math.min(1, this.X_offset + this.offset_coeff)); // TR
                    this.Y_offset = Math.max(-1, Math.min(1, this.Y_offset - this.offset_coeff));
                } else { // B
                    if (X_difference > 0) this.X_offset = Math.max(-1, Math.min(1, this.X_offset - this.offset_coeff)); // BL
                    this.Y_offset = Math.max(-1, Math.min(1, this.Y_offset + this.offset_coeff));
                };
            };
            this.renderer.viewer.setOffset(this.X_offset, this.Y_offset);

        };
    };

    onTouchCancel(event) {
        this.twoFingers = false;
    };

    onTouchEnd(event) {
        if (this.twoFingers) this.twoFingers = false;
    };

    addEventListeners() {
        this.renderer.canvas[0].addEventListener('touchstart',  this.onTouchStart.bind(this));
        this.renderer.canvas[0].addEventListener('touchmove',   this.onTouchMove.bind(this));
        this.renderer.canvas[0].addEventListener('touchcancel', this.onTouchCancel.bind(this));
        this.renderer.canvas[0].addEventListener('touchend',    this.onTouchEnd.bind(this));
    };


    getListAnimations() {
        // let animNames = window.GAME_PATCH === 'wrath'
        // ? [...new Set(this.renderer.models[0].ao.map(e => e.j))]
        // : [...new Set(this.renderer.models[0].ap.map(e => e.j))];
        // if (!animNames.includes("DressingRoom")) animNames.push("DressingRoom");

        let animNames = [];
        const anims_len = this.renderer.viewer.method("getNumAnimations");

        for (let i=0; i < anims_len; ++i) {
            const anim_name = this.renderer.viewer.method("getAnimation", i);

            if (anim_name && !animNames.includes(anim_name)) animNames.push(anim_name);
        };
        animNames.sort();
        const defaultIndex = animNames.findIndex(i => i === "DressingRoom");

        return {animNames, defaultIndex};
    };


    makeScreenshot() {
        const _this = this;
        window.requestAnimationFrame(function() {

            _this.renderer.makeDataURL = ["image/png", 1];

            window.requestAnimationFrame(function() {

                let temp_ele = $("<a>");
                $("body").append(temp_ele);
                temp_ele[0].download = `${_this.renderer.viewer.options.models.id}_${window.location.hostname}_dressing_room.png`;
                temp_ele[0].href = _this.renderer.screenshotDataURL;
                temp_ele[0].click();
                temp_ele.remove();
            });
        });
    };


    async updateAppearance(model) {
        // Структура которая передаётся в viewer setAppearance
        // {
        //   options: [
        //     {'optionId': айди, 'choiceId': айди},
        //     {'optionId': айди, 'choiceId': айди}
        //     ... и т.д.
        //   ],
        //   sheathMain: индекс,
        //   sheathOff: индекс
        // }

        const _this = this;
        await optionsFromModel(model).then((modelOptions) => {
            _this.renderer.viewer.method("setAppearance", modelOptions.charCustomization);
        });
    };


    setModelLoadedCallback(func) {
        const _this = this;
        if (this.renderer) {
            this.renderer.models[0].ModelLoadedCallbackFunc = func;
            this.renderer.models[0].e = this.setModelLoadedCallback;
            return false;
        };
        this.ModelLoadedCallbackFunc();
        setTimeout(function() { _this.modelIsLoaded = true; }, 150);
    };

    // setModelLoadedCallback(func) {
    //     this.renderer.models[0].ModelLoadedCallbackFunc = func;
    //     this.renderer.models[0].e = this._setModelLoadedCallback;
    // };
    // _setModelLoadedCallback() {
    //     const _this = this;
    //     this.ModelLoadedCallbackFunc();
    //     setTimeout(function() { _this.modelIsLoaded = true; }, 150);
    // };
};
window.WowModelViewer = WowModelViewer;
