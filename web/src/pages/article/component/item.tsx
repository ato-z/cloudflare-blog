import { Button, List, Tag, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import AppImage from '@web/components/image';
import { articleEdit, articleRemove } from '@web/api';
import { tailErr } from '@web/helper';
import { useState } from 'react';

/**
 * 切换笔记状态
 * @param status
 */
const switchArticleStatu = async (
  id: number,
  status: 0 | 1,
  setStatu: React.Dispatch<React.SetStateAction<number>>,
) => {
  try {
    message.loading({ content: '努力处理中...' });
    await articleEdit(id, { status });
    message.destroy();
    message.success('操作成功');
    setStatu(status);
  } catch (err: unknown) {
    tailErr(err);
  }
};

/**
 * 删除笔记
 */
const removeArticle = async (
  id: number,
  switchShow: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    message.loading({ content: '正在删除...' });
    await articleRemove(id);
    message.destroy();
    message.success('操作成功');
    switchShow(false);
  } catch (err: unknown) {
    tailErr(err);
  }
};

const ArticleItem = ({ detail }: { detail: any }) => {
  const [statu, setStatu] = useState<number>(detail.status);
  const [show, switchShow] = useState<boolean>(true);
  const tabs = (detail.tags ?? '')
    .split(',')
    .filter((item: string) => item)
    .map((i: string) => <Tag key={i}>{i}</Tag>);

  return (
    show && (
      <List.Item
        key={detail.id}
        actions={[
          <Link to={`edit/${detail.id}`}>编辑</Link>,
          statu ? (
            <Button
              type={'link'}
              onClick={() => switchArticleStatu(detail.id, 0, setStatu)}
            >
              设为草稿
            </Button>
          ) : (
            <Button
              type={'link'}
              onClick={() => switchArticleStatu(detail.id, 1, setStatu)}
            >
              发布
            </Button>
          ),
          <Popconfirm
            title="温馨提醒"
            description="是否删除该笔记？"
            onConfirm={() => removeArticle(detail.id, switchShow)}
            okText="确认"
            cancelText="取消"
          >
            <Button type={'link'} danger>
              删除
            </Button>
          </Popconfirm>,
        ]}
        extra={
          <AppImage
            src={detail.cover?.thumb ?? detail.cover.path}
            height={120}
            color={detail.color}
            preview={{ src: detail.cover.path }}
          />
        }
      >
        <List.Item.Meta
          title={detail.subTitle + '/' + detail.title}
          description={tabs}
        />
        {detail.intro}
      </List.Item>
    )
  );
};

export default ArticleItem;
