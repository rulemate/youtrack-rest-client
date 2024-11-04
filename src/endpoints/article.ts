import {BaseEndpoint} from "./base";
import {PaginationOptions} from "../options/pagination_options";
import {
    Article,
    ArticleAttachment,
    ArticleAttachmentImpl,
    ArticleComment, ArticleCommentImpl,
    ArticleImpl,
    ArticleTag,
    ArticleTagImpl
} from "..";

export const ArticlePaths = {
    articles: '/articles',
    article: '/articles/{articleId}',
    attachments: '/articles/{articleId}/attachments',
    attachment: '/articles/{articleId}/attachments/{attachmentId}',
    childArticles: '/articles/{articleId}/childArticles',
    childArticle: '/articles/{articleId}/childArticles/{childArticleId}',
    parentArticle: '/articles/{articleId}/parentArticle',
    tags: '/articles/{articleId}/tags',
    tag: '/articles/{articleId}/tags/{tagId}',
    comments: '/articles/{articleId}/comments',
    comment: '/articles/{articleId}/comments/{commentId}',
};

class AttachmentEndpoint extends BaseEndpoint {

    public all(articleId: string, paginationOptions: PaginationOptions = {}): Promise<ArticleAttachment[]> {
        return this.getResourceWithFields(this.format(ArticlePaths.attachments, {articleId}), ArticleAttachmentImpl, {params: paginationOptions});
    }

    public byId(articleId: string, attachmentId: string): Promise<ArticleAttachment> {
        return this.getResourceWithFields(this.format(ArticlePaths.attachment, {
            articleId,
            attachmentId
        }), ArticleAttachmentImpl);
    }

    public delete(articleId: string, attachmentId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(ArticlePaths.attachment, {articleId, attachmentId})));
    }

    public create(articleId: string, attachment: Article): Promise<ArticleAttachment> {
        return this.postResourceWithFields(this.format(ArticlePaths.attachments, {articleId}), ArticleAttachmentImpl, {
            data: attachment
        });
    }

    public upload(articleId: string, blobs: { [name: string]: Blob }): Promise<ArticleAttachment[]> {
        const formData = new FormData();
        Object.keys(blobs).forEach(key => {
            formData.append("upload", blobs[key], key);
        });
        return this.postResourceWithFields(this.format(ArticlePaths.attachments, {articleId}), ArticleAttachmentImpl, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData,
        });
    }

    public update(articleId: string, attachment: Article): Promise<ArticleAttachment> {
        return this.postResourceWithFields(this.format(ArticlePaths.attachment, {
            articleId,
            attachmentId: attachment.id
        }), ArticleAttachmentImpl, {
            data: attachment
        });
    }
}

class ChildArticleEndpoint extends BaseEndpoint {

    public all(articleId: string, paginationOptions: PaginationOptions = {}): Promise<Article[]> {
        return this.getResourceWithFields(this.format(ArticlePaths.childArticles, {articleId}), ArticleImpl, {params: paginationOptions});
    }

    public byId(articleId: string, childArticleId: string): Promise<Article> {
        return this.getResourceWithFields(this.format(ArticlePaths.childArticle, {
            articleId,
            childArticleId
        }), ArticleImpl);
    }

    public delete(articleId: string, childArticleId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(ArticlePaths.childArticle, {articleId, childArticleId})));
    }

    public create(articleId: string, childArticle: Article): Promise<Article> {
        return this.postResourceWithFields(this.format(ArticlePaths.childArticles, {articleId}), ArticleImpl, {
            data: childArticle
        });
    }

    public update(articleId: string, childArticle: Article): Promise<Article> {
        return this.postResourceWithFields(this.format(ArticlePaths.childArticle, {
            articleId,
            childArticleId: childArticle.id
        }), ArticleImpl, {
            data: childArticle
        });
    }
}

class ParentArticleEndpoint extends BaseEndpoint {

    public byId(articleId: string): Promise<Article> {
        return this.getResourceWithFields(this.format(ArticlePaths.parentArticle, {articleId}), ArticleImpl);
    }
}

class TagEndpoint extends BaseEndpoint {

    public all(articleId: string, paginationOptions: PaginationOptions = {}): Promise<ArticleTag[]> {
        return this.getResourceWithFields(this.format(ArticlePaths.tags, {articleId}), ArticleTagImpl, {params: paginationOptions});
    }

    public byId(articleId: string, tagId: string): Promise<ArticleTag> {
        return this.getResourceWithFields(this.format(ArticlePaths.tag, {
            articleId,
            tagId
        }), ArticleTagImpl);
    }

    public delete(articleId: string, tagId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(ArticlePaths.tag, {articleId, tagId})));
    }

    public create(articleId: string, tag: ArticleTag): Promise<ArticleTag> {
        return this.postResourceWithFields(this.format(ArticlePaths.tags, {articleId}), ArticleTagImpl, {
            data: tag
        });
    }

    public update(articleId: string, tag: ArticleTag): Promise<ArticleTag> {
        return this.postResourceWithFields(this.format(ArticlePaths.tag, {
            articleId,
            tagId: tag.id
        }), ArticleTagImpl, {
            data: tag
        });
    }
}

class CommentEndpoint extends BaseEndpoint {

    public all(articleId: string, paginationOptions: PaginationOptions = {}): Promise<ArticleComment[]> {
        return this.getResourceWithFields<ArticleComment[]>(this.format(ArticlePaths.comments, {articleId}), ArticleImpl, {params: paginationOptions});
    }

    public byId(articleId: string, commentId: string): Promise<ArticleComment> {
        return this.getResourceWithFields<ArticleComment>(this.format(ArticlePaths.comment, {
            articleId,
            commentId
        }), ArticleImpl);
    }

    public delete(articleId: string, commentId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(ArticlePaths.comment, {articleId, commentId})));
    }

    public create(articleId: string, comment: ArticleComment): Promise<ArticleComment> {
        return this.postResourceWithFields<ArticleComment>(this.format(ArticlePaths.comments, {articleId}), ArticleCommentImpl, {
            data: comment
        });
    }

    public update(articleId: string, comment: ArticleComment): Promise<ArticleComment> {
        return this.postResourceWithFields<ArticleComment>(this.format(ArticlePaths.comment, {
            articleId,
            commentId: comment.id
        }), ArticleCommentImpl, {
            data: comment
        });
    }
}

export class ArticleEndpoint extends BaseEndpoint {
    public attachments: AttachmentEndpoint = new AttachmentEndpoint(this.client);
    public childArticles: ChildArticleEndpoint = new ChildArticleEndpoint(this.client);
    public parentArticle: ParentArticleEndpoint = new ParentArticleEndpoint(this.client);
    public tags: TagEndpoint = new TagEndpoint(this.client);
    public comments: CommentEndpoint = new CommentEndpoint(this.client);

    public all(paginationOptions: PaginationOptions = {}): Promise<Article[]> {
        return this.getResourceWithFields<Article[]>(ArticlePaths.articles, ArticleImpl, {params: paginationOptions});
    }

    public byId(articleId: string): Promise<Article> {
        return this.getResourceWithFields<Article>(this.format(ArticlePaths.article, {articleId}), ArticleImpl);
    }

    public delete(articleId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(ArticlePaths.article, {articleId})));
    }

    public create(agile: Article): Promise<Article> {
        return this.postResourceWithFields<Article>(ArticlePaths.articles, ArticleImpl, {
            data: agile
        });
    }

    public update(agile: Article): Promise<Article> {
        return this.postResourceWithFields<Article>(this.format(ArticlePaths.article, {articleId: agile.id}), ArticleImpl, {
            data: agile
        });
    }
}