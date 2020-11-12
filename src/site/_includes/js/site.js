btnHandler('.menu-btn', function(event){
  if (event.target.classList.contains('open')) {
    document.getElementById('menu').classList.remove('open')
    event.target.classList.remove('open')
    event.target.setAttribute('aria-expanded', 'false')
  } else {
    document.getElementById('menu').classList.add('open')
    event.target.classList.add('open')
    event.target.setAttribute('aria-expanded', 'true')
    setTimeout(function () {
      document.querySelectorAll('#menu a')[0].focus()
    },500) // slower than visibily hidden css transition
  }
});

window.addEventListener('scroll', function() {
  if (!document.querySelectorAll('.open').length) return
  // menu open
  var elementTarget = document.getElementById('menu')
  if (window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight)) {
    document.querySelectorAll('.menu-btn.open').forEach(e => e.classList.remove('open'))
  } else {
    document.querySelectorAll('.menu-btn').forEach(e => e.classList.add('open'))
  }
})
