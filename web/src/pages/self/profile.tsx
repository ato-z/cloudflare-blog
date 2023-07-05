import { masterEdit } from '@web/api';
import FormPost from '@web/components/formPost';
import { useMaster } from '@web/store/master';
import { Col, Divider, Row, Form, Input, Upload, Button } from 'antd';
import { useLoaderData } from 'react-router-dom';

const SelfProfile = () => {
  const master = useLoaderData() as Master;
  const [, setMaster] = useMaster();

  /** 提交更新个人信息 */
  const onSubmit = async (post: {
    createDate: string;
    intro: string;
    name: string;
    nickname: string;
  }) => {
    await masterEdit(post);
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
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-circle"
          >
            Edit
          </Upload>
        </Col>
      </Row>
    </article>
  );
};

export default SelfProfile;
