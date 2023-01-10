import { QueryClient } from "@tanstack/react-query";
import { Locale, StartQuery } from "../generated";
import { ContentSavedMessage } from "../models/ContentSavedMessage";
import { extractParams, isEditMode } from "./urlHelper";

const generateGQLQueryVars = (token: string, pathname: string): any => {
    const { relativePath, locale, language, contentId, workId } = extractParams(pathname)
    let variables: any = { relativePath, locale: locale as Locale, language, statusEqual: "Published" };
    if (isEditMode() && token) {
        variables = workId === undefined ? { contentId, isCommonDraft: true, locale: locale as Locale, language } : { contentId, workId, locale: locale as Locale, language };
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
    propName = propName.startsWith("icontent_") ? propName.substring("icontent_".length) : propName

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


export { generateGQLQueryVars, updateStartQueryCache }