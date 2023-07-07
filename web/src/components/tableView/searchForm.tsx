import { Button, Col, Form, Space } from 'antd';
import { useCallback, useState } from 'react';

type FormItem = { name: string; label: string; element: React.ReactNode };

export const useSearchForm = ({ items }: { items: FormItem[] }) => {
  const [post, setPost] = useState({});

  const onFinish = useCallback(
    (fromData: Record<string, number | string | undefined | null>) => {
      const entries = Object.entries(fromData).filter(([, val]) => val);
      const data = Object.fromEntries(entries);
      setPost(data);
    },
    [setPost],
  );

  const SearchForm = (
    <Form layout={'inline'} size={'middle'} onFinish={onFinish}>
      {items.map(item => (
        <Form.Item key={item.name} name={item.name} label={item.label}>
          {item.element}
        </Form.Item>
      ))}

      <Col
        span={24}
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'right',
          flexShrink: 0,
        }}
      >
        <Space>
          <Button
            type={'primary'}
            style={{ width: '100px' }}
            size={'middle'}
            htmlType="submit"
          >
            检索
          </Button>
          <Button
            type={'primary'}
            danger
            style={{ width: '100px' }}
            size={'middle'}
            htmlType="reset"
          >
            重置
          </Button>
        </Space>
      </Col>
    </Form>
  );

  return [SearchForm, post] as const;
};
