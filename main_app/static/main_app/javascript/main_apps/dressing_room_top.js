let CUR_MODEL_ZOOM = -3;

const GENDERS = {
    0: 'Male',
    1: 'Female'
};

const DEFAULT_SLOT_ICONS = {
    1: 'inventoryslot_head',
    3: 'inventoryslot_shoulder',
    16: 'inventoryslot_chest', // Back
    5: 'inventoryslot_chest',
    4: 'inventoryslot_shirt',
    19: 'inventoryslot_tabard',
    9: 'inventoryslot_wrists',
    10: 'inventoryslot_hands',
    6: 'inventoryslot_waist',
    7: 'inventoryslot_legs',
    8: 'inventoryslot_feet',
    21: 'inventoryslot_mainhand',
    22: 'inventoryslot_offhand',
    23: 'inventoryslot_ranged',
    '021': 'inventoryslot_enchant',
    '022': 'inventoryslot_enchant'
};

const ITEM_QUALITIES = {
    0: 'poor-wow',      // (gray)
    1: 'common-wow',    // (white)
    2: 'uncommon-wow',  // (green)
    3: 'rare-wow',      // (blue)
    4: 'epic-wow',      // (purple)
    5: 'legendary-wow', // (orange)
    7: 'heirloom-wow'   // (blizzard blue) фамильные
};

const TYPEID_BY_SLOTID = {
    // slotId: type
    1: 2,
    3: 4,
    21: 1,
    22: 1,
    23: 1
};


function getCharDataFromContext() {
    if (!character_data) return null;

    character_data = JSON.parse(character_data.replace(/&quot;/g, '"'));

    if (character_data.items === "") {
        character_data.items = [];
    } else {
        const items = character_data.items.split(',');
        character_data.items = [];

        for (let i = 0; i < items.length; i = i + 4) {
            character_data.items.push([
                parseInt(items[i]),
                parseInt(items[i + 1]),
                parseInt(items[i + 2]),
                parseInt(items[i + 3])
            ]);
        };
    };

    character_data.face = character_data.face === ""
        ? []
        : character_data.face.split(',').map(x => parseInt(x));

    return character_data;
};
const charData = getCharDataFromContext();

window.GAME_PATCH = charData.game_patch; // для CONTENT_PATH в model_viewer_utils


let RACES = {
    1: "Human",
    2: "Orc",
    3: "Dwarf",
    4: "Nightelf",
    5: "Scourge",
    6: "Tauren",
    7: "Gnome",
    8: "Troll",
    9: "Goblin",
    10: "Bloodelf",
    11: "Draenei",
    12: "Felorc",
    13: "Naga_",
    14: "Broken",
    15: "Skeleton",
    16: "Vrykul",
    17: "Tuskarr",
    18: "Foresttroll",
    19: "Taunka",
    20: "Northrendskeleton",
    21: "Icetroll"
};
const WRATH_RACES_LEN = Math.max(...Object.keys(RACES));

const LIVE_RACES = {
    // вызывают ошибку на wrath
    22: "Worgen",
    // 23: "Gilnean", // дубль Human
    24: "Pandaren",
    // 25: "Pandarena", // дубль Pandaren
    // 26: "Pandarenh", // дубль Pandaren
    27: "Nightborne",
    28: "Highmountaintauren",
    29: "Voidelf",
    30: "Lightforgeddraenei",
    31: "Zandalaritroll",
    32: "Kultiran",
    33: "Thinhuman",
    34: "Darkirondwarf",
    35: "Vulpera",
    36: "Magharorc",
    37: "Mechagnome"
};

const ALL_RACES = Object.assign(LIVE_RACES, RACES);

if (charData.game_patch === 'live') RACES = ALL_RACES;

const RACES_LEN = Math.max(...Object.keys(RACES));

const ONLY_MALE_RACES = [
    // wrath
    12, // "Felorc"
    14, // "Broken"
    15, // "Skeleton"
    16, // "Vrykul"
    17, // "Tuskarr"
    18, // "Foresttroll"
    19, // "Taunka"
    20, // "Northrendskeleton"
    21, // "Icetroll"
    // live
    33  // "Thinhuman"
];

const RACES_WITHOUT_ICON = [
    // wrath
    12, // "Felorc"
    13, // "Naga_"
    14, // "Broken"
    15, // "Skeleton"
    16, // "Vrykul"
    17, // "Tuskarr"
    18, // "Foresttroll"
    19, // "Taunka"
    20, // "Northrendskeleton"
    21, // "Icetroll"
    // live
    // 23, // "Gilnean"
    // 25, // "Pandarena"
    // 26, // "Pandarenh"
    33  // "Thinhuman"
];

const WRATH_MOUNTS_LEN = 290;
const WRATH_ENCHANTS_LEN = 28;


// Actual model and UI parameters
window.dressUI = {
    game_patch: charData.game_patch,
    room_creator: charData.room_creator,
    allow_edit: charData.allow_edit,
    // Default model options
    model_opts: {
        race: charData.race,
        gender: charData.gender,
        items: charData.items,
        // 'Оружия ближнего боя':
        // 15, 22, 23 (лев. рука)
        // 13, 17, 21, 25, 26 (прав. рука)
        // 'все дальнобойные кроме луков':
        // 15, 22, 23 (лев. рука)
        // 13, 17, 21, 25, 26 (прав. рука)
        // 'только луки':
        // 15, 22, 23 (лев. рука)
        sheathMain: -1,
        sheathOff: -1,
        generalOptions: {
            mount: { type: 8, id: 0 },
            // pet: {type: 8, id: 0, scale: 0.8, offset: [0, -1.15, 0]}, // X, Y, Z
            // background: "background-181818.png",
            // background: "background-classic-181818.png",
            // background: "background-classic-ddd.png"
        }
    },
    active_cat: 'gear',
    gear: {
        items_menu: {
            slot1: { name: 'Head', quality: 4, index: 0, type: 'Cloth', available_types: ["Cloth", "Leather", "Mail", "Plate", "Miscellaneous"] },
            slot3: { name: 'Shoulder', quality: 4, index: 0, type: 'Cloth', available_types: ["Cloth", "Leather", "Mail", "Plate", "Miscellaneous"] },
            slot16: { name: 'Back', quality: 4, index: 0, type: 'Cloth', available_types: ["Cloth"] },
            slot5: { name: 'Chest', quality: 4, index: 0, type: 'Cloth', available_types: ["Cloth", "Leather", "Mail", "Plate", "Miscellaneous"] },
            slot4: { name: 'Shirt', quality: 4, index: 0, type: 'Miscellaneous', available_types: ["Miscellaneous"] },
            slot19: { name: 'Tabard', quality: 4, index: 0, type: 'Miscellaneous', available_types: ["Miscellaneous"] },
            slot9: { name: 'Wrist', quality: 4, index: 0, type: 'Cloth', available_types: ["Cloth", "Leather", "Mail", "Plate", "Miscellaneous"] },
            slot10: { name: 'Hands', quality: 4, index: 0, type: 'Cloth', available_types: ["Cloth", "Leather", "Mail", "Plate", "Miscellaneous"] },
            slot6: { name: 'Waist', quality: 4, index: 0, type: 'Cloth', available_types: ["Cloth", "Leather", "Mail", "Plate", "Miscellaneous"] },
            slot7: { name: 'Legs', quality: 4, index: 0, type: 'Cloth', available_types: ["Cloth", "Leather", "Mail", "Plate"] },
            slot8: { name: 'Feet', quality: 4, index: 0, type: 'Cloth', available_types: ["Cloth", "Leather", "Mail", "Plate", "Miscellaneous"] },
            slot21: { name: 'MainHand', quality: 4, index: 0, type: 'Axe', available_types: ["Axe", "Sword", "Mace", "Dagger", "Fist Weapon", "Staff", "Polearm", "Fishing Pole", "Exotic", "Miscellaneous"] },
            slot22: { name: 'OffHand', quality: 4, index: 0, type: 'Axe', available_types: ["Axe", "Sword", "Mace", "Dagger", "Fist Weapon", "Shield", "Miscellaneous"] },
            slot23: { name: 'Ranged', quality: 4, index: 0, type: 'Bow', available_types: ["Bow", "Gun", "Wand", "Crossbow", "Thrown"] },
            slot021: { name: 'Enchants', quality: 1, index: 0, type: '', available_types: [] },
            slot022: { name: 'Enchants', quality: 1, index: 0, type: '', available_types: [] }
        }
    },
    char: {
        race_id: charData.race,
        gender_id: charData.gender,
        anim: 0,
        default_anim: 0,
        mount: parseInt(charData.mount),
        sheath: 0,
        sheath_opts: [-1, -1],
        only_item: false,
        only_item_data: { type: 1, id: 58187, itemId: 45176, slotId: 21 } // меч из пенопласта
    },
    face: {
        id: '#dressing-room-face-settings',
        key: 'face',
        fields: [],
        max_len: [],
        min_len: [],
        current: charData.face,
        have_text_opt: []
    }
};


function slotIdIsExists(slotId, items = window.dressUI.model_opts.items) {
    for (const i in items) {
        if (items[i][0] == slotId) return i;
    };
    return false;
};

// быть в руке/на персонаже MH и OF могут только вместе.
// -1 // оружие в руке
//  1 // оружие на спине смотрит вниз
//  2 // оружие на спине смотрит вверх
//  3 // оружие на поясе

function updateSheathInfo() {
    const slot21 = slotIdIsExists(21);
    const slot22 = slotIdIsExists(22);
    const slot23 = slotIdIsExists(23);

    if (slot21 === false && slot22 === false && slot23 === false) {
        // console.log('все слоты пустые');
        window.dressUI.char.sheath_opts = [[-1, -1]];

    } else if (slot21 !== false && slot22 === false && slot23 === false) {
        // console.log('только первый слот занят');
        window.dressUI.char.sheath_opts = [[-1, -1], [1, 1], [2, 2]];

    } else if (slot21 === false && slot22 !== false) {
        // console.log('только второй слот занят');
        window.dressUI.char.sheath_opts = [[-1, -1], [3, 3], [1, 1], [1, 3], [3, 1]];

    } else if (slot21 === false && slot23 !== false) {
        // console.log('только третий слот занят');
        window.dressUI.char.sheath_opts = [[-1, -1], [1, 1]];

    } else if (slot21 !== false && slot22 !== false) {
        // console.log('только первый и второй слоты заняты');
        window.dressUI.char.sheath_opts = [[-1, -1], [3, 3], [1, 1], [1, 3], [3, 1]];

    } else if (slot21 !== false && slot23 !== false) {
        // console.log('только первый и третий слоты заняты');
        window.dressUI.char.sheath_opts = [[-1, -1], [3, 3], [1, 1], [1, 3], [3, 1]];
    };
    setSheath();
};


const LOCAL_VIEWER = `/static/main_app/javascript/wow-model-viewer/viewer_${window.dressUI.game_patch}.js`;
const LOCAL_VIEWER_MIN = `/static/main_app/javascript/wow-model-viewer/viewer_${window.dressUI.game_patch}.min.js`;
const UNLOCAL_VIEWER_MIN = `https://wow.zamimg.com/modelviewer/${window.dressUI.game_patch}/viewer/viewer.min.js`;
document.querySelector('#viewer').src = LOCAL_VIEWER_MIN;

const WH_TOOLTIP_LIVE = ''; // актуал
const WH_TOOLTIP_WOTLK = 'wotlk/';
const WH_TOOLTIP_URL = `https://www.wowhead.com/${WH_TOOLTIP_WOTLK}${LANG_POSTFIX}`;

const DEFAULT_ICON_URL = 'https://wow.zamimg.com/images/wow/icons/large/'; // small // medium // large
// const DEFAULT_ICON_URL = `https://render-classic-us.worldofwarcraft.com/icons/56/`; // 18 // 36 // 56


const get_actual_dressUI = () => {
    return {
        allow_edit: window.dressUI.allow_edit,
        game_patch: window.dressUI.game_patch,
        race: window.dressUI.model_opts.race,
        gender: window.dressUI.model_opts.gender,
        items: window.dressUI.model_opts.items.join(),
        face: window.dressUI.face.current.join(),
        mount: window.dressUI.char.mount
    };
};


const csrftoken = Cookies.get('csrftoken');
const sendAjaxRequest = function (data) {
    $('.save-char-opts-icon').css('display', 'block');

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: url_unique_dressing_room,
        data: JSON.stringify(data),
        headers: { 'X-CSRFToken': csrftoken },

        success: function (data, textStatus, jqXHR) {
            // console.log(data);
            setTimeout(() => $('.save-char-opts-icon').css('display', 'none'), 500);
        },

        error: function (jqXHR, textStatus, errorThrown) {
            $('.save-char-opts-icon').css('display', 'none');
            warnMessageHandler(4000, `${trans_ajax_error_msg}\n${jqXHR.status} ${errorThrown}`);
        }
    });
};
const debounce_sendAjaxRequest = debounce(sendAjaxRequest, debug_mode ? 300 : 3000);


const IGNORED_WRAPPED_PROPS = [
    'gear', 'char', 'generalOptions'
];
const IGNORED_PROPS = [
    'active_cat', 'sheathMain', 'sheathOff', 'AnimIsPaused', 'saved_rooms', 'show',
    'game_patch' // игнорирую изменение свойства, вручную отправляю Ajax Request без задержки из хендлера
];
// https://learn.javascript.ru/proxy
function wrapDressUI(target) {
    const handler = {

        // get: function(target, property) {
        //   const value = target[property];
        //   return typeof value === "object" ? new Proxy(value, handler) : value;
        // },

        // get: function(target, property) {
        //   if (typeof target[property] === 'object' && target[property] !== null) {
        //     return new Proxy(target[property], handler);
        //   } else {
        //     return target[property];
        //   };
        // },

        get: function (target, property) {
            if (property === 'isProxy') return true;

            const value = target[property];

            if (typeof value === 'undefined' || value === null) return;

            if (IGNORED_WRAPPED_PROPS.indexOf(property) === -1) {
                if (!value.isProxy && typeof value === 'object') target[property] = new Proxy(value, handler);
            };
            return target[property];
        },

        set: function (target, property, newValue) {
            target[property] = newValue;

            if (IGNORED_PROPS.indexOf(property) === -1) {
                if (window.dressUI.room_creator || window.dressUI.allow_edit) debounce_sendAjaxRequest(get_actual_dressUI());
            };
            return true;
        }
    };
    return new Proxy(target, handler);
};
window.dressUI = wrapDressUI(window.dressUI);
