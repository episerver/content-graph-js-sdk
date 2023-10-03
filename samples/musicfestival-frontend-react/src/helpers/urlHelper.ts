import {Ranking} from "../generated";
import { Buffer } from "buffer";
import { Payload } from "../models/Payload";


const isEditOrPreviewMode = () => {
    const params = window.location.search.split(/[&?]+/);
    return params.includes("epieditmode=true") || params.includes("epieditmode=false");
}

const getImageUrl = (path = "") => {
    const siteUrl = process.env.REACT_APP_LOGIN_AUTHORITY as string
    if (!path) {
        return ""
    }

    return path.startsWith("http") ? path : siteUrl + path
}

const extractParams = (token: string, urlPath: string) => {
    const base64String = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
    const payload: Payload = JSON.parse(Buffer.from(base64String, 'base64').toString());

    let relativePath = (urlPath.length > 1 && urlPath != "/search") ? urlPath : '/en'

    const epiContentPrefix = "/EPiServer/CMS/Content/";
    if (relativePath.startsWith(epiContentPrefix)) {
        relativePath = relativePath.substring(epiContentPrefix.length - 1);
    }

    if (relativePath.endsWith('/')) {
        relativePath = relativePath.slice(0, -1)
    }

    if (relativePath.includes(",")) {
        relativePath = relativePath.substring(0, relativePath.indexOf(','));
    }

    if (relativePath.endsWith('/')) {
        relativePath = relativePath.slice(0, -1)
    }

    const urlSegments = relativePath.split('/')
    const language = urlSegments.length ? urlSegments.find(s => s.length === 2) : "en"

    return { relativePath, locales: language, language, contentId: parseInt(payload.c_id.toString()) , workId: parseInt(payload.c_ver.toString()) }
}

const getRankingFromSearchParams = (searchParams: URLSearchParams): Ranking => {
    for (const [key, value] of Object.entries(Ranking)) {
        if (key.toLowerCase() === searchParams.get("r")?.toString().toLowerCase()) {
            return value;
        }
    }

    return Ranking.Relevance;
}

export {isEditOrPreviewMode, extractParams, getImageUrl, getRankingFromSearchParams}