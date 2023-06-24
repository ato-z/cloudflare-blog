CREATE TABLE IF NOT EXISTS `az_article_observe` (
    `id` INTEGER PRIMARY KEY,
    `uid` INTEGER,
    `fromId` INTEGER,
    `articleId` INTEGER,
    `content` TEXT,
    `state` INTEGER,
    `createDate` TEXT
)