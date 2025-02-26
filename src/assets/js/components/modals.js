const Modal = (() => {
  const SELECTORS = {
    modal: '.c-modal',
    modalTrigger: '[c-modal-js]',
    modalClose: '[c-modal-close-js]',
    overlay: '.c-modal__overlay',
    modalContainer: '.c-modal__container',
    body: 'body'
  };

  const CLASSES = {
    show: 'is-show',
    animate: 'is-animate',
    blockScroll: 'is-blockscroll'
  };

  function closeAllModals() {
    const modals = document.querySelectorAll(SELECTORS.modal);
    const overlay = document.querySelector(SELECTORS.overlay);

    if (overlay) overlay.remove();
    document.body.classList.remove(CLASSES.blockScroll);

    for (const modal of modals) {
      modal.classList.remove(CLASSES.animate);
      setTimeout(() => modal.classList.remove(CLASSES.show), 200);
    }
  }

  function openModal(modal, isNested) {
    if (!modal) return;

    if (!isNested) closeAllModals();

    modal.classList.add(CLASSES.show);
    setTimeout(() => modal.classList.add(CLASSES.animate), 50);

    let overlay = document.querySelector(SELECTORS.overlay);
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.classList.add('c-modal__overlay');
      document.body.append(overlay);
    }

    document.body.classList.add(CLASSES.blockScroll);
  }

  function closeModal(modal, isNested = false) {
    if (!modal) return;

    modal.classList.remove(CLASSES.animate);
    setTimeout(() => modal.classList.remove(CLASSES.show), 200);

    if (!isNested) closeAllModals();
  }

  function handleClick(event) {
    const trigger = event.target.closest(SELECTORS.modalTrigger);
    if (trigger) {
      const modalID = trigger.dataset.modalId;
      const modal = document.getElementById(modalID);
      const isNested = trigger.dataset.modalInner === 'true';

      openModal(modal, isNested);
      return;
    }

    if (event.target.classList.contains(SELECTORS.modalContainer.slice(1))) {
      closeAllModals();
      return;
    }

    if (event.target.closest(SELECTORS.modalClose)) {
      const modal = event.target.closest(SELECTORS.modal);
      const isNested =
        event.target
          .closest(SELECTORS.modalClose)
          ?.getAttribute('data-modal-inner') === 'true';
      closeModal(modal, isNested);
      return;
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') closeAllModals();
  }

  function init() {
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);

    for (const modal of document.querySelectorAll(SELECTORS.modal)) {
      modal.style.display = 'block';
    }
  }

  return {
    init,
    openModal,
    closeAllModals
  };
})();

export default Modal;
