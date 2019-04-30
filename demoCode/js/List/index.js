export default function scrollList(opts) {
  if (window.scrollListInterval) {
    clearInterval(window.scrollListInterval);
  }
  const { data, selector } = opts;
  const total = data.length;
  if (total === 0) {
    return false;
  }
  let count = 1;
  data.sort(() => Math.random() > 0.5 ? -1 : 1);
  const listContent = total > 1 ? `<li>${data[0]}</li><li>${data[1]}</li>` : `<li>${data[0]}</li>`;
  const html = `<ul class="scroll" style="-webkit-transition:all 1s">${listContent}</ul>`;
  $(selector).html(html);
  const con = $(`${selector} .scroll`);
  function slider() {
    window.scrollListInterval = setInterval(() => {
      count += 1;
      if (count === total) {
        count = 0;
      }
      con.css('-webkit-transform', 'translate3d(0,-50%,0)');
      let timerCss = setTimeout(() => {
        $(con.children()[0]).remove();
        con.append(`<li>${data[count]}</li>`);
        con.css('-webkit-transition', 'none');
        con.css('-webkit-transform', 'translate3d(0,0,0)');
        timerCss = setTimeout(() => {
          clearTimeout(timerCss);
          con.css('-webkit-transition', 'all 1s');
        }, 100);
      }, 1000);
    }, 2000);
  }
  if (total > 1) {
    slider();
  }
  return true;
}
