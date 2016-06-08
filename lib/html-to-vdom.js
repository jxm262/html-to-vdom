var createConverter = require('./htmlparser-to-vdom');
var parseHTML = require('./parse-html');

module.exports = function initializeHtmlToVdom (VTree, VText) {
    var htmlparserToVdom = createConverter(VTree, VText);
    return function convertHTML(options, html) {
        var noOptions = typeof html === 'undefined' && typeof options === 'string';
        var hasOptions = !noOptions;

        // was html supplied as the only argument?
        var htmlToConvert = noOptions ? options : html;
        var getVNodeKey = hasOptions ? options.getVNodeKey : undefined;

        var tags = parseHTML(htmlToConvert);

        var convertedHTML;
        if (tags.length > 1) {
            convertedHTML = new Array(tags.length);

            var convertFunction = htmlparserToVdom.convert;
            var tagsLength = tags.length;
            for (var i = 0; i < tagsLength; i++) {
                convertedHTML[i] = convertFunction(tags[i], getVNodeKey);
            }
        }
        else {
            convertedHTML = htmlparserToVdom.convert(tags[0], getVNodeKey);
        }

        return convertedHTML;
    };
};
