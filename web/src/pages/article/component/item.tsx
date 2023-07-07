import { Button, List } from 'antd';
const ArticleItem = ({ detail }: { detail: any }) => {
  return (
    <List.Item
      key={detail.title}
      actions={[
        <Button type={'link'}>编辑</Button>,
        <Button type={'link'}>发布</Button>,
        <Button type={'link'}>删除</Button>,
      ]}
      extra={
        <img
          width={272}
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
      }
    >
      <List.Item.Meta
        title={detail.subTitle + '/' + detail.title}
        description={detail.tags}
      />
      {detail.intro}
    </List.Item>
  );
};

export default ArticleItem;
