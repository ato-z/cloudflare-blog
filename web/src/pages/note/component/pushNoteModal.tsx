import FormPost from '@web/components/formPost';
import { Button, Form, Modal, Space } from 'antd';
import { useState } from 'react';
import { noteProps } from '../vars';
import { useMarkdown } from '@web/components/editView/markdown';
import { tailErr } from '@web/helper';
import { NoteProp } from '@web/api';

const WithFrom = ({
  onSubmit,
  onCancel,
  initData,
}: {
  onSubmit: (op: any) => Promise<any>;
  onCancel: () => void;
  initData?: NoteProp & { id: number };
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [vd, markdown] = useMarkdown({ ctx: initData ? initData.content : '' });
  return (
    <FormPost
      initialValues={initData}
      items={noteProps({ markdown })}
      onSubmit={async data => {
        setConfirmLoading(true);
        await onSubmit({
          ...(initData ?? {}),
          ...data,
          content: vd.getValue(),
        });
        setConfirmLoading(false);
      }}
    >
      <Form.Item>
        <Space>
          <Button key="back" onClick={onCancel}>
            取消
          </Button>
          <Button
            key="submit"
            htmlType="submit"
            type="primary"
            loading={confirmLoading}
          >
            提交
          </Button>
        </Space>
      </Form.Item>
    </FormPost>
  );
};

type PushNoteModalProp = {
  requset: (op: any) => Promise<any>;
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  title: string;
  initData?: NoteProp & { id: number };
};
export const PushNoteModal = ({
  requset,
  open,
  setOpen,
  title,
  initData,
}: PushNoteModalProp) => {
  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      await requset(data);
      Object.assign(initData ?? {}, data);
      setOpen(false);
    } catch (err) {
      tailErr(err);
    }
  };
  const handleCancel = () => setOpen(false);
  const form = (
    <WithFrom
      initData={initData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
  return (
    <Modal
      title={title}
      open={open}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose={true}
    >
      {open ? form : 'loading...'}
    </Modal>
  );
};
