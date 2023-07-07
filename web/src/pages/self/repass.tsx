import { masterRePass } from '@web/api';
import FormPost from '@web/components/formPost';
import { Divider, Form, Input, Button } from 'antd';
const RePass = () => {
  /** 提交更新个人信息 */
  const onSubmit = async (post: {
    oldPassword: string;
    password: string;
    rePassword: string;
  }) => {
    await masterRePass(post);

    return '密码已修改';
  };
  return (
    <article>
      <Divider orientation="left">修改密码</Divider>
      <section style={{ maxWidth: '700px' }}>
        <FormPost
          items={[
            {
              name: 'oldPassword',
              label: '密码',
              element: <Input type="password" />,
              rules: [{ required: true }],
            },
            {
              name: 'password',
              label: '新密码',
              element: <Input type="password" />,
              rules: [{ required: true }],
            },
            {
              name: 'rePassword',
              label: '确认密码',
              element: <Input type="password" />,
              rules: [{ required: true }],
            },
          ]}
          onSubmit={onSubmit}
        >
          <Form.Item>
            <Button htmlType="submit" type="primary">
              提交
            </Button>
          </Form.Item>
        </FormPost>
      </section>
    </article>
  );
};

export default RePass;
