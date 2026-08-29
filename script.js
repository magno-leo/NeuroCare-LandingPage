window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  const containerLinks = document.getElementById('container-opcoes');
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
    containerLinks.style.boxShadow ="0 0";
  } else {
    header.classList.remove('scrolled');
    containerLinks.style.boxShadow ="0px 4px 10px rgba(0, 0, 0, 0.2)";
  }
});
