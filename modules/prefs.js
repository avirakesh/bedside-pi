/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * AvichalRakesh wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
 * ----------------------------------------------------------------------------
 */

var latlng = '65.077739,-21.418135'; /* latitude, longitude */

/* To obtain an API key, sign up at
------------------------
https://darksky.net/dev/
------------------------
*/
var apiKey = 'Your API Key here';

/*
 * Language Codes:
 *
 * ar: Arabic
 * az: Azerbaijani
 * be: Belarusian
 * bg: Bulgarian
 * bs: Bosnian
 * ca: Catalan
 * cs: Czech
 * de: German
 * el: Greek
 * en: English (default)
 * es: Spanish
 * et: Estonian
 * fr: French
 * hr: Croatian
 * hu: Hungarian
 * id: Indonesian
 * it: Italian
 * is: Icelandic
 * kw: Cornish
 * nb: Norwegian Bokmål
 * nl: Dutch
 * pl: Polish
 * pt: Portuguese
 * ru: Russian
 * sk: Slovak
 * sl: Slovenian
 * sr: Serbian
 * sv: Swedish
 * tet: Tetum
 * tr: Turkish
 * uk: Ukrainian
 * x-pig-latin: Igpay Atinlay
 * zh: simplified Chinese
 * zh-tw: traditional Chinese
 */
var lang = 'en';  /*Use codes from above, taken from darksky API.*/

var siUnits = true; /* change to false for imperial units */


// Exporting the values for use
module.exports.latlng = latlng;
module.exports.apiKey = apiKey;
module.exports.siUnits = siUnits;
module.exports.lang = lang;
