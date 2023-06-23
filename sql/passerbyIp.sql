CREATE TABLE IF NOT EXISTS `az_passerby_ip` (
    `id` INTEGER PRIMARY KEY,
    `ip` TEXT,
    `years` INTEGER,
    `month` INTEGER,
    `day` INTEGER,
    `total` INTEGER,
    `createDate` TEXT,
    `lastDate` TEXT
)