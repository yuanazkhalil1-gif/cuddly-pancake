import pg from "pg";
const {Pool}=pg;
if(!process.env.DATABASE_URL) throw new Error("DATABASE_URL is missing.");
export const pool=new Pool({connectionString:process.env.DATABASE_URL,max:1,idleTimeoutMillis:10000,connectionTimeoutMillis:10000,ssl:process.env.NODE_ENV==="production"?{rejectUnauthorized:false}:undefined});
pool.on("error",e=>console.error("Database pool error:",e));
