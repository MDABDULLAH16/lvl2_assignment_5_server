import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  expire_in_refresh: process.env.JWT_REFRESH_EXPIRATION,
  expire_in_access: process.env.JWT_ACCESS_EXPIRATION,
};
