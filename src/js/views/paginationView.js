import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.result__pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--pagination');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (curPage === 1 && numPages > 1) {
      return `
          <button data-goto="${
            curPage + 1
          }" class="btn--pagination btn--pagination--next">
            <i class="ph-arrow-right"></i>
            <span>Page ${curPage + 1}</span>
          </button>
      `;
    }

    if (curPage === numPages && numPages > 1) {
      return `
          <button data-goto="${
            curPage - 1
          }" class="btn--pagination btn--pagination--pre">
            <i class="ph-arrow-left"></i>
            <span>Page ${curPage - 1}</span>
          </button>
      `;
    }

    if (curPage < numPages) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--pagination btn--pagination--pre">
        <i class="ph-arrow-left"></i>
        <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${
        curPage + 1
      }" class="btn--pagination btn--pagination--next">
        <span>Page ${curPage + 1}</span>
        <i class="ph-arrow-right"></i>
      </button>
      `;
    }

    return '';
  }
}

export default new PaginationView();
