var expect = require("expect");
var { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("can generate correct message object", () => {
    var message = generateMessage("Admin", "Let's chat!");
    expect(message.from).toBe("Admin");
    expect(message.text).toBe("Let's chat!");
    expect(message.createdAt).toExist();
  });
});

describe("generateLocationMessage", () => {
  it("can generate correct location message", () => {
    var message = generateLocationMessage("Paul", "1", "2");
    expect(message.from).toBe("Paul");
    expect(message.url).toBe("https://google.com/maps/?q=1,2");
    expect(message.createdAt).toExist();
  });
});
