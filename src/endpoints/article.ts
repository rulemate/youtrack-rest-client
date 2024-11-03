import {BaseEndpoint} from "./base";
import {PaginationOptions} from "../options/pagination_options";
import {Article, ArticleImpl} from "..";

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

    public all(articleId: string, paginationOptions: PaginationOptions = {}): Promise<Article[]> {
        return this.getResourceWithFields<Article[]>(this.format(ArticlePaths.attachments, {articleId}), ArticleImpl, {params: paginationOptions});
    }

    public byId(articleId: string, attachmentId: string): Promise<Article> {
        return this.getResourceWithFields<Article>(this.format(ArticlePaths.attachment, {
            articleId,
            attachmentId
        }), ArticleImpl);
    }

    public delete(articleId: string, attachmentId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(ArticlePaths.attachment, {articleId, attachmentId})));
    }

    public create(articleId: string, attachment: Article): Promise<Article> {
        return this.postResourceWithFields<Article>(this.format(ArticlePaths.attachments, {articleId}), ArticleImpl, {
            data: attachment
        });
    }

    public update(articleId: string, attachment: Article): Promise<Article> {
        return this.postResourceWithFields<Article>(this.format(ArticlePaths.attachment, {
            articleId,
            attachmentId: attachment.id
        }), ArticleImpl, {
            data: attachment
        });
    }
}

class ChildArticleEndpoint extends BaseEndpoint {

    public all(articleId: string, paginationOptions: PaginationOptions = {}): Promise<Article[]> {
        return this.getResourceWithFields<Article[]>(this.format(ArticlePaths.childArticles, {articleId}), ArticleImpl, {params: paginationOptions});
    }

    public byId(articleId: string, childArticleId: string): Promise<Article> {
        return this.getResourceWithFields<Article>(this.format(ArticlePaths.childArticle, {
            articleId,
            childArticleId
        }), ArticleImpl);
    }

    public delete(articleId: string, childArticleId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(ArticlePaths.childArticle, {articleId, childArticleId})));
    }

    public create(articleId: string, childArticle: Article): Promise<Article> {
        return this.postResourceWithFields<Article>(this.format(ArticlePaths.childArticles, {articleId}), ArticleImpl, {
            data: childArticle
        });
    }

    public update(articleId: string, childArticle: Article): Promise<Article> {
        return this.postResourceWithFields<Article>(this.format(ArticlePaths.childArticle, {
            articleId,
            childArticleId: childArticle.id
        }), ArticleImpl, {
            data: childArticle
        });
    }
}

class ParentArticleEndpoint extends BaseEndpoint {

    public byId(articleId: string): Promise<Article> {
        return this.getResourceWithFields<Article>(this.format(ArticlePaths.parentArticle, {articleId}), ArticleImpl);
    }
}

class TagEndpoint extends BaseEndpoint {

        public all(articleId: string, paginationOptions: PaginationOptions = {}): Promise<Article[]> {
            return this.getResourceWithFields<Article[]>(this.format(ArticlePaths.tags, {articleId}), ArticleImpl, {params: paginationOptions});
        }

        public byId(articleId: string, tagId: string): Promise<Article> {
            return this.getResourceWithFields<Article>(this.format(ArticlePaths.tag, {
                articleId,
                tagId
            }), ArticleImpl);
        }

        public delete(articleId: string, tagId: string): Promise<any> {
            return this.toPromise(this.client.delete(this.format(ArticlePaths.tag, {articleId, tagId})));
        }

        public create(articleId: string, tag: Article): Promise<Article> {
            return this.postResourceWithFields<Article>(this.format(ArticlePaths.tags, {articleId}), ArticleImpl, {
                data: tag
            });
        }

        public update(articleId: string, tag: Article): Promise<Article> {
            return this.postResourceWithFields<Article>(this.format(ArticlePaths.tag, {
                articleId,
                tagId: tag.id
            }), ArticleImpl, {
                data: tag
            });
        }
}

class CommentEndpoint extends BaseEndpoint {

    public all(articleId: string, paginationOptions: PaginationOptions = {}): Promise<Article[]> {
        return this.getResourceWithFields<Article[]>(this.format(ArticlePaths.comments, {articleId}), ArticleImpl, {params: paginationOptions});
    }

    public byId(articleId: string, commentId: string): Promise<Article> {
        return this.getResourceWithFields<Article>(this.format(ArticlePaths.comment, {
            articleId,
            commentId
        }), ArticleImpl);
    }

    public delete(articleId: string, commentId: string): Promise<any> {
        return this.toPromise(this.client.delete(this.format(ArticlePaths.comment, {articleId, commentId})));
    }

    public create(articleId: string, comment: Article): Promise<Article> {
        return this.postResourceWithFields<Article>(this.format(ArticlePaths.comments, {articleId}), ArticleImpl, {
            data: comment
        });
    }

    public update(articleId: string, comment: Article): Promise<Article> {
        return this.postResourceWithFields<Article>(this.format(ArticlePaths.comment, {
            articleId,
            commentId: comment.id
        }), ArticleImpl, {
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