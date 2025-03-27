import pkg from 'whatsapp-web.js';

const { Client, LocalAuth } = pkg;

const client = new Client({ authStrategy: new LocalAuth() });
client.initialize();

export const sendMessage = async (req, res) => {
    const { phoneNumber, message, schedule } = req.body;

    if (!phoneNumber || !message) {
        return res.status(400).json({ error: "Phone number and message is required." });
    }

    try {
        await client.sendMessage(`${phoneNumber}@c.us`, message);
        return res.json({ success: true, message: "Message sent successfully." });
    } catch (error) {
        return res.status(500).json({ error: "Errow while sending message.", details: error });
    }
};
