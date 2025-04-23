document.querySelector('#contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
    };
  
    const res = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  
    const result = await res.json();
    alert(result.message || 'Errore');
  });