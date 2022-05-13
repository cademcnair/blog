export interface array{
    [key: number]: any;
    [key: string]: any;
}
export interface comment{
    id: number;
    content: string;
    post: number;
    user: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface catergory{
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface contentString{
    text: string;
    type: "string"
}
export interface contentImage{
    url: string;
    caption?: string;
    author?: string;
    type: "image"
}
export interface contentCode{
    gistid: string;
    lines:number;
    type: "code"
}
export interface contentList{
    items: string[],
    type: "list"
}
export type sectionContent = contentString | contentImage | contentCode | contentList
export interface section{
    title: string;
    description?: string;
    image?: string;
    content:sectionContent[];
}
export interface post{
    id: number;
    title: string;
    content: section[];
    categories: string|number[]|catergory[];
    comments: number[];
    createdAt: Date;
    updatedAt: Date;
    description: string;
    headerimage: string;
    sideimage: string;
}
export interface user{
    id: number;
    username: string;
    email: string;
    passcode: string;
    createdAt: Date;
    updatedAt: Date;
    comments: number[];
    mail: boolean;
}