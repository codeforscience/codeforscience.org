btnHandler('.menu-btn', function(event){
  document.getElementById('menu').classList.toggle('open')
  event.target.classList.toggle('open');
  event.target.setAttribute('aria-expanded', 'true')
  if (document.querySelectorAll('.open').length) {
    setTimeout(function () {
      document.querySelectorAll('#menu a')[0].focus()
    },500) // slower than visibily hidden css transition
  }
});
