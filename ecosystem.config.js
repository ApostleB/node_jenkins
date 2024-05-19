const dotenv = require('dotenv');
dotenv.config();

const isProduction = process.env.NODE_ENV === 'prod';

module.exports = {
  apps: [
    {
      name: 'NODE CI/CD Jenkins Build',
      script: './src/index.js',
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        // 공통 환경 변수들을 여기에 추가할 수 있습니다
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 8000,
        DB_HOST: process.env.PROD_DB_HOST,
        DB_USER: process.env.PROD_DB_USER,
        DB_PASS: process.env.PROD_DB_PASS,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: process.env.PORT || 3000,
        DB_HOST: process.env.DEV_DB_HOST,
        DB_USER: process.env.DEV_DB_USER,
        DB_PASS: process.env.DEV_DB_PASS,
      }
    }
  ],
};

const appConfig = module.exports.apps[0];

if (isProduction) {
  Object.assign(appConfig.env, appConfig.env_production);
} else {
  Object.assign(appConfig.env, appConfig.env_development);
}

