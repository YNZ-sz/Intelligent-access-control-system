<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden"
  >
    <!-- 粒子背景特效 -->
    <div class="fixed inset-0 z-0" ref="particleContainer"></div>

    <!-- 导航栏（滚动时变化） -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      :class="{
        'bg-slate-900/80 backdrop-blur-lg py-3 shadow-lg': scrollY > 50,
        'bg-transparent py-5': scrollY <= 50,
      }"
    >
      <div class="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <!-- <div
            class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center"
          >
            < Position  class="w-6 h-6" />
          </div> -->
          <span
            class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
            @click="back"
          >
            回到我的项目
          </span>
        </div>
        <nav class="hidden md:flex gap-8">
          <NavLink href="#home" :active="activeSection === 'home'">首页</NavLink>
          <NavLink href="#about" :active="activeSection === 'about'">关于我</NavLink>
          <NavLink href="#skills" :active="activeSection === 'skills'">技能</NavLink>
          <NavLink href="#projects" :active="activeSection === 'projects'">项目</NavLink>
          <NavLink href="#contact" :active="activeSection === 'contact'">联系</NavLink>
        </nav>
        <el-button
          type="primary"
          size="small"
          class="px-2 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0"
          @click="downloadResumeImage"
        >
          下载简历
        </el-button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="relative z-10">
      <!-- 首页英雄区 -->
      <section id="home" class="min-h-screen flex items-center justify-center py-20">
        <div class="container mx-auto px-4 md:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="space-y-6" ref="homeTextRef" data-scroll-animation="fade-right">
              <div
                class="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium border border-purple-500/30"
              >
                前端开发工程师 & 技术爱好者
              </div>
              <h1 class="text-4xl md:text-6xl font-bold leading-tight">
                你好，我是
                <span
                  class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
                  >叶诺舟</span
                >
              </h1>
              <p class="text-xl text-slate-300">
                专注于构建高性能、用户友好的数字产品，擅长将创意转化为代码
              </p>
              <div class="flex flex-wrap gap-4 pt-4">
                <el-button
                  type="primary"
                  size="large"
                  class="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0 px-8 rounded-full"
                  @click="openGitHub"
                >
                  查看我的作品
                  <ArrowRight class="ml-2" />
                </el-button>
                <el-button
                  type="default"
                  size="large"
                  class="bg-slate-800/50 hover:bg-slate-800 text-white border-slate-700 rounded-full px-8"
                  @click="openGitHub"
                >
                  了解更多
                </el-button>
              </div>
              <div
                class="flex gap-4 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
              >
                github.com/YNZ-sz
              </div>
            </div>
            <div class="relative" ref="homeImageRef" data-scroll-animation="fade-left">
              <!-- 头像容器 -->
              <div class="relative w-full max-w-md mx-auto">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-3xl transform -translate-x-4 translate-y-4"
                ></div>
                <img
                  src="@/assets/images/ynz001.jpg"
                  alt="Alex 个人头像"
                  class="relative z-10 w-full h-auto rounded-full border-4 border-slate-800 shadow-2xl"
                />
                <!-- 装饰元素 -->
                <!-- <div
                  class="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold"
                >
                  5+
                  <span class="text-xs block">年经验</span>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- 滚动指示器 -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown class="w-8 h-8 text-slate-400" />
        </div>
      </section>

      <!-- 关于我 -->
      <section id="about" class="py-20 bg-slate-900/50">
        <div class="container mx-auto px-4 md:px-8">
          <div
            class="text-center max-w-3xl mx-auto mb-16"
            ref="aboutTitleRef"
            data-scroll-animation="fade-up"
          >
            <h2 class="text-3xl md:text-4xl font-bold mb-4">关于我</h2>
            <div class="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
            <p class="text-slate-300">记录我的前端学习轨迹、实践思路与成长方向</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div ref="aboutImageRef" data-scroll-animation="fade-right">
              <div class="relative">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl transform -translate-x-2 translate-y-2"
                ></div>
                <img
                  src="@/assets/images/ynz002.jpg"
                  alt="工作场景"
                  class="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                />
                <!-- 装饰卡片 -->
                <!-- <div
                  class="absolute -bottom-40 bg-slate-800/90 backdrop-blur-sm p-4 rounded-xl border border-slate-700 shadow-xl max-w-xs"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Code class="w-6 h-6" />
                    </div>
                    <div>
                      <p class="font-bold">100+</p>
                      <p class="text-sm text-slate-400">成功交付项目</p>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>

            <div class="space-y-6" ref="aboutContentRef" data-scroll-animation="fade-left">
              <h3 class="text-2xl font-bold">深耕前端的实践型技术学习者</h3>
              <p class="text-slate-300 leading-relaxed">
                我是一名学习前端开发的大学生，平时会用 Vue、TypeScript
                这些技术做项目开发，也尝试过鸿蒙应用以及微信小程序的前端模块开发。
              </p>
              <p class="text-slate-300 leading-relaxed">
                熟悉常用的前端框架和工具，对前端页面优化、状态管理这些实际开发中的问题有一定处理经验，热衷于学习新技术，并将其应用到实际项目中。
              </p>

              <!-- 个人信息卡片 -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div
                  class="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700"
                >
                  <p class="text-slate-400 text-sm">姓名</p>
                  <p class="font-medium">叶诺舟</p>
                </div>
                <div
                  class="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700"
                >
                  <p class="text-slate-400 text-sm">职业</p>
                  <p class="font-medium">前端开发工程师</p>
                </div>
                <div
                  class="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700"
                >
                  <p class="text-slate-400 text-sm">邮箱</p>
                  <p class="font-medium">2557524312@qq.com</p>
                </div>
                <div
                  class="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700"
                >
                  <p class="text-slate-400 text-sm">所在地</p>
                  <p class="font-medium">广东, 深圳</p>
                </div>
              </div>

              <el-button
                type="default"
                class="bg-slate-800 hover:bg-slate-700 text-white border-slate-700 rounded-full px-6"
              >
                下载完整简历
                <Download class="ml-2" />
              </el-button>
            </div>
          </div>
        </div>
      </section>

      <!-- 技能部分 -->
      <section id="skills" class="py-20">
        <div class="container mx-auto px-4 md:px-8">
          <div
            class="text-center max-w-3xl mx-auto mb-16"
            ref="skillsTitleRef"
            data-scroll-animation="fade-up"
          >
            <h2 class="text-3xl md:text-4xl font-bold mb-4">我的技能</h2>
            <div class="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
            <p class="text-slate-300">掌握的技术栈和专业能力</p>
          </div>

          <!-- 技能分类标签 -->
          <div
            class="flex flex-wrap justify-center gap-3 mb-12"
            ref="skillsTabRef"
            data-scroll-animation="fade-up"
          >
            <el-button
              v-for="(tab, index) in skillTabs"
              :key="index"
              :class="[
                'rounded-full px-6',
                activeSkillTab === index
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0'
                  : 'bg-slate-800/50 text-slate-300 border border-slate-700',
              ]"
              @click="activeSkillTab = index"
            >
              {{ tab }}
            </el-button>
          </div>

          <!-- 技能卡片网格 -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            ref="skillsGridRef"
            data-scroll-animation="fade-up"
            data-scroll-delay="200"
          >
            <SkillCard
              v-for="(skill, index) in currentSkills"
              :key="index"
              :title="skill.title"
              :percentage="skill.percentage"
              :icon="skill.icon"
              ref="skillCardRefs[index]"
            />
          </div>
        </div>
      </section>

      <!-- 项目部分 -->
      <section id="projects" class="py-20 bg-slate-900/50">
        <div class="container mx-auto px-4 md:px-8">
          <div
            class="text-center max-w-3xl mx-auto mb-16"
            ref="projectsTitleRef"
            data-scroll-animation="fade-up"
          >
            <h2 class="text-3xl md:text-4xl font-bold mb-4">精选项目</h2>
            <div class="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
            <p class="text-slate-300">我参与和主导的部分项目展示</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              v-for="(project, index) in projects"
              :key="index"
              :title="project.title"
              :description="project.description"
              :image="project.image"
              :tags="project.tags"
              :link="project.link"
            />
          </div>
        </div>
      </section>

      <!-- 联系部分 -->
      <section id="contact" class="py-20">
        <div class="container mx-auto px-4 md:px-8">
          <div
            class="text-center max-w-3xl mx-auto mb-16"
            ref="contactTitleRef"
            data-scroll-animation="fade-up"
          >
            <h2 class="text-3xl md:text-4xl font-bold mb-4">联系我</h2>
            <div class="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
            <p class="text-slate-300">有项目合作或问题咨询？随时联系我</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div ref="contactFormRef" data-scroll-animation="fade-right">
              <div
                class="bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 shadow-xl"
              >
                <h3 class="text-2xl font-bold mb-6">发送消息</h3>
                <el-form :model="contactForm" label-width="100px" class="space-y-6">
                  <el-form-item label="姓名" prop="name">
                    <el-input
                      v-model="contactForm.name"
                      class="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="请输入您的姓名"
                    />
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input
                      v-model="contactForm.email"
                      type="email"
                      class="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="请输入您的邮箱"
                    />
                  </el-form-item>
                  <el-form-item label="主题" prop="subject">
                    <el-input
                      v-model="contactForm.subject"
                      class="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="请输入消息主题"
                    />
                  </el-form-item>
                  <el-form-item label="消息" prop="message">
                    <el-input
                      v-model="contactForm.message"
                      type="textarea"
                      :rows="5"
                      class="bg-slate-700/50 border-slate-600 text-white"
                      placeholder="请输入您的消息内容"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      class="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0 py-2 rounded-xl"
                      @click="submitContactForm"
                    >
                      发送消息
                      <Send class="ml-2" />
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>

            <div ref="contactInfoRef" data-scroll-animation="fade-left">
              <div class="space-y-8">
                <h3 class="text-2xl font-bold">联系方式</h3>
                <p class="text-slate-300">
                  我很乐意听取您的想法和需求。无论是项目合作、技术咨询还是其他问题，都可以通过以下方式联系我，我会尽快回复您。
                </p>

                <!-- 联系信息卡片 -->
                <div class="space-y-4">
                  <ContactCard
                    icon="email"
                    title="邮箱"
                    content="2557524432@qq.com"
                    link="2557524331@qq.com"
                  />
                  <ContactCard icon="phone" title="电话" content="18929329293" link="18929329194" />
                  <ContactCard icon="location" title="地址" content="广东省，深圳市，福田区" />
                </div>

                <!-- 社交媒体 -->
                <!-- <div>
                  <h4 class="text-lg font-semibold mb-4">关注我</h4>
                  <div class="flex gap-4">
                    <SocialIcon icon="github" href="#" size="lg" />
                    <SocialIcon icon="linkedin" href="#" size="lg" />
                    <SocialIcon icon="twitter" href="#" size="lg" />
                    <SocialIcon icon="codepen" href="#" size="lg" />
                    <SocialIcon icon="dribbble" href="#" size="lg" />
                  </div>
                </div> -->

                <!-- 动态地图占位 -->
                <!-- <div
                  class="w-full h-64 bg-slate-800/30 rounded-xl overflow-hidden border border-slate-700/50 relative"
                >
                  <img
                    src="https://picsum.photos/id/1031/800/400"
                    alt="地图"
                    class="w-full h-full object-cover opacity-70"
                  />
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="bg-purple-500/80 w-6 h-6 rounded-full animate-pulse"></div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="bg-slate-900 py-10 border-t border-slate-800">
      <div class="container mx-auto px-4 md:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center gap-2 mb-4 md:mb-0">
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center"
            >
              <UserFilled class="w-4 h-4" />
            </div>
            <span
              class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
            >
              github.com/YNZ-sz
            </span>
          </div>
          <p class="text-slate-400 text-sm">
            &copy; {{ new Date().getFullYear() }} Alex Johnson. 保留所有权利。
          </p>
          <div class="flex gap-6 mt-4 md:mt-0">
            <a href="#" class="text-slate-400 hover:text-white transition-colors text-sm"
              >隐私政策</a
            >
            <a href="#" class="text-slate-400 hover:text-white transition-colors text-sm"
              >服务条款</a
            >
            <a href="#" class="text-slate-400 hover:text-white transition-colors text-sm"
              >Cookie 政策</a
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useScroll, useIntersectionObserver } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import {
  UserFilled,
  ArrowRight,
  // ChevronDown,
  // Code,
  Download,
  // Send
} from '@element-plus/icons-vue'

// 导入子组件
import NavLink from '@/components/profile/NavLink.vue'
import SocialIcon from '@/components/profile/SocialIcon.vue'
import SkillCard from '@/components/profile/SkillCard.vue'
import ProjectCard from '@/components/profile/ProjectCard.vue'
import ContactCard from '@/components/profile/ContactCard.vue'
import { useRouter } from 'vue-router'
import ynz010Img from '@/assets/images/ynz010.png'
import ynz020Img from '@/assets/images/ynz020.png'
import ynz030Img from '@/assets/images/ynz030.png'
const router = useRouter()
// 状态管理
const { y: scrollY } = useScroll(window) // 修复：指定 window 作为目标元素
const activeSection = ref('home')
const activeSkillTab = ref(0)
const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

// 引用管理
const particleContainer = ref<HTMLElement | null>(null)
const skillCardRefs = ref<(InstanceType<typeof SkillCard> | null)[]>([])
interface skillsData {
  title: string
  percentage: number
  icon: 'html' | 'css' | 'js' | 'vue' | 'react' | 'node' | 'ts' | 'design'
}

// 技能标签（按新需求调整为4个分类）
const skillTabs = ref(['前端技术基础', '框架与工具', '版本控制', '跨端开发'])

// 技能数据（严格遵循 skillsData[][] 二维数组格式）
const skillsData = ref<skillsData[][]>([
  // 第一类：前端技术基础（对应 skillTabs[0]）
  [
    { title: 'HTML', percentage: 90, icon: 'html' },
    { title: 'CSS', percentage: 80, icon: 'css' },
    { title: 'JavaScript', percentage: 75, icon: 'js' },
    { title: 'TypeScript', percentage: 75, icon: 'ts' },
    { title: 'ES6 语法', percentage: 75, icon: 'js' },
    { title: 'Tailwind CSS', percentage: 70, icon: 'css' },
  ],
  // 第二类：框架与工具（对应 skillTabs[1]）
  [
    { title: 'Vue3.0', percentage: 90, icon: 'vue' },
    { title: 'Vue Router', percentage: 90, icon: 'vue' },
    { title: 'Pinia', percentage: 90, icon: 'vue' },
    { title: 'Element Plus', percentage: 80, icon: 'vue' },
    { title: 'Axios', percentage: 80, icon: 'design' },
  ],
  // 第三类：版本控制（对应 skillTabs[2]）
  [
    { title: 'Git 基础', percentage: 60, icon: 'design' },
    { title: '分支管理', percentage: 50, icon: 'design' },
    { title: '冲突解决', percentage: 40, icon: 'design' },
  ],
  // 第四类：跨端开发（对应 skillTabs[3]）
  [
    { title: 'HarmonyOS', percentage: 65, icon: 'design' },
    { title: 'ArkTS', percentage: 60, icon: 'design' },
    { title: '声明式 UI', percentage: 60, icon: 'design' },
    { title: '路由跳转', percentage: 50, icon: 'design' },
  ],
])

// 计算属性：当前显示的技能
const currentSkills = computed(() => skillsData.value[activeSkillTab.value])

// 项目数据
const projects = ref([
  {
    title: '企业智能考勤管理系统    (2025.9-2025.11)',
    description:
      '聚焦企业考勤核心场景，整合员工信息管理、打卡数据统计等功能，为企业提供高效稳定的考勤解决方案',
    image: ynz010Img,
    tags: ['Vue3', 'TypeScript', 'Tailwind CSS', 'Pinia', 'Element Plus'],
    link: '#',
  },
  {
    title: '鸿蒙单词学习应用   (2025.8-2025.9)',
    description:
      '独立负责鸿蒙系统下单词学习应用的前端全量开发，聚焦背单词、社区、商城、个人中心四大核心模块，基于 ArkTS 完成从页面搭建到状态管理的全流程落地，适配鸿蒙手机端交互标准，最终实现应用基础功能的完整交付。',
    image: ynz020Img,
    tags: ['HarmonyOS', 'ArkTS', 'AppStorage', '声明式UI'],
    link: '#',
  },
  {
    title: '智慧社区小程序   (2025.4-2025.5)',
    description:
      '独立开发的智慧社区服务类小程序，涵盖信息采集、社区活动、人脸检测等核心功能模块，基于微信小程序技术栈完成页面布局、功能交互与后端接口对接，适配移动端操作习惯，实现物业业务、便民服务等社区场景的一站式服务交付。',
    image: ynz030Img,
    tags: ['微信小程序', 'Django', 'Vant Weapp', '前端开发'],
    link: '#',
  },
  // {
  //   title: '内容管理系统',
  //   description: '灵活的 CMS 平台，支持自定义字段、角色权限管理和多语言，适用于各类网站建设',
  //   image: 'https://picsum.photos/id/48/400/300',
  //   tags: ['NestJS', 'Vue3', 'MySQL', 'JWT', 'TypeScript'],
  //   link: '#',
  // },
  // {
  //   title: '社交媒体应用',
  //   description: '实时聊天和内容分享平台，支持图片/视频上传、评论互动和用户关注功能',
  //   image: 'https://picsum.photos/id/60/400/300',
  //   tags: ['React', 'Firebase', 'Redux', 'Tailwind CSS', 'Socket.io'],
  //   link: '#',
  // },
  // {
  //   title: '数据分析工具',
  //   description: '帮助企业分析业务数据的可视化工具，支持自定义报表和数据导出功能',
  //   image: 'https://picsum.photos/id/180/400/300',
  //   tags: ['Vue3', 'D3.js', 'TypeScript', 'Pinia', 'ExcelJS'],
  //   link: '#',
  // },
])

// 滚动监听：更新当前活跃的section
watch(
  scrollY,
  (value) => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact']
    const sectionElements = sections.map((id) => document.getElementById(id))

    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const section = sectionElements[i]
      if (section && section.offsetTop - 100 <= value) {
        activeSection.value = sections[i] as string
        break
      }
    }
  },
  { immediate: true },
)

// 滚动动画：元素进入视口时触发
const animateOnScroll = () => {
  const animatedElements = document.querySelectorAll('[data-scroll-animation]')

  animatedElements.forEach((element) => {
    const rect = element.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0

    if (isVisible) {
      const animation = element.getAttribute('data-scroll-animation')
      const delay = element.getAttribute('data-scroll-delay') || '0'

      // 设置延迟动画
      setTimeout(() => {
        switch (animation) {
          case 'fade-up':
            ;(element as HTMLElement).classList.add('opacity-100', 'translate-y-0')
            ;(element as HTMLElement).classList.remove('opacity-0', 'translate-y-8')
            break
          case 'fade-right':
            ;(element as HTMLElement).classList.add('opacity-100', 'translate-x-0')
            ;(element as HTMLElement).classList.remove('opacity-0', 'translate-x-[-32px]')
            break
          case 'fade-left':
            ;(element as HTMLElement).classList.add('opacity-100', 'translate-x-0')
            ;(element as HTMLElement).classList.remove('opacity-0', 'translate-x-8')
            break
        }
      }, parseInt(delay))

      // 防止重复动画
      element.removeAttribute('data-scroll-animation')
    }
  })
}

// 初始化动画样式
const initAnimationStyles = () => {
  const style = document.createElement('style')
  style.textContent = `
    [data-scroll-animation] {
      transition: all 0.7s ease-out;
      opacity: 0;
    }
    [data-scroll-animation="fade-up"] {
      transform: translateY(32px);
    }
    [data-scroll-animation="fade-right"] {
      transform: translateX(-32px);
    }
    [data-scroll-animation="fade-left"] {
      transform: translateX(32px);
    }
  `
  document.head.appendChild(style)
}
const openGitHub = () => {
  const githubUrl = 'https://github.com/YNZ-sz'
  // _blank：新标签页打开；noopener noreferrer：安全优化
  window.open(githubUrl, '_blank', 'noopener noreferrer')
}
// 粒子背景效果（简化版）
const createParticles = () => {
  if (!particleContainer.value) return

  const particleCount = 50
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')

    // 随机样式
    const size = Math.random() * 4 + 1
    const x = Math.random() * 100
    const y = Math.random() * 100
    const delay = Math.random() * 5
    const duration = Math.random() * 20 + 10
    const opacity = Math.random() * 0.5 + 0.1
    const color = Math.random() > 0.5 ? 'rgba(168, 85, 247, 0.5)' : 'rgba(59, 130, 246, 0.5)'

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      opacity: ${opacity};
      animation: float ${duration}s ease-in-out ${delay}s infinite;
    `

    particleContainer.value.appendChild(particle)
  }

  // 添加浮动动画
  const keyframes = document.createElement('style')
  keyframes.textContent = `
    @keyframes float {
      0% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-20px) translateX(10px); }
      100% { transform: translateY(0) translateX(0); }
    }
  `
  document.head.appendChild(keyframes)
}

// 技能条动画监听
const initSkillBarAnimation = () => {
  const skillsGrid = document.getElementById('skills')
  if (!skillsGrid) return

  useIntersectionObserver(
    skillsGrid,
    ([entry]) => {
      // 修复类型错误：添加 entry 存在性判断
      if (entry && entry.isIntersecting) {
        // 触发所有技能条动画
        skillCardRefs.value.forEach((card) => {
          card?.animateSkillBar()
        })
      }
    },
    { threshold: 0.3 },
  )
}

// 提交联系表单
const submitContactForm = () => {
  // 接口请求预留口
  console.log('提交表单数据:', contactForm.value)

  // 模拟提交成功
  ElMessage.success('消息发送成功！我会尽快回复您')

  // 重置表单
  contactForm.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }
}

const back = () => {
  router.push({ path: '/main' })
}
const resumeImageUrl = 'https://8.134.138.69/images/ynzjianli.png'
const downloadResumeImage = () => {
  const link = document.createElement('a')
  // 2. 设置图片地址为a标签的链接
  link.href = resumeImageUrl
  // 3. 设置下载后的文件名（可选，默认是图片原文件名）
  link.download = 'ynz的简历.jpg'
  // 4. 把a标签加入文档，触发点击，然后移除
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
// 初始化
onMounted(() => {
  // 初始化动画样式
  initAnimationStyles()

  // 创建粒子背景
  createParticles()

  // 初始触发一次动画检查
  animateOnScroll()

  // 监听滚动事件
  window.addEventListener('scroll', animateOnScroll)

  // 初始化技能条动画监听
  initSkillBarAnimation()
})
</script>

<style scoped>
/* 自定义全局样式 */
::selection {
  background: rgba(168, 85, 247, 0.3);
  color: white;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 隐藏滚动条但保留功能 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(168, 85, 247, 0.7);
}
</style>

<style scoped>
/* Tailwind 基础样式 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Element Plus 样式覆盖 */
.el-button {
  @apply transition-all duration-300;
}

.el-input {
  @apply rounded-lg;
}

.el-input__wrapper {
  @apply bg-transparent;
}

.el-card {
  @apply bg-slate-800/30 border-slate-700/50 text-white;
}

.el-table {
  @apply bg-slate-800/30 border-slate-700/50 text-white;
}

.el-table th {
  @apply bg-slate-800/50 border-slate-700/50;
}

.el-table td {
  @apply border-slate-700/50;
}
</style>
