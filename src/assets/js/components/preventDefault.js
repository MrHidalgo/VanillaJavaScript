export default function PreventDefault() {
  const link = document.querySelectorAll('a');

  for (const [index, value] of link.entries()) {
    value.addEventListener('click', (event_) => {
      if (value.getAttribute('href') === '#') {
        event_.preventDefault();
      }
    });
  }
}
