import moment from 'moment';


export function formatPrice(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

export function formatDate(date, format = 'MMMM D, YYYY') {
    return moment(date).format(format);
}

export function timeAgo(date) {
    return moment(date).fromNow();
}