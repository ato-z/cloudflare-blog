import { masterEdit } from '@web/api';
import FormPost from '@web/components/formPost';
import { useMaster } from '@web/store/master';
import { Col, Divider, Row, Form, Input, Button } from 'antd';
import { useLoaderData } from 'react-router-dom';
import UploadCover from './component/uploadCover';
import { useState } from 'react';

const SelfProfile = () => {
  const master = useLoaderData() as Master;
  const [, setMaster] = useMaster();
  const [cover, setCoverId] = useState<number>(0);

  /** 提交更新个人信息 */
  const onSubmit = async (post: {
    createDate: string;
    intro: string;
    name: string;
    nickname: string;
  }) => {
    await masterEdit({ ...post, cover });
    setMaster(post);
  };

  return (
    <article>
      <Divider orientation="left">设置</Divider>
      <Row gutter={16}>
        <Col className="gutter-row" span={16} offset={2}>
          <FormPost
            items={[
              { name: 'name', label: '登录名', element: <Input readOnly /> },
              { name: 'nickname', label: '昵称', element: <Input /> },
              { name: 'intro', label: '简介', element: <Input.TextArea /> },
              {
                name: 'createDate',
                label: '注册时间',
                element: <Input readOnly />,
              },
            ]}
            initialValues={master}
            onSubmit={onSubmit}
          >
            <Form.Item>
              <Button htmlType="submit" type="primary">
                提交
              </Button>
            </Form.Item>
          </FormPost>
        </Col>
        <Col className="gutter-row" span={6}>
          <UploadCover
            cover={master.cover ? master.cover.path : undefined}
            onSuccess={({ id }) => setCoverId(id)}
          />
        </Col>
      </Row>
    </article>
  );
};

export default SelfProfile;
