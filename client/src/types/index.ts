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
    posts: number[];
    comments: number[];
    createdAt: Date;
    updatedAt: Date;
}
export interface contentString{
    text: string;
}
export interface contentImage{
    url: string;
    caption?: string;
    author?: string;
}
export interface contentCode{
    gistid: number;
    hidelinenumbers: boolean;
    hidefooter: boolean;
    hidecaption: boolean;
    lines?: number[][];
    highlight?: number[][];
}
export type contentList = contentString[];
export type sectionContent = contentString | contentImage | contentCode | contentList
export interface section{
    title: string;
    description?: string;
    image?: string;
    content:sectionContent;
}
export type content = section[];
export interface post{
    id: number;
    title: string;
    content: content;
    categories: number[];
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