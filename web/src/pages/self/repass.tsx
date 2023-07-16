import { masterRePass } from '@web/api';
import FormPost from '@web/components/formPost';
import { Divider, Form, Button } from 'antd';
import { repassProps } from './vars';
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
        <FormPost items={repassProps} onSubmit={onSubmit}>
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
