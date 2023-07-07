import { Store } from 'antd/es/form/interface';
import { Form, message } from 'antd';
import { tailErr } from '@web/helper';

const FormPost = (ctx: {
  children: React.ReactNode;
  items: FormItem[];
  initialValues?: Store;
  layout?: 'horizontal' | 'inline' | 'vertical';
  autoComplete?: string;

  onSubmit: (post: any) => LikePromise<string | void>;
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    message.loading('正在提交');
    try {
      const msg = (await ctx.onSubmit(values)) ?? '操作成功';
      message.destroy();
      message.success(msg);
    } catch (err: unknown) {
      tailErr(err);
    }
  };

  const onFinishFailed = (err: any) => {
    console.log('onFinishFailed', err);
  };

  return (
    <Form
      form={form}
      initialValues={ctx.initialValues}
      layout={ctx.layout ?? 'vertical'}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {ctx.items.map(item => (
        <Form.Item key={item.name} {...item}>
          {item.element}
        </Form.Item>
      ))}

      {ctx.children}
    </Form>
  );
};

export default FormPost;
