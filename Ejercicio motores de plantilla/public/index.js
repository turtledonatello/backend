const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let price = document.querySelector('#price').value;
  let name = document.querySelector('#name').value;
  let file = document.querySelector('#file');
  console.log(file.files[0]);
  fetch('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      price,
      file: file.files[0],
    }),
  }).then(({ status }) => {
    if (status === 200) {
      console.log(status);
      window.location.href = '/products';
    }
  });
});
