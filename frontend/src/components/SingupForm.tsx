"use client";
import { signUp } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
  username?: string;
};

export default function SignUpForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onFinish: FormProps<FieldType>["onFinish"] = (values: {
    email?: string;
    password?: string;
    username?: string;
  }) => {
    if (!values.email || !values.password || !values.username) return;
    dispatch(
      signUp({
        email: values.email,
        password: values.password,
        name: values.username,
      })
    ).then((res: { type: string; error?: any }) => {
      if (res.type?.includes("/rejected")) {
        console.error(res.error?.message || "Failed to sign up");
        return messageApi.warning(res.error?.message || "Failed to sign up");
      }
      router.replace("/");
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            pattern: /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "At least 6 characters!" },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
