import { FC, useLayoutEffect, useState } from 'react';
import styles from './index.module.css';
import data from '../../data/tickets.json'
import Tickets from '../Tickets';
import { ITicket } from '../../utils/interfaces';
import { currencies, allStops } from '../../utils/constants';
import cls from 'classnames'
import { getTransferCount, setFiltersForStops } from '../../utils/functions';

const Content: FC = () => {
    const [selectedTickets, setSelectedTickets] = useState<Array<ITicket>>([]);
    const [currentCurrency, setCurrentCurrency] = useState<string>(Object.keys(currencies)[0]);
    const [selectedFilters] = useState<Set<number>>(new Set<number>());
    const [filters, seFilters] = useState<Array<number>>([]);

    useLayoutEffect(() => {
        seFilters([allStops, ...setFiltersForStops(data.tickets)]);
        const sortedTickets = data.tickets.sort((a: ITicket, b: ITicket) => {
            const aDate = new Date(`${a.departure_date} ${a.departure_time}`);
            const bDate = new Date(`${b.departure_date} ${b.departure_time}`);
            return aDate.getTime() - bDate.getTime();
        });
        setSelectedTickets(sortedTickets)
    }, []);

    const onClickCurrency = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setCurrentCurrency(e.currentTarget.value)
    }

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!e.currentTarget) return

        const input = e.currentTarget.firstChild as HTMLInputElement;
        const valueInput = Number(input.value);

        input.checked = !input.checked;
        input.checked ? selectedFilters.add(valueInput) : selectedFilters.delete(valueInput);

        if (valueInput === allStops) {
            for (let point in filters) {
                input.checked ? selectedFilters.add(filters[point]) : selectedFilters.delete(filters[point])
            }
            const inputs = Array.from(document.querySelectorAll('#stops'), point => point.firstChild);
            for (let point in inputs) {
                (inputs[Number(point)] as HTMLInputElement).checked = input.checked
            }
            setSelectedTickets(data.tickets)
        } else {
            if (selectedFilters.size === filters.length - 1) {
                input.checked ? selectedFilters.add(allStops) : selectedFilters.delete(allStops);
                (document.querySelector(`#stop_${allStops}`) as HTMLInputElement).checked = input.checked;
            }
            const filteredTickets = selectedFilters.size > 0 ? data.tickets.filter((i) => selectedFilters.has(i.stops)) : data.tickets;
            setSelectedTickets(filteredTickets);
        }
    }

    return (
        <div className={styles.content} >
            <div className={styles.info}>
                <h2 className={styles.title}>ВАЛЮТА</h2>
                <div className={styles.currencies}>
                    {Object.keys(currencies).map(currency =>
                        <button
                            key={currency}
                            className={cls(styles.button, currentCurrency === currency && styles.button__active)}
                            onClick={(e) => onClickCurrency(e)}
                            value={currency}
                            children={currency}
                        />
                    )}
                </div>
                <h2 className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
                <div className={styles.stops} >
                    {filters.map(stop =>
                        <div
                            className={styles.checkbox}
                            key={`stop_${stop}`}
                            onClick={onClick}
                            id={'stops'}>
                            <input className={styles.input} type="checkbox" id={`stop_${stop}`} value={stop} />
                            <label className={styles.label} htmlFor={`stop_${stop}`}>{getTransferCount(stop)}</label>
                            <p className={styles.text}>ТОЛЬКО</p>
                        </div>)}
                </div>
            </div>
            <div className={styles.tickets}>
                {selectedTickets.map((ticket, index) => (
                    <Tickets ticket={ticket} key={index} currentCurrency={currentCurrency} />
                ))}
            </div>
        </div>
    );
}

export default Content;
