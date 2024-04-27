export interface Config {
  db: DataBaseProps;
  port: number;
}

export interface DataBaseProps {
  host: string;
  username: string;
  password: string;
}

export default (): Config => {
  return {
    db: {
      host: process.env.DB_HOST ?? 'localhost',
      username: process.env.DB_USERNAME ?? 'admin',
      password: process.env.DB_PASSWORD ?? 'admin',
    },
    port: parseInt(process.env.PORT as string) || 3003,
  };
};
