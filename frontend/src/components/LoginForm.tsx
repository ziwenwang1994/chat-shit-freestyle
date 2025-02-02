"use client";
import { login } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish: FormProps<FieldType>["onFinish"] = useCallback(
    (values: { email?: string; password?: string }) => {
      if (!values.email || !values.password) return;
      dispatch(login({ email: values.email, password: values.password })).then(
        (res: { type: string; error?: any }) => {
          if (res.type?.includes("/rejected")) {
            console.error(res.error?.message || "Failed to sign up");
            return messageApi.warning(
              res.error?.message || "Failed to sign up"
            );
          }
          router.replace("/");
        }
      );
    },
    [dispatch, messageApi, router]
  );

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const leave = () => {
    setLeaving(true);
  };

  useEffect(() => {
    if (leaving) setTimeout(() => router.push("/signup"), 500);
  }, [leaving, router]);


  return (
    <Form
      key="login"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, display: leaving ? 'none' : '' }}
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
        <Button
          type="default"
          className="mx-2"
          onClick={() => router.push("/signup")}
        >
          {"Don't have an account?"}
        </Button>
      </Form.Item>
    </Form>
  );
}
