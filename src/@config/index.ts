/**
 * 1 secs = 1000 * 1
 * 5 secs = 1000 * 5
 * 1 minutes = 1000 * 60 * 1
 * 5 minutes = 1000 * 60 * 5
 */
const config = {
	baseUrl: import.meta.env.VITE_SHW_BASE_URL,
	httpTimeout: 1000 * 60 * 2,
	idleTimeout: 1000 * 60 * 10,
	promptBeforeIdleTimeOut: 1000 * 60 * 1,
};

export default config;
