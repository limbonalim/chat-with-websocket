interface IConfig {
	mongoose: string;
	port: number;
}

const config: IConfig = {
	mongoose: 'mongodb://localhost/chat',
	port: 8000,
};

export default config;
