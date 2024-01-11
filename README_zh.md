# zippng
[English](./README.md)   
一个使用 TinyPNG API 压缩 PNG 图片的简单 Node.js 脚本。

## 安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/your_username/zippng.git
   cd zippng
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

## 使用

```bash
zippng [-r|-v|-h|-s key]
```

- `-r`：递归搜索 PNG 文件。
- `-v`：查看版本。
- `-h`：查看帮助文档。
- `-s key`：设置 TinyPNG API 密钥。

## 配置

脚本需要 TinyPNG API 密钥。可以参考[TinyPNG Developers](https://tinify.com/developers)进行申请。  
使用`zippng -s YOUR_API_KEY`进行配置

## 示例

```bash
# 压缩当前目录中的 PNG 文件
zippng

# 递归压缩 PNG 文件
zippng -r

# 设置 TinyPNG API 密钥
zippng -s YOUR_API_KEY
```

## 版本

查看脚本版本：

```bash
zippng -v
```

## 帮助

查看帮助文档：

```bash
zippng -h
```

## 注意事项

- 如果未提供 API 密钥或者提供了错误的 API 密钥，脚本将无法按照预期运行。
- 有关 TinyPNG API 的更多详细信息，请参阅 [TinyPNG Developers](https://tinypng.com/developers)。

## 许可证

本项目采用 MIT 许可证授权 - 详细信息请参阅 [LICENSE](LICENSE) 文件。
