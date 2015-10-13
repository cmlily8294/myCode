---mysql查询表结构
SELECT
	TABLE_NAME,
	COLUMN_NAME,
	COLUMN_TYPE,
	COLUMN_COMMENT
FROM
	information_schema.`COLUMNS`
WHERE
	TABLE_SCHEMA = 'db_itouzi_data' AND TABLE_NAME = 'itz_stat_recharge';