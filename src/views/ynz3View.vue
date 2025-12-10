<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-8 text-center">懒加载综合演示页面</h1>

    <!-- 1. 图片懒加载（原生 lazy + 渐进式加载） -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold mb-4">1. 图片懒加载</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="(img, index) in imageList"
          :key="img.id"
          class="rounded overflow-hidden shadow-sm"
        >
          <img
            :src="img.thumbnailUrl"
            :data-src="img.originalUrl"
            class="w-full h-40 object-cover transition-opacity duration-300"
            @load="handleImgLoad($event, img)"
            @error="handleImgError($event)"
            lazy
            :style="{ opacity: img.loaded ? 1 : 0.3 }"
            alt="懒加载图片"
          />
          <p class="text-center p-2 text-sm">图片 {{ index + 1 }}</p>
        </div>
      </div>
    </section>

    <!-- 2. 组件懒加载（点击触发 + Suspense） -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold mb-4">2. 组件懒加载</h2>
      <button
        @click="showAsyncComponent = true"
        class="px-4 py-2 my-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
        :disabled="showAsyncComponent"
      >
        加载异步组件
      </button>

      <Suspense v-if="showAsyncComponent" class="mt-4">
        <template #default>
          <AsyncComponent />
          <!-- 懒加载组件 -->
        </template>
        <template #fallback>
          <div class="text-center py-4">组件加载中...</div>
        </template>
      </Suspense>
    </section>

    <!-- 3. 视频懒加载（点击触发） -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold mb-4">3. 视频懒加载</h2>
      <button
        @click="isVideoLoaded = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        :disabled="isVideoLoaded"
      >
        加载并播放视频
      </button>

      <div class="mt-4">
        <video
          v-if="isVideoLoaded"
          controls
          class="w-full max-w-2xl mx-auto"
          :src="videoUrl"
          poster="https://picsum.photos/1280/720?grayscale"
        >
          您的浏览器不支持视频播放
        </video>
        <div v-else class="text-center py-8 bg-gray-100 rounded max-w-2xl mx-auto">
          点击按钮加载视频
        </div>
      </div>
    </section>

    <!-- 4. 数据懒加载（滚动加载更多） -->
    <section>
      <h2 class="text-xl font-semibold mb-4">4. 数据懒加载（滚动加载）</h2>
      <div
        class="overflow-y-auto h-80 border rounded"
        v-infinite-scroll="loadMoreData"
        :infinite-scroll-disabled="dataLoading || noMoreData"
        infinite-scroll-distance="50"
      >
        <div
          v-for="item in dataList"
          :key="item.id"
          class="p-4 border-b last:border-b-0 hover:bg-gray-50 transition"
        >
          <h3 class="font-medium">数据项 {{ item.id }}</h3>
          <p class="text-gray-600 text-sm">这是滚动加载的懒数据，内容 {{ item.content }}</p>
        </div>

        <div v-if="dataLoading" class="text-center py-4">数据加载中...</div>
        <div v-if="noMoreData" class="text-center py-4 text-gray-500">已加载全部数据</div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { ElInfiniteScroll } from 'element-plus'

// -------------------------- 1. 图片懒加载相关 --------------------------
// 模拟图片列表（缩略图+原图）
const imageList = ref([
  {
    id: 1,
    thumbnailUrl: 'https://picsum.photos/100/100?1',
    originalUrl: 'https://picsum.photos/800/600?1',
    loaded: false,
  },
  {
    id: 2,
    thumbnailUrl: 'https://picsum.photos/100/100?2',
    originalUrl: 'https://picsum.photos/800/600?2',
    loaded: false,
  },
  {
    id: 3,
    thumbnailUrl: 'https://picsum.photos/100/100?3',
    originalUrl: 'https://picsum.photos/800/600?3',
    loaded: false,
  },
  {
    id: 4,
    thumbnailUrl: 'https://picsum.photos/100/100?4',
    originalUrl: 'https://picsum.photos/800/600?4',
    loaded: false,
  },
  {
    id: 5,
    thumbnailUrl: 'https://picsum.photos/100/100?5',
    originalUrl: 'https://picsum.photos/800/600?5',
    loaded: false,
  },
  {
    id: 6,
    thumbnailUrl: 'https://picsum.photos/100/100?6',
    originalUrl: 'https://picsum.photos/800/600?6',
    loaded: false,
  },
  {
    id: 7,
    thumbnailUrl: 'https://picsum.photos/100/100?7',
    originalUrl: 'https://picsum.photos/800/600?7',
    loaded: false,
  },
  {
    id: 8,
    thumbnailUrl: 'https://picsum.photos/100/100?8',
    originalUrl: 'https://picsum.photos/800/600?8',
    loaded: false,
  },
])

// 图片加载完成：替换为原图（渐进式加载）
const handleImgLoad = (e: Event, img: { loaded: boolean; originalUrl: string }) => {
  const imgEl = e.target as HTMLImageElement
  if (!img.loaded) {
    imgEl.src = img.originalUrl
    img.loaded = true
  }
}

// 图片加载失败：显示占位图
const handleImgError = (e: Event) => {
  const imgEl = e.target as HTMLImageElement
  imgEl.src = 'https://picsum.photos/100/100?error' // 错误占位图
  imgEl.style.opacity = '1'
}

// -------------------------- 2. 组件懒加载相关 --------------------------
const showAsyncComponent = ref(false)
// 定义异步组件（懒加载）
const AsyncComponent = defineAsyncComponent(
  () => import('@/components/Common.vue'), // 替换为你的组件路径
)

// -------------------------- 3. 视频懒加载相关 --------------------------
const isVideoLoaded = ref(false)
// 测试视频地址（公开可访问）
const videoUrl =
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4'

// -------------------------- 4. 数据懒加载相关 --------------------------
interface LazyData {
  id: number
  content: string
}

const dataList = ref<LazyData[]>([]) // 懒加载数据列表
const dataPage = ref(1) // 当前页码
const dataLoading = ref(false) // 加载中状态
const noMoreData = ref(false) // 无更多数据
const totalData = 50 // 模拟总数据量

// 模拟接口请求数据
const fetchData = async (page: number) => {
  dataLoading.value = true
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 800))
  // 生成模拟数据
  const newData = Array.from({ length: 10 }, (_, i) => ({
    id: (page - 1) * 10 + i + 1,
    content: `第 ${page} 页 - 第 ${i + 1} 条`,
  }))
  dataList.value = [...dataList.value, ...newData]
  dataLoading.value = false
  // 判断是否加载完所有数据
  if (dataList.value.length >= totalData) {
    noMoreData.value = true
  }
}

// 初始化加载第一页数据
fetchData(dataPage.value)

// 滚动加载更多
const loadMoreData = () => {
  if (!dataLoading.value && !noMoreData.value) {
    dataPage.value++
    fetchData(dataPage.value)
  }
}
</script>

<style scoped>
/* 滚动条样式优化 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #ddd;
  border-radius: 3px;
}
::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

/* 加载动画（可选） */
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
