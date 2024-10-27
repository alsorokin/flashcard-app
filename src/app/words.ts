export interface Word {
    value: string;
    translation: string;
    tags: string[];
};

export interface WordCollection {
    name: string;
    selected: boolean;
}

/**
 * Get a random word from the list of words.
 * 
 * @param count {number} The number of random words to get.
 * @param tags {string[]} An array of tags to filter the words by.
 * @param ignored {string[]} An array of words to ignore.
 * @returns {Word[]} An array of random words.
 */
export function getRandomWords(count: number, tags: string[] = [], ignored: string[] = []): Word[] {
    if (count === undefined || count === null || count <= 0) {
        return [];
    }
    let filteredWords: Word[] = [];
    if (!tags || tags.length === 0) {
        filteredWords.push(...words);
    } else {
        words.forEach(w => {
            if (w.tags.some(t => tags.includes(t))) {
                filteredWords.push(w);
            }
        });
    }
    if (ignored && ignored.length > 0) {
        filteredWords = filteredWords.filter(w => !ignored.includes(w.value));
    }
    if (count >= filteredWords.length) {
        return filteredWords.map(w => { return { ...w } });
    }
    const result: Word[] = [];
    let i = 0;
    while (i < count) {
        const random_i = Math.floor(Math.random() * filteredWords.length);
        if (result.find(w => w.value === filteredWords[random_i].value) ||
            result.find(w => w.translation === filteredWords[random_i].translation)) {
            continue;
        }
        result.push({ ...filteredWords[random_i] });
        i++;
    }
    return result;
}

/**
 * Get all tags associated with the words.
 * 
 * @returns {Array<string>} An array of all tags associated with the words.
 */
export function getAllTags(): string[] {
    const tags = new Set<string>();
    words.forEach(w => w.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
}

/**
 * An array of all words with their translations and associated tags.
 * 
 * @constant
 * @type {Word[]}
 * 
 * @property {string} value - The word in the original language.
 * @property {string} translation - The translation of the word.
 * @property {string[]} tags - Tags associated with the word, indicating the lesson or category it belongs to.
 * 
 * @example
 * // Example word object
 * {
 *   "value": "ծանոթանալ",
 *   "translation": "познакомиться",
 *   "tags": ["lesson_01"]
 * }
 */
export const words: Word[] =
    [
        {
            "value": "ծանոթանալ",
            "translation": "познакомиться",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "շատ ուրախ եմ",
            "translation": "очень рад",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "շատ հաճելի է",
            "translation": "очень приятно",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "ինձ էլ",
            "translation": "мне тоже",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "ես էլ",
            "translation": "я тоже",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "իմ",
            "translation": "мой",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "մի",
            "translation": "один",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "միս",
            "translation": "мясо",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "Մասիս",
            "translation": "Арарат",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "դու",
            "translation": "ты",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "դաս",
            "translation": "урок",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "նա",
            "translation": "он/она",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "Անի",
            "translation": "Ани",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "կա",
            "translation": "есть, имеется",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "նամակ",
            "translation": "письмо",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "դանակ",
            "translation": "нож",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "մամա",
            "translation": "мама",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "մուկ",
            "translation": "мышь",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "կամ",
            "translation": "или",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "միակ",
            "translation": "единственный",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "դիակ",
            "translation": "труп",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "դիմակ",
            "translation": "маска",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "Կիմա",
            "translation": "Кима (ж. имя)",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "Նիկա",
            "translation": "Ника (ж. имя)",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "հաջողություն",
            "translation": "удачи",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "հաջող",
            "translation": "пока",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "ցտեսություն",
            "translation": "до свидания",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "մինչ հանդիպում",
            "translation": "до встречи",
            "tags": [
                "lesson_01"
            ]
        },
        {
            "value": "կարոտ",
            "translation": "тоска",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "քարոտ",
            "translation": "каменистый",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "տակ",
            "translation": "под",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "տաք",
            "translation": "тёплый",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "քնել",
            "translation": "спать",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "գնալ",
            "translation": "идти",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "քույր",
            "translation": "сестра",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "կույր",
            "translation": "слепой",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "ցորեն",
            "translation": "пшеница",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "օրորոց",
            "translation": "колыбель",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "օր",
            "translation": "день",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "օդ",
            "translation": "воздух",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "օգուտ",
            "translation": "польза",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "օրագիր",
            "translation": "дневник",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "այսօր",
            "translation": "сегодня",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "կեսօր",
            "translation": "полдень",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "ով",
            "translation": "кто",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "ովքեր",
            "translation": "кто (мн. число)",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "որդի",
            "translation": "сын",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "նոր",
            "translation": "новый",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "ոզնի",
            "translation": "ёж",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "մոտ",
            "translation": "близко, близкий, у, к",
            "tags": [
                "lesson_02"
            ]
        },
        {
            "value": "հոտ",
            "translation": "запах",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "մետրո",
            "translation": "метро",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "հետո",
            "translation": "после",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "ոսկի",
            "translation": "золото",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "որ",
            "translation": "который",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "որքան",
            "translation": "сколько",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "Ոսկան",
            "translation": "Воскан (имя)",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "ոսկեգույն",
            "translation": "цвет золота",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "որովհետեվ",
            "translation": "потому что",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "շուտ",
            "translation": "рано",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "ուշ",
            "translation": "поздно",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "պանիր",
            "translation": "сыр",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "խնձոր",
            "translation": "яблоко",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "ելակ",
            "translation": "клубника",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "կարագ",
            "translation": "масло",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "ձու",
            "translation": "яйцо",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "կաթ",
            "translation": "молоко",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "միս",
            "translation": "мясо",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "պատրաստել",
            "translation": "готовить",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "նախաճաշել",
            "translation": "завтракать",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "դպրոց",
            "translation": "школа",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "սովորել",
            "translation": "учить/учиться",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "ճաշել",
            "translation": "обедать",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "սրճարան",
            "translation": "кафе",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "գիշեր",
            "translation": "ночь",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "գինի",
            "translation": "вино",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "որտեղ",
            "translation": "где",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "որտեղից",
            "translation": "откуда",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "ուր",
            "translation": "куда",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "մուրաբա",
            "translation": "варенье",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "սուրճ",
            "translation": "кофе",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "թեյ",
            "translation": "чай",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "դե",
            "translation": "ну",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "դեմ",
            "translation": "против",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "կես",
            "translation": "половина",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "մեկ",
            "translation": "один",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "ուտել",
            "translation": "есть, кушать",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "դնել",
            "translation": "положить",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "տուն",
            "translation": "дом",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "կին",
            "translation": "жена, женщина",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "ամուսին",
            "translation": "муж",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "անկախ",
            "translation": "независимый, независимо",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "անկախություն",
            "translation": "независимость",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "քսանմեկ",
            "translation": "двадцать один",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "քսան",
            "translation": "двадцать",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "սեպտեմբեր",
            "translation": "сентябрь",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "բաժակ",
            "translation": "чашка",
            "tags": [
                "lesson_03"
            ]
        },
        {
            "value": "կաթնաշոռ",
            "translation": "творог",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "եսիմ",
            "translation": "не знаю",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "շաբաթը",
            "translation": "суббота / неделя",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ռազմիկ",
            "translation": "воин",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "լեռ",
            "translation": "гора",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ձուկ",
            "translation": "рыба",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ձմերուկ",
            "translation": "арбуз",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ձմեռ",
            "translation": "зима",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "աշուն",
            "translation": "осень",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ձեռք",
            "translation": "рука",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "երեխա",
            "translation": "ребёнок",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "զբաղված",
            "translation": "занят",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ազատ",
            "translation": "свободный",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ճաշել",
            "translation": "обедать",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "հանդիպել",
            "translation": "встретить, встретиться",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "գրադարան",
            "translation": "библиотека",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "օտար",
            "translation": "иностранный",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "նաև",
            "translation": "также",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ճապոներեն",
            "translation": "японский",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ջիմ",
            "translation": "спортзал",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "սովորաբար",
            "translation": "обычно",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "հետ",
            "translation": "с (послелог)",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "կամ",
            "translation": "или",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "հանգստանալ",
            "translation": "отдыхать",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "նայել",
            "translation": "смотреть",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "կարդալ",
            "translation": "читать",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "զարթնել",
            "translation": "проснуться",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "արև",
            "translation": "солнце",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ճուտ",
            "translation": "цыплёнок",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ճահիճ",
            "translation": "болото",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ճանճ",
            "translation": "муха",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ճկուն",
            "translation": "гибкий",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ճաշ",
            "translation": "обед",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ճերմակ",
            "translation": "белый",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ճլվլալ",
            "translation": "чирикать",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ճնճղուկ",
            "translation": "воробей",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ճիշտ",
            "translation": "правильный",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "չիր",
            "translation": "сухофрукты",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "չնչին",
            "translation": "незначительный",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "չորս",
            "translation": "четыре",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "հիշաչար",
            "translation": "злопамятный",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "չաչանակ",
            "translation": "болтун",
            "tags": [
                "lesson_04"
            ]
        },
        {
            "value": "ջերմ",
            "translation": "тёплый",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "ջուր",
            "translation": "вода",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "գարեջուր",
            "translation": "пиво",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "ջնջել",
            "translation": "стереть, удалить",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "ջինջ",
            "translation": "чистый, ясный",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "փյունիկ",
            "translation": "феникс",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "փայտ",
            "translation": "дрова",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "փերի",
            "translation": "фея",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "փետուր",
            "translation": "перо",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "եփել",
            "translation": "варить",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "թափել",
            "translation": "высыпать, вылить",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "փայլփյուն",
            "translation": "блестящий",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "խոտ",
            "translation": "трава",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "խիտ",
            "translation": "густой",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "վախ",
            "translation": "страх",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "վախենալ",
            "translation": "бояться",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "աղ",
            "translation": "соль",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "վաղ",
            "translation": "рано",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "վաղը",
            "translation": "завтра",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "ուղեղ",
            "translation": "ум",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "սեղան",
            "translation": "стол",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "խաղալ",
            "translation": "играть",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "խաղող",
            "translation": "виноград",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "տեղ",
            "translation": "место",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "այստեղ",
            "translation": "тут",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "ամեն տեղ",
            "translation": "везде",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "եղանակ",
            "translation": "погода",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "դեղ",
            "translation": "лекарство",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "դեղատուն",
            "translation": "аптека",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "տղա",
            "translation": "мальчик, парень",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "աստղ",
            "translation": "звезда",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "գիտենալ",
            "translation": "знать",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "ունենալ",
            "translation": "иметь",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "բայց",
            "translation": "но",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "որովհետև",
            "translation": "потому что",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "կարող",
            "translation": "мочь",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "տեսնել",
            "translation": "видеть",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "գյուղ",
            "translation": "деревня",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "լուսամուտ",
            "translation": "окно",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "բացվել",
            "translation": "открываться",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "տեսարան",
            "translation": "вид",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "սիրուն",
            "translation": "красивый",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "սարեր",
            "translation": "горы",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "հյուր գնալ",
            "translation": "пойти в гости",
            "tags": [
                "lesson_05"
            ]
        },
        {
            "value": "ատամ",
            "translation": "зуб",
            "tags": [
                "lesson_06"
            ]
        },
        {
            "value": "քայլել",
            "translation": "ходить, гулять",
            "tags": [
                "lesson_06"
            ]
        },
        {
            "value": "խնդրում եմ",
            "translation": "пожалуйста (просьба)",
            "tags": [
                "lesson_06"
            ]
        },
        {
            "value": "խնդրեմ",
            "translation": "пожалуйста (на спасибо)",
            "tags": [
                "lesson_06"
            ]
        },
        {
            "value": "դեռ ոչ",
            "translation": "ещё нет",
            "tags": [
                "lesson_06"
            ]
        },
        {
            "value": "դե",
            "translation": "ну",
            "tags": [
                "lesson_06"
            ]
        },
        {
            "value": "հատ",
            "translation": "штука",
            "tags": [
                "lesson_06"
            ]
        },
        {
            "value": "մի հատ",
            "translation": "одна штука, за одного (в автобусе)",
            "tags": [
                "lesson_06"
            ]
        },
        {
            "value": "ինչքան",
            "translation": "сколько",
            "tags": [
                "lesson_06"
            ]
        },
        {
            "value": "կապի մեջ",
            "translation": "на связи",
            "tags": [
                "lesson_06"
            ]
        },
        {
            "value": "ամպամած",
            "translation": "пасмурный",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "մոխրագույն",
            "translation": "серый",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "մոխիր",
            "translation": "пепел",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "պլանավորել",
            "translation": "планировать",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "կարկանդակ",
            "translation": "пирог",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "ցուրտ",
            "translation": "холодный",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "խաղ",
            "translation": "игра",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "լսել",
            "translation": "слышать, слушать",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "նվագել",
            "translation": "играть (на муз. инструменте)",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "շուն",
            "translation": "собака",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "ոնց միշտ",
            "translation": "как всегда",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "ինձ",
            "translation": "мне",
            "tags": [
                "lesson_07"
            ]
        },
        {
            "value": "ուտելիք",
            "translation": "еда",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "բրինձ",
            "translation": "рис",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "ապուր",
            "translation": "суп",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "հյութ",
            "translation": "сок",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "հնդկաձավար",
            "translation": "гречка",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "աղցան",
            "translation": "салат",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "ձվածեղ",
            "translation": "омлет",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "գնել",
            "translation": "купить",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "վճարել",
            "translation": "платить",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "քարտով",
            "translation": "картой (платить)",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "կանխիկ",
            "translation": "наличными",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "փող",
            "translation": "деньги",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "ի՞նչ արժի",
            "translation": "сколько стоит?",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "ինչքա՞ն եմ վճարում",
            "translation": "сколько должен?",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "իհարկե",
            "translation": "конечно",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "համ",
            "translation": "вкус",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "համով է",
            "translation": "вкусный",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "էլի՞ ինչ-որ բան",
            "translation": "ещё что-нибудь?",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "թարմ",
            "translation": "свежий",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "վերջ",
            "translation": "всё / конец",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "ձեր մանրը",
            "translation": "ваша сдача",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "շնորհակալություն",
            "translation": "спасибо",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "գնորդ",
            "translation": "покупатель",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "գալ",
            "translation": "прийти",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "եկել",
            "translation": "пришёл",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "կերել",
            "translation": "поел",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "տալ",
            "translation": "давать",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "տվել",
            "translation": "дал",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "տեսել",
            "translation": "увидел",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "դրել",
            "translation": "положил",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "տանել",
            "translation": "нести",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "տարել",
            "translation": "отнёс",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "անել",
            "translation": "делать",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "արել",
            "translation": "сделал",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "արդեն",
            "translation": "уже",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "ձմռանը",
            "translation": "зимой",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "տոնել",
            "translation": "праздновать",
            "tags": [
                "lesson_08"
            ]
        },
        {
            "value": "գրել",
            "translation": "писать",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "նկարել",
            "translation": "рисовать / фотографировать / снимать",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "երգ",
            "translation": "песня",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "երգ լսել",
            "translation": "слушать музыку/песню",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "աշխատել",
            "translation": "работать",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "նվագել",
            "translation": "играть на муз. инструменте",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "գիրք",
            "translation": "книга",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "երաժիշտ",
            "translation": "музыкант",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "կիթառ",
            "translation": "гитара",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "այգի",
            "translation": "парк",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "հեռախոս",
            "translation": "телефон",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "ուսուցիչ",
            "translation": "учитель",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "գրող",
            "translation": "писатель",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "դերասան",
            "translation": "актёр",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "բժիշկ",
            "translation": "врач",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "հիվանդանոց",
            "translation": "больница",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "նկարիչ",
            "translation": "художник",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "դեռ",
            "translation": "ещё (пока что)",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "համերգ",
            "translation": "концерт",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "ինձ հետ",
            "translation": "со мной",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "սիրով",
            "translation": "с удовольствием",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "հրապարակ",
            "translation": "площадь",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "միասին",
            "translation": "вместе",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "ջութակ",
            "translation": "скрипка",
            "tags": [
                "lesson_09"
            ]
        },
        {
            "value": "անձրև",
            "translation": "дождь",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "սառն",
            "translation": "прохладный",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "հավես չունեմ",
            "translation": "нет желания",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "տրամադրություն չունեմ",
            "translation": "нет настроения",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "ոչ մի տեղ",
            "translation": "нигде",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "ոչ մի բան",
            "translation": "ничего",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "պառկել",
            "translation": "лежать",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "մտածել",
            "translation": "думать",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "երեկ",
            "translation": "вчера",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "եթե",
            "translation": "если",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "օֆիս",
            "translation": "офис",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "համար",
            "translation": "для (послелог)",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "մեր",
            "translation": "наш",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "քո",
            "translation": "твой",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "ձեր",
            "translation": "ваш",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "նրա",
            "translation": "(чей?) его",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "նրանց",
            "translation": "(чей/кого/кому?) их/им",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "քեզ",
            "translation": "тебя/тебе",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "նրան",
            "translation": "его/ему",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "մեզ",
            "translation": "нас/нам",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "ձեզ",
            "translation": "вас/вам",
            "tags": [
                "lesson_10"
            ]
        },
        {
            "value": "սև",
            "translation": "чёрный",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "սպիտակ",
            "translation": "белый",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "կանաչ",
            "translation": "зелёный",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "դեղին",
            "translation": "жёлтый",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "կապույտ",
            "translation": "синий",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "կարմիր",
            "translation": "красный",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "նարնջագույն",
            "translation": "оранжевый",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "վարդագույն",
            "translation": "розовый",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "մանուշակագույն",
            "translation": "фиолетовый",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "շագանակագույն",
            "translation": "коричневый",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "երկնագույն",
            "translation": "голубой",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "նարինջ",
            "translation": "апельсин",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "վարդ",
            "translation": "роза",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "մանուշակ",
            "translation": "фиалка",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "շագանակ",
            "translation": "каштан",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "երկինք",
            "translation": "небо",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "արծաթ",
            "translation": "серебро",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "արծաթագույն",
            "translation": "цвет серебра",
            "tags": [
                "lesson_11"
            ]
        },
        {
            "value": "արևոտ",
            "translation": "солнечно",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "խոսել",
            "translation": "говорить",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "ասել",
            "translation": "сказать",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "մնացածը",
            "translation": "остальное",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "հենց նոր",
            "translation": "только что",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "ինչ",
            "translation": "что",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "ինչու",
            "translation": "почему",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "թանգարան",
            "translation": "музей",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "մութ",
            "translation": "тёмный",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "գազար",
            "translation": "морковь",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "գազարագույն",
            "translation": "цвет моркови",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "մարդ",
            "translation": "человек",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "ծիածան",
            "translation": "радуга",
            "tags": [
                "lesson_12"
            ]
        },
        {
            "value": "ընթրել",
            "translation": "ужинать",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "հաց",
            "translation": "хлеб",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "լոլիկ",
            "translation": "помидор",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "բանջարեղեն",
            "translation": "овощи",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "միրք",
            "translation": "фрукты",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "երշիկ",
            "translation": "колбаса",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "նրբերշիկ",
            "translation": "сосиска",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "թթվասեր",
            "translation": "сметана",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "խոհանոց",
            "translation": "кухня",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "օղի",
            "translation": "водка",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "շաքար",
            "translation": "сахар",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "միշտ",
            "translation": "всегда",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "երբ",
            "translation": "когда",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "ամիս",
            "translation": "месяц",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "ծառ",
            "translation": "дерево",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "ծնունդ",
            "translation": "рождение",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "տոն",
            "translation": "праздник",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "ընթրիք",
            "translation": "ужин",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "մեկ-մեկ",
            "translation": "иногда",
            "tags": [
                "lesson_13"
            ]
        },
        {
            "value": "քաղաք",
            "translation": "город",
            "tags": [
                "lesson_13"
            ]
        }
    ]
    ;