// import _ from 'lodash'
import './style.css'
// import icon from './test.jpeg'
import Print from './print';

function component() {
  const element = document.createElement('div')
  const btn = document.createElement('button');

  if (process.env.NODE_ENV !== 'development') {
    console.log('Looks like we are in development mode!');
  }
 

  // const { default: _ } = await import('lodash')
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('hello')

  // const img = new Image()
  // img.src = icon
  // element.appendChild(img)

  btn.innerHTML = 'Click me and check the console!';
  // btn.onclick = Print.bind(null, 'Hello webpack!');
  btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    const print = module.default;

    print();
  });

  element.appendChild(btn)

  return element
}

// component().then(el => {
//   document.body.appendChild(el)
// })
document.body.appendChild(component())

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => {
    console.log(
      "We retrieved some data! AND we're confident it will work on a variety of browser distributions."
    );
    console.log(json);
  })
  .catch((error) =>
    console.error('Something went wrong when fetching this data: ', error)
  );