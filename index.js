const fs = require('fs');
const { Translate, } = require('@google-cloud/translate').v2;
const { XMLParser, XMLBuilder } = require("fast-xml-parser")
const { performance } = require("perf_hooks");
require("dotenv").config();
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id,
});
const parser = new XMLParser({
    ignoreAttributes : false,
});
const xmlFile = fs.readFileSync("./strings.xml",'utf-8')
let json = parser.parse(xmlFile)
delete json.resources['#text']

const languages = [
    // {
    //   language: 'en',
    //   folderName: 'values-en'
    // },
    {
      language: 'af',
      folderName: 'values-af'
    },
    {
      language: 'sq',
      folderName: 'values-sq'
    },
    {
      language: 'am',
      folderName: 'values-am'
    },
    {
      language: 'ar',
      folderName: 'values-ar'
    },
    {
      language: 'hy',
      folderName: 'values-hy'
    },
    {
      language: 'as',
      folderName: 'values-as'
    },
    {
      language: 'ay',
      folderName: 'values-ay'
    },
    {
      language: 'az',
      folderName: 'values-az'
    },
    {
      language: 'bm',
      folderName: 'values-bm'
    },
    {
      language: 'be',
      folderName: 'values-be'
    },
    {
      language: 'bn',
      folderName: 'values-bn'
    },
    {
      language: 'eu',
      folderName: 'values-eu'
    },
    {
      language: 'bg',
      folderName: 'values-bg'
    },
    {
      language: 'ca',
      folderName: 'values-ca'
    },
    {
      language: 'b+bho',
      folderName: 'values-b+bho'
    },
    {
      language: 'b+ceb',
      folderName: 'values-b+ceb'
    },
    {
      language: 'ny',
      folderName: 'values-ny'
    },
    {
      language: 'zh-rCN',
      folderName: 'values-zh-rCN'
    },
    {
      language: 'hr',
      folderName: 'values-hr'
    },
    {
      language: 'cs',
      folderName: 'values-cs'
    },
    {
      language: 'da',
      folderName: 'values-da'
    },
    {
      language: 'dv',
      folderName: 'values-dv'
    },
    {
      language: 'b+doi',
      folderName: 'values-b+doi'
    },
    {
      language: 'nl',
      folderName: 'values-nl'
    },
    {
      language: 'en',
      folderName: 'values-en'
    },
    {
      language: 'eo',
      folderName: 'values-eo'
    },
    {
      language: 'et',
      folderName: 'values-et'
    },
    {
      language: 'ee',
      folderName: 'values-ee'
    },
    {
      language: 'b+fill',
      folderName: 'values-b+fill'
    },
    {
      language: 'fi',
      folderName: 'values-fi'
    },
    {
      language: 'fr',
      folderName: 'values-fr'
    },
    {
      language: 'gl',
      folderName: 'values-gl'
    },
    {
      language: 'ka',
      folderName: 'values-ka'
    },
    {
      language: 'de',
      folderName: 'values-de'
    },
    {
      language: 'el',
      folderName: 'values-el'
    },
    {
      language: 'gn',
      folderName: 'values-gn'
    },
    {
      language: 'gu',
      folderName: 'values-gu'
    },
    {
      language: 'ht',
      folderName: 'values-ht'
    },
    {
      language: 'ha',
      folderName: 'values-ha'
    },
    {
      language: 'b+haw',
      folderName: 'values-b+haw'
    },
    {
      language: 'iw',
      folderName: 'values-iw'
    },
    {
      language: 'hi',
      folderName: 'values-hi'
    },
    {
      language: 'b+hmn',
      folderName: 'values-b+hmn'
    },
    {
      language: 'hu',
      folderName: 'values-hu'
    },
    {
      language: 'is',
      folderName: 'values-is'
    },
    {
      language: 'ig',
      folderName: 'values-ig'
    },
    {
      language: 'in',
      folderName: 'values-in'
    },
    {
      language: 'ga',
      folderName: 'values-ga'
    },
    {
      language: 'it',
      folderName: 'values-it'
    },
    {
      language: 'ja',
      folderName: 'values-ja'
    },
    {
      language: 'jv',
      folderName: 'values-jv'
    },
    {
      language: 'kn',
      folderName: 'values-kn'
    },
    {
      language: 'kk',
      folderName: 'values-kk'
    },
    {
      language: 'km',
      folderName: 'values-km'
    },
    {
      language: 'rw',
      folderName: 'values-rw'
    },
    {
      language: 'b+kok',
      folderName: 'values-b+kok'
    },
    {
      language: 'ko',
      folderName: 'values-ko'
    },
    {
      language: 'ku',
      folderName: 'values-ku'
    },
    {
      language: 'ky',
      folderName: 'values-ky'
    },
    {
      language: 'lo',
      folderName: 'values-lo'
    },
    {
      language: 'la',
      folderName: 'values-la'
    },
    {
      language: 'lv',
      folderName: 'values-lv'
    },
    {
      language: 'ln',
      folderName: 'values-ln'
    },
    {
      language: 'lt',
      folderName: 'values-lt'
    },
    {
      language: 'lb',
      folderName: 'values-lb'
    },
    {
      language: 'mk',
      folderName: 'values-mk'
    },
    {
      language: 'b+mai',
      folderName: 'values-b+mai'
    },
    {
      language: 'mg',
      folderName: 'values-mg'
    },
    {
      language: 'ms',
      folderName: 'values-ms'
    },
    {
      language: 'ml',
      folderName: 'values-ml'
    },
    {
      language: 'mt',
      folderName: 'values-mt'
    },
    {
      language: 'mr',
      folderName: 'values-mr'
    },
    {
      language: 'my',
      folderName: 'values-my'
    },
    {
      language: 'ne',
      folderName: 'values-ne'
    },
    {
      language: 'no',
      folderName: 'values-no'
    },
    {
      language: 'or',
      folderName: 'values-or'
    },
    {
      language: 'om',
      folderName: 'values-om'
    },
    {
      language: 'ps',
      folderName: 'values-ps'
    },
    {
      language: 'fa',
      folderName: 'values-fa'
    },
    {
      language: 'pl',
      folderName: 'values-pl'
    },
    {
      language: 'pt',
      folderName: 'values-pt'
    },
    {
      language: 'pa',
      folderName: 'values-pa'
    },
    {
      language: 'qu',
      folderName: 'values-qu'
    },
    {
      language: 'ro',
      folderName: 'values-ro'
    },
    {
      language: 'ru',
      folderName: 'values-ru'
    },
    {
      language: 'sm',
      folderName: 'values-sm'
    },
    {
      language: 'sa',
      folderName: 'values-sa'
    },
    {
      language: 'gd',
      folderName: 'values-gd'
    },
    {
      language: 'sr',
      folderName: 'values-sr'
    },
    {
      language: 'sn',
      folderName: 'values-sn'
    },
    {
      language: 'sd',
      folderName: 'values-sd'
    },
    {
      language: 'si',
      folderName: 'values-si'
    },
    {
      language: 'sk',
      folderName: 'values-sk'
    },
    {
      language: 'sl',
      folderName: 'values-sl'
    },
    {
      language: 'so',
      folderName: 'values-so'
    },
    {
      language: 'es',
      folderName: 'values-es'
    },
    {
      language: 'su',
      folderName: 'values-su'
    },
    {
      language: 'sw',
      folderName: 'values-sw'
    },
    {
      language: 'sv',
      folderName: 'values-sv'
    },
    {
      language: 'tg',
      folderName: 'values-tg'
    },
    {
      language: 'ta',
      folderName: 'values-ta'
    },
    {
      language: 'tt',
      folderName: 'values-tt'
    },
    {
      language: 'te',
      folderName: 'values-te'
    },
    {
      language: 'th',
      folderName: 'values-th'
    },
    {
      language: 'ti',
      folderName: 'values-ti'
    },
    {
      language: 'ts',
      folderName: 'values-ts'
    },
    {
      language: 'tr',
      folderName: 'values-tr'
    },
    // {
    //   language: 'tk',
    //   folderName: 'values-tk'
    // },
    {
      language: 'tw',
      folderName: 'values-tw'
    },
    {
      language: 'uk',
      folderName: 'values-uk'
    },
    {
      language: 'ur',
      folderName: 'values-ur'
    },
    {
      language: 'ug',
      folderName: 'values-ug'
    },
    {
      language: 'uz',
      folderName: 'values-uz'
    },
    {
      language: 'vi',
      folderName: 'values-vi'
    },
    {
      language: 'cy',
      folderName: 'values-cy'
    },
    {
      language: 'xh',
      folderName: 'values-xh'
    },
    {
      language: 'ji',
      folderName: 'values-ji'
    },
    {
      language: 'yo',
      folderName: 'values-yo'
    },
    {
      language: 'zu',
      folderName: 'values-zu'
    },
]
// const langs = {
//     // 'auto': 'Automatic',
//     'af': 'Afrikaans',
//     'sq': 'Albanian',
//     'am': 'Amharic',
//     'ar': 'Arabic',
//     'hy': 'Armenian',
//     'az': 'Azerbaijani',
//     'eu': 'Basque',
//     'be': 'Belarusian',
//     'bn': 'Bengali',
//     'bs': 'Bosnian',
//     'bg': 'Bulgarian',
//     'ca': 'Catalan',
//     'ceb': 'Cebuano',
//     'ny': 'Chichewa',
//     'zh-cn': 'Chinese Simplified',
//     'zh-tw': 'Chinese Traditional',
//     'co': 'Corsican',
//     'hr': 'Croatian',
//     'cs': 'Czech',
//     'da': 'Danish',
//     'nl': 'Dutch',
//     'en': 'English',
//     'eo': 'Esperanto',
//     'et': 'Estonian',
//     'tl': 'Filipino',
//     'fi': 'Finnish',
//     'fr': 'French',
//     'fy': 'Frisian',
//     'gl': 'Galician',
//     'ka': 'Georgian',
//     'de': 'German',
//     'el': 'Greek',
//     'gu': 'Gujarati',
//     'ht': 'Haitian Creole',
//     'ha': 'Hausa',
//     'haw': 'Hawaiian',
//     'iw': 'Hebrew',
//     'hi': 'Hindi',
//     'hmn': 'Hmong',
//     'hu': 'Hungarian',
//     'is': 'Icelandic',
//     'ig': 'Igbo',
//     'id': 'Indonesian',
//     'ga': 'Irish',
//     'it': 'Italian',
//     'ja': 'Japanese',
//     'jw': 'Javanese',
//     'kn': 'Kannada',
//     'kk': 'Kazakh',
//     'km': 'Khmer',
//     'ko': 'Korean',
//     'ku': 'Kurdish (Kurmanji)',
//     'ky': 'Kyrgyz',
//     'lo': 'Lao',
//     'la': 'Latin',
//     'lv': 'Latvian',
//     'lt': 'Lithuanian',
//     'lb': 'Luxembourgish',
//     'mk': 'Macedonian',
//     'mg': 'Malagasy',
//     'ms': 'Malay',
//     'ml': 'Malayalam',
//     'mt': 'Maltese',
//     'mi': 'Maori',
//     'mr': 'Marathi',
//     'mn': 'Mongolian',
//     'my': 'Myanmar (Burmese)',
//     'ne': 'Nepali',
//     'no': 'Norwegian',
//     'ps': 'Pashto',
//     'fa': 'Persian',
//     'pl': 'Polish',
//     'pt': 'Portuguese',
//     'pa': 'Punjabi',
//     'ro': 'Romanian',
//     'ru': 'Russian',
//     'sm': 'Samoan',
//     'gd': 'Scots Gaelic',
//     'sr': 'Serbian',
//     'st': 'Sesotho',
//     'sn': 'Shona',
//     'sd': 'Sindhi',
//     'si': 'Sinhala',
//     'sk': 'Slovak',
//     'sl': 'Slovenian',
//     'so': 'Somali',
//     'es': 'Spanish',
//     'su': 'Sundanese',
//     'sw': 'Swahili',
//     'sv': 'Swedish',
//     'tg': 'Tajik',
//     'ta': 'Tamil',
//     'te': 'Telugu',
//     'th': 'Thai',
//     'tr': 'Turkish',
//     'uk': 'Ukrainian',
//     'ur': 'Urdu',
//     'uz': 'Uzbek',
//     'vi': 'Vietnamese',
//     'cy': 'Welsh',
//     'xh': 'Xhosa',
//     'yi': 'Yiddish',
//     'yo': 'Yoruba',
//     'zu': 'Zulu'
// };
const path = "./output"

fs.access(path, async (err)=>{
    if(err) {
        fs.mkdirSync(path, (err)=>{
            if(err){
                return console.log(err)
            }
            console.log("New Directory created successfully !!")
        })
    }
    
    const t0 = performance.now();
    await Promise.all(languages.slice(0,52).map( async (lang) => {
        try{
            json.resources.string = await Promise.all(json.resources.string.map(async (tag) => {
                const Nottranslatable = Object.keys(tag).find((i)=> i === '@_translatable')
                if(!Nottranslatable && lang.language!=="en"){
                    if(tag['#text']){
                        const [translatedText] = await translate.translate(tag['#text'], { 
                            from: 'en', 
                            to: lang.language
                        })
                        return {...tag,'#text':translatedText}
                }}
                return tag
            }))
            const builder = new XMLBuilder({
                ignoreAttributes : false,
                arrayNodeName: "string",
                format:true
            });
            const xmlContent = builder.build(json)
            const filepath = `${path}/${lang.folderName}`
            fs.access(filepath, (error) => {
                if(error){
                    fs.mkdirSync(filepath, (err)=>{
                        if(err) return console.log(err)
                    })
                }
                fs.writeFile(`${filepath}/string.xml`, xmlContent, 
                    (err) => { if(err) console.error(err) }
                );
            });
            console.log(lang.language)
        } catch (error){
            console.log(error)
        }
    }))
    // await Promise.all(Object.keys(langs).slice(52).map( async (lang) => {
    //     try{
    //         json.resources.string = await Promise.all(json.resources.string.map(async (tag) => {
    //             const Nottranslatable = Object.keys(tag).find((i)=> i === '@_translatable')
    //             if(!Nottranslatable && lang!=="en"){
    //                 if(tag['#text']){
    //                     const [translatedText] = await translate.translate(tag['#text'], { 
    //                         from: 'en', 
    //                         to: lang
    //                     })
    //                     return {...tag,'#text':translatedText}
    //             }}
    //             return tag
    //         }))
    //         const builder = new XMLBuilder({
    //             ignoreAttributes : false,
    //             arrayNodeName: "string",
    //             format:true
    //         });
    //         const xmlContent = builder.build(json)
    //         const filepath = `${path}/value-${lang}`
    //         fs.access(filepath, (error) => {
    //             if(error){
    //                 fs.mkdirSync(filepath, (err)=>{
    //                     if(err) return console.log(err)
    //                 })
    //             }
    //             fs.writeFile(`${filepath}/string.xml`, xmlContent, 
    //                 (err) => { if(err) console.error(err) }
    //             );
    //         });
    //         console.log(lang)
    //     } catch (error){
    //         console.log(error)
    //     }
    // }))
    const t1 = performance.now();
    const executionTime = t1 - t0 ;
    console.log(executionTime)
})
