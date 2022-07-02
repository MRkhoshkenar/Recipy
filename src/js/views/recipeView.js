import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
          <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span> ${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--serving">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">serving</span>

            <div class="recipe__info-buttons">
              <button
                class="recipe__info-buttons__btn recipe__info-buttons__btn--decrease btn--update-servings" data-update-to="${
                  this._data.servings - 1
                }"
              >
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button
                class="recipe__info-buttons__btn recipe__info-buttons__btn--increase btn--update-servings" data-update-to="${
                  this._data.servings + 1
                }">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
              <svg class="recipe__info-icon">
                <use href="${icons}#icon-user"></use>
              </svg>
          </div>
          
          <button class="recipe__info-buttons__btn--bookmark btn--bookmark">
            <svg class="recipe__info-icon recipe__info-icon--bookmark">
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe Ingredients</h2>
          <ul class="recipe__ingredient__list">
            ${this._data.ingredients
              .map(this._generateMarkupIngredient)
              .join('')}
      
          </ul>
        </div>

        <div class="recipe__how-to-cook">
          <h2 class="heading--2">how to cook it</h2>
          <p>
            This recipe was carefully designed and tested by
            <span> ${
              this._data.publisher
            }</span>. Please check out directions at their
            website.
          </p>

          <a href="${
            this._data.sourceUrl
          }" class="recipe__how-to-cook__btn">direction &rarr;</a>
    `;
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ing.quantity ? new Fraction(ing.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>
    `;
  }
}

export default new RecipeView();
