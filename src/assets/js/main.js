import { loadSection } from './utilities/loadComponent.js';

document.addEventListener('DOMContentLoaded', () => {
  loadSection('#header', './template/components/header.html', undefined, () => {
    console.log('Header loaded callback');
  });
  loadSection('#footer', './template/components/footer.html', undefined, () => {
    console.log('Footer loaded callback');
  });
});
