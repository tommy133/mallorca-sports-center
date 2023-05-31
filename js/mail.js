document.getElementById('contactForm').addEventListener('submit', function(event) {
   event.preventDefault();

   const serviceID = 'default_service';
   const templateID = 'template_z3hjcjx';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      alert('Missatge enviat correctament');
    }, (err) => {
      alert(JSON.stringify(err));
    });
});