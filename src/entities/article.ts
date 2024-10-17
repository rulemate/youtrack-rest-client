import {User} from "./user";
import {Project} from "./project";
import {Visibility} from "./visibility";
import {Issue} from "./issue";

export class BaseArticleImpl {
    id?: string;
    attachments?: ArticleAttachment[];
    content?: string;
    reporter?: User;
    summary?: string;
    visibility?: Visibility;
}

export interface BaseArticle extends BaseArticleImpl {
}

export class ArticleImpl extends BaseArticleImpl {
    childArticles?: Article[];
    comments?: ArticleComment[];
    created?: number;
    externalArticle?: ExternalArticle;
    hasChildren?: boolean;
    hasStar?: boolean;
    idReadable?: string;
    ordinal?: number;
    parentArticle?: Article;
    pinnedComments?: ArticleComment[];
    project?: Project;
    tags?: ArticleTag[];
    updated?: number;
    updatedBy?: User;
}

export interface Article extends ArticleImpl {
}

export class ExternalArticleImpl {
    id?: string;
    name?: string;
    url?: string;
    key?: string;
}

export interface ExternalArticle extends ExternalArticleImpl {
}

export class ArticleAttachmentImpl {
    id?: string;
    name?: string;
    author?: User;
    created?: number;
    updated?: number;
    size?: number;
    extension?: string;
    charset?: string;
    mimeType?: string;
    metaData?: string;
    draft?: boolean;
    removed?: boolean;
    base64Content?: string;
    url?: string;
    visibility?: Visibility;
    article?: BaseArticle;
    comment?: ArticleComment;
}

export interface ArticleAttachment extends ArticleAttachmentImpl {
}

export class ArticleCommentImpl {
    id?: string;
    article?: Article;
    attachments?: ArticleAttachment[];
    author?: User;
    created?: number;
    pinned?: boolean;
    reactions?: unknown[];
    text?: string;
    updated?: number;
    visibility?: Visibility;
}

export interface ArticleComment extends ArticleCommentImpl {
}

export class ArticleTagImpl {
    id?: string;
    issues?: Issue[];
    color?: unknown;
    untagOnResolve?: boolean;
    visibleFor?: unknown;
    updateableBy?: unknown;
    readSharingSettings?: unknown;
    tagSharingSettings?: unknown;
    updateSharingSettings?: unknown;
    owner?: User;
    name?: string;
}

export interface ArticleTag extends ArticleTagImpl {
}