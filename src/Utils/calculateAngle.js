import { useSelector } from "react-redux";


export const calculateAngle = (width, height) => {
    return Math.atan(width / height) * 180 / Math.PI;
};

export const ctfbglgAngleBackdrop = (width, height, main, hue) => {
    const { screen, user } = useSelector((state) => state.auth);
    let ctfbglgbd = {};
    const angleDegree = calculateAngle(width, height) + 90;
    const primary = user?.energy === "feminine" ? "feminine" : "masculine";
    const secondary = user?.energy === "feminine" ? "masculine" : "feminine";
    const color = screen === "light" ?  "white" : "black";  
    if (main) {
        ctfbglgbd = {
            background: `-webkit-linear-gradient(${angleDegree}deg, var(--${primary}-${hue}-brt), var(--${color}), var(--${secondary}-${hue}-brt))`, /* For Safari 5.1 to 6.0 */
            background: `-o-linear-gradient(${angleDegree}deg, var(--${primary}-${hue}-brt), var(--${color}), var(--${secondary}-${hue}-brt))`, /* For Opera 11.1 to 12.0 */
            background: `-moz-linear-gradient(${angleDegree}deg, var(--${primary}-${hue}-brt), var(--${color}), var(--${secondary}-${hue}-brt))`, /* For Firefox 3.6 to 15 */
            background: `linear-gradient(${angleDegree}deg, var(--${primary}-${hue}-brt), var(--${color}), var(--${secondary}-${hue}-brt))`, /* Standard syntax (must be last) */
        } 
    } else {
        ctfbglgbd = {
            background: `-webkit-linear-gradient(${angleDegree}deg, var(--${primary}-${hue}-brt), var(--${primary}-${hue}-brt), var(--${primary}-${hue}-brt), var(--${secondary}-${hue}-brt), var(--${secondary}-${hue}-brt), var(--${secondary}-${hue}-brt))`, /* For Safari 5.1 to 6.0 */
            background: `-o-linear-gradient(${angleDegree}deg, var(--${primary}-${hue}-brt), var(--${primary}-${hue}-brt), var(--${primary}-${hue}-brt), var(--${secondary}-${hue}-brt), var(--${secondary}-${hue}-brt), var(--${secondary}-${hue}-brt))`, /* For Opera 11.1 to 12.0 */
            background: `-moz-linear-gradient(${angleDegree}deg, var(--${primary}-${hue}-brt), var(--${primary}-${hue}-brt), var(--${primary}-${hue}-brt), var(--${secondary}-${hue}-brt), var(--${secondary}-${hue}-brt), var(--${secondary}-${hue}-brt))`, /* For Firefox 3.6 to 15 */
            background: `linear-gradient(${angleDegree}deg, var(--${primary}-${hue}-brt), var(--${primary}-${hue}-brt), var(--${primary}-${hue}-brt), var(--${secondary}-${hue}-brt), var(--${secondary}-${hue}-brt), var(--${secondary}-${hue}-brt))`, /* Standard syntax (must be last) */
        } 
    }
    return ctfbglgbd;
};