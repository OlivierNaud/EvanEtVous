const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance

test("Get companies data", async () => {
  const mock = new MockAdapter(axios);
  // Mock any GET request to /users
  // arguments for reply are (status, data, headers)
  const httpResponse = {
    companies: [
      {
        id: 1,
        name: "evanEtVous",
        description: "je suis une entreprise de",
        img: "img.png",
        mail: "melvinlebg@gmail.com",
        phone: "0612345678",
      },
    ],
  };

  const httpStatus = 200;
  mock
    .onGet("http://localhost:8000/api/companies")
    .reply(httpStatus, httpResponse);

  const response = await axios.get("http://localhost:8000/api/companies");
  expect(response.data).toStrictEqual(httpResponse);
  expect(response.status).toBe(500);
});
