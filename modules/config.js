require('dotenv').config();


var prefix = process.env.DB_PREFIX || "DB_"
function getDBEnv(envName) {
	return process.env[prefix + envName];
}

module.exports = {
	https: {
		host: process.env.HTTPS_HOST || '192.168.110.12',
		enabled: process.env.HTTPS_ENABLE || false,
		keyPath: process.env.HTTPS_KEY_PATH || "cert/key.pem",
		certPath: process.env.HTTPS_CERT_PATH || "cert/cert.pem",
		port: process.env.HTTPS_PORT || 443,
	},
	db: {
		host: getDBEnv("HOST"),
		user: getDBEnv("USER"),
		password: getDBEnv("PASSWORD"),
		database: getDBEnv("DB"),
		connnectionLimit: getDBEnv("CONNECION_LIMIT") || 10,
	},
	port: process.env.HTTP_PORT || 3000,
	socketPort: process.env.SOCKET_PORT || 3100,
	googleOauth: {
		clientId: process.env.GOOGLEOAUTH_CLIENT_ID,
		clientSecret: process.env.GOOGLEOAUTH_CLIENT_SECRET
	},
	serverName: process.env.SERVERNAME,
	session: {
		secret: process.env.SESSION_SECRET
	},
	no_network: process.env.NO_NETWORK || false,
	debug: true
}