import { FC, useState } from "react";
import { downloadM3U8 } from "./downloadM3U8";
import { Button, Form, Input } from "antd";

const DownLoader: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, withLoading] = useLoading();

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        right: "0.5rem",
        top: "0.5rem",
        width: "36rem",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Button type="primary" onClick={() => setIsExpanded((val) => !val)}>
        m3u8视频下载器 {isExpanded ? "收起" : "展开"}
      </Button>
      <Form
        onFinish={withLoading(downloadM3U8)}
        style={{ display: isExpanded ? "block" : "none" }}
      >
        <Form.Item
          label={"视频名称"}
          name="name"
          rules={[{ required: true, message: "请输入视频名称" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label={"m3u8视频url"}
          name="url"
          rules={[{ required: true, message: "请输入视频url" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            下载
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DownLoader;

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  function withLoading<Args extends any[], R>(fn: (...args: Args) => R) {
    return async (...args: Args) => {
      setLoading(true);
      try {
        return await fn(...args);
      } finally {
        setLoading(false);
      }
    };
  }
  return [loading, withLoading] as const;
};
