const monthNamesBG = [
    'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
    'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
];

export const formatDateBG = (date) => {
    return `${date.getDate()} ${monthNamesBG[date.getMonth()]}`;
};

export const getDeliveryDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tomorrow;
};

export const getDeliveryDate2 = (deliveryDate) => {
    const date = new Date(deliveryDate);
    date.setDate(date.getDate() + 1);

    return date;
};