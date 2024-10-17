import {
    YoutrackTokenOptions
} from "./options/youtrack_options";
import {UserEndpoint} from "./endpoints/user";
import {TagEndpoint} from "./endpoints/tag";
import {IssueEndpoint} from "./endpoints/issue";
import {ProjectEndpoint} from "./endpoints/project";
import {AgileEndpoint} from "./endpoints/agile";
import {SprintEndpoint} from "./endpoints/sprint";
import {WorkItemEndpoint} from "./endpoints/workitem";
import {CommentEndpoint} from "./endpoints/comment";
import axios from "axios";
import {AxiosRequestConfig, AxiosInstance} from "axios";
import {YoutrackClient} from "./youtrack_client";
import {GetRequestOptions, RequestOptions} from "./options/request_options";
import {ArticleEndpoint} from "./endpoints/article";

export class Youtrack implements YoutrackClient {

    private readonly baseUrl: string;
    private readonly axiosInstance: AxiosInstance;
    private defaultRequestOptions: RequestOptions = {};
    public readonly users: UserEndpoint;
    public readonly tags: TagEndpoint;
    public readonly issues: IssueEndpoint;
    public readonly projects: ProjectEndpoint;
    public readonly agiles: AgileEndpoint;
    public readonly sprints: SprintEndpoint;
    public readonly workItems: WorkItemEndpoint;
    public readonly comments: CommentEndpoint;
    public readonly articles: ArticleEndpoint;

    public constructor(options: YoutrackTokenOptions) {
        this.defaultRequestOptions = {
            ...this.defaultRequestOptions,
            headers: {
                Authorization: `Bearer ${options.token}`
            }
        };
        this.baseUrl = this.formBaseUrl(options.baseUrl);
        this.axiosInstance = options.axiosInstance || axios.create();
        this.users = new UserEndpoint(this);
        this.tags = new TagEndpoint(this);
        this.issues = new IssueEndpoint(this);
        this.projects = new ProjectEndpoint(this);
        this.agiles = new AgileEndpoint(this);
        this.sprints = new SprintEndpoint(this);
        this.workItems = new WorkItemEndpoint(this);
        this.comments = new CommentEndpoint(this);
        this.articles = new ArticleEndpoint(this);
    }

    public post(url: string, params: RequestOptions = {}, headers: {} = {}): Promise<any> {
        return this.executeRequest('post', url, this.prepareParams(params, headers));
    }

    public get(url: string, params: GetRequestOptions = {}, headers = {}): Promise<any> {
        return this.executeRequest('get', url, this.prepareParams(params, headers));
    }

    public delete(url: string, params: RequestOptions = {}, headers = {}): Promise<any> {
        return this.executeRequest('delete', url, this.prepareParams(params, headers));
    }

    public put(url: string, params: RequestOptions = {}, headers = {}): Promise<any> {
        return this.executeRequest('put', url, this.prepareParams(params, headers));
    }

    private formBaseUrl(baseUrl: string): string {
        if (baseUrl.match(/\/$/)) {
            baseUrl = baseUrl.slice(0, -1);
        }
        if (!baseUrl.match(/api$/i)) {
            baseUrl += "/api";
        }
        return baseUrl;
    }

    private prepareParams(params: RequestOptions, customHeaders: {}): AxiosRequestConfig {
        let headers = {...customHeaders};
        if (this.defaultRequestOptions.headers) {
            headers = {...headers, ...this.defaultRequestOptions.headers};
        }

        return {...params, headers: headers};
    }

    private executeRequest(method: string, url: string, params: AxiosRequestConfig): Promise<any> {
        return this.axiosInstance({
            method: method,
            url: url,
            baseURL: this.baseUrl,
            ...params
        }).then((res) => res.data);
    }
}
