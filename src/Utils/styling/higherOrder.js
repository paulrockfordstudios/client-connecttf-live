// returns a user's spectrum field is a hiher order spectrum or not.

export function higherOrder(user) {
    const highOrder = user.unionName ?
        user.spectrum === "rainbow" ||
        user.spectrum === "silver" ||
        user.spectrum === "gold" ||
        user.spectrum === "platinum" ||
        user.spectrum === "diamond" ? 
        true : false : false;
    return highOrder;
}

// returns a user's spectrum field is a hiher order spectrum or not (except "diamond" spectrum).

export function higherOrderNxD(user) {
    const highOrder = higherOrder(user);
    return user.spectrum === "diamond" ? false : highOrder;
}