import Gesture from 'rc-gesture';
import { setPxStyle, setTransition } from '../../utils/tool';
import './index.less';

// 显示上月左侧显示的天数
const pastMonthLeft = {
  0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5
};
const nowDate = new Date();
const todayDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());

// 按天数获取日期
function getDate(date, num) {
  const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + num);
  return newDate;
}

// 获取本周一日期
function getFirstDateInWeek(date) {
  const day = date.getDay();
  const weekNum = day === 0 ? 6 : day - 1;
  return getDate(date, weekNum * -1);
}

/**
 * 是否是闰年
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const currentDate = props.currentDate || new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    const firstDateInWeek = getFirstDateInWeek(currentDate); // 本周一的日期
    this.monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 每月天数
    this.monthDays[1] = isLeapYear(year) ? 29 : 28;
    const selectedDate = new Date(year, month, date);
    this.dayWrapperRef = null;
    this.changeRef = null;
    this.state = {
      value: this.props.value,
      weeks: props.weeks || ['一', '二', '三', '四', '五', '六', '日'],
      currentDate,
      year,
      month,
      date,
      firstDateInWeek,
      selectedDate,
      mode: 'week'
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  getPrevMonth() {
    let month = this.state.month - 1;
    let year = this.state.year;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
    return { year, month };
  }
  getNextMonth() {
    let month = this.state.month + 1;
    let year = this.state.year;
    if (month > 11) {
      month = 0;
      year += 1;
    }
    return { year, month };
  }

  changeMode = () => {
    const mode = this.state.mode === 'month' ? 'week' : 'month';
    this.setState({ mode });
  }

  prev() {
    setTransition(this.dayWrapperRef, '0.6s');
    setPxStyle(this.dayWrapperRef, 33.3333, '%');
    setTimeout(() => {
      if (this.state.mode === 'month') {
        const { year, month } = this.getPrevMonth();
        const firstDateInWeek = getFirstDateInWeek(new Date(year, month, 1));
        this.setState({ year, month, firstDateInWeek });
      } else {
        const firstDateInWeek = getDate(this.state.firstDateInWeek, -7);
        const year = firstDateInWeek.getFullYear();
        const month = firstDateInWeek.getMonth();
        this.setState({ year, month, firstDateInWeek });
      }
      setTransition(this.dayWrapperRef, '0s');
      setPxStyle(this.dayWrapperRef, 0);
    }, 600);
  }
  next() {
    setTransition(this.dayWrapperRef, '0.5s');
    setPxStyle(this.dayWrapperRef, -33.3333, '%');
    setTimeout(() => {
      if (this.state.mode === 'month') {
        const { year, month } = this.getNextMonth();
        const firstDateInWeek = getFirstDateInWeek(new Date(year, month, 1));
        this.setState({ year, month, firstDateInWeek });
      } else {
        const firstDateInWeek = getDate(this.state.firstDateInWeek, 7);
        const year = firstDateInWeek.getFullYear();
        const month = firstDateInWeek.getMonth();
        this.setState({ year, month, firstDateInWeek });
      }
      setTransition(this.dayWrapperRef, '0s');
      setPxStyle(this.dayWrapperRef, 0);
    }, 600);
  }

  selectDate(selectedDate) {
    const todayTime = todayDate.getTime();
    if (todayTime <= selectedDate.getTime()) {
      const firstDateInWeek = getFirstDateInWeek(selectedDate);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      this.setState({ year, month, selectedDate, firstDateInWeek });
      this.props.onChange && this.props.onChange(selectedDate);
    }
  }

  renderDayInMonth = (year, month) => {
    const monthDay = this.monthDays[month]; // 本月天数
    const firstDayInMonth = new Date(year, month, 1).getDay();
    const pastMonthDay = pastMonthLeft[firstDayInMonth]; // 上月空白天数
    const todayTime = todayDate.getTime();
    const selectTime = this.state.selectedDate.getTime();
    const daysEl = [];
    for (let i = 0; i < pastMonthDay; i += 1) {
      daysEl.push(<li key={`emptyday-${i}`} className="">&nbsp;</li>);
    }
    for (let i = 1; i <= monthDay; i += 1) {
      let dayCls = 'tinker-calendar-day ';
      const time = new Date(year, month, i).getTime();
      if (time === todayTime) {
        dayCls += 'today';
      } else if (time < todayTime) {
        dayCls += 'past';
      }
      if (time === selectTime) {
        dayCls += ' selected';
      }
      daysEl.push(
        <li
          key={`tinker-calendar-dayInMonth-${year}-${month}-${i}`}
          className={dayCls}
        >
          <span onClick={() => this.selectDate(new Date(year, month, i))}>{i}</span>
        </li>
      );
    }
    return daysEl;
  }

  renderByMonth = () => {
    const prev = this.getPrevMonth();
    const next = this.getNextMonth();
    return (
      <Gesture
        direction="horizontal"
        onSwipeLeft={() => this.next()}
        onSwipeRight={() => this.prev()}
      >
        <div className="tinker-calendar-day-wrapper" ref={div => this.dayWrapperRef = div}>
          <ul className="tinker-calendar-day-inner">
            {this.renderDayInMonth(prev.year, prev.month)}
          </ul>
          <ul className="tinker-calendar-day-inner">
            {this.renderDayInMonth(this.state.year, this.state.month)}
          </ul>
          <ul className="tinker-calendar-day-inner">
            {this.renderDayInMonth(next.year, next.month)}
          </ul>
        </div>
      </Gesture>
    );
  }

  renderDayInWeek = (firstDate) => {
    const todayTime = todayDate.getTime();
    const selectTime = this.state.selectedDate.getTime();
    const daysEl = [];
    for (let i = 0; i < 7; i += 1) {
      let dayCls = 'tinker-calendar-day ';
      const date = getDate(firstDate, i);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const time = date.getTime();
      if (time === todayTime) {
        dayCls += 'today';
      } else if (time < todayTime) {
        dayCls += 'past';
      }
      if (time === selectTime) {
        dayCls += ' selected';
      }
      daysEl.push(
        <li
          key={`tinker-calendar-dayInWeek-${year}-${month + 1}-${day}`}
          className={dayCls}
        >
          <span onClick={() => this.selectDate(new Date(year, month, day))}>{day}</span>
        </li>
      );
    }
    return daysEl;
  }

  renderByWeek = () => (
    <Gesture
      direction="horizontal"
      onSwipeLeft={() => this.next()}
      onSwipeRight={() => this.prev()}
    >
      <div className="tinker-calendar-day-wrapper" ref={div => this.dayWrapperRef = div}>
        <ul className="tinker-calendar-day-inner">
          {this.renderDayInWeek(getDate(this.state.firstDateInWeek, -7))}
        </ul>
        <ul className="tinker-calendar-day-inner">
          {this.renderDayInWeek(this.state.firstDateInWeek)}
        </ul>
        <ul className="tinker-calendar-day-inner">
          {this.renderDayInWeek(getDate(this.state.firstDateInWeek, 7))}
        </ul>
      </div>
    </Gesture>
  )

  render() {
    const realMonth = this.state.month + 1;
    const mode = this.state.mode;
    return (
      <div className="tinker-calendar">
        <div className="tinker-calendar-title">
          <span className="tinker-calendar-left-btn" onClick={() => this.prev()}>&lt;</span>
          <span className="tinker-calendar-title-content">{this.state.year}年{realMonth}月</span>
          <span className="tinker-calendar-right-btn" onClick={() => this.next()}>&gt;</span>
        </div>
        <div className={`tinker-calendar-content ${mode}`}>
          <ul className="tinker-calendar-week-wrapper">
            {
              this.state.weeks.map((item, index) => (
                <li key={`tinker-calendar-week-${index}`} className="tinker-calendar-week">{item}</li>
              ))
            }
          </ul>
          {mode === 'month' ? this.renderByMonth() : this.renderByWeek()}
        </div>
        <div
          className={`tinker-calendar-change ${mode}`}
          onClick={() => this.changeMode()}
          ref={div => this.changeRef = div}
        />
      </div>
    );
  }
}

export default Calendar;
