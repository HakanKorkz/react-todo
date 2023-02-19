const request = (url, data = null, method = "GET",type="JSON") => {
    return new Promise(async (resolve, reject) => {
        const options = {
            method
        }
        if (data !== null && method === "POST") {
            options.body = type==="JSON" ? JSON.stringify(data) : parseData(data)
        }
        const response = await fetch(url, options)
        const result = await response.json()
        if (response.ok && httpStatus(response.status)) {
            resolve(result)
        } else {
            reject(result)
        }

    })
}
const httpStatus = (code) => {
    let status;
    switch (code) {
        case 200:
            status = true;
            break
        case 201:
            status = true;
            break;
        case 202:
            status = true;
            break;
        default:
            status = false;
            break;
    }

    return status
}

const parseData = (data) => {
    return data
}

export const postFetch = (url, data) => request(url, data, "POST")
export const getFetch = url => request(url)