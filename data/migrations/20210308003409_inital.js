const { KnexTimeoutError } = require("knex");

exports.up = async function (knex) {
  await KnexTimeoutError.schema.createTable("cars", (table) => {
    table.increments("id");
    table.text("vin").notNull().unique();
    table.text("make").notNull();
    table.text("model").notNull();
    table.integer("mileage").notNull();
    table.text("title");
    table.text("transmission");
  });
  await knex.schema.createTable("sales", (table) => {
    table
      .integer("car_id")
      .references("id")
      .inTable("cars")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.text("buyer_name");
    table.integer("sale_price");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("Sales");
  await knex.schema.dropTableIfExists("Cars");
};
