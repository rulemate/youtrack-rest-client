import {ReducedUser, ReducedUserImpl} from "./user";
import {ReducedProject, ReducedProjectImpl} from "./project";
import {LimitedVisibilityImpl, Visibility} from "./visibility";
import {ReducedIssue} from "./issue";

export class ReducedBaseArticleImpl {
    id?: string = '';
    summary?: string = '';
}

export interface ReducedBaseArticle extends ReducedBaseArticleImpl {
}

export class BaseArticleImpl extends ReducedBaseArticleImpl {
    attachments?: ArticleAttachment[] = [];
    content?: string = '';
    reporter?: ReducedUser = new ReducedUserImpl();
    visibility?: Visibility = new LimitedVisibilityImpl();
}

export interface BaseArticle extends BaseArticleImpl {
}

export class ArticleImpl extends BaseArticleImpl {
    childArticles?: ReducedBaseArticle[] = [];
    comments?: ArticleComment[] = [];
    created?: number = 0;
    externalArticle?: ExternalArticle = new ExternalArticleImpl();
    hasChildren?: boolean = false;
    hasStar?: boolean = false;
    idReadable?: string = '';
    ordinal?: number = 0;
    parentArticle?: ReducedBaseArticle = new ReducedBaseArticleImpl();
    pinnedComments?: ArticleComment[] = [];
    project?: ReducedProject = new ReducedProjectImpl();
    tags?: ArticleTag[] = [];
    updated?: number = 0;
    updatedBy?: ReducedUser = new ReducedUserImpl();
}

export interface Article extends ArticleImpl {
}

export class ExternalArticleImpl {
    id?: string = '';
    name?: string = '';
    url?: string = '';
    key?: string = '';
}

export interface ExternalArticle extends ExternalArticleImpl {
}

export class ArticleAttachmentImpl {
    id?: string = '';
    name?: string = '';
    author?: ReducedUser = new ReducedUserImpl();
    created?: number = 0;
    updated?: number = 0;
    size?: number = 0;
    extension?: string = '';
    charset?: string = '';
    mimeType?: string = '';
    metaData?: string = '';
    draft?: boolean = false;
    removed?: boolean = false;
    base64Content?: string = '';
    url?: string = '';
    visibility?: Visibility = new LimitedVisibilityImpl();
    article?: ReducedBaseArticle = new ReducedBaseArticleImpl();
    comment?: ReducedArticleComment = new ReducedArticleCommentImpl();
}

export interface ArticleAttachment extends ArticleAttachmentImpl {
}

export class ReducedArticleCommentImpl {
    id?: string = '';
    text?: string = '';
}

export interface ReducedArticleComment extends ReducedArticleCommentImpl {
}

export class ArticleCommentImpl extends ReducedArticleCommentImpl {
    id?: string = '';
    article?: ReducedBaseArticle = new ReducedBaseArticleImpl();
    attachments?: ArticleAttachment[] = [];
    author?: ReducedUser = new ReducedUserImpl();
    created?: number = 0;
    pinned?: boolean = false;
    reactions?: unknown[] = [];
    text?: string = '';
    updated?: number = 0;
    visibility?: Visibility = new LimitedVisibilityImpl();
}

export interface ArticleComment extends ArticleCommentImpl {
}

export class ArticleTagImpl {
    id?: string = '';
    issues?: ReducedIssue[] = [];
    color?: unknown = '';
    untagOnResolve?: boolean = false;
    visibleFor?: unknown = '';
    updateableBy?: unknown = '';
    readSharingSettings?: unknown = '';
    tagSharingSettings?: unknown = '';
    updateSharingSettings?: unknown = '';
    owner?: ReducedUser = new ReducedUserImpl();
    name?: string = '';
}

export interface ArticleTag extends ArticleTagImpl {
}