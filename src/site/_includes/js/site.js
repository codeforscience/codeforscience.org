btnHandler('.menu-btn', function(event){
  document.getElementById('menu').classList.toggle('open')
  // event.target.classList.toggle('open');
  event.target.setAttribute('aria-expanded', 'true')
  console.log('👋 Oh, hello there!');
});
