import { AnimaView } from '@web/components/animaRouter';
import { useSearchForm } from '@web/components/tableView/searchForm';
import { Button, Input, List } from 'antd';
import ArticleStatus from './component/status';
import { useEffect, useState } from 'react';
import { siteConfig } from '@web/config';
import ArticleItem from './component/item';

const { pageSize } = siteConfig;

const searchItems = [
  { name: 'title', label: '标题', element: <Input /> },
  { name: 'tags', label: '标签', element: <Input /> },
  { name: 'status', label: '状态', element: <ArticleStatus /> },
];

// 测试数据
const data = Array.from({ length: 23 }).map((_, i) => ({
  title: `ant design part ${i}`,
  subTitle: `part ${i}`,
  tags: ',标签1,标签2,标签3,',
  intro:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
}));

export const ArticleList = () => {
  const [SearchForm, searchData] = useSearchForm({ items: searchItems });
  const [currentPage, setPage] = useState(0);
  const [total, setTotal] = useState(100);

  useEffect(() => {
    console.log('搜索表单', searchData);
    console.log('分页参数', currentPage);
  }, [searchData, currentPage]);

  return (
    <AnimaView>
      <article>
        <section>{SearchForm}</section>
        <section style={{ margin: '20px 0 ' }}>
          <Button type={'primary'}>添加笔记</Button>
        </section>

        <section>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              total,
              pageSize,
              defaultCurrent: currentPage,
              onChange: page => setPage(page),
            }}
            dataSource={data}
            renderItem={item => <ArticleItem detail={item} />}
          />
        </section>
      </article>
    </AnimaView>
  );
};

export default ArticleList;
