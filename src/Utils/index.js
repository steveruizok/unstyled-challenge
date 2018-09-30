export function getEmPixels() {
  var important = "!important;";
  var style =
    "position:absolute" +
    important +
    "visibility:hidden" +
    important +
    "width:1em" +
    important +
    "font-size:1em" +
    important +
    "padding:0" +
    important;

  window.getEmPixels = function(element) {
    var extraBody;

    if (!element) {
      // Emulate the documentElement to get rem value (documentElement does not work in IE6-7)
      element = extraBody = document.createElement("body");
      extraBody.style.cssText = "font-size:1em" + important;
      document.body.insertBefore(extraBody, document.body);
    }

    // Create and style a test element
    var testElement = document.createElement("i");
    testElement.style.cssText = style;
    element.appendChild(testElement);

    // Get the client width of the test element
    var value = testElement.clientWidth;

    if (extraBody) {
      // Remove the extra body element
      document.body.removeChild(extraBody);
    } else {
      // Remove the test element
      element.removeChild(testElement);
    }

    // Return the em value in pixels
    return value;
  };
}
