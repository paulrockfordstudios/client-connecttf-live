// Function to return a color scheme

export function colorTheme(theme) {
    const color = theme 
        ? theme.color
            ? theme.color
            : theme.unionName 
                ? theme.spectrum
                    ? theme.spectrum
                    : "gray" 
                : theme.energy
                    ? theme.energy
                    : "gray"
            : null;
            
    return color;
};