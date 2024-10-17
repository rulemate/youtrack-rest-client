import {User} from "./user";

export interface Visibility {}

export interface UnlimitedVisibility extends Visibility {}

export class LimitedVisibilityImpl {
    id?: string;
    permittedGroups?: unknown[];
    permittedUsers?: User[];
}

export interface LimitedVisibility extends Visibility, LimitedVisibilityImpl {}