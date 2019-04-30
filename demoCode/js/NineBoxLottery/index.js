/**
 * 九宫格抽奖动画
 *
 * selector 选择器 另需在selector的元素上增加 -index
 * index  需要转动到哪儿的索引
 */
export default function nineBoxLottery(selector, index, callBack) {
  const sort = [0, 1, 2, 4, 7, 6, 5, 3];
  const maxStep = (sort.length * 3) + Number(sort.indexOf(index));
  let current = 0; // 活动的索引
  let step = 0; // 记录移动步数

  function diff(x) {
    const y = ((36 * x * x) - (36 * x)) + 10;
    return y;
  }

  const square = () => {
    const during = step === 0 ? 0 : diff(step / maxStep) * 50;
    // console.log(during);
    const timer = setTimeout(() => {
      clearTimeout(timer);
      $(selector).removeClass('active');
      $(`${selector}-${sort[current]}`).addClass('active');
      current += 1;
      if (current === 8) {
        current = 0;
      }
      step += 1;
      // 转圈不到继续转圈
      if (step <= maxStep) {
        square();
      } else {
        setTimeout(() => {
          let num = 0;
          const max = 7;
          const interval = setInterval(() => {
            num += 1;
            if (num < max) {
              if (num % 2 === 0) {
                $(`${selector}-${sort[current - 1]}`).addClass('active');
              } else {
                $(selector).removeClass('active');
              }
            } else {
              window.clearInterval(interval);
              callBack && callBack();
            }
          }, 100);
        }, 1000);
      }
    }, during);
  };
  square();
}
