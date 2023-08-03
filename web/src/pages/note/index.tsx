import { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { AnimaView } from '@web/components/animaRouter';
import { useSearchForm } from '@web/components/tableView/searchForm';
import { useTableList } from '@web/helper/useTableList';
import { NoteProp, noteAdd, noteEdit, noteList } from '@web/api';
import { siteConfig } from '@web/config';
import { PushNoteModal } from './component/pushNoteModal';
import { noteSearchProps, noteColumn } from './vars';

const { pageSize } = siteConfig;

const NoteList = () => {
  const [SearchForm, searchData] = useSearchForm({
    items: noteSearchProps,
  });

  const [row, setRow] = useState({} as NoteProp & { id: number });
  const [pushVisible, setPushVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const onTap = useCallback(
    (action: 'edit' | 'reload', row: any) => {
      if (action === 'edit') {
        setRow(row);
        setEditVisible(true);
      }

      if (action === 'reload') {
        setParams({});
      }
    },
    [setRow, setEditVisible],
  );

  const [setParams, tableView] = useTableList({
    columns: noteColumn(onTap),
    request: noteList,
    pageSize,
  });

  // 用户检索状态
  useEffect(() => {
    setParams(searchData);
  }, [searchData]);

  return (
    <AnimaView>
      <article>
        <section>{SearchForm}</section>
        <section style={{ margin: '20px 0 ' }}>
          <Button type={'primary'} onClick={() => setPushVisible(true)}>
            添加小记
          </Button>
        </section>

        <section>{tableView}</section>

        {/* 新增弹窗 */}
        <PushNoteModal
          title="添加小记"
          requset={async o => {
            await noteAdd(o);
            setParams({});
          }}
          open={pushVisible}
          setOpen={setPushVisible}
        />

        {/* 编辑弹窗 */}
        <PushNoteModal
          title="编辑小记"
          requset={noteEdit}
          open={editVisible}
          setOpen={setEditVisible}
          initData={row}
        />
      </article>
    </AnimaView>
  );
};

export default NoteList;
