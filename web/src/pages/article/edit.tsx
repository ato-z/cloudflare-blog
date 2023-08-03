import FormPost from '@web/components/formPost';
import { Button, Col, Divider, Form, Row } from 'antd';
import { articleProps, ArticleProps } from './vars';
import { useMarkdown } from '@web/components/editView/markdown';
import { ArticleDetailProp, articleEdit } from '@web/api/article';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';

export const ArticleEdit = () => {
  const { detail, initData } = useLoaderData() as {
    detail: ArticleDetailProp;
    initData: Record<string, string>;
  };

  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    cover: detail.cover.id,
  });
  const [vd, markdown] = useMarkdown({ ctx: detail.content });
  const [cover, setCover] = useState<string>(
    detail.cover.thumb ?? detail.cover.path,
  );
  const onUploadCover = useCallback(
    (key: string, result: { id: string; path: string }) => {
      setPostData(data => ({ ...data, [key]: result.id }));
      setCover(result.path);
    },
    [setCover, setPostData],
  );

  const onSubmit = async (post: ArticleProps) => {
    const data = { ...post, ...postData, content: vd.getValue() };
    await articleEdit(detail.id, data);

    setTimeout(() => {
      navigate('/article');
    }, 1500);
    return '编辑成功';
  };

  return (
    <article>
      <Divider orientation="left">编辑笔记</Divider>
      <Row>
        <Col span={8}>
          <FormPost
            items={articleProps({
              uploadSuccess: onUploadCover,
              cover,
              pubDate: detail.pubDate,
            })}
            onSubmit={onSubmit}
            initialValues={initData}
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

export default ArticleEdit;
