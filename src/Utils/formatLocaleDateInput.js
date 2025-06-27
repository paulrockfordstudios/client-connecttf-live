// Formats a date locale for a text inupt.

export const formatLocaleDateInput = (e, dateValue, locale) => {
    const inputValue = e.target.value;
    const format = locale?.dateFormat.replace("_", ".") || "mm/dd/yyyy";
    const specChar = format.match(/[^a-zA-Z0-9\s]/g).join('')[0]; 
    const slice = format[(0 || 1)] === "y" ? locale.code === "kyp" ? [5,8] : [4,7] : [2,5]; 
    // Remove non-numeric characters
    let numV = inputValue.replace(/\D/g, '');
    // Format locale for input
    if (locale.code === "kyp" && numV.length === 1) {numV = specChar + numV};
    if (numV.length >= slice[0]) {numV = numV.slice(0, slice[0]) + specChar + numV.slice(slice[0])};
    if (numV.length >= slice[1]) {numV = numV.slice(0, slice[1]) + specChar + numV.slice(slice[1], format.length - 1)}; 
    if (numV.length === 10 && format.length === 11 && locale.code !== "kyp") {numV = numV + specChar};
    // Check if deleting and next character is the special character
    if (inputValue.length < dateValue?.length && inputValue.length > 0) { 
        if (numV[inputValue.length - 1] === specChar || 
        numV[inputValue.length] === specChar) {
            // Delete the special character as well
            numV = inputValue.slice(0, -1);
            return numV;
        }
    } else {
        return numV;
    }
    return numV;
};

export const formatLocaleSelectedDate = (date, locale) => {
    let formattedDate = "";
    const dayNum = `${date.day.toString().padStart(2, "0")}`;
    const month = `${(date.month + 1).toString().padStart(2, "0")}`;
    const year = `${date.year}`;
    const format = locale?.dateFormat.replace("_", ".") || "mm/dd/yyyy";
    const specChar = format.match(/[^a-zA-Z0-9\s]/g).join('')[0]; 
    if (format[0 || 1] === "y") {
        if (format[5 || 6] === "d") {
            formattedDate = year + specChar + dayNum + specChar + month;
        } else {
            formattedDate = year + specChar + month + specChar + dayNum;
        }
    } else {
        if (format[0 || 1] === "m") {
            formattedDate = month + specChar + dayNum + specChar + year;
        } else {
            formattedDate = dayNum + specChar + month + specChar + year;
        }
    }
    if (format.length === 11) {
        if (locale.code === "kyp") {
            formattedDate = specChar + formattedDate;
        } else {
            formattedDate = formattedDate + specChar;
        }
    }
    return formattedDate;
};


/*
export const formatLocaleSelectedDate = (array, date, locale) => {
    let formattedDate = "";
    const dayNum = `${date.getDate().toString().padStart(2, "0")}`;
    const month = `${(array.indexOf(date.month) + 1).toString().padStart(2, "0")}`;
    const year = `${date.year}`;
    const format = locale?.dateFormat.replace("_", ".") || "mm/dd/yyyy";
    const specChar = format.match(/[^a-zA-Z0-9\s]/g).join('')[0]; 
    if (format[0 || 1] === "y") {
        if (format[5 || 6] === "d") {
            formattedDate = year + specChar + dayNum + specChar + month;
        } else {
            formattedDate = year + specChar + month + specChar + dayNum;
        }
    } else {
        if (format[0 || 1] === "m") {
            formattedDate = month + specChar + dayNum + specChar + year;
        } else {
            formattedDate = dayNum + specChar + month + specChar + year;
        }
    }
    if (format.length === 11) {
        if (locale.code === "kyp") {
            formattedDate = specChar + formattedDate;
        } else {
            formattedDate = formattedDate + specChar;
        }
    }
    return formattedDate;
};
*/