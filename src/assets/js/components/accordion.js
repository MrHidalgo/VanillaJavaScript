export default function Accordion() {
  const accordionContainer = document.querySelector(
    '.faq__accordion-container'
  );

  if (!accordionContainer) return;

  const accordionNodes = accordionContainer.querySelectorAll(
    '.faq__accordion-node'
  );

  for (const node of accordionNodes) {
    const toggle = node.querySelector('.faq__accordion-toggle');

    toggle.addEventListener('click', (e) => {
      e.preventDefault();

      for (const n of accordionNodes) {
        if (n !== node) {
          n.classList.remove('is-active');
          const otherContent = n.querySelector('.faq__accordion-content');
          if (otherContent) {
            otherContent.style.maxHeight = null;
          }
        }
      }

      const content = node.querySelector('.faq__accordion-content');
      if (content) {
        if (node.classList.contains('is-active')) {
          node.classList.remove('is-active');
          content.style.maxHeight = null;
        } else {
          node.classList.add('is-active');
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      }
    });
  }
}
