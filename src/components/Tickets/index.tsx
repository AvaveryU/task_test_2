import { FC } from 'react';
import styles from './index.module.css';
import { ITicket } from '../../utils/interfaces';
import { getFormatPrice, getFormatedDate, getTransferCount } from '../../utils/functions';
import cls from 'classnames'
import { airplane, currencies, logo } from '../../utils/constants';

interface ITickets {
    ticket: ITicket
    currentCurrency: string
}

const Tickets: FC<ITickets> = ({ ticket, currentCurrency }) => {

    return (
        <div className={styles.ticket}>
            <div className={styles.carrier}>
                <img className={styles.img} alt={`carrier_${ticket.carrier}`} src={logo}></img>
                <button className={styles.button}>Купить<br></br>за {getFormatPrice(ticket.price)}&nbsp;{currencies[currentCurrency]}</button>
            </div>
            <div className={styles.info}>
                <div className={styles.time}>
                    <p>{ticket.departure_time}</p>
                    <div className={styles.stops}>
                        <p className={styles.text}>{getTransferCount(ticket.stops)}</p>
                        <div className={styles.airplane}>
                            <div className={styles.line}></div>
                            <img className={styles.svg} src={airplane} alt={'airplane'}></img>
                        </div>
                    </div>
                    <p>{ticket.arrival_time}</p>
                </div>
                <div className={styles.block}>
                    <p className={styles.name}>{ticket.origin}, {ticket.origin_name}</p>
                    <p className={cls(styles.name, styles.common)}>{ticket.destination_name}, {ticket.destination}</p>
                    <p className={styles.date}>{getFormatedDate(ticket.departure_date)}</p>
                    <p className={cls(styles.date, styles.common)}>{getFormatedDate(ticket.arrival_date)}</p>
                </div>
            </div>
        </div>
    );
}

export default Tickets;
