import { FC, useState } from "react";
import { downloadM3U8 } from "./downloadM3U8";
import { Button, Form, Input } from "antd";

const DownLoader: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, withLoading] = useLoading();

  return (
    <div className="fixed z-50 right-2 top-2 w-xl flex flex-col gap-2 p-4 rounded-2xl ring-2">
      <Button type="primary" onClick={() => setIsExpanded((val) => !val)}>
        m3u8视频下载器 {isExpanded ? "展开" : "收起"}
      </Button>
      <Form
        onFinish={withLoading(downloadM3U8)}
        className={isExpanded ? "hidden" : "block"}
      >
        <Form.Item
          label={"视频名称"}
          name="name"
          rules={[{ required: true, message: "请输入视频名称" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label={"m3u8"}
          name="url"
          rules={[{ required: true, message: "请输入视频url" }]}
        >
          <Input placeholder="输入m3u8 url"></Input>
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
