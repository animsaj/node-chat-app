var expect = require("expect");
var { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("can generate correct message object", () => {
    var message = generateMessage("Admin", "Let's chat!");
    expect(message.from).toBe("Admin");
    expect(message.text).toBe("Let's chat!");
    expect(message.createdAt).toExist();
  });
});
