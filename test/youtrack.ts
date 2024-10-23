import * as assert from 'assert';
import { Youtrack } from "../src";
import * as dotenv from "dotenv";

dotenv.config();

describe("Youtrack", () => {

    if (!process.env.YOUTRACK_BASE_URL || !process.env.YOUTRACK_TOKEN) {
        throw new Error("Please provide YOUTRACK_BASE_URL and YOUTRACK_TOKEN in .env file");
    }

    const configWithToken = {
        baseUrl: process.env.YOUTRACK_BASE_URL,
        token: process.env.YOUTRACK_TOKEN
    } as const;

    it("can be instantiated without error", () => {
        assert.doesNotThrow(() => {
            new Youtrack(configWithToken);
        });
    });

    it("instantiates user endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.users !== null);
    });

    it("instantiates tags endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.tags !== null);
    });

    it("instantiates workItems endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.workItems !== null);
    });

    it("instantiates comments endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.comments !== null);
    });

    it("instantiates projects endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.projects !== null);
    });

    it("instantiates issues endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.issues !== null);
    });

    it("instantiates agiles endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.agiles !== null);
    });

    it("instantiates sprints endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.sprints !== null);
    });

    it("instantiates articles endpoint", () => {
        const youtrack = new Youtrack(configWithToken);
        assert(youtrack.articles !== null);
    });

    it("can be instantiated with axios instance", () => {
        assert.doesNotThrow(() => {
            new Youtrack({
                ...configWithToken,
                axiosInstance: require("axios").create()
            });
        });
    });

    describe("users endpoint", () => {
        it("can fetch users", async () => {
            const youtrack = new Youtrack(configWithToken);
            const users = await youtrack.users.all();
            assert(users.length > 0);
        });
    })

    describe("tags endpoint", () => {
        it("can fetch tags", async () => {
            const youtrack = new Youtrack(configWithToken);
            const tags = await youtrack.tags.all();
            assert(tags.length > 0);
        });
    })

    describe("projects endpoint", () => {
        it("can fetch projects", async () => {
            const youtrack = new Youtrack(configWithToken);
            const projects = await youtrack.projects.all();
            assert(projects.length > 0);
        });
    })

    /*
    describe("issues endpoint", () => {
        it("can fetch issues", async () => {
            const youtrack = new Youtrack(configWithToken);
            const firstProject = (await youtrack.projects.all())[0];
            const issues = await youtrack.issues.search(`#Unresolved project: #${firstProject.name}`);
            assert(issues.length > 0);
        });
    })

    describe("workItems endpoint", () => {
        it("can fetch workItems", async () => {
            const youtrack = new Youtrack(configWithToken);
            const firstProject = (await youtrack.projects.all())[0];
            const firstIssue = (await youtrack.issues.search(`project: #${firstProject.id}`))[0];
            if (!firstIssue) {
                throw new Error("No issue found");
            }
            if (!firstIssue.id) {
                throw new Error("Issue has no id");
            }
            const workItems = await youtrack.workItems.all(firstIssue.id);
            assert(workItems.length > 0);
        });
    })

    describe("comments endpoint", () => {
        it("can fetch comments", async () => {
            const youtrack = new Youtrack(configWithToken);
            const firstProject = (await youtrack.projects.all())[0];
            const firstIssue = (await youtrack.issues.search(`project: {id: '${firstProject.id}'}`))[0];
            if (!firstIssue) {
                throw new Error("No issue found");
            }
            if (!firstIssue.id) {
                throw new Error("Issue has no id");
            }
            const comments = await youtrack.comments.all(firstIssue.id);
            assert(comments.length > 0);
        });
    })
     */

    describe("agiles endpoint", () => {
        it("can fetch agiles", async () => {
            const youtrack = new Youtrack(configWithToken);
            const agiles = await youtrack.agiles.all();
            assert(agiles.length > 0);
        });
    })

    describe("sprints endpoint", () => {
        it("can fetch sprints", async () => {
            const youtrack = new Youtrack(configWithToken);
            const firstAgile = (await youtrack.agiles.all())[0];
            if (!firstAgile) {
                throw new Error("No agile found");
            }
            if (!firstAgile.id) {
                throw new Error("Agile has no id");
            }

            const sprints = await youtrack.sprints.all(firstAgile.id);
            assert(sprints.length > 0);
        });
    })

    describe("articles endpoint", () => {
        it("can fetch articles", async () => {
            const youtrack = new Youtrack(configWithToken);
            const articles = await youtrack.articles.all();
            assert(articles.length > 0);
        });

        it("can fetch article by id", async () => {
            const youtrack = new Youtrack(configWithToken);
            const firstArticle = (await youtrack.articles.all())[0];
            if (!firstArticle) {
                throw new Error("No article found");
            }
            if (!firstArticle.id) {
                throw new Error("Article has no id");
            }
            const article = await youtrack.articles.byId(firstArticle.id);
            assert(article.id === firstArticle.id);
        });

        /**
         * WARNING: This test will create, update and delete an article
         *
         * Make sure you have a test project in your Youtrack instance
         */
        const testProjectName = "Test project";
        it("can create, update and delete article", async () => {
            const youtrack = new Youtrack(configWithToken);
            const firstProject = (await youtrack.projects.all()).find(p => p.name === testProjectName);
            if (!firstProject) {
                throw new Error(`No project found with name "${testProjectName}"`);
            }

            const article = await youtrack.articles.create({
                summary: "Test article",
                content: "Test article content",
                project: firstProject
            });
            assert(article.summary === "Test article");

            const updatedArticle = await youtrack.articles.update({
                id: article.id,
                summary: "Test article updated",
                content: "Test article content updated",
                project: firstProject
            });
            assert(updatedArticle.summary === "Test article updated");

            if (!updatedArticle.id) {
                throw new Error("Article has no id");
            }

            await youtrack.articles.delete(updatedArticle.id);
            const articles = await youtrack.articles.all();
            const deletedArticle = articles.find(a => a.id === updatedArticle.id);
            assert(deletedArticle === undefined);
        })
    })
});