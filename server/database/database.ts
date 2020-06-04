import { PageDatabase } from './db-page';
import { applyMixins } from './db-base';
import { TypeDatabase } from './db-type';
import { MediaDatabase } from './db-media';
import { ThemeDatabase } from './db-theme';
import { PostDatabase } from './db-post';
import { CategoryDatabase } from './db-category';
import { TaxonomyDatabase } from './db-taxonomy';
import { UserDatabase } from './db-user';
import { CustomBlockFileDatabase } from './db-custom-blocks';

const extensions = [
    PageDatabase,
    TypeDatabase,
    MediaDatabase,
    ThemeDatabase,
    PostDatabase,
    CategoryDatabase,
    TaxonomyDatabase,
    UserDatabase,
    CustomBlockFileDatabase
];

class InMemoryDatabase {}
interface InMemoryDatabase
    extends PageDatabase,
        TypeDatabase,
        MediaDatabase,
        ThemeDatabase,
        PostDatabase,
        CategoryDatabase,
        TaxonomyDatabase,
        UserDatabase,
        CustomBlockFileDatabase {}

applyMixins(InMemoryDatabase, extensions);

export const db = new InMemoryDatabase();
