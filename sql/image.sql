CREATE TABLE IF NOT EXISTS `az_image` (
    'id' INTEGER PRIMARY KEY,
    'path' TEXT,
    'thumb' TEXT,
    'hash' TEXT,
    'width' INTEGER,
    'height' INTEGER,
    'size' INTEGER,
    'color' TEXT,
    'from' INTEGER,
    'createDate' TEXT
)