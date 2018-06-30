document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('form').onsubmit = function () {

    request = new XMLHttpRequest();
    request.open('POST','/convert');
    const currency = document.querySelector('#currency').value;
    const addon = new FormData();
    addon.append('currency',currency);
    request.send(addon);

    request.onload = function () {
      const data = JSON.parse(this.responseText);
      console.log(data);
      if(data['success']){
        const rate = data['rate'];
        const output = `1 EUR is equal to ${rate} ${currency}`;
        document.querySelector('#output').innerHTML = output;
      }
      else {
        const error = 'Currency not found';
        document.querySelector('#output').innerHTML = error;
      }
    }


    return false;
  }
});
