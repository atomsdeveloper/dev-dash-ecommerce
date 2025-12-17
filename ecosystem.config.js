module.exports = {
  apps: [
    {
      name: "admin",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        DATABASE_URL: "postgresql://ravie-database_owner:npg_Pf0rJbL9RiDU@ep-empty-union-a8mkrgpv-pooler.eastus2.azure.neon.tech/ravie-database?sslmo>"
      },
    },
  ],
};

