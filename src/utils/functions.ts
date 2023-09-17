import moment from 'moment';
import { ITicket } from './interfaces';
import { allStops } from './constants';
require('moment/locale/ru');

export function getFormatPrice(value: number, currency: number): string {
    const sumWithCurrency = Math.floor(value / currency);
    const num = sumWithCurrency.toString();
    let numberWithSpace = '';
    for (let i = 0; i < num.length; i++) {
        if ((num.length - i) % 3 === 0 && i !== 0) {
            numberWithSpace += ' ';
        }
        numberWithSpace += num[i];
    }
    return numberWithSpace;
}

export const getFormatedDate = (date: string) => {
    const dateFormattedMoment: moment.Moment = moment(date, 'DD.MM.YY');
    const formattedDate = dateFormattedMoment.format('DD MMM YYYY').replace('.', '');
    const formattedDaySplit = dateFormattedMoment.format('dd').split('');
    const formattedDay = formattedDaySplit[0].toUpperCase() + formattedDaySplit[1]
    return formattedDate + ', ' + formattedDay;
}

export const getTransferCount = (stops: number) => {
    return stops === allStops ? 'Все' :
        stops > 1 ? stops > 4 ? `${stops} пересадок` : `${stops} пересадки` : stops === 0 ? 'Без пересадок' : `${stops} пересадка`
}

export const setFiltersForStops = (tickets: Array<ITicket>) => {
    const result = tickets.reduce((acc: Array<number>, curr) => {
        !acc.includes(curr.stops) && acc.push(curr.stops);
        return acc;
    }, []);
    return result.sort()
}