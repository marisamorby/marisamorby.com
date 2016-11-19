import {shuffle} from '../utils';

const factContainer = document.getElementsByClassName('marisa-fact')[0];

const getDataFromApi = (endpoint) => {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest();

    client.open('GET', '/wp-json/wp/v2' + endpoint);
    client.send();

    client.onload = function handleAjaxLoad() {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(this.response));
      } else {
        reject(this.statusText);
      }
    };

    client.onerror = function handleAjaxError() {
      reject(this.statusText);
    };
  });
}

const showNextFact = (container, facts) => {

  const currentId = parseInt(container.dataset.postId);
  const otherFacts = facts.filter(fact => currentId !== parseInt(fact.id));
  const newFact = shuffle(otherFacts).pop();

  container.dataset.postId = newFact.id;
  container.querySelector('.marisa-fact__heading').textContent = `Marisa Fact #${newFact.fact_number}`;
  container.querySelector('.marisa-fact__fact').textContent = newFact.fact;

  container.classList.remove('marisa-fact--loading');
};

const marisaFact = () => {};
let marisaFacts = [];

if (factContainer) {
  getDataFromApi('/facts')
    .then(facts => {
      marisaFacts = facts.map(fact => {
        return {
          id: fact.id,
          fact_number: fact.acf.fact_number,
          fact: fact.acf.fact,
        }
      });
    });

  factContainer.addEventListener('click', event => {
    if (event.target.tagName.toLowerCase() === 'a') {
      event.preventDefault();

      // Enable the loading animation
      factContainer.classList.add('marisa-fact--loading');

      setTimeout(() => {
        showNextFact(factContainer, marisaFacts);
      }, 1000);
    }
  });
}

export default marisaFact;
