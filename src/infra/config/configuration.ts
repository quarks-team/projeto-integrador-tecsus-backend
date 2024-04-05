export interface Config {
  db: string;
  port: number;
}

export default (): Config => {
  return {
    db: process.env.MONGO_URL || 'mongodb://localhost:27017',
    port: parseInt(process.env.PORT as string) || 3003,
  };
};
