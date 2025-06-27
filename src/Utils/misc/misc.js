import { starHalfIcon, starIcon, starOutlinedIcon } from "../../Lib/mui/icons";

// Turns fetched data "user.hereFor" into a string w/ spaces.
export function stringHereFor(arr) {
    if(arr) {
        return arr.toString().split(",").join(", ");
    }
};

// Changes the color of the connection buttons to match the person's energy
export function btnsColorByEnergy(energy) {
    if(energy) {
        let btnColor = "";
        if(energy === "masculine") {
            btnColor = "btnsMasculine";
        } else if(energy === "feminine") {
            btnColor = "btnsFeminine";
        } else {
            btnColor = "btnsGrey";
        }
        return btnColor;
    }
};

// Changes the color of the connection buttons to match the union's spectrum
export function btnsColorBySpectrum(spectrum) {
    if(spectrum) {
        let btnColor = "";
        switch (spectrum) {
            case "ruby":
                btnColor = "btnsRuby";
                break;
            case "orange":
                btnColor = "btnsOrange";
                break;
            case "sun":
                btnColor = "btnsSun";
                break;
            case "emerald":
                btnColor = "btnsEmerald";
                break;
            case "blue":
                btnColor = "btnsBlue";
                break;
            case "indigo":
                btnColor = "btnsIndigo";
                break;
            case "violet":
                btnColor = "btnsViolet";
                break;
            case "rainbow":
                btnColor = "btnsRainbow";
                break;
            case "silver":
                btnColor = "btnsSilver";
                break;
            case "gold":
                btnColor = "btnsGold";
                break;
            case "platinum":
                btnColor = "btnsPlatinum";
                break;
            case "diamond":
                btnColor = "btnsDiamond";
                break;
            default:
                btnColor = "btnsGrey";
            }
        return btnColor;
    }
};

// Changes rating into a star field
export function getStarRating(rating) {
    let starRating = null;
    const starStyle = {
        verticalAlign: "Bottom",
        color: "goldenrod",
    };
    switch (rating) {
        case 0.5:
            starRating = (
                <>
                    <div style={starStyle}>{starHalfIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                </>
            );
            break;
        case 1:
            starRating = (
                <>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                </>
            );
            break;
        case 1.5:
            starRating = (
                <>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starHalfIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                </>
            );
            break;
        case 2:
            starRating = (
                <>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                </>
            );
            break;
        case 2.5:
            starRating = (
                <>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starHalfIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                </>
            );
            break;
        case 3:
            starRating = (
                <>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                </>
            );
            break;
        case 3.5:
            starRating = (
                <>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starHalfIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                </>
            );
            break;
        case 4:
            starRating = (
                <>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                </>
            );
            break;
        case 4.5:
            starRating = (
                <>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starHalfIcon}</div>
                </>
            );
            break;
        case 5:
            starRating = (
                <>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                    <div style={starStyle}>{starIcon}</div>
                </>
            );
            break;
        default:
            starRating = (
                <>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                    <div style={starStyle}>{starOutlinedIcon}</div>
                </>
            );
    }
    return starRating;
};