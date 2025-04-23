const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);
  
  exports.handler = async (event) => {
    const { email, name } = JSON.parse(event.body);
  
    const htmlContent = `
      <html>
        <body>
          <h1>Ciao ${name},</h1>
          <p>Grazie per averci contattato! Ti risponderemo presto.</p>
        </body>
      </html>
    `;
  
    try {
      await mailjet.post("send", { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: "simonegarofalo96@gmail.com",
              Name: "Simone Garofalo",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: "Grazie per la tua candidatura!",
            TextPart: `Ciao ${name}, grazie per aver inviato la tua candidatura.`,
            HTMLPart: htmlContent,
          },
        ],
      });
  
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "Email inviata!" }),
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Errore durante l'invio." }),
      };
    }
  };