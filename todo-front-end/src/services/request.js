const request = (url, data = null, method = "GET", type = "JSON") => {
  let requestUrl
  if (url.search(process.env.REACT_APP_URL_SEARCH_KEY) === 0) {
    requestUrl = url
  } else {
    requestUrl = process.env.REACT_APP_URL + url
  }
  return new Promise(async (resolve, reject) => {
    // const token =
    //   "eyJpdiI6ImV6ZlZPOFJwSGVHNkFzS3RNUktPMFE9PSIsInZhbHVlIjoiNXB0YW8wYU5LK0RhaExoZ0xZcUhwRDZZZDB6SzM5ejBhcHBFUzVoNlB4dVhBcXdmVHpJcGJLMm1ldVBGSGExMGptUFBTOUJDSzZrWDJjWjMyRkxsN2lrMUhYV1AzRHdtenNMVThhdUdJMHdaQ1VSNVRNTkxCVFh5R3Jpd1o3MXQiLCJtYWMiOiIxZmExMDA0NjkyNjZhZjA1MGNkOTE2ZmEwODA0NjY3MzBiYTg5YzdlZTYyZTU0MTMxNTUxMGMwYWZlYThmMGQ0IiwidGFnIjoiIn0%3D"

    const options = {
      method,
      // headers: new Headers({
      //   Authorization: `Bearer ${token}`,
      //   //"Content-Type": "application/x-www-form-urlencoded",
      // }),
    }
    if (data !== null && method === "POST") {
      options.body = type === "JSON" ? JSON.stringify(data) : parseData(data)
    }
    const response = await fetch(requestUrl, options)
    const result = await response.json()
    if (response.ok && httpStatus(response.status)) {
      resolve(result)
    } else {
      reject(result)
    }
  })
}
const httpStatus = (code) => {
  let status
  switch (code) {
    case 200:
      status = true
      break
    case 201:
      status = true
      break
    case 202:
      status = true
      break
    default:
      status = false
      break
  }

  return status
}

const parseData = (data) => {
  return new FormData(data.nativeEvent.srcElement)
}

export const postFetch = (url, data, type = "JSON") => request(url, data, "POST", type)
export const getFetch = (url) => request(url)
