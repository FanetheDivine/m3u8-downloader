import { FC, useState } from "react";
import { downloadM3U8 } from "./downloadM3U8";
import { Button, Form, Input, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useBoolean } from "ahooks";

const DownLoader: FC = () => {
  const [close, { toggle: toggleClose }] = useBoolean(false);
  const [isExpanded, { toggle: toggleExpanded }] = useBoolean(false);
  const [loading, withLoading] = useLoading();

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        right: "0.5rem",
        top: "0.5rem",
        width: "24rem",
        backgroundColor: "white",
        display: close ? "none" : "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <span style={{ display: "flex", gap: 5 }}>
        <Button type="primary" onClick={toggleExpanded} style={{ flex: 1 }}>
          m3u8视频下载器 {isExpanded ? "收起" : "展开"}
        </Button>
        <CloseCircleOutlined onClick={toggleClose} />
      </span>
      <Form
        onFinish={withLoading(downloadM3U8)}
        style={{ display: isExpanded ? "block" : "none" }}
      >
        <Form.Item
          label={"视频url"}
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
        下载结束后，执行这段命令转换视频格式！<br></br>
        <Typography.Text code copyable>
          ffmpeg -i video.ts -c copy output.mp4
        </Typography.Text>
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
        debugger;
        setLoading(false);
      }
    };
  }
  return [loading, withLoading] as const;
};
