import {ReducedUser, ReducedUserImpl} from "./user";
import {ReducedProject, ReducedProjectImpl} from "./project";
import {LimitedVisibilityImpl, Visibility} from "./visibility";
import {Issue} from "./issue";

export class ReducedBaseArticleImpl {
    id?: string = '';
    summary?: string = '';
    visibility?: Visibility = new LimitedVisibilityImpl();
}

export interface ReducedBaseArticle extends ReducedBaseArticleImpl {
}

export class BaseArticleImpl extends ReducedBaseArticleImpl {
    attachments?: ArticleAttachment[] = [];
    content?: string = '';
    reporter?: ReducedUser = new ReducedUserImpl();
}

export interface BaseArticle extends BaseArticleImpl {
}

export class ArticleImpl extends BaseArticleImpl {
    childArticles?: Article[] = [];
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
    article?: BaseArticle = new BaseArticleImpl();
    comment?: ArticleComment = new ArticleCommentImpl();
}

export interface ArticleAttachment extends ArticleAttachmentImpl {
}

export class ArticleCommentImpl {
    id?: string = '';
    article?: Article = new ArticleImpl();
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
    issues?: Issue[] = [];
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