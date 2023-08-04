import { ExceptionProp } from '@web/api/exception';
import { List, Typography } from 'antd';

const ExceptionItem = ({ detail }: { detail: ExceptionProp }) => {
  return (
    <List.Item
      key={detail.id}
      extra={<Typography.Text>{detail.message}</Typography.Text>}
    >
      <List.Item.Meta
        title={
          <>
            <Typography.Text keyboard>{detail.method}</Typography.Text>{' '}
            <Typography.Text type="danger">{detail.url}</Typography.Text>
          </>
        }
        description={`${detail.createDate}`}
      />
      <Typography.Paragraph
        copyable={{ tooltips: '复制到剪切板', text: detail.params }}
      >
        params: {detail.params}
      </Typography.Paragraph>
      <Typography.Paragraph
        copyable={{ tooltips: '复制到剪切板', text: detail.header }}
      >
        header: {detail.header}
      </Typography.Paragraph>
      <Typography.Paragraph
        ellipsis={{ rows: 2 }}
        copyable={{ tooltips: '复制到剪切板', text: detail.body }}
      >
        body: {detail.body}
      </Typography.Paragraph>
      <Typography.Paragraph strong>stack: {detail.stack}</Typography.Paragraph>
    </List.Item>
  );
};

export default ExceptionItem;
