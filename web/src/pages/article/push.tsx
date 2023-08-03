import FormPost from '@web/components/formPost';
import { Button, Col, Divider, Form, Row } from 'antd';
import { articleProps, ArticleProps } from './vars';
import { useMarkdown } from '@web/components/editView/markdown';
import { articleAdd } from '@web/api/article';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

export const ArticlePush = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({});
  const [vd, markdown] = useMarkdown({ ctx: '' });
  const [cover, setCover] = useState<string>('');
  const onUploadCover = useCallback(
    (key: string, result: { id: string; path: string }) => {
      setPostData(data => ({ ...data, [key]: result.id }));
      setCover(result.path);
    },
    [setCover, setPostData],
  );

  const onSubmit = async (post: ArticleProps) => {
    const data = { ...post, ...postData, content: vd.getValue() };
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
            items={articleProps({ uploadSuccess: onUploadCover, cover })}
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
