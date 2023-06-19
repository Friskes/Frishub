window.WH.debug = function(...args) {
    // console.log(args);
};

let CONTENT_PATH;

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

const CHARACTER_PART = {
    // WRATH AND LIVE
    'Skin Color':  'skin',
    'Face':        'face',
    'Hair Style':  'hairStyle',
    'Horn Style':  'hairStyle',
    'Horn Color':  'hairColor',
    'Hair Color':  'hairColor',
    'Horn Style':  'facialStyle',
    'Hair':        'facialStyle',
    'Facial Hair': 'facialStyle',
    'Piercings':   'facialStyle',
    'Markings':    'facialStyle',
    'Features':    'facialStyle',
    'Earrings':    'facialStyle',
    'Tusks':       'facialStyle',

    // ONLY LIVE
    'Beard':          'facialStyle',
    'Jaw Features':   'facialStyle',
    'Markings Color': 'facialStyle',
    'Horns':          'facialStyle',

    // Не сделано
    'Eyebrows':         undefined,
    'Face Shape':       undefined,
    'Eye Color':        undefined,
    'Makeup':           undefined,
    'Necklace':         undefined,
    'Eyesight':         undefined,
    'Scars':            undefined,
    'Nose Ring':        undefined,
    'Tattoo':           undefined,
    'War Paint':        undefined,
    'War Paint Color':  undefined,
    'Tattoo Color':     undefined,
    'Vines':            undefined,
    'Vine Color':       undefined,
    'Ears':             undefined,
    'Blindfold':        undefined,
    'Headdress':        undefined,
    'Bear Form':        undefined,
    'Cat Form':         undefined,
    'Aquatic Form':     undefined,
    'Travel Form':      undefined,
    'Flight Form':      undefined,
    'Moonkin Form':     undefined,
    'Skin Type':        undefined,
    'Face Features':    undefined,
    'Face Paint':       undefined,
    'Jewelry Color':    undefined,
    'Flower':           undefined,
    'Body Paint':       undefined,
    'Paint Color':      undefined,
    'Earring Color':    undefined,
    'Face Paint Color': undefined,
    'Piercing':         undefined,
    'Body Paint Color': undefined,
    'Armbands':         undefined,
    'Bracelets':        undefined,
    'Circlet':          undefined,
    'Hair Decoration':  undefined,
    'Tendrils':         undefined,
    'Tail':             undefined,
    'Mustache':         undefined,
    'Grime':            undefined,
    'Upright':          undefined,
    'Sideburns':        undefined,
    'Foremane':         undefined,
    'Horn Decoration':  undefined
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
        const displaySlot = await getDisplaySlot(
            displayedItem.entry,
            equipment.slot,
            displayedItem.displayid
        );
        equipment.displaySlot = displaySlot.displaySlot;
        equipment.displayId = displaySlot.displayId;
        Object.assign(displaySlot, equipment);
    }
    return equipments
        .filter(e => e.displaySlot)
        .map(e => [
            e.displaySlot,
            e.displayId
        ]
        );
}

/**
 *
 * @param {number} race
 * @param {number} gender
 * @returns {Promise<Object>}
 */
async function findRaceGenderOptions(race, gender) {
    const options = await fetch(`${CONTENT_PATH}meta/charactercustomization2/${race}_${gender}.json`)
        .then(
            (response) => response.json()
        );
    if (options.data) {
        return options.data;
    }

    return options;
}

/**
 *
 * @param {number} item: ItemId
 * @param {number} slot: slotId
 * @param {number} displayId: displayId
 * @return {Promise<boolean|*>}
 */
async function getDisplaySlot(item, slot, displayId) {
    if (typeof item !== `number`) {
        throw new Error(`item must be a number`);
    }

    if (typeof slot !== `number`) {
        throw new Error(`slot must be a number`);
    }

    if (typeof displayId !== `number`) {
        throw new Error(`displayId must be a number`);
    }

    try {
        await fetch(`${CONTENT_PATH}meta/armor/${slot}/${displayId}.json`).then(response => response.json());

        return {
            displaySlot: slot,
            displayId: displayId
        };
    } catch (e) {
        let contentPath = CONTENT_PATH.split('/').at(-2) == 'wrath'
        ? 'https://wow.zamimg.com/modelviewer/live/'
        : 'https://wow.zamimg.com/modelviewer/wrath/';
        await fetch(`${contentPath}meta/armor/${slot}/${displayId}.json`).then(response => response.json());

        return {
            displaySlot: slot,
            displayId: displayId
        };

        // const resp = await fetch(`https://wotlk.murlocvillage.com/api/items/${item}/${displayId}`).then((response) => response.json());
        // const res = resp.data ? resp.data : resp;
        // if (res.newDisplayId !== displayId) {
        //     return {
        //         displaySlot: slot,
        //         displayId: res.newDisplayId
        //     };
        // }
    }
}

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
    }

    const {race, gender} = model;

    // CHARACTER OPTIONS
    const fullOptions = await findRaceGenderOptions(
        race,
        gender
    );

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
        },
    };
}

/**
 *
 * @param {number} aspect: Размер персонажа
 * @param {string} containerSelector: Селектор jQuery для контейнера
 * @param {{}|{id: number, type: number}} model: Представление персонажа в формате json
 * @returns {Promise<ZamModelViewer>}
 */
async function generateModels(aspect, containerSelector, model) {
    CONTENT_PATH = model.general_opts.contentPath;

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
}

function optionalChaining(choice) {
    return choice ? choice.Id : undefined;
}

/**
 *
 * @param character
 * @param {{}}fullOptions: Полезная нагрузка от Zaming API с параметрами персонажа
 * @return {Promise<[]>}
 */
function getOptions(character, fullOptions) {
    const options = fullOptions.Options;

    // Для удобного просмотра поля Name из options
    // const GENDERS = {0: 'Male', 1: 'Female'};
    // let dct = {};
    // dct[`${RACES[character.race]}_${GENDERS[character.gender]}`] = [...new Set(options.map(opt => opt.Name))];
    // console.log(dct);

    const ret = [];
    for (const prop in CHARACTER_PART) {

        let CHAR_PROP = CHARACTER_PART[prop];

        // пропускаем конфликт рогов Horns с Night and Blood эльфами
        if (prop == 'Horns') { if (character.race == 4 || character.race == 10) { continue; }; };

        // изменяем 'facialStyle' на 'hairStyle' для Tauren для исключения конфликта настроек между Tauren и Draenei
        if (character.race == 6 && prop == 'Horn Style' && CHAR_PROP == 'facialStyle') { CHAR_PROP = 'hairStyle'; };

        const part = options.find(e => e.Name === prop);

        if (!part) {
            continue;
        }

        const newOption = {
            optionId: part.Id,
            choiceId: (CHAR_PROP) ? optionalChaining(part.Choices[character[CHAR_PROP]]) : part.Choices[0].Id
        };
        ret.push(newOption);
    }

    return ret;
}

export {
    findRaceGenderOptions,
    generateModels,
    optionsFromModel,
};
