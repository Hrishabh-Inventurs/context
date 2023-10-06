const Key = "AIzaSyBOR-319hj98XkPpW4RjYpO55C-hZcAHco"
const fs = require('fs');
const { XMLParser, XMLBuilder } = require("fast-xml-parser")
const { performance } = require("perf_hooks");
// const translatte = require('translatte');
const googleTranslate = require('google-translate')(Key);
// const translate = require('google-translate-api')(Key);
// const {translate} = require("free-translate")
// const {translate} = require("@vitalets/google-translate-api")
// const {HttpProxyAgent} = require('http-proxy-agent');
// const agent = new HttpProxyAgent('http://50.168.163.180:80');

const parser = new XMLParser({
    ignoreAttributes : false,
});
const xmlFile = fs.readFileSync("./strings.xml",'utf-8')
let json = parser.parse(xmlFile)
delete json.resources['#text']

const langs = {
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'am': 'Amharic',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'ny': 'Chichewa',
    'zh-cn': 'Chinese Simplified',
    'zh-tw': 'Chinese Traditional',
    'co': 'Corsican',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'eo': 'Esperanto',
    'et': 'Estonian',
    'tl': 'Filipino',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Frisian',
    'gl': 'Galician',
    'ka': 'Georgian',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'ht': 'Haitian Creole',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'iw': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'ig': 'Igbo',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'jw': 'Javanese',
    'kn': 'Kannada',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali',
    'no': 'Norwegian',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ma': 'Punjabi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'es': 'Spanish',
    'su': 'Sundanese',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu'
};
const path = "./lang"

fs.access(path, async (err)=>{
    if(err) {
        fs.mkdir(path, (err)=>{
            if(err){
                return console.log(err)
            }
            console.log("New Directory created successfully !!")
        })
    }
    
    const t0 = performance.now();	
    await Promise.all(Object.keys(langs).slice(0,1).map( async (lang) => {
        try{
            json.resources.string = await Promise.all(json.resources.string.map(async (tag) => {
                const Nottranslatable = Object.keys(tag).find((i)=> i === '@_translatable')
                if(!Nottranslatable && lang!=="en"){
                    if(tag['#text']){
                        googleTranslate.translate(tag['#text'], "en" , lang ,
                        async (err,res)=>{
                            // console.log(err)
                            console.log(await res.translatedText)

                        })
                        // const [translatedText] = await translate.translate(tag['#text'], { 
                        //     from: 'en', 
                        //     to: lang
                        // })
                        // return {...tag,'#text':translatedText}
                }}
                return tag
            }))
            // const builder = new XMLBuilder({
            //     ignoreAttributes : false,
            //     arrayNodeName: "string",
            //     format:true
            // });
            // const xmlContent = builder.build(json)
            // fs.writeFile(`./lang/strings_${lang}.xml`,
            //     xmlContent, 
            //     (err) => { if(err) console.error(err) }
            // );
            console.log(lang)
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
    //         fs.writeFile(`./lang/strings_${lang}.xml`,
    //             xmlContent, 
    //             (err) => { if(err) console.error(err) }
    //         );
    //         console.log(lang)
    //     } catch (error){
    //         console.log(error)
    //     }
    // }))
    const t1 = performance.now();
    const executionTime = t1 - t0 ;
    console.log(executionTime)
})