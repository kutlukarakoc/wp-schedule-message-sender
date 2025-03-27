import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const client = new Client({ authStrategy: new LocalAuth() });

client.on("qr", (qr) => {
    console.log("QR kodunu tarat:");
    qrcode.generate(qr, { small: true });
});

client.initialize();

export const getQR = (req, res) => {
    client.on("qr", (qr) => {
        res.json({ qr });
    });
};
