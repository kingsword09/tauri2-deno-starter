# Tauri2 Deno Starter

这是一个使用 Tauri2 和 Deno 的现代化跨平台应用开发模板，通过 Deno workspace 管理依赖，提供了无缝的开发体验。

## 特性

- 🦕 **Deno集成**：利用Deno的TypeScript原生支持，无需编译即可使用
- 🔌 **Tauri2插件支持**：直接在TypeScript中使用Tauri2插件
- 📦 **Deno Workspace**：统一管理项目依赖和自定义包
- 🚀 **无编译开发体验**：直接使用TypeScript，提高开发效率
- 🌐 **JSR发布支持**：可以将插件包发布到jsr.io，实现在Node环境中的复用
- 🦀 **Crates发布**：支持将Rust组件发布到crates.io，方便Rust社区复用
- ⚡ **高性能**：结合Rust的性能和Deno的开发效率，创建高性能应用
- 🔒 **安全性**：继承Tauri和Deno的安全特性，提供更安全的应用环境

## 项目结构

```text
tauri2-deno-starter/
├── app/                 # 应用主目录
│   ├── src/             # 前端源代码
│   └── src-tauri/       # Tauri相关配置和Rust代码
├── plugins/             # 自定义Tauri插件
├── packages/            # 自定义Deno TS包
├── deno.json            # Deno配置文件
├── README.md            # 英文项目说明文档
└── README_ZH.md         # 中文项目说明文档
```

## 快速开始

### 前置条件

- [Deno](https://deno.com/) 2.0 或更高版本
- [Rust](https://www.rust-lang.org/) 1.77 或更高版本
- [Tauri](https://v2.tauri.app/) 2.0.0 或更高版本

### 启动项目

```bash
# 克隆仓库
git clone https://github.com/kingsword09/tauri2-deno-starter.git
cd tauri2-deno-starter

# 启动桌面端
deno task dev:desktop
```

### 添加自定义 Deno 包

1. 初始化一个 lib

```bash
cd packages
deno init [package_name] --lib
```

2. 添加到项目根目录的 deno.json 中

```json
{
  "workspace": [
    ...其它包,
    "./packages/[package_name]"
  ]
}
```

### 添加自定义 Tauri 插件

1. 初始化一个插件

```bash
cd plugins
deno run -A npm:@tauri-apps/cli plugin new [plugin_name]
```

2. 初始化的插件需要改为 ts 项目，默认是 js 项目；
3. 创建 deno.json 文件，插件目录和插件内`examples/tauri-app`内的测试项目也需要添加；
4. 添加到项目根目录的 deno.json 中。

```json
{
  "workspace": [
   ...其它包,
    "./plugins/[plugin_name]",
    "./plugins/[plugin_name]/examples/tauri-app"
  ]
}
```

## 发布

1. deno 包可以发布到 [JSR](https://jsr.io)；
2. tauri plugins 中 TypeScript API 可以发布到[JSR](https://jsr.io)和 Rust 代码可以发布到[crates](https://crates.io)。

