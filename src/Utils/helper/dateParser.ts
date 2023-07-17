enum EDateFormat {
    DDMMYYYY = "dd-mm-yyyy",
    MMDDYYYY = "mm-dd-yyyy",
    YYYYMMDD = "yyyy-mm-dd"
}

export const DateParser = (dateString: string, format: EDateFormat = EDateFormat.DDMMYYYY) => {
    try {
        const splitData = dateString.split('-')
        const day = splitData[0]
        const month = splitData[1]
        const year = splitData[2]

        if (parseInt(day) >= 31) {

        }
    } catch (e) {

    }
}