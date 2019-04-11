const Hobbits = require("./hobbitsModel");
//access db so we can go and check the db
const db = require("../data/dbConfig.js");
//returns 201-- good for insert endpoit, but we want to test model
//test that it actually inserts the hobbit - has to or else it won't work

describe("hobbits model", () => {
  beforeEach(async () => {
    //what quickly cleans db including primary key - knex clenaner
    //but knex cleaner will be v imp when we move to postgres or mysql
    //test db setup in a way not respecting primayr keys u could run a command thatd wipe out the table
    //truncate() does this-
    //before insert test run, every timeo ur truncate function will run - its async so itll wait, take db hobbits, then truncate the table.

    await db("hobbits").truncate();
  });

  describe("insert", () => {
    //write test for insert functions
    it("should insert the provided hobbit", async () => {
      //execute our endpoint
      await Hobbits.insert({ name: "gaffer" });
      await Hobbits.insert({ name: "aragorn" });
      await Hobbits.insert({ name: "gandolf" });
      //run assertion - if we know we expect test db to be empty bc when we run the est we're connecting to test db not production db, so
      //check if data is there
      const hobbits = await db("hobbits");
      expect(hobbits).toHaveLength(3);
    });
  });
});
