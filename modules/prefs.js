/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * AvichalRakesh wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Avichal Rakesh
 * ----------------------------------------------------------------------------
 */

var location = {
    lat: '65.077739', /* latitude */
    lng: '-21.418135' /* longitude */
}

/*
* To obtain an API key, sign up at
* ------------------------------
* https://openweathermap.org/api
* ------------------------------
*/
var apiKey = 'Your API Key here';

/*
 * Language Codes:
 * af     : Afrikaans
 * al     : Albanian
 * ar     : Arabic
 * az     : Azerbaijani
 * bg     : Bulgarian
 * ca     : Catalan
 * cz     : Czech
 * da     : Danish
 * de     : German
 * el     : Greek
 * en     : English
 * eu     : Basque
 * fa     : Persian (Farsi)
 * fi     : Finnish
 * fr     : French
 * gl     : Galician
 * he     : Hebrew
 * hi     : Hindi
 * hr     : Croatian
 * hu     : Hungarian
 * id     : Indonesian
 * it     : Italian
 * ja     : Japanese
 * kr     : Korean
 * la     : Latvian
 * lt     : Lithuanian
 * mk     : Macedonian
 * no     : Norwegian
 * nl     : Dutch
 * pl     : Polish
 * pt     : Portuguese
 * pt_br  : Português Brasil
 * ro     : Romanian
 * ru     : Russian
 * sv, se : Swedish
 * sk     : Slovak
 * sl     : Slovenian
 * sp, es : Spanish
 * sr     : Serbian
 * th     : Thai
 * tr     : Turkish
 * ua, uk : Ukrainian
 * vi     : Vietnamese
 * zh_cn  : Chinese Simplified
 * zh_tw  : Chinese Traditional
 * zu     : Zulu
 */
var lang = 'en';  /*Use codes from above, taken from OpenWeather.*/

var siUnits = true; /* change to false for imperial units */


// Exporting the values for use
module.exports.location = location;
module.exports.apiKey = apiKey;
module.exports.siUnits = siUnits;
module.exports.lang = lang;
