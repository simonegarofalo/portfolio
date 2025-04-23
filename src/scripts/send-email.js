import mailjet from 'node-mailjet';

const mj = mailjet.connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

export async function handler(event) {
  const { email, name } = JSON.parse(event.body);

  const html = `<h1>Ciao ${name}!</h1><p>Grazie per il tuo messaggio.</p>`;

  try {
    await mj.post('send', { version: 'v3.1' }).request({
      Messages: [{
        From: { Email: 'simonegarofalo96@email.com', Name: 'Simone Garofalo' },
        To: [{ Email: email, Name: name }],
        Subject: 'Grazie per aver candidato il tuo progetto!',
        TextPart: `Ciao ${name}, grazie!`,
        HTMLPart: html,
      }],
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}