module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'SB Skillskit',
      cwd: './packages/sprucebot-skills-kit',
      script: 'yarn',
      args: process.env.NODE_ENV === 'production' ? 'run start' : 'run local',
      watch: [
          'server/**'
      ]
    }
  ]
}
