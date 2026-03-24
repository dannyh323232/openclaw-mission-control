type RelaySurface = "discord" | "telegram";

type RelayReadiness = {
  discord: {
    configured: boolean;
    target: string;
    blocker: string;
  };
  telegram: {
    configured: boolean;
    target: string;
    blocker: string;
  };
};

function asText(value: string | undefined) {
  return (value ?? "").trim();
}

export function getRelayReadiness(): RelayReadiness {
  const discordWebhookUrl = asText(process.env.DISCORD_WEBHOOK_URL);
  const telegramBotToken = asText(process.env.TELEGRAM_BOT_TOKEN);
  const telegramChatId = asText(process.env.TELEGRAM_CHAT_ID);

  return {
    discord: {
      configured: Boolean(discordWebhookUrl),
      target: discordWebhookUrl ? new URL(discordWebhookUrl).pathname : "No webhook configured",
      blocker: discordWebhookUrl ? "Ready for outbound event posts" : "Missing DISCORD_WEBHOOK_URL",
    },
    telegram: {
      configured: Boolean(telegramBotToken && telegramChatId),
      target: telegramChatId || "No chat configured",
      blocker: telegramBotToken && telegramChatId ? "Ready for outbound owner messages" : "Missing TELEGRAM_BOT_TOKEN and/or TELEGRAM_CHAT_ID",
    },
  };
}

export async function sendRelayMessage(surface: RelaySurface, title: string, lines: string[]) {
  if (surface === "discord") {
    const webhookUrl = asText(process.env.DISCORD_WEBHOOK_URL);
    if (!webhookUrl) {
      throw new Error("DISCORD_WEBHOOK_URL is not configured.");
    }

    const content = [`**${title}**`, ...lines].join("\n");
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Discord relay failed (${response.status}).`);
    }

    return;
  }

  const botToken = asText(process.env.TELEGRAM_BOT_TOKEN);
  const chatId = asText(process.env.TELEGRAM_CHAT_ID);
  if (!botToken || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not configured.");
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: [`${title}`, ...lines].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram relay failed (${response.status}).`);
  }
}
