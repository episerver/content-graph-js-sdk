import { QueryClient } from "@tanstack/react-query";
import { Locales, StartQuery } from "../generated";
import { ContentSavedMessage } from "../models/ContentSavedMessage";
import { extractParams, isEditOrPreviewMode } from "./urlHelper";

const generateGQLQueryVars = (token: string, pathname: string): any => {
    const { relativePath, locales, language, contentId, workId } = extractParams(pathname)
    let variables: any = { relativePath, locales: locales as Locales, language, statusEqual: "Published" };
    if (isEditOrPreviewMode() && token) {
        variables = workId === undefined 
                    ? { contentId, isCommonDraft: true, locales: locales as Locales, language } 
                    : { contentId, workId, locales: locales as Locales, language };
    }

    return variables
}

const generateGQLSearchQueryVars = (token: string, pathname: string, searchParam: string | null, sortOption: string): any => {
    const { locales } = extractParams(pathname)
    let variables: any = { locales: locales as Locales, searchParam: searchParam, order: sortOption };
    if (isEditOrPreviewMode() && token) {
        variables = { locales: locales as Locales, searchParam, sortOption };
    }

    return variables
}

const updateStartQueryCache = (queryClient: QueryClient, data: StartQuery | undefined, variables: any, message: ContentSavedMessage) => {
    const hasComplexProperty = message.properties.find(p => !isSimpleProperty(p.value)) !== undefined
    if (hasComplexProperty) {
        queryClient.invalidateQueries(['Start', variables]);
        return;
    }

    const newContent = updateStartQueryData({ ...data }, message);
    queryClient.setQueryData(['Start', variables], newContent);
}

function updateStartQueryData(data: StartQuery, message: ContentSavedMessage) {
    if (!data.Content || !data.Content.items || data.Content?.items?.length === 0) { return; }
    const content = data.Content?.items[0];
    message.properties.forEach((prop) => updateContentProperty(content, prop.name, prop.value));

    return data;
}

function updateContentProperty(content: any, propName: string, propValue: any) {
    // we need remove the prefix icontent_ because some special properties like Name are returned with the prefix.
    propName = propName.toLowerCase()
    const prefixesToRemove = ["icontent_", "ichangetrackable_", "iversionable_", "iroutable_"]
    prefixesToRemove.forEach(prefix => {
        propName = propName.startsWith(prefix) ? propName.substring(prefix.length) : propName
    })

    const matchedKey = Object.keys(content).find((key) => key.toLowerCase() === propName);
    if (!matchedKey) { return; }

    content[matchedKey] = propValue;
}

function isSimpleProperty(propValue: any) {
    if (Array.isArray(propValue) || typeof propValue === "object") {
        return false
    }

    return true
}


export { generateGQLQueryVars, updateStartQueryCache, generateGQLSearchQueryVars }