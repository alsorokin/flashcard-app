export interface Word {
    value: string;
    translation: string;
    tags: string[];
};

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
 * Get all words.
 * 
 * @returns {Word[]} An array of all words.
 */
export function getAllWords(): Word[] {
    return words.map(w => { return { ...w } });
}

/**
 * Get all words that have the specified tag.
 * 
 * @param tag {string} The tag to filter the words by.
 * @returns {Word[]} An array of words that have the specified tag.
 */
export function getWordsByTag(tag: string): Word[] {
    return words.filter(w => w.tags.includes(tag)).map(w => { return { ...w } });
}

const words: Word[] =
    [
        {
            "value": "ծանոթանալ ",
            "translation": "познакомиться",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "շատ ուրախ եմ",
            "translation": "очень рад",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "շատ հաճելի է",
            "translation": "очень приятно",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "ինձ էլ",
            "translation": "мне тоже",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "ես էլ",
            "translation": "я тоже",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "իմ",
            "translation": "мой",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "միս",
            "translation": "мясо",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "դու",
            "translation": "ты",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "դաս",
            "translation": "урок",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "նա",
            "translation": "он/она",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "կա",
            "translation": "есть, имеется",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "նամակ",
            "translation": "письмо",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "դանակ",
            "translation": "нож",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "մամա",
            "translation": "мама",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "մուկ",
            "translation": "мышь",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "կամ",
            "translation": "или",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "միակ",
            "translation": "единственный",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "դիակ",
            "translation": "труп",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "դիմակ",
            "translation": "маска",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "հաջողություն",
            "translation": "удачи",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "հաջող",
            "translation": "пока",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "ցտեսություն",
            "translation": "до свидания",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "մինչ հանդիպում",
            "translation": "до встречи",
            "tags": [
                "Урок 1"
            ]
        },
        {
            "value": "կարոտ",
            "translation": "тоска",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "քարոտ",
            "translation": "каменистый",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "տակ",
            "translation": "под",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "տաք",
            "translation": "тёплый",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "քնել",
            "translation": "спать",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "գնալ",
            "translation": "идти",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "քույր",
            "translation": "сестра",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "կույր",
            "translation": "слепой",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "ցորեն",
            "translation": "пшеница",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "օրորոց",
            "translation": "колыбель",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "օր",
            "translation": "день",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "օդ",
            "translation": "воздух",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "օգուտ",
            "translation": "польза",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "օրագիր",
            "translation": "дневник",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "այսօր",
            "translation": "сегодня",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "կեսօր",
            "translation": "полдень",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "ով",
            "translation": "кто",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "ովքեր",
            "translation": "кто (мн. число)",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "որդի",
            "translation": "сын",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "նոր",
            "translation": "новый",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "ոզնի",
            "translation": "ёж",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "մոտ",
            "translation": "близко, близкий, у, к",
            "tags": [
                "Урок 2"
            ]
        },
        {
            "value": "հոտ",
            "translation": "запах",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "մետրո",
            "translation": "метро",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "հետո",
            "translation": "после",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "ոսկի",
            "translation": "золото",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "որ",
            "translation": "который",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "որքան",
            "translation": "сколько",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "ոսկեգույն",
            "translation": "цвет золота",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "որովհետեվ",
            "translation": "потому что",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "շուտ",
            "translation": "рано",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "ուշ",
            "translation": "поздно",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "պանիր",
            "translation": "сыр",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "խնձոր",
            "translation": "яблоко",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "ելակ",
            "translation": "клубника",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "կարագ",
            "translation": "масло",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "ձու",
            "translation": "яйцо",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "կաթ",
            "translation": "молоко",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "միս",
            "translation": "мясо",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "պատրաստել",
            "translation": "готовить",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "նախաճաշել",
            "translation": "завтракать",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "դպրոց",
            "translation": "школа",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "սովորել",
            "translation": "учить/учиться",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "ճաշել",
            "translation": "обедать",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "սրճարան",
            "translation": "кафе",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "գիշեր",
            "translation": "ночь",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "գինի",
            "translation": "вино",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "որտեղ",
            "translation": "где",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "որտեղից",
            "translation": "откуда",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "ուր",
            "translation": "куда",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "մուրաբա",
            "translation": "варенье",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "սուրճ",
            "translation": "кофе",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "թեյ",
            "translation": "чай",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "դե",
            "translation": "ну",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "դեմ",
            "translation": "против",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "կես",
            "translation": "половина",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "մեկ",
            "translation": "один",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "ուտել",
            "translation": "есть, кушать",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "խմել",
            "translation": "пить",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "դնել",
            "translation": "положить",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "տուն",
            "translation": "дом",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "կին",
            "translation": "жена, женщина",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "ամուսին",
            "translation": "муж",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "անկախ",
            "translation": "независимый, независимо",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "անկախություն",
            "translation": "независимость",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "քսանմեկ",
            "translation": "двадцать один",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "քսան",
            "translation": "двадцать",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "սեպտեմբեր",
            "translation": "сентябрь",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "բաժակ",
            "translation": "чашка",
            "tags": [
                "Урок 3"
            ]
        },
        {
            "value": "կաթնաշոռ",
            "translation": "творог",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "եսիմ",
            "translation": "не знаю",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "շաբաթը",
            "translation": "суббота / неделя",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ռազմիկ",
            "translation": "воин",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "լեռ",
            "translation": "гора",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "սար",
            "translation": "гора",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ձուկ",
            "translation": "рыба",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ձմերուկ",
            "translation": "арбуз",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ձմեռ",
            "translation": "зима",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "աշուն",
            "translation": "осень",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ձեռք",
            "translation": "рука",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "երեխա",
            "translation": "ребёнок",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "զբաղված",
            "translation": "занят",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ազատ",
            "translation": "свободный",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ճաշել",
            "translation": "обедать",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "հանդիպել",
            "translation": "встретить, встретиться",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "գրադարան",
            "translation": "библиотека",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "օտար",
            "translation": "иностранный",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "նաև",
            "translation": "также",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ճապոներեն",
            "translation": "японский",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ջիմ",
            "translation": "спортзал",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "սովորաբար",
            "translation": "обычно",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "հետ",
            "translation": "с (послелог)",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "կամ",
            "translation": "или",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "հանգստանալ ",
            "translation": "отдыхать",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "նայել",
            "translation": "смотреть",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "կարդալ",
            "translation": "читать",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "զարթնել",
            "translation": "проснуться",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "արև",
            "translation": "солнце",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ճուտ",
            "translation": "цыплёнок",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ճահիճ",
            "translation": "болото",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ճանճ",
            "translation": "муха",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ճկուն",
            "translation": "гибкий",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ճաշ",
            "translation": "обед",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ճերմակ",
            "translation": "белый",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ճլվլալ",
            "translation": "чирикать",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ճնճղուկ",
            "translation": "воробей",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ճիշտ",
            "translation": "правильный",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "չիր",
            "translation": "сухофрукты",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "չնչին",
            "translation": "незначительный",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "չորս",
            "translation": "четыре",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "հիշաչար",
            "translation": "злопамятный",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "չաչանակ",
            "translation": "болтун",
            "tags": [
                "Урок 4"
            ]
        },
        {
            "value": "ջերմ",
            "translation": "тёплый",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "ջուր",
            "translation": "вода",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "գարեջուր",
            "translation": "пиво",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "ջնջել",
            "translation": "стереть, удалить",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "ջինջ",
            "translation": "чистый, ясный",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "փյունիկ",
            "translation": "феникс",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "փայտ",
            "translation": "дрова",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "փերի",
            "translation": "фея",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "փետուր",
            "translation": "перо",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "եփել",
            "translation": "варить",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "թափել",
            "translation": "высыпать, вылить",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "փայլփյուն",
            "translation": "блестящий",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "խոտ",
            "translation": "трава",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "խիտ",
            "translation": "густой",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "վախ",
            "translation": "страх",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "վախենալ",
            "translation": "бояться",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "աղ",
            "translation": "соль",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "վաղ",
            "translation": "рано",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "վաղը",
            "translation": "завтра",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "ուղեղ",
            "translation": "ум",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "սեղան",
            "translation": "стол",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "խաղալ",
            "translation": "играть",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "խաղող",
            "translation": "виноград",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "տեղ",
            "translation": "место",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "այստեղ",
            "translation": "тут",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "ամեն տեղ",
            "translation": "везде",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "եղանակ",
            "translation": "погода",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "դեղ",
            "translation": "лекарство",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "դեղատուն",
            "translation": "аптека",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "տղա",
            "translation": "мальчик, парень",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "աստղ",
            "translation": "звезда",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "գիտենալ",
            "translation": "знать",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "ունենալ",
            "translation": "иметь",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "բայց",
            "translation": "но",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "որովհետև",
            "translation": "потому что",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "կարող",
            "translation": "мочь",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "տեսնել",
            "translation": "видеть",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "գյուղ",
            "translation": "деревня",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "լուսամուտ",
            "translation": "окно",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "բացվել",
            "translation": "открываться",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "տեսարան",
            "translation": "вид",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "սիրուն",
            "translation": "красивый",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "սարեր",
            "translation": "горы",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "հյուր գնալ",
            "translation": "пойти в гости",
            "tags": [
                "Урок 5"
            ]
        },
        {
            "value": "ատամ",
            "translation": "зуб",
            "tags": [
                "Урок 6"
            ]
        },
        {
            "value": "քայլել",
            "translation": "ходить, гулять",
            "tags": [
                "Урок 6"
            ]
        },
        {
            "value": "խնդրում եմ",
            "translation": "пожалуйста (просьба)",
            "tags": [
                "Урок 6"
            ]
        },
        {
            "value": "խնդրեմ",
            "translation": "пожалуйста (на спасибо)",
            "tags": [
                "Урок 6"
            ]
        },
        {
            "value": "դեռ ոչ",
            "translation": "ещё нет",
            "tags": [
                "Урок 6"
            ]
        },
        {
            "value": "դե",
            "translation": "ну",
            "tags": [
                "Урок 6"
            ]
        },
        {
            "value": "հատ",
            "translation": "штука",
            "tags": [
                "Урок 6"
            ]
        },
        {
            "value": "մի հատ",
            "translation": "одна штука, за одного (в автобусе)",
            "tags": [
                "Урок 6"
            ]
        },
        {
            "value": "ինչքան",
            "translation": "сколько",
            "tags": [
                "Урок 6"
            ]
        },
        {
            "value": "կապի մեջ",
            "translation": "на связи",
            "tags": [
                "Урок 6"
            ]
        },
        {
            "value": "ամպամած",
            "translation": "пасмурный",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "մոխրագույն",
            "translation": "серый",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "մոխիր",
            "translation": "пепел",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "պլանավորել",
            "translation": "планировать",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "կարկանդակ",
            "translation": "пирог",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "ցուրտ",
            "translation": "холодный",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "խաղ",
            "translation": "игра",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "լսել",
            "translation": "слышать, слушать",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "նվագել",
            "translation": "играть (на муз. инструменте)",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "շուն",
            "translation": "собака",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "ոնց միշտ",
            "translation": "как всегда",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "ինձ",
            "translation": "мне",
            "tags": [
                "Урок 7"
            ]
        },
        {
            "value": "ուտելիք",
            "translation": "еда",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "բրինձ",
            "translation": "рис",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "ապուր",
            "translation": "суп",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "հյութ",
            "translation": "сок",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "հնդկաձավար",
            "translation": "гречка",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "աղցան",
            "translation": "салат",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "ձվածեղ",
            "translation": "омлет",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "գնել",
            "translation": "купить",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "վճարել",
            "translation": "платить",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "քարտով",
            "translation": "картой (платить)",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "կանխիկ",
            "translation": "наличными",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "փող",
            "translation": "деньги",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "ի՞նչ արժի",
            "translation": "сколько стоит?",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "ինչքա՞ն եմ վճարում",
            "translation": "сколько должен?",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "իհարկե",
            "translation": "конечно",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "համ",
            "translation": "вкус",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "համով է",
            "translation": "вкусный",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "էլի՞ ինչ-որ բան",
            "translation": "ещё что-нибудь?",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "թարմ",
            "translation": "свежий",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "վերջ",
            "translation": "всё / конец",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "ձեր մանրը",
            "translation": "ваша сдача",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "շնորհակալություն",
            "translation": "спасибо",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "գնորդ",
            "translation": "покупатель",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "գալ",
            "translation": "прийти",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "եկել",
            "translation": "пришёл",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "կերել",
            "translation": "поел",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "տալ",
            "translation": "давать",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "տվել",
            "translation": "дал",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "տեսել",
            "translation": "увидел",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "դրել",
            "translation": "положил",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "տանել",
            "translation": "нести",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "տարել",
            "translation": "отнёс",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "անել",
            "translation": "делать",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "արել",
            "translation": "сделал",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "արդեն",
            "translation": "уже",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "ձմռանը",
            "translation": "зимой",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "տոնել",
            "translation": "праздновать",
            "tags": [
                "Урок 8"
            ]
        },
        {
            "value": "գրել",
            "translation": "писать",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "նկարել",
            "translation": "рисовать / фотографировать / снимать",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "երգ",
            "translation": "песня",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "երգ լսել",
            "translation": "слушать музыку/песню",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "աշխատել",
            "translation": "работать",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "նվագել",
            "translation": "играть на муз. инструменте",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "գիրք",
            "translation": "книга",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "երաժիշտ",
            "translation": "музыкант",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "կիթառ",
            "translation": "гитара",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "այգի",
            "translation": "парк",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "հեռախոս",
            "translation": "телефон",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "ուսուցիչ",
            "translation": "учитель",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "գրող",
            "translation": "писатель",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "դերասան",
            "translation": "актёр",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "բժիշկ",
            "translation": "врач",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "հիվանդանոց",
            "translation": "больница",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "նկարիչ",
            "translation": "художник",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "դեռ",
            "translation": "ещё (пока что)",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "համերգ",
            "translation": "концерт",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "ինձ հետ",
            "translation": "со мной",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "սիրով",
            "translation": "с удовольствием",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "հրապարակ",
            "translation": "площадь",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "միասին",
            "translation": "вместе",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "ջութակ",
            "translation": "скрипка",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "վերելակ",
            "translation": "лифт",
            "tags": [
                "Урок 9"
            ]
        },
        {
            "value": "անձրև",
            "translation": "дождь",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "սառն",
            "translation": "прохладный",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "հավես չունեմ ",
            "translation": "нет желания",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "տրամադրություն չունեմ",
            "translation": "нет настроения",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "ոչ մի տեղ",
            "translation": "нигде",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "ոչ մի բան",
            "translation": "ничего",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "պառկել",
            "translation": "лежать",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "մտածել",
            "translation": "думать",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "երեկ",
            "translation": "вчера",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "եթե",
            "translation": "если",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "օֆիս",
            "translation": "офис",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "համար",
            "translation": "для (послелог)",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "մեր",
            "translation": "наш",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "քո",
            "translation": "твой",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "ձեր",
            "translation": "ваш",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "նրա",
            "translation": "(чей?) его",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "նրանց",
            "translation": "(чей/кого/кому?) их/им",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "քեզ",
            "translation": "тебя/тебе",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "նրան",
            "translation": "его/ему",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "մեզ",
            "translation": "нас/нам",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "ձեզ",
            "translation": "вас/вам",
            "tags": [
                "Урок 10"
            ]
        },
        {
            "value": "սև",
            "translation": "чёрный",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "սպիտակ",
            "translation": "белый",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "կանաչ",
            "translation": "зелёный",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "դեղին",
            "translation": "жёлтый",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "կապույտ",
            "translation": "синий",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "կարմիր",
            "translation": "красный",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "նարնջագույն",
            "translation": "оранжевый",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "վարդագույն",
            "translation": "розовый",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "մանուշակագույն",
            "translation": "фиолетовый",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "շագանակագույն",
            "translation": "коричневый",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "երկնագույն",
            "translation": "голубой",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "նարինջ",
            "translation": "апельсин",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "վարդ",
            "translation": "роза",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "մանուշակ",
            "translation": "фиалка",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "շագանակ",
            "translation": "каштан",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "երկինք",
            "translation": "небо",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "արծաթ",
            "translation": "серебро",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "արծաթագույն",
            "translation": "цвет серебра",
            "tags": [
                "Урок 11"
            ]
        },
        {
            "value": "արևոտ",
            "translation": "солнечно",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "խոսել",
            "translation": "говорить",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "ասել",
            "translation": "сказать",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "մնացածը",
            "translation": "остальное",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "հենց նոր",
            "translation": "только что",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "ինչ",
            "translation": "что",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "ինչու",
            "translation": "почему",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "թանգարան",
            "translation": "музей",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "մութ",
            "translation": "тёмный",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "գազար",
            "translation": "морковь",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "մարդ",
            "translation": "человек",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "ծիածան",
            "translation": "радуга",
            "tags": [
                "Урок 12"
            ]
        },
        {
            "value": "ընթրել",
            "translation": "ужинать",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "հաց",
            "translation": "хлеб",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "լոլիկ",
            "translation": "помидор",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "բանջարեղեն",
            "translation": "овощи",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "միրք",
            "translation": "фрукты",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "երշիկ",
            "translation": "колбаса",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "նրբերշիկ",
            "translation": "сосиска",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "թթվասեր",
            "translation": "сметана",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "խոհանոց",
            "translation": "кухня",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "օղի",
            "translation": "водка",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "շաքար",
            "translation": "сахар",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "միշտ",
            "translation": "всегда",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "երբ",
            "translation": "когда",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "ամիս",
            "translation": "месяц",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "ծառ",
            "translation": "дерево",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "ծնունդ",
            "translation": "рождение",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "տոն",
            "translation": "праздник",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "ընթրիք",
            "translation": "ужин",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "մեկ-մեկ",
            "translation": "иногда",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "քաղաք",
            "translation": "город",
            "tags": [
                "Урок 13"
            ]
        },
        {
            "value": "շիլա",
            "translation": "каша",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "աստիճան",
            "translation": "лестница, градус",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "հավ",
            "translation": "курица",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "մեքենա",
            "translation": "машина",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "ինչ-որ բան",
            "translation": "что-нибудь",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "չաղ",
            "translation": "толстый, тучный",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "արջ",
            "translation": "медведь",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "հիվանդ",
            "translation": "больной",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "մայրաքաղաք",
            "translation": "столица",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "ո՞վ է",
            "translation": "кто это?",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "ու՞մ եք ուզում",
            "translation": "кого спрашиваете?",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "սխալ եք զանգել",
            "translation": "вы ошиблись номером",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "ճիշտ է",
            "translation": "верно, точно",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "հարմար չէ",
            "translation": "не удобно (говорить)",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "կզանգեմ",
            "translation": "позвоню",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "կխոսենք",
            "translation": "поговорим (ещё)",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "լու՞րջ",
            "translation": "серьёзно?",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "չի լսվում",
            "translation": "не слышно",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "եղավ",
            "translation": "понятно",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "դե լավ, կապի մեջ",
            "translation": "ладно, на связи",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "շուտ լավացիր",
            "translation": "поскорее поправляйся",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "սենյակ",
            "translation": "комната",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "սպասել",
            "translation": "ждать",
            "tags": [
                "Урок 14"
            ]
        },
        {
            "value": "կազմել",
            "translation": "составить",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "ցուցակ",
            "translation": "список",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "առաջին",
            "translation": "первый, сначала",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "կաթնամթերք",
            "translation": "молочные продукты",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "մթերք",
            "translation": "продукты",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "ծովամթերք",
            "translation": "морепродукты",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "մսամթերք",
            "translation": "мясные продукты",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "ծով",
            "translation": "море",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "խոզ",
            "translation": "свинья",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "կաթնաշոռ",
            "translation": "творог",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "հասցեն",
            "translation": "адрес",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "փողոց",
            "translation": "улица",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "առանց",
            "translation": "без",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "պատմություն",
            "translation": "история, рассказ",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "պատ",
            "translation": "стена",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "պատմել",
            "translation": "рассказывать",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "մոտենալ",
            "translation": "давать, отдать",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "հավատալ",
            "translation": "верить",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "մասին",
            "translation": "о, про",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "ամառ",
            "translation": "лето",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "ժամացույց",
            "translation": "часы",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "ընկերուհի",
            "translation": "подруга, девушка",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "ընկեր",
            "translation": "друг, парень",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "բոլոր",
            "translation": "все",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "վաճառող",
            "translation": "продавец",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "օգնել",
            "translation": "помогать",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "երևի",
            "translation": "видимо, должно быть",
            "tags": [
                "Урок 15"
            ]
        },
        {
            "value": "բառ",
            "translation": "слово",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "կտեսնեմ",
            "translation": "увижу",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "թարգմանել",
            "translation": "переводить",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "ուշանալ",
            "translation": "опаздывать",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "այնտեղ",
            "translation": "там",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "խորոված",
            "translation": "шашлык",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "լողանալ",
            "translation": "купаться",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "լվացվել",
            "translation": "умываться",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "համալսարան",
            "translation": "университет",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "զբոսնել",
            "translation": "гулять",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "ընտանիք",
            "translation": "семья",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "ստուգել",
            "translation": "проверять",
            "tags": [
                "Урок 16"
            ]
        },
        {
            "value": "խումբ",
            "translation": "группа",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "բլիթներ",
            "translation": "блины, пончики",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "առողջություն",
            "translation": "здоровье",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "ուշադիր",
            "translation": "внимательно",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "սիրտ",
            "translation": "сердце",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "արի",
            "translation": "иди",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "սեր",
            "translation": "любовь, пенка",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "հավաքել",
            "translation": "собирать, убирать",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "տետր",
            "translation": "тетрадь",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "տվել",
            "translation": "отдал",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "վերցրել",
            "translation": "взял",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "վերցնել",
            "translation": "взять",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "բանալի",
            "translation": "ключ",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "բացել",
            "translation": "открыть",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "նեղանալ",
            "translation": "обижаться",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "իմանալ",
            "translation": "узнать",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "ուշանալ",
            "translation": "опаздывать",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "գնացք",
            "translation": "поезд",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "մաղթել",
            "translation": "желать (кому-то)",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "ցանկանալ",
            "translation": "желать (себе или кому-то)",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "երջանկություն",
            "translation": "счастье",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "ամենայն բարիք",
            "translation": "всего самого наилучшего",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "բարիք",
            "translation": "добро",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "համբույր",
            "translation": "поцелуй",
            "tags": [
                "Урок 17"
            ]
        },
        {
            "value": "զրուցել",
            "translation": "беседовать",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "գործ",
            "translation": "дело, работа",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "հետաքրքիր",
            "translation": "интересный",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "արշավ",
            "translation": "поход",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "ոստիկան",
            "translation": "полицейский",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "ու վերջ",
            "translation": "и всё",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "ումով",
            "translation": "кем",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "ինչով",
            "translation": "чем",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "գրիչ",
            "translation": "ручка",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "մատիտ",
            "translation": "карандаш",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "հաճույք",
            "translation": "удовольствие",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "հաճույքով",
            "translation": "с удовольствием",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "ժամանակ",
            "translation": "время",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "ինչքան",
            "translation": "сколько",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "հպարտանալ",
            "translation": "гордиться",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "հիանալ",
            "translation": "восхищаться",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "պարզ",
            "translation": "ясный, понятный",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "կանել",
            "translation": "делать",
            "tags": [
                "Урок 18"
            ]
        },
        {
            "value": "մի",
            "translation": "один",
            "tags": [
                "Числительные"
            ]
        },
        {
            "value": "մեկ",
            "translation": "один",
            "tags": [
                "Числительные"
            ]
        },
        {
            "value": "երկու",
            "translation": "два",
            "tags": [
                "Числительные"
            ]
        },
        {
            "value": "երեք",
            "translation": "три",
            "tags": [
                "Числительные"
            ]
        },
        {
            "value": "չորս",
            "translation": "четыре",
            "tags": [
                "Числительные"
            ]
        },
        {
            "value": "հինգ",
            "translation": "пять",
            "tags": [
                "Числительные"
            ]
        },
        {
            "value": "վեց",
            "translation": "шесть",
            "tags": [
                "Числительные"
            ]
        },
        {
            "value": "յոթ",
            "translation": "семь",
            "tags": [
                "Числительные"
            ]
        },
        {
            "value": "ութ",
            "translation": "восемь",
            "tags": [
                "Числительные"
            ]
        },
        {
            "value": "ինը",
            "translation": "девять",
            "tags": [
                "Числительные"
            ]
        },
        {
            "value": "տաս",
            "translation": "десять",
            "tags": [
                "Числительные"
            ]
        },
        {
            "value": "կիրակի",
            "translation": "воскресенье",
            "tags": [
                "Дни недели"
            ]
        },
        {
            "value": "երկուշաբթի",
            "translation": "понедельник",
            "tags": [
                "Дни недели"
            ]
        },
        {
            "value": "երեքշաբթի",
            "translation": "вторник",
            "tags": [
                "Дни недели"
            ]
        },
        {
            "value": "չորեքշաբթի",
            "translation": "среда",
            "tags": [
                "Дни недели"
            ]
        },
        {
            "value": "հինգշաբթի",
            "translation": "четверг",
            "tags": [
                "Дни недели"
            ]
        },
        {
            "value": "ուրբաթ",
            "translation": "пятница",
            "tags": [
                "Дни недели"
            ]
        },
        {
            "value": "շաբաթ",
            "translation": "суббота / неделя",
            "tags": [
                "Дни недели"
            ]
        },
        {
            "value": "հունվար",
            "translation": "январь",
            "tags": [
                "Месяцы"
            ]
        },
        {
            "value": "փետրվար",
            "translation": "февраль",
            "tags": [
                "Месяцы"
            ]
        },
        {
            "value": "մարտ",
            "translation": "март",
            "tags": [
                "Месяцы"
            ]
        },
        {
            "value": "ապրիլ",
            "translation": "апрель",
            "tags": [
                "Месяцы"
            ]
        },
        {
            "value": "մայիս",
            "translation": "май",
            "tags": [
                "Месяцы"
            ]
        },
        {
            "value": "հունիս",
            "translation": "июнь",
            "tags": [
                "Месяцы"
            ]
        },
        {
            "value": "հուլիս",
            "translation": "июль",
            "tags": [
                "Месяцы"
            ]
        },
        {
            "value": "օգոստոս",
            "translation": "август",
            "tags": [
                "Месяцы"
            ]
        },
        {
            "value": "սեպտեմբեր",
            "translation": "сентябрь",
            "tags": [
                "Месяцы"
            ]
        },
        {
            "value": "հոկտեմբեր",
            "translation": "октябрь",
            "tags": [
                "Месяцы"
            ]
        },
        {
            "value": "նոյեմբեր",
            "translation": "ноябрь",
            "tags": [
                "Месяцы"
            ]
        },
        {
            "value": "դեկտեմբեր",
            "translation": "декабрь",
            "tags": [
                "Месяцы"
            ]
        }
    ]
    ;