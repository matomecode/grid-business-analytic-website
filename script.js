// Animate counters
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.count');

  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute('data-count');
      const count = +counter.innerText;
      const step = Math.ceil(target / 60);
      if (count < target) {
        counter.innerText = count + step;
        setTimeout(update, 30);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
});
