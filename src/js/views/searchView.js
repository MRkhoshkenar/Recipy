class SearchView {
  #parentElement = document.querySelector('.header__search-box');

  getQuery() {
    const query = this.#parentElement.querySelector(
      '.header__search-box__field'
    ).value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElement.querySelector('.header__search-box__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
