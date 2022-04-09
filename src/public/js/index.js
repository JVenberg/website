(() => {
  window.addEventListener('load', init);

  await function init() {
    let res = await fetch('api')
    console.log(await res.text());
  }
})();