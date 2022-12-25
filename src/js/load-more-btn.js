export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.animation = document.querySelector('.loading');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.button.textContent = 'Load more';
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.button.textContent = 'Loading...';
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
    this.refs.animation.classList.add('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
    // this.refs.animation.classList.remove('is-hidden');
  }
}
