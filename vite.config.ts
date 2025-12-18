import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite' // 新增 loadEnv，用于读取环境变量
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock' // 导入 mock 插件

export default defineConfig(({ mode }) => {
  // 加载当前环境的环境变量（.env.development 或 .env.mock）
  const env = loadEnv(mode, process.cwd())
  // 判断是否启用 mock（根据环境变量 VITE_USE_MOCK）
  const useMock = env.VITE_USE_MOCK === 'true'

  return {
    plugins: [
      vue(),
      vueDevTools(),
      // 只有启用 mock 时，才加载 mock 插件（避免影响真实接口模式）
      // 关键修复：适配 3.0.2 版本的配置，并用 ts-ignore 忽略类型报错
      useMock &&
        // @ts-ignore （忽略 TS 对未知字段的检查，不影响功能）
        viteMockServe({
          mockPath: './src/mock', // mock 文件目录（必须手动创建）
          enable: useMock, // 3.0.2 版本核心开关：是否启用 mock（替代旧字段）
          logger: false, // 关闭 mock 日志（可选）
          watchFiles: true, // 监听 mock 文件变化，支持热更新
        }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        // 原有跨域代理配置不变，只在走真实接口时生效
        '/api': {
          target: 'http://8.134.138.69:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
