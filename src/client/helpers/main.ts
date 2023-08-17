export const postRequest = async (url: string, data: { [k: string]: string | number },) => {
    const response = await fetch(url,
        {
            method: 'POST',
            headers:
                { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

    return response.json();
}

//Takes 2 objects. The data object will end up being only what is in the filter object. As well as the filter object changing the keys of what it matches.
export const filterAndChangeKey = (filter: { [k: string]: { name: string, value?: any } }, data: { [k: string]: string | number }) => {
    const newInfo: any = {};
    for (const [key, value] of Object.entries(data)) {
        for (const [key2, value2] of Object.entries(filter)) {
            if (key === key2) {
                if (value2.value) {

                    newInfo[value2.name] = value2.value();
                } else {
                    newInfo[value2.name] = value;
                }
            }
        }
    }

    return newInfo;
}