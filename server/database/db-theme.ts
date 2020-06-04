import { GenericObj, DbPayload } from './db-base';
import { THEMES } from "./data/THEMES";

export interface DbTheme extends GenericObj{
    id: number,
    theme_supports: DbThemeSupports
}

export interface DbThemeSupports extends GenericObj{
    formats: string[];
    "post-thumbanials": boolean;
    "responsive-embeds": boolean;
}

export type DbThemePayload = DbPayload<DbTheme>;
export type DbThemesPayload = DbPayload<DbTheme[]>;

export class ThemeDatabase {
    private _lastThemeID = 1;
    private _clearedThemeIDs = [];

    getThemes(): DbThemesPayload {
        return [THEMES, null];
    }
}