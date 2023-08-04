import { databaseDumpGet, databaseTablesGet } from '@web/api/database';
import { AnimaView } from '@web/components/animaRouter';
import { tailErr } from '@web/helper';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { tablesColumn } from './vars';

const onDownload = async () => {
  const url = await databaseDumpGet();
  const link = document.createElement('a');
  link.target = '_blank';
  link.href = url;
  link.click();
};

const DataBaseIndex = () => {
  const [loading, setLoading] = useState(false);
  const [tables, setTabels] = useState<Array<{ name: string }>>([]);

  useEffect(() => {
    databaseTablesGet()
      .then(tables => setTabels(tables))
      .catch(tailErr);
  }, [setTabels]);

  return (
    <AnimaView>
      <article>
        <section style={{ margin: '20px 0 ' }}>
          <Button
            loading={loading}
            type={'primary'}
            onClick={() => {
              setLoading(true);
              onDownload().finally(() => setLoading(false));
            }}
          >
            下载数据库
          </Button>
        </section>

        <section>
          <Table
            rowKey={'name'}
            dataSource={tables}
            columns={tablesColumn()}
          ></Table>
        </section>
      </article>
    </AnimaView>
  );
};

export default DataBaseIndex;
