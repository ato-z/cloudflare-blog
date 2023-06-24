CREATE TABLE IF NOT EXISTS `az_master` (
    `id` INTEGER PRIMARY KEY,
    `name` TEXT,
    `nickname` TEXT,
    `cover` INTEGER,
    `intro` TEXT,
    `password` TEXT,
    `createDate` TEXT,
    `deleteDate` TEXT
);

INSERT INTO
    `az_master` (
        `id`,
        `name`,
        `nickname`,
        `cover`,
        `intro`,
        `password`,
        `createDate`
    )
VALUES
    (
        1,
        'superAdmin',
        '超级管理员',
        0,
        'hi',
        '123456',
        '2023-06-01'
    );