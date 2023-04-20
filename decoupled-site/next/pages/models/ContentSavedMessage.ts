export interface Property {
    name: string;
    value: string;
    successful: boolean;
    validationErrors?: any;
}

export interface ContentSavedMessage {
    contentLink: string;
    properties: Property[];
    editUrl: string;
    previewUrl: string;
}