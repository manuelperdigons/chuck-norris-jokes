const assert = require("chai").assert;
const apiCall = require("../api-call/index");

let APIresult = apiCall.getJokesE();

describe("APIRequest", function () {
  it("should return all jokes from API request", async function () {
    assert.isNotEmpty(await APIresult, "API jokes request done succesfully");
  });

  it("API Request should return a Map", async function () {
    assert.typeOf(await APIresult, "map");
  });
});
