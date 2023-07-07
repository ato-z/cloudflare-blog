import { Select } from 'antd';

const ArticleStatus = () => {
  return (
    <Select defaultValue={-1} style={{ minWidth: '100px' }}>
      <Select.Option value={-1}>所有</Select.Option>
      <Select.Option value={1}>发布</Select.Option>
      <Select.Option value={0}>草稿</Select.Option>
    </Select>
  );
};

export default ArticleStatus;
