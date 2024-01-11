# zippng
[中文](./README_zh.md)
A simple Node.js script for compressing PNG format images using the TinyPNG API.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lidppp/zippng-node.git
   cd zippng
   yarn install
   ```

2. Install dependencies:
   ```bash
   npm install -g zippng
   ```

## Usage

```bash
zippng [-r|-v|-h|-s key]
```

- `-r`: Recursively search for PNG files.
- `-v`: View version.
- `-h`: Help documentation.
- `-s key`: Set TinyPNG API Key.

## Configuration

The script requires a TinyPNG API key. You can refer to the [TinyPNG documentation](https://tinify.com/developers) for the application process.   
Configure using `zippng -s YOUR_API_KEY`    

## Example

```bash
# Compress PNG files in the current directory
zippng

# Recursively compress PNG files
zippng -r

# Set TinyPNG API Key
zippng -s YOUR_API_KEY
```

## Version

Check the version of the script:

```bash
zippng -v
```

## Help

View help documentation:

```bash
zippng -h
```

## Notes

- If an API key is not provided or an incorrect API key is provided, the script will not run as expected.
- For more details on TinyPNG API, refer to [TinyPNG Developers](https://tinypng.com/developers).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
