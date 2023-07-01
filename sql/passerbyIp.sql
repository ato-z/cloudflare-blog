CREATE TABLE IF NOT EXISTS `az_passerby_ip` (
    `id` INTEGER PRIMARY KEY,
    `ip` TEXT,
    `total` INTEGER,
    `from` TEXT,
    `createDate` TEXT,
    `lastTime` INTEGER,
    `lastDate` TEXT
);