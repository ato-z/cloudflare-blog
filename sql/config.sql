CREATE TABLE IF NOT EXISTS `az_config` (
    `id` INTEGER PRIMARY KEY,
    `name` TEXT,
    `des` TEXT,
    `type` INTEGER,
    `value` TEXT,
    `group` TEXT,
    `order` INTEGER,
    `createDate` TEXT,
    `deleteDate` TEXT
)