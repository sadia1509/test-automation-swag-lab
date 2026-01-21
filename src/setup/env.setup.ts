function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const Env = {
  url: getEnv('BASE_URL'),
  standardUser: getEnv('STANDARD_USER'),
  password: getEnv('PASSWORD'),
};