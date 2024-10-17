import {BaseEndpoint} from "./base";
import {PaginationOptions} from "../options/pagination_options";
import {Article, ArticleImpl} from "..";

export const ArticlePaths = {
    articles: '/articles',
    article: '/articles/{articleId}'
};

export class ArticleEndpoint extends BaseEndpoint {

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
