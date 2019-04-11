const request = require("supertest");
const server = require("./server.js");
//testing endpoints

//returns correct http status code

describe("server.js", () => {
  describe("GET /", () => {
    //first way to deal with async
    it("should respond with 200 OK", () => {
      //library makes request using server you imported and you want to do a get request. This endpoing is going to return *a PROMISE* so we need to h andle that promise in order to check what's inside of the response
      return request(server)
        .get("/")
        .then(response => {
          //response we get back has a few useful method and props, one is the status code we can read it directly from res
          expect(response.status).toBe(200);
        });
    });

    //second way to deal with async
    it("should respond with 200 OK async", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    //third way to deal w async- done function lets jest know I'm done. Dont have to return the promise anymore, but remember to bring in done and call ito therwise it takes forever.
    it("should respond with 200 OK async", done => {
      request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it("should work", () => {
      return request(server)
        .get("/")
        .expect(200);
    });

    it("should return JSON", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });

    it("should check for json", () => {
      return request(server)
        .get("/")
        .expect("Content-Type", /json/);
    });

    it("should return {api: up}", () => {
      return request(server)
        .get("/")
        .then(res => {
          //   expect(res.body).toBe({ api: "up" }); -- false bc diff objects
          expect(res.body).toEqual({ api: "up" });
        });
    });
  });
});
