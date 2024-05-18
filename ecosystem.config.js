const dotenv = require('dotenv');
dotenv.config();

const isProduction = process.env.NODE_ENV === 'prod';

module.exports = {
  apps: [
    {
      name: 'NODE CI/CD',
      script: './src/app.js',
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

  // 배포 설정 (선택 사항)
  deploy: {
    production: {
      user: 'root',
      host: '222.109.39.10',
      ref: 'origin/main',
      repo: 'git@github.com:ApostleB/node_jenkins.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    development: {
      user: 'root',
      host: '2222.109.39.10',
      ref: 'origin/dev',
      repo: 'git@github.com:ApostleB/node_jenkins.git',
      path: '/var/www/development',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env development'
    }
  }
};

// 설정을 동적으로 변경하는 부분
const appConfig = module.exports.apps[0];

if (isProduction) {
  Object.assign(appConfig.env, appConfig.env_production);
} else {
  Object.assign(appConfig.env, appConfig.env_development);
}

