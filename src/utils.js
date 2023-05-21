const translateWToDBM = {
    "w": (value) => 10 * Math.log10(value / 1e-3),
    "DBM": (value) => value
} 

const translateDBMToW = {
    "w": (value) => value,
    "DBM": (value) => Math.pow(10, value / 10) * 1e-3
}

const typeOfCalculation = {
    "Att": ( attenuation, signal ) => {
        return signal - attenuation;
    },
    "Gain": ( gain, signal ) => {
        return Number(signal) + Number(gain);
    }
}

export {
    translateWToDBM,
    translateDBMToW,
    typeOfCalculation
}