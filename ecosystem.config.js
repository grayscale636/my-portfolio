// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "my-portfolio",
      script: "./.next/standalone/server.js", // pastikan path ini benar
      env: {
        DIFY_API_KEY: "app-FCrFINfCS02AwibizhYMxgPx",
        DIFY_API_URL: "https://dify.irmlabs.my.id/v1/chat-messages",
        DIFY_DOMAIN_URL: "https://dify.irmlabs.my.id/v1/chat-messages",
        PORT: 3030
      }
    }
  ]
}
