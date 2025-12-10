<template>
  <div
    class="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden"
  >
    <!-- 粒子背景特效 -->
    <div class="fixed inset-0 z-0" ref="particleContainer"></div>

    <!-- 网格背景装饰 -->
    <div class="fixed inset-0 z-0 opacity-10">
      <div
        class="h-full w-full bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:40px_40px]"
      ></div>
    </div>

    <!-- 导航栏（滚动时变化） -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      :class="{
        'bg-slate-900/90 backdrop-blur-xl py-3 shadow-lg': scrollY > 50,
        'bg-transparent py-6': scrollY <= 50,
      }"
    >
      <div class="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div
            class="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center"
          >
            <CheckCircleFilled class="w-6 h-6" />
          </div>
          <span
            class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
          >
            SmartAttend
          </span>
        </div>

        <!-- 桌面端导航 -->
        <nav class="hidden md:flex gap-8">
          <NavLink href="#home" :active="activeSection === 'home'">首页</NavLink>
          <NavLink href="#features" :active="activeSection === 'features'">功能特性</NavLink>
          <NavLink href="#statistics" :active="activeSection === 'statistics'">数据统计</NavLink>
          <NavLink href="#testimonials" :active="activeSection === 'testimonials'"
            >用户评价</NavLink
          >
          <NavLink href="#pricing" :active="activeSection === 'pricing'">定价方案</NavLink>
          <NavLink href="#contact" :active="activeSection === 'contact'">联系我们</NavLink>
        </nav>

        <!-- 登录/演示按钮 -->
        <div class="flex gap-3">
          <el-button
            type="default"
            size="small"
            class="bg-transparent hover:bg-white/10 text-white border border-white/20 rounded-full"
          >
            登录演示
          </el-button>
          <el-button
            type="primary"
            size="small"
            class="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0 rounded-full"
          >
            免费试用
          </el-button>
          <router-link :to="{ path: '/mine' }">
            <el-button
              type="primary"
              size="small"
              class="bg-gradient-to-r from-cyan-500 to-blue-400 hover:from-blue-600 hover:to-cyan-600 border-0 rounded-full"
            >
              作者简介
            </el-button>
          </router-link>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="relative z-10">
      <!-- 英雄区 -->
      <section id="home" class="min-h-screen flex items-center justify-center pt-20 pb-16">
        <div class="container mx-auto px-4 md:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- 文本内容 -->
            <div class="space-y-6" ref="heroTextRef" data-scroll-animation="fade-right">
              <div
                class="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30"
              >
                智能考勤 · 高效管理
              </div>
              <h1 class="text-4xl md:text-6xl font-bold leading-tight">
                重新定义<br />
                <span
                  class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
                >
                  企业考勤体验
                </span>
              </h1>
              <p class="text-xl text-slate-300 leading-relaxed">
                基于 AI 智能识别技术，提供一站式考勤解决方案， 让员工打卡更便捷，管理层决策更科学。
              </p>
              <div class="flex flex-wrap gap-4 pt-4">
                <el-button
                  type="primary"
                  size="large"
                  class="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0 px-8 rounded-full py-6 text-base"
                  @click="handleDemoRequest"
                >
                  申请免费演示
                  <ArrowRight class="ml-2" />
                </el-button>
                <el-button
                  type="default"
                  size="large"
                  class="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full px-8 py-6 text-base flex items-center"
                >
                  <PlayCircleFilled class="mr-2" />
                  观看演示视频
                </el-button>
              </div>
              <!-- 信任标识 -->
              <div class="pt-6">
                <p class="text-slate-400 text-sm mb-4">已被 5000+ 企业选择</p>
                <div class="flex flex-wrap gap-8 items-center opacity-70">
                  <img
                    src="https://picsum.photos/id/1/100/40"
                    alt="企业标识"
                    class="h-6 object-contain"
                  />
                  <img
                    src="https://picsum.photos/id/2/100/40"
                    alt="企业标识"
                    class="h-6 object-contain"
                  />
                  <img
                    src="https://picsum.photos/id/3/100/40"
                    alt="企业标识"
                    class="h-6 object-contain"
                  />
                  <img
                    src="https://picsum.photos/id/4/100/40"
                    alt="企业标识"
                    class="h-6 object-contain"
                  />
                </div>
              </div>
            </div>

            <!-- 产品截图 -->
            <div class="relative" ref="heroImageRef" data-scroll-animation="fade-left">
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl transform -translate-x-4 translate-y-4"
              ></div>
              <div
                class="relative z-10 bg-slate-800/80 backdrop-blur-md rounded-3xl border border-blue-500/30 shadow-2xl overflow-hidden"
              >
                <!-- 顶部状态栏 -->
                <div class="bg-slate-900 px-4 py-2 flex items-center gap-2">
                  <div class="flex gap-1.5">
                    <div class="w-3 h-3 rounded-full bg-red-500"></div>
                    <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div class="text-xs text-slate-400">SmartAttend - 管理后台</div>
                </div>
                <!-- 截图内容 -->
                <img
                  src="https://picsum.photos/id/180/800/600"
                  alt="智能考勤系统截图"
                  class="w-full h-auto rounded-b-3xl"
                />
                <!-- 悬浮装饰元素 -->
                <div
                  class="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
                ></div>
                <div
                  class="absolute -top-6 -left-6 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 滚动指示器 -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown class="w-8 h-8 text-slate-400" />
        </div>
      </section>

      <!-- 功能特性区 -->
      <section id="features" class="py-20 bg-slate-900/50">
        <div class="container mx-auto px-4 md:px-8">
          <div
            class="text-center max-w-3xl mx-auto mb-16"
            ref="featuresTitleRef"
            data-scroll-animation="fade-up"
          >
            <div
              class="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30 mb-4"
            >
              核心功能
            </div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4">智能考勤 · 高效便捷</h2>
            <p class="text-slate-300 text-lg">
              融合 AI 技术与人性化设计，打造全方位考勤管理解决方案
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="AI 人脸识别考勤"
              description="毫秒级人脸识别，精准识别员工身份，杜绝代打卡现象，支持多人同时打卡，提升考勤效率。"
              :icon="UserFilled"
            />
            <FeatureCard
              title="多场景打卡支持"
              description="支持人脸识别、GPS定位、Wi-Fi打卡、蓝牙打卡等多种方式，满足不同办公场景需求。"
              :icon="LocationFilled"
            />
            <FeatureCard
              title="智能考勤统计"
              description="自动生成考勤报表，迟到、早退、请假等数据一目了然，支持导出Excel，减轻HR工作量。"
              :icon="UserFilled"
            />
            <FeatureCard
              title="灵活排班管理"
              description="支持多班次、弹性工作制、倒班等复杂排班需求，自动匹配考勤规则，减少人工干预。"
              :icon="UserFilled"
            />
            <FeatureCard
              title="移动端便捷管理"
              description="员工端、管理端双端支持，随时随地查看考勤记录、审批请假申请，管理更高效。"
              :icon="UserFilled"
            />
            <FeatureCard
              title="数据安全保障"
              description="银行级数据加密技术，考勤数据实时备份，多重安全防护，确保企业数据安全。"
              :icon="UserFilled"
            />
          </div>
        </div>
      </section>

      <!-- 数据统计区 -->
      <section id="statistics" class="py-20">
        <div class="container mx-auto px-4 md:px-8">
          <div
            class="text-center max-w-3xl mx-auto mb-16"
            ref="statisticsTitleRef"
            data-scroll-animation="fade-up"
          >
            <div
              class="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30 mb-4"
            >
              数据驱动
            </div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4">提升企业管理效率</h2>
            <p class="text-slate-300 text-lg">
              用数据说话，看看 SmartAttend 如何帮助企业提升管理效率
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <StatisticCard
              title="考勤效率提升"
              value="85%"
              subtitle="相比传统考勤方式"
              :icon="UserFilled"
              growth="+23%"
            />
            <StatisticCard
              title="HR 工作量减少"
              value="60%"
              subtitle="自动化报表生成"
              :icon="UserFilled"
              growth="+18%"
            />
            <StatisticCard
              title="企业客户数量"
              value="5,000+"
              subtitle="覆盖各行业领域"
              :icon="OfficeBuilding"
              growth="+35%"
            />
            <StatisticCard
              title="员工满意度"
              value="96%"
              subtitle="便捷的打卡体验"
              :icon="UserFilled"
              growth="+12%"
            />
          </div>

          <!-- 数据图表展示 -->
          <div
            class="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            ref="chartContainerRef"
            data-scroll-animation="fade-up"
          >
            <h3 class="text-xl font-bold mb-6 text-white">考勤数据趋势分析</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- 图表占位（实际项目中可替换为 ECharts/Chart.js） -->
              <div class="h-80 bg-white/5 rounded-xl p-4 flex items-center justify-center">
                <div class="text-slate-400 text-center">
                  <ChartLine class="w-12 h-12 mx-auto mb-2 text-blue-400" />
                  <p>月度考勤率趋势图</p>
                </div>
              </div>
              <div class="h-80 bg-white/5 rounded-xl p-4 flex items-center justify-center">
                <div class="text-slate-400 text-center">
                  <PieChart class="w-12 h-12 mx-auto mb-2 text-blue-400" />
                  <p>考勤方式分布统计图</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 用户评价区 -->
      <section id="testimonials" class="py-20 bg-slate-900/50">
        <div class="container mx-auto px-4 md:px-8">
          <div
            class="text-center max-w-3xl mx-auto mb-16"
            ref="testimonialsTitleRef"
            data-scroll-animation="fade-up"
          >
            <div
              class="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30 mb-4"
            >
              用户反馈
            </div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4">客户如何评价我们</h2>
            <p class="text-slate-300 text-lg">来自各行业企业的真实使用体验</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="张经理"
              position="某科技公司 HRD"
              content="SmartAttend 彻底解决了我们公司异地办公考勤难的问题，AI人脸识别精准高效，报表自动生成，大大减轻了HR的工作量。"
              avatar="https://picsum.photos/id/1005/100/100"
            />
            <TestimonialCard
              name="李总监"
              position="制造业运营总监"
              content="作为拥有多个厂区的制造企业，SmartAttend 的多场景打卡和灵活排班功能非常实用，数据实时同步，管理起来得心应手。"
              avatar="https://picsum.photos/id/1012/100/100"
            />
            <TestimonialCard
              name="王总"
              position="互联网创业公司CEO"
              content="选择 SmartAttend 是我做的最正确的决定之一，简洁易用的界面，强大的功能，还有优质的客户服务，值得推荐给所有企业。"
              avatar="https://picsum.photos/id/1027/100/100"
            />
          </div>
        </div>
      </section>

      <!-- 定价方案区 -->
      <section id="pricing" class="py-20">
        <div class="container mx-auto px-4 md:px-8">
          <div
            class="text-center max-w-3xl mx-auto mb-16"
            ref="pricingTitleRef"
            data-scroll-animation="fade-up"
          >
            <div
              class="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30 mb-4"
            >
              灵活定价
            </div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4">选择适合你的方案</h2>
            <p class="text-slate-300 text-lg">无论是初创企业还是大型集团，都能找到合适的解决方案</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <!-- 基础版定价卡片 -->
            <PricingCard title="基础版" description="适合小型团队使用" price="999" period="/年">
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">最多支持 50 名员工</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">基础人脸识别考勤</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">简单考勤报表</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">邮件技术支持</span>
              </li>
            </PricingCard>

            <!-- 企业版定价卡片 -->
            <PricingCard
              title="企业版"
              description="适合中大型企业"
              price="2,999"
              period="/年"
              :is-popular="true"
            >
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">最多支持 500 名员工</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">全功能 AI 考勤</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">高级数据分析报表</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">灵活排班管理</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">优先技术支持</span>
              </li>
            </PricingCard>

            <!-- 定制版定价卡片 -->
            <PricingCard title="定制版" description="适合大型集团企业" price="联系我们" period="">
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">无限员工数量</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">全功能定制开发</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">专属数据服务器</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">API 接口对接</span>
              </li>
              <li class="flex items-start">
                <Check class="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-slate-300">专属客户经理</span>
              </li>
            </PricingCard>
          </div>
        </div>
      </section>

      <!-- 联系我们区 -->
      <section id="contact" class="py-20 bg-slate-900/50">
        <div class="container mx-auto px-4 md:px-8">
          <div
            class="text-center max-w-3xl mx-auto mb-16"
            ref="contactTitleRef"
            data-scroll-animation="fade-up"
          >
            <div
              class="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30 mb-4"
            >
              联系我们
            </div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4">咨询更多详情</h2>
            <p class="text-slate-300 text-lg">填写表单，我们的客户经理将尽快与您联系</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <!-- 联系表单 -->
            <div
              class="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
              ref="contactFormRef"
              data-scroll-animation="fade-right"
            >
              <h3 class="text-xl font-bold mb-6 text-white">填写咨询表单</h3>
              <el-form :model="contactForm" label-width="100px" class="space-y-6">
                <el-form-item label="姓名" prop="name">
                  <el-input
                    v-model="contactForm.name"
                    class="bg-white/5 border-white/10 text-white placeholder:text-slate-400"
                    placeholder="请输入您的姓名"
                  />
                </el-form-item>
                <el-form-item label="公司" prop="company">
                  <el-input
                    v-model="contactForm.company"
                    class="bg-white/5 border-white/10 text-white placeholder:text-slate-400"
                    placeholder="请输入您的公司名称"
                  />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    v-model="contactForm.email"
                    type="email"
                    class="bg-white/5 border-white/10 text-white placeholder:text-slate-400"
                    placeholder="请输入您的邮箱"
                  />
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                  <el-input
                    v-model="contactForm.phone"
                    class="bg-white/5 border-white/10 text-white placeholder:text-slate-400"
                    placeholder="请输入您的联系电话"
                  />
                </el-form-item>
                <el-form-item label="留言" prop="message">
                  <el-input
                    v-model="contactForm.message"
                    type="textarea"
                    :rows="5"
                    class="bg-white/5 border-white/10 text-white placeholder:text-slate-400"
                    placeholder="请输入您的咨询内容"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0 py-2 rounded-xl"
                    @click="submitContactForm"
                  >
                    提交咨询
                    <Send class="ml-2" />
                  </el-button>
                </el-form-item>
              </el-form>
            </div>

            <!-- 联系信息 -->
            <div class="space-y-8" ref="contactInfoRef" data-scroll-animation="fade-left">
              <h3 class="text-2xl font-bold text-white">联系方式</h3>
              <p class="text-slate-300 leading-relaxed">
                如有任何疑问或需要进一步了解产品详情，欢迎通过以下方式联系我们，
                我们将为您提供专业的咨询服务。
              </p>

              <!-- 联系信息卡片 -->
              <div class="space-y-4">
                <div
                  class="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-start gap-4 hover:border-blue-500/30 transition-all"
                >
                  <div
                    class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-400"
                  >
                    <PhoneFilled class="w-5 h-5" />
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">咨询电话</h4>
                    <p class="text-slate-300">400-888-9999</p>
                    <p class="text-slate-400 text-sm">周一至周五 9:00-18:00</p>
                  </div>
                </div>

                <div
                  class="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-start gap-4 hover:border-blue-500/30 transition-all"
                >
                  <div
                    class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-400"
                  >
                    <EmailFilled class="w-5 h-5" />
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">咨询邮箱</h4>
                    <p class="text-slate-300">contact@smartattend.com</p>
                    <p class="text-slate-400 text-sm">24小时内回复</p>
                  </div>
                </div>

                <div
                  class="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-start gap-4 hover:border-blue-500/30 transition-all"
                >
                  <div
                    class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-400"
                  >
                    <MapLocationFilled class="w-5 h-5" />
                  </div>
                  <div>
                    <h4 class="text-white font-semibold mb-1">公司地址</h4>
                    <p class="text-slate-300">北京市朝阳区科技园区88号智慧大厦15层</p>
                  </div>
                </div>
              </div>

              <!-- 社交媒体 -->
              <div>
                <h4 class="text-lg font-semibold mb-4 text-white">关注我们</h4>
                <div class="flex gap-4">
                  <a
                    href="#"
                    class="w-10 h-10 bg-white/5 hover:bg-blue-500/20 rounded-full flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all"
                  >
                    <Wechat class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="w-10 h-10 bg-white/5 hover:bg-blue-500/20 rounded-full flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all"
                  >
                    <Weibo class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="w-10 h-10 bg-white/5 hover:bg-blue-500/20 rounded-full flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all"
                  >
                    <Linkedin class="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    class="w-10 h-10 bg-white/5 hover:bg-blue-500/20 rounded-full flex items-center justify-center text-slate-300 hover:text-blue-400 transition-all"
                  >
                    <Github class="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="bg-slate-900 py-12 border-t border-white/10">
      <div class="container mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div
                class="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center"
              >
                <CheckCircleFilled class="w-4 h-4" />
              </div>
              <span
                class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
              >
                SmartAttend
              </span>
            </div>
            <p class="text-slate-400 mb-4">智能考勤解决方案提供商， 让企业管理更高效、更智能。</p>
            <div class="flex gap-3">
              <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors">
                <Wechat class="w-5 h-5" />
              </a>
              <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors">
                <Weibo class="w-5 h-5" />
              </a>
              <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors">
                <Linkedin class="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">产品</h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >功能特性</a
                >
              </li>
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >定价方案</a
                >
              </li>
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >产品更新</a
                >
              </li>
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >常见问题</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">公司</h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >关于我们</a
                >
              </li>
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >客户案例</a
                >
              </li>
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >新闻动态</a
                >
              </li>
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >招贤纳士</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4">支持</h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >帮助中心</a
                >
              </li>
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >联系支持</a
                >
              </li>
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >隐私政策</a
                >
              </li>
              <li>
                <a href="#" class="text-slate-400 hover:text-blue-400 transition-colors"
                  >服务条款</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
          <p>&copy; {{ new Date().getFullYear() }} SmartAttend 智能考勤系统. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import {
  // CheckCircleFilled,
  ArrowRight,
  // ChevronDown,
  UserFilled,
  LocationFilled,
  // ChartFilled,
  // CalendarFilled,
  // SmartphoneFilled,
  // LockFilled,
  // Speed,
  // Workbench,
  OfficeBuilding,
  // SmileFilled,
  // ChartLine,
  PieChart,
  Check,
  // Send,
  // PhoneFilled,
  // EmailFilled,
  // MapLocationFilled,
  // Wechat,
  // Weibo,
  // Linkedin,
  // Github,
  // PlayCircleFilled
} from '@element-plus/icons-vue'

// 导入组件
import NavLink from '@/components/attendance/NavLink.vue'
import FeatureCard from '@/components/attendance/FeatureCard.vue'
import StatisticCard from '@/components/attendance/StatisticCard.vue'
import TestimonialCard from '@/components/attendance/TestimonialCard.vue'
import PricingCard from '@/components/attendance/PricingCard.vue'

// 导入 Pinia 状态管理
import { useAttendanceStore } from '@/stores/attendanceStore'
const attendanceStore = useAttendanceStore()

// 状态管理
const { y: scrollY } = useScroll(window)
const activeSection = attendanceStore.activeSection
const contactForm = attendanceStore.contactForm

// 引用管理
const particleContainer = ref<HTMLElement | null>(null)
const heroTextRef = ref<HTMLElement | null>(null)
const heroImageRef = ref<HTMLElement | null>(null)

// 滚动监听：更新当前活跃的section
watch(
  scrollY,
  (value) => {
    const sections = ['home', 'features', 'statistics', 'testimonials', 'pricing', 'contact']
    const sectionElements = sections.map((id) => document.getElementById(id))

    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const section = sectionElements[i]
      if (section && section.offsetTop - 100 <= value) {
        const sectionName = sections[i] as
          | 'home'
          | 'features'
          | 'statistics'
          | 'testimonials'
          | 'pricing'
          | 'contact'
        attendanceStore.setActiveSection(sectionName)
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
        const el = element as HTMLElement
        switch (animation) {
          case 'fade-up':
            el.classList.add('opacity-100', 'translate-y-0')
            el.classList.remove('opacity-0', 'translate-y-8')
            break
          case 'fade-right':
            el.classList.add('opacity-100', 'translate-x-0')
            el.classList.remove('opacity-0', 'translate-x-[-32px]')
            break
          case 'fade-left':
            el.classList.add('opacity-100', 'translate-x-0')
            el.classList.remove('opacity-0', 'translate-x-32')
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

// 粒子背景效果
const createParticles = () => {
  if (!particleContainer.value) return

  const particleCount = 80
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')

    // 随机样式
    const size = Math.random() * 3 + 1
    const x = Math.random() * 100
    const y = Math.random() * 100
    const delay = Math.random() * 5
    const duration = Math.random() * 25 + 15
    const opacity = Math.random() * 0.4 + 0.1
    const color = Math.random() > 0.5 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(34, 211, 238, 0.6)'

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
      pointer-events: none;
    `

    particleContainer.value.appendChild(particle)
  }

  // 添加浮动动画
  const keyframes = document.createElement('style')
  keyframes.textContent = `
    @keyframes float {
      0% { transform: translateY(0) translateX(0) scale(1); }
      50% { transform: translateY(-25px) translateX(15px) scale(1.1); }
      100% { transform: translateY(0) translateX(0) scale(1); }
    }
  `
  document.head.appendChild(keyframes)
}

// 提交联系表单
const submitContactForm = async () => {
  // 表单验证（实际项目中可使用 Element Plus 表单验证）
  if (!contactForm.name || !contactForm.email || !contactForm.phone) {
    ElMessage.warning('请填写必填字段')
    return
  }

  // 调用 Pinia 中的提交方法（预留接口请求）
  const success = await attendanceStore.submitContactForm()
  if (success) {
    ElMessage.success('咨询提交成功！我们将尽快与您联系')
  } else {
    ElMessage.error('提交失败，请稍后再试')
  }
}

// 申请演示
const handleDemoRequest = () => {
  ElMessage.info('正在为您跳转演示申请页面...')
  // 实际项目中可跳转至演示申请页面
  // router.push('/demo-request');
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
})
</script>

<style scoped>
/* 自定义全局样式 */
::selection {
  background: rgba(59, 130, 246, 0.3);
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
  background: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}
</style>

<style>
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

.el-input__inner {
  @apply bg-transparent;
}

.el-form-item__label {
  @apply text-white !important;
}

.el-select {
  @apply bg-white/5 border-white/10 text-white;
}

.el-select-dropdown {
  @apply bg-slate-800 border-white/10 text-white;
}

.el-select-dropdown__item {
  @apply text-white hover:bg-blue-500/20;
}
</style>
