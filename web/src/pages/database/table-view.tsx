import {
  databaseTableDataGet,
  databaseTableDataEditPatch,
  databaseTableDataRemove,
} from '@web/api/database';
import { AnimaView } from '@web/components/animaRouter';
import { Button, Space, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditableCell, EditableRow } from './component/EditableRow';
import { tailErr } from '@web/helper';

const TableView = () => {
  const { tableName } = useParams();
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNum, setPageNum] = useState(1);
  const [list, setList] = useState<Array<any>>([]);
  const [messageApi, contextHolder] = message.useMessage();

  // 表单编辑
  const onEdit = useCallback(
    async (row: any) => {
      try {
        await databaseTableDataEditPatch(tableName!, row.id, row);

        const newData = [...list];
        const index = newData.findIndex(item => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setList(newData);

        messageApi.success('已更新');
      } catch (err: unknown) {
        tailErr(err);
      }
    },
    [list, setList],
  );

  // 删除表数据
  const onRemove = useCallback(
    async (row: any) => {
      try {
        await databaseTableDataRemove(tableName!, row.id);
        setList(list => list.filter(item => item.id != row.id));
        messageApi.success('已删除');
      } catch (err: unknown) {
        tailErr(err);
      }
    },
    [list, setList],
  );

  /** 表头 */
  const [columns, setColumns] = useState<ColumnsType<any>>([]);
  useEffect(() => {
    if (columns.length === 0 && list.length !== 0) {
      const keys: ColumnsType<any> = Object.keys(list[0]).map(key => ({
        title: key,
        dataIndex: key,
        editable: true,
        onCell: (record: DataType) => ({
          record,
          editable: true,
          dataIndex: key,
          title: key,
          handleSave: onEdit,
        }),
      }));
      keys.push({
        title: '',
        fixed: 'right',
        width: 100,
        render: row => (
          <Space size={'middle'}>
            <Button danger type={'link'} onClick={() => onRemove(row)}>
              删除
            </Button>
          </Space>
        ),
      });
      setColumns(keys);
    }
  }, [columns, list]);

  /** 请求数据 */
  useEffect(() => {
    const end = pageSize;
    const start = (pageNum - 1) * pageSize;
    tableName &&
      databaseTableDataGet({ tableName, start, end }).then(
        ({ total, list }) => {
          setTotal(total);
          setList(list);
        },
      );
  }, [pageNum, pageSize]);

  return (
    <>
      {contextHolder}
      <AnimaView>
        <Table
          bordered
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
          rowKey={'id'}
          columns={columns}
          dataSource={list}
          scroll={{ y: '100%' }}
          pagination={{
            showSizeChanger: true,
            total,
            onChange(num, size) {
              if (pageNum !== num) {
                setPageNum(num);
              }
              if (pageSize !== size) {
                setPageSize(size);
              }
            },
          }}
        />
      </AnimaView>
    </>
  );
};

export default TableView;
