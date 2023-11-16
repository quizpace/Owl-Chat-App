const line = require("@line/bot-sdk");

const config = {
  channelAccessToken:
    "zfVM2jnCFBrAYUljtJb34GOjnqTztb2a1famWAn2D52yZWaFarb/4SbgLKPEM5x2ZiFcLKTPAiWmAcY2mRAtqeiix7ucAj0YtzPLl1ZMKMBDBVS7dOD1rSDl+kNtQVIl7Qntt8MiAB4gmWe2kyPRaQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "218db250615f177d131069038602063b",
};

const client = new line.Client(config);

const stickerMessage = {
  type: "sticker",
  packageId: "446", // Replace with your sticker package ID
  stickerId: "1988", // Replace with your sticker ID
};

const userId = "RECIPIENT_USER_ID"; // Replace with the recipient's LINE user ID

client
  .pushMessage(userId, stickerMessage)
  .then(() => {
    console.log("Sticker sent!");
  })
  .catch((err) => {
    console.error(err);
  });

const sendStickerButton = document.getElementById("sendStickerButton"); // Replace with your button's actual ID

sendStickerButton.addEventListener("click", async () => {
  const stickerData = {
    packageId: "446", // Replace with your sticker package ID
    stickerId: "1988", // Replace with your sticker ID
    // userId: 'RECIPIENT_USER_ID', // Replace with the recipient's LINE user ID
  };

  try {
    const response = await fetch(
      "http://your-json-server-url.com/sendSticker",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stickerData),
      }
    );

    if (response.ok) {
      console.log("Sticker sent to server successfully!");
      // Handle success in sending sticker to server
    } else {
      console.error("Failed to send sticker to server.");
      // Handle failure in sending sticker to server
    }
  } catch (error) {
    console.error("Error sending sticker to server:", error);
    // Handle any error that occurs during the request
  }
});
