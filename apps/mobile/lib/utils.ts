import dayjs from "dayjs";

export const currencyFormat = (val: number, currency = "USD") => {
    try {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }).format(val);
    } catch (error) {
        console.error(error);
        return val.toFixed(2);
    }
};

export const formatDate = (date: string, format = "MMM DD, YYYY") => {
    return dayjs(date).format(format);
};

export const formatStatusLabel = (value?: string): string => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};