// Telegram Bot & Order Notification Helper

const STORAGE_KEY = "velora_telegram_config";

export const DEFAULT_TELEGRAM_CONFIG = {
  botToken: "9161184806:AAEvY4PIfcKN39VtAdmFiCbSRG483MvSy7Y",
  chatId: "1116505751",
  storeUsername: "rithystore" // t.me/rithystore
};

export const getTelegramConfig = () => {
  let config = {
    botToken: DEFAULT_TELEGRAM_CONFIG.botToken || import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "",
    chatId: DEFAULT_TELEGRAM_CONFIG.chatId || import.meta.env.VITE_TELEGRAM_CHAT_ID || "",
    storeUsername: DEFAULT_TELEGRAM_CONFIG.storeUsername || import.meta.env.VITE_TELEGRAM_USERNAME || "rithystore"
  };

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          botToken: parsed.botToken?.trim() ? parsed.botToken.trim() : config.botToken,
          chatId: parsed.chatId?.trim() ? parsed.chatId.trim() : config.chatId,
          storeUsername: parsed.storeUsername?.trim() ? parsed.storeUsername.trim() : config.storeUsername
        };
      }
    } catch (e) {
      console.warn("Could not read telegram config", e);
    }
  }
  return config;
};

export const saveTelegramConfig = (config) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      return true;
    } catch (e) {
      console.error("Failed to save telegram config", e);
    }
  }
  return false;
};

/**
 * Format order into a clean Telegram Markdown message
 */
export const formatTelegramOrderMessage = (orderData) => {
  const itemsText = (orderData.items || [])
    .map((item, idx) => `  ${idx + 1}. *${item.name}* (Qty: ${item.quantity}, $${Number(item.price).toFixed(2)})`)
    .join("\n") || "  • Custom Order";

  const totalUSD = Number(orderData.total || 0).toFixed(2);
  const totalKHR = Math.round(Number(orderData.total || 0) * 4100).toLocaleString("en-US");

  return `🛍️ *NEW ORDER NOTIFICATION — VELORA STORE*
━━━━━━━━━━━━━━━━━━━━
📦 *Order ID:* \`#${orderData.orderNumber}\`
👤 *Customer:* ${orderData.customerName}
📞 *Phone:* ${orderData.phone || "Not specified"}
✉️ *Email:* ${orderData.email || "N/A"}
📍 *Address:* ${orderData.address || "Phnom Penh"}
🚚 *Shipping:* ${orderData.shippingMethod || "Standard Delivery"}
💳 *Payment:* ${orderData.paymentMethod || "ABA Pay / COD"}
━━━━━━━━━━━━━━━━━━━━
🛒 *Ordered Items:*
${itemsText}
━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL AMOUNT:* *$${totalUSD} USD* (≈ ${totalKHR} ៛)
⏰ *Order Time:* ${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
━━━━━━━━━━━━━━━━━━━━
✅ *Status:* Order Confirmed & Processing`;
};

/**
 * Send automated message via Telegram Bot API
 */
export const sendTelegramOrderAlert = async (orderData) => {
  const config = getTelegramConfig();
  const botToken = config.botToken || import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = config.chatId || import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram Bot token or chat ID is not configured yet.");
    return { success: false, reason: "missing_credentials" };
  }

  try {
    const text = formatTelegramOrderMessage(orderData);
    const url = `https://api.telegram.org/bot${botToken.trim()}/sendMessage`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: text,
        parse_mode: "Markdown"
      })
    });

    const data = await res.json();
    return { success: data.ok, data };
  } catch (error) {
    console.error("Telegram Bot notification failed:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Generate a direct t.me link for the customer to confirm their order on Telegram
 */
export const getDirectTelegramOrderUrl = (orderData) => {
  const config = getTelegramConfig();
  const username = (config.storeUsername || "rithystore").replace(/^@/, "");

  const message = `Hello VELORA Store! 👋
I have just placed an order on your website.

📦 Order ID: #${orderData.orderNumber}
👤 Name: ${orderData.customerName}
📍 Address: ${orderData.address}
💰 Total: $${Number(orderData.total || 0).toFixed(2)}

Please find my payment slip / confirmation attached. Thank you!`;

  return `https://t.me/${username}?text=${encodeURIComponent(message)}`;
};

/**
 * Test Bot connection
 */
export const testTelegramBot = async (botToken, chatId) => {
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken.trim()}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: "🔔 *Telegram Bot Connected Successfully!*\n\nYour VELORA Store order alert bot is active and ready to receive real-time notifications.",
        parse_mode: "Markdown"
      })
    });
    const data = await res.json();
    return { success: data.ok, data };
  } catch (e) {
    return { success: false, error: e.message };
  }
};
