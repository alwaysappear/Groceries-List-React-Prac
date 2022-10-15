const apiRequest = async (url='', optionsObj=null, errMsg=null) => {
    try {
        const res = await fetch(url, optionsObj)
        if (!res.ok) throw new Error("Please, reload the site.")
        const data = await res.json()
        return data
    } catch (err) {
        errMsg = err.message
    } finally {
        return errMsg
    }
}

export default apiRequest