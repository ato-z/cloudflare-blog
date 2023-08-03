import { AnimaView } from '@web/components/animaRouter';
import { useSearchForm } from '@web/components/tableView/searchForm';
import { Button, List } from 'antd';
import { useEffect, useState } from 'react';
import { siteConfig } from '@web/config';
import { useNavigate } from 'react-router-dom';
import useDatalist from '@web/helper/useDatalist';
import { articleList } from '@web/api';
import ArticleItem from './component/item';
import { articleSearchProps } from './vars';

const { pageSize } = siteConfig;

export const ArticleList = () => {
  const navigate = useNavigate();
  const [SearchForm, searchData] = useSearchForm({ items: articleSearchProps });
  const [currentPage, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  // 笔记列表
  const [setParams, _total, view] = useDatalist(articleList, data => (
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
  ));

  // 用户检索状态
  useEffect(() => {
    const end = Math.max(currentPage * pageSize, pageSize);
    const start = end - pageSize;
    setParams({ start, end, ...searchData });
  }, [searchData, currentPage, setParams]);

  // 统计页码
  useEffect(() => {
    setTotal(_total);
  }, [_total, setTotal]);

  return (
    <AnimaView>
      <article>
        <section>{SearchForm}</section>
        <section style={{ margin: '20px 0 ' }}>
          <Button onClick={() => navigate('push')} type={'primary'}>
            添加笔记
          </Button>
        </section>

        <section>{view}</section>
      </article>
    </AnimaView>
  );
};

export default ArticleList;
