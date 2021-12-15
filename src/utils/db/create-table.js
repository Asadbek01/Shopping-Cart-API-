import fs from "fs-extra";
import path from "path";
import pool from "./connect.js";

const createTables = async () => {
  try {
    // Reading sql file content
    const filePath = path.join(process.cwd(), "src/utils/db/table.sql");
    // when you read a file its returning you a buffer
    const fileContentAsBuffer = await fs.readFile(filePath);
    // converting buffer to string
    const fileContentAsString = fileContentAsBuffer.toString();
    // executing the query in postgres
    await pool.query(fileContentAsString);
    console.log("✅ Default tables are created");
  } catch (error) {
    console.log("❌ Error! tables are not created", error);
  }
};

(async () => {
  await createTables();
})();