export const generateYears = (start, end) => {
    let data = [
        {
            name: '',
            value: -1,
        }
    ]

    for (let i = end; i >= start; i--) {
        let entry = {}
        entry['name'] = i
        entry['value'] = i

        data.push(entry)
    }
    return data
}

export const generateMonths = () => {
    let data = [
        {
            name: '',
            value: -1,
        },
        {
            name: 'January',
            value: 0,
        },
        {
            name: 'February',
            value: 1,
        },
        {
            name: 'March',
            value: 2,
        },
        {
            name: 'April',
            value: 3,
        },
        {
            name: 'May',
            value: 4,
        },
        {
            name: 'June',
            value: 5,
        },
        {
            name: 'July',
            value: 6,
        },
        {
            name: 'August',
            value: 7,
        },
        {
            name: 'September',
            value: 8,
        },
        {
            name: 'October',
            value: 9,
        },
        {
            name: 'Novmeber',
            value: 10,
        },
        {
            name: 'December',
            value: 11,
        },
    ]

    return data
}

export const generateDays = () => {
    let data = [
        {
            name: '',
            value: -1,
        }
    ]    
    for (let i = 1; i <= 31; i++) {
        let entry = {}
        entry['name'] = i
        entry['value'] = i

        data.push(entry)
    }
    return data
}
