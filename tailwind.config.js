/** @type {import('tailwindcss').Config} */
export default {
  // 配置需要生效的文件路径
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // 扫描 src 下所有 Vue/JS/TS 文件
  ],
  theme: {
    extend: {}, // 可在这里扩展自定义主题（如颜色、字体）
  },
  plugins: [],
}
