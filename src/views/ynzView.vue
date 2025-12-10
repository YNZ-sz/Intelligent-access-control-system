<template>
  <div>
    <!-- Canvas 绘制区域 -->
    <canvas ref="myCanvas" width="40" height="30"></canvas>

    <!-- 上传按钮 -->

    <!-- 上传结果提示 -->
    <div v-if="uploadResult">{{ uploadResult }}</div>
    <button @click="uploadCanvasImage" style="margin-top: 10px">上传 Canvas 图片</button>
    <div></div>
    <input type="file" @change="filechange" />
    <img ref="img1" :src="b64url" width="400" height="300" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

let img1 = ref<any>(null)
let b64url = ref<any>('')
// Canvas 实例引用
const myCanvas = ref<HTMLCanvasElement | null>(null)
// 上传结果提示
const uploadResult = ref('')

// 1. 页面加载时，在 Canvas 绘制一个简单图形（示例：红色矩形 + 文字）
onMounted(() => {})
const filechange = (e: any) => {
  let fr = new FileReader()
  fr.readAsDataURL(e.target.files[0])
  fr.onload = function () {
    b64url.value = fr.result
  }
}
// 2. 核心：上传 Canvas 图片到后端
const uploadCanvasImage = async () => {
  const canvas = myCanvas.value
  if (!canvas) {
    uploadResult.value = 'Canvas 元素不存在！'
    return
  }
  let ctx = canvas.getContext('2d')
  if (img1.value) {
    ctx?.drawImage(img1.value, 0, 0, 40, 30)
  }
  try {
    console.log('进入上传中')
    uploadResult.value = '上传中...'

    // 步骤1：Canvas 转为 Blob（格式：png，质量：0.9，可改为 jpeg 等）
    const blob = await new Promise<Blob | null>((resolve) => {
      console.log('开始变toBlob')

      // toBlob 回调函数：成功则返回 Blob，失败返回 null
      canvas.toBlob(
        (blob) => {
          console.log('已经变成toBlob')
          resolve(blob)
        },
        'image/png', // 图片格式（支持 image/jpeg、image/webp 等）
        0.9, // 图片质量（0-1，仅对 jpeg/webp 有效）
      )
    })

    if (!blob) {
      throw new Error('Canvas 转 Blob 失败')
    }

    // 步骤2：构建 FormData（后端需按 FormData 格式接收）
    const formData = new FormData()
    // 存入文件：参数1=后端接收文件的字段名（需与后端一致，例：file）；参数2=Blob对象；参数3=文件名
    formData.append('file', blob, `canvas-upload-${Date.now()}.png`)
    // 可额外添加其他参数（如用户ID、图片描述等）
    formData.append('userId', '1001')
    formData.append('desc', 'Canvas 绘制的图片')
    console.log(formData)
    //   // 步骤3：axios 发送上传请求（POST）
    //   const response = await axios({
    //     url: '/api/upload/image', // 后端上传接口地址（替换为你的实际接口）
    //     method: 'POST',
    //     data: formData, // 直接传 FormData，axios 会自动设置 Content-Type: multipart/form-data
    //     headers: {
    //       // 若后端需要 Token 验证，添加请求头（根据你的项目情况调整）
    //       Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     },
    //     // 可选：上传进度监听
    //     onUploadProgress: (progressEvent) => {
    //       const progress = (progressEvent.loaded / (progressEvent.total || 1)) * 100
    //       console.log(`上传进度：${progress.toFixed(2)}%`)
    //     },
    //   })

    //   // 步骤4：处理后端响应（根据后端返回格式调整）
    //   if (response.data.code === 200) {
    //     uploadResult.value = `上传成功！图片地址：${response.data.data.imageUrl}`
    //     console.log('图片上传成功', response.data.data)
    //   } else {
    //     throw new Error(response.data.message || '上传失败')
    //   }
  } catch (error) {
    uploadResult.value = `上传失败：${(error as Error).message}`
    console.error('图片上传出错', error)
  }
}
</script>
