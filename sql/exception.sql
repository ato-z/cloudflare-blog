CREATE TABLE IF NOT EXISTS `az_exception` (
    `id` INTEGER PRIMARY KEY,
    `url` TEXT,
    `method` TEXT,
    `header` TEXT,
    `body` TEXT,
    `params` TEXT,
    `message` TEXT,
    `stack` TEXT,
    `createDate` TEXT
)