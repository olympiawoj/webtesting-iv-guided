const Hobbits = require("./hobbitsModel"); // we r testing the model so we should prob bring this in and get hobbits model

//access db so we can go and check the db
const db = require("../data/dbConfig.js");
//returns 201-- good for insert endpoit, but we want to test model
//test that it actually inserts the hobbit - has to or else it won't work

describe("hobbits model", () => {
  //before each and after each are going to run in the context of a describe- only runs for this describe -scrope of whole models describe
  beforeEach(async () => {
    //what quickly cleans db including primary key - knex clenaner
    //but knex cleaner will be v imp when we move to postgres or mysql
    //but if u have ur test db setup in a way not respecting primayr keys u could run a command thatd wipe out the table
    //truncate() does this-
    //before insert test run, every timeo ur truncate function will run - its async so itll wait, take db hobbits, then truncate the table.

    await db("hobbits").truncate();
  });

  describe("insert", () => {
    //write test for insert functions
    it("should insert the provided hobbit - check length after insert", async () => {
      //execute our endpoint
      await Hobbits.insert({ name: "gaffer" });
      await Hobbits.insert({ name: "aragorn" });
      await Hobbits.insert({ name: "gandolf" });
      //run assertion - need to go and look at the databse to see whats there- if we know we expect test db to be empty bc when we run the est we're connecting to test db not production db, so
      //check if data is there
      const hobbits = await db("hobbits");
      expect(hobbits).toHaveLength(3);
    });

    //check that insert command will return hobbit that was inserted
    it("should insert the provided hobbit - check hobbit returned", async () => {
      //execute our endpoint
      //response from this insert is an array w/ an id
      //if i go into hobbits table i know is empty, give me the first record thats there- can I check that that hobbit
      let hobbit = await Hobbits.insert({ name: "gaffer" });
      expect(hobbit.name).toBe("gaffer");
      hobbit = await Hobbits.insert({ name: "sam" });
      expect(hobbit.name).toBe("sam");
    });
  });

  describe("remove", () => {
    //test remove method: insert a record, check that its there, call delete, check that record is no longer there
  });
});
