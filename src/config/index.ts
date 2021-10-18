
export const Server = {
  host: String(process.env.HOST),
  port: Number(process.env.PORT),
  env: String(process.env.NODE_ENV),
  db_name: String(process.env.DB_NAME),
  db_host: String(process.env.DB_HOST),
  db_user: String(process.env.DB_USER),
  db_pass: String(process.env.DB_PASS)
}

export const Auth = {
  secret: String(process.env.AUTH_JWT_SECRET),
  jwt_lifetime: String(process.env.AUTH_JWT_LIFETIME),
  refresh_secret: String(process.env.AUTH_JWT_REFRESH_SECRET),
  jwt_refresh_lifetime: String(process.env.AUTH_JWT_REFRESH_LIFETIME)
}
