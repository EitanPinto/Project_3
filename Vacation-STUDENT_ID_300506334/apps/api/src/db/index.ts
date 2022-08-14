
import mysql2 from "mysql2/promise"

console.log("In DB connection module");

const {
  MYSQL_DB_HOST: host,
  MYSQL_DB_PORT: port,
  MYSQL_DB_USER: user,
  MYSQL_DB_PASS: password,
  MYSQL_DB_SCHEMA: database,
} = process.env;

let connection: mysql2.Connection | null = null;

async function exeMySqlDB():Promise<void> {
  console.log("Database initilization Start");
  try {
    connection = await mysql2.createConnection({
      host,
      port: Number(port),
      user,
      password,
      database,
    });
  } catch (error: unknown) {
    console.log(error);
    console.log("Application shut down due to MySQL connection error");
    process.exit(1);
  }
};
//getConnection function return type actually is only "mysql2.Connection", but doing this and not give any in this case requires me to handle every result 
//from an execute query to return one of these types below:
// from mysql docs:
// execute<
// T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader
// >(
// sql: string
// ): Promise<[T, FieldPacket[]]>;
// so i will have to use generics , but then my T wont be strict and ts will not show errors -> thats why i gave any

function getConnection(): mysql2.Connection | any {
  return connection;
};

export { exeMySqlDB, getConnection };
