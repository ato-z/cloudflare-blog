import { AnimaView } from '@web/components/animaRouter';
import { List } from 'antd';
import { useEffect, useState } from 'react';
import { siteConfig } from '@web/config';
import useDatalist from '@web/helper/useDatalist';
import ExceptionItem from './component/ExceptionItem';
import { exceptionListGet } from '@web/api/exception';

const { pageSize } = siteConfig;

const ExceptionList = () => {
  const [currentPage, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  // 笔记列表
  const [setParams, _total, view] = useDatalist(exceptionListGet, data => (
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
      renderItem={item => <ExceptionItem detail={item} />}
    />
  ));

  // 用户检索状态
  useEffect(() => {
    const end = Math.max(currentPage * pageSize, pageSize);
    const start = end - pageSize;
    setParams({ start, end });
  }, [currentPage, setParams]);

  // 统计页码
  useEffect(() => {
    setTotal(_total);
  }, [_total, setTotal]);

  return (
    <AnimaView>
      <article>
        <section>{view}</section>
      </article>
    </AnimaView>
  );
};

export default ExceptionList;
