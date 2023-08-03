import { Input } from 'antd';

/**
 * 个人信息
 */
export const profileProps = [
  { name: 'name', label: '登录名', element: <Input readOnly /> },
  { name: 'nickname', label: '昵称', element: <Input /> },
  { name: 'intro', label: '简介', element: <Input.TextArea /> },
  {
    name: 'createDate',
    label: '注册时间',
    element: <Input readOnly />,
  },
];

/**
 * 修改密码
 */
export const repassProps = [
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
];
