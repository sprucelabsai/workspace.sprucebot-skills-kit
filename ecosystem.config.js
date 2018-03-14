module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'SB Skillskit',
      cwd: './packages/sprucebot-skills-kit',
      script: 'npm',
      args: 'run local',
      watch: [
          'server/**'
      ]
    }
  ]
}
