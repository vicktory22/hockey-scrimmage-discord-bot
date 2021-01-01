const { parseElements } = require("../services/parser");

test("it returns an array of the elements", () => {
    const html =
        "<!DOCTYPE html><html><ul><li>one</li><li>two</li><li>three</li></ul></html>";

    const elements = parseElements("li", html);

    expect(elements.length).toBe(2);
});
