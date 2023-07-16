import FormPost from '@web/components/formPost';
import { Button, Col, Divider, Form, Row } from 'antd';
import { articleProps, ArticleProps } from './vars';
import { useMarkdown } from '@web/components/editView/markdown';
import { articleAdd } from '@web/api/article';
import { useNavigate } from 'react-router-dom';

export const ArticlePush = () => {
  const navigate = useNavigate();
  const [vd, markdown] = useMarkdown({ ctx: '' });
  const onSubmit = async (postData: ArticleProps) => {
    const data = { ...postData, content: vd.getValue() };
    await articleAdd(data);

    setTimeout(() => {
      navigate('/article');
    }, 1500);
    return '新增笔记成功';
  };

  return (
    <article>
      <Divider orientation="left">添加笔记</Divider>
      <Row>
        <Col span={8}>
          <FormPost
            items={articleProps}
            onSubmit={onSubmit}
            initialValues={{ status: 0 }}
          >
            <Form.Item>
              <Button htmlType="submit" type="primary">
                提交
              </Button>
            </Form.Item>
          </FormPost>
        </Col>

        <Col span={16} style={{ paddingLeft: '20px' }}>
          {markdown}
        </Col>
      </Row>
    </article>
  );
};

export default ArticlePush;
