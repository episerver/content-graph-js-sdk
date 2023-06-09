const isEditOrPreviewMode = () => {
    const params = window.location.search.split(/[&?]+/);
    return params.includes("epieditmode=true") || params.includes("epieditmode=false");
}

const getImageUrl = (path = "") => {
    const siteUrl = process.env.REACT_APP_LOGIN_AUTHORITY as string
    if (!path) {
        return ""
    }
    
    return path.startsWith("http") ?  path : siteUrl + path
}

const extractParams = (urlPath: string) => {
    let relativePath = (urlPath.length > 1 && urlPath != "/search") ? urlPath : '/en'
    let contentId
    let workId = undefined

    const epiContentPrefix = "/EPiServer/CMS/Content/";
    if (relativePath.startsWith(epiContentPrefix)) {
        relativePath = relativePath.substring(epiContentPrefix.length - 1);
    }

    if (relativePath.endsWith('/')) {
        relativePath = relativePath.slice(0, -1)
    }
    
    if (relativePath.includes(",")) {
        const [, , idString] = relativePath.split(",")
        if (idString.includes("_")) {
            [contentId, workId] = idString.split("_").map(x => parseInt(x));

        } else {
            contentId = parseInt(idString)
        }
        relativePath = relativePath.substring(0, relativePath.indexOf(','));
    }

    if (relativePath.endsWith('/')) {
        relativePath = relativePath.slice(0, -1)
    }

    const urlSegments = relativePath.split('/')
    const language = urlSegments.length ? urlSegments.find(s => s.length === 2) : "en"

    return { relativePath, locales: language, language, contentId, workId }
}

export { isEditOrPreviewMode, extractParams, getImageUrl }