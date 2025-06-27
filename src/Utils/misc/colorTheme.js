// This function is to set the color theme.

export const colorTheme = (user) => {
    const colorTheme = user.unionName 
        ? user.spectrum 
            ? user.spectrum 
            : "gray" 
        : user.energy 
            ? user.energy 
            : "gray"
    return colorTheme;
};