import dayjs from 'dayjs';

interface IDateFormat {
  current: IDateObject;
  date: IDateObject;
}

interface IDateObject {
  year: number;
  month: number;
  day: number;
  toDayFormat: string;
  yesterdayFormat: string;
  format: string;
  formatWithYear: string;
}

class FormatDate {
  private datetimeRegex = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/;
  private currentData = dayjs(new Date()).format('DD.MM.YYYY HH:mm');
  public date;

  constructor(public dataTime: string | Date) {
    this.date = dayjs(new Date(dataTime)).format('DD.MM.YYYY HH:mm');
  }

  getFormatDate() {
    const currentDataArr = this.datetimeRegex.exec(this.currentData) as RegExpExecArray;
    const dataArr = this.datetimeRegex.exec(this.date) as RegExpExecArray;
    const date: IDateFormat = {
      current: {
        year: parseFloat(currentDataArr[3]),
        month: parseFloat(currentDataArr[2]),
        day: parseFloat(currentDataArr[1]),
        toDayFormat: `сегодня в ${currentDataArr[4]}:${currentDataArr[5]}`,
        yesterdayFormat: `вчера в ${currentDataArr[4]}:${currentDataArr[5]}`,
        format: `${currentDataArr[1]}.${currentDataArr[2]} в ${currentDataArr[4]}:${currentDataArr[5]}`,
        formatWithYear: this.currentData,
      },
      date: {
        year: parseFloat(dataArr[3]),
        month: parseFloat(dataArr[2]),
        day: parseFloat(dataArr[1]),
        toDayFormat: `сегодня в ${dataArr[4]}:${dataArr[5]}`,
        yesterdayFormat: `вчера в ${dataArr[4]}:${dataArr[5]}`,
        format: `${dataArr[1]}.${dataArr[2]} в ${dataArr[4]}:${dataArr[5]}`,
        formatWithYear: this.date,
      }
    };

    if (date.current.year === date.date.year) {
      if (date.current.day === date.date.day && date.current.month === date.date.month) {
        return date.date.toDayFormat;
      } else if ((date.current.day - 1) === date.date.day && date.current.month === date.date.month) {
        return date.date.yesterdayFormat;
      }

      return date.date.format;
    } else {
      return this.date;
    }
  }
}

export default FormatDate;