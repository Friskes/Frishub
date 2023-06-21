window.WH.debug = function(...args) {
    // console.log(args);
};

const CONTENT_PATH = window.GAME_PATCH
? `https://wow.zamimg.com/modelviewer/${window.GAME_PATCH}/`
: 'https://wow.zamimg.com/modelviewer/wrath/';

const RACES = {
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

    const raceToModelId = RACES[race] + retGender;

    return {
        items: characterItems,
        charCustomization: {
            options: options
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
 * @returns {Promise<ZamModelViewer>}
 */
async function generateModels(aspect, containerSelector, model) {

    if (!model.general_opts || Object.keys(model.general_opts).length === 0) model.general_opts = {contentPath: CONTENT_PATH};

    const modelOptions = await optionsFromModel(model);

    const models = {
        type: 2,
        container: jQuery(containerSelector),
        aspect: aspect,
        hd: true,
        ...model.general_opts,
        ...modelOptions
    };

    window.models = models;

    return new ZamModelViewer(models);
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
    // dct[`${RACES[character.race]}_${GENDERS[character.gender]}`] = [...new Set(fullOptions.Options.map(opt => opt.Name))];
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


export {
    findRaceGenderOptions,
    generateModels,
    optionsFromModel
};
