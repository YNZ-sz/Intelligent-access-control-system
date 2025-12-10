// src/stores/attendanceStore.ts
import { defineStore } from 'pinia'

export const useAttendanceStore = defineStore('attendance', {
  state: () => ({
    // 活跃章节
    activeSection: 'home' as
      | 'home'
      | 'features'
      | 'statistics'
      | 'testimonials'
      | 'pricing'
      | 'contact',

    // 联系表单数据
    contactForm: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
    },
    // 已选择的定价方案
    selectedPricing: 'business',
  }),
  actions: {
    // 设置活跃章节
    setActiveSection(
      section: 'home' | 'features' | 'statistics' | 'testimonials' | 'pricing' | 'contact',
    ) {
      this.activeSection = section
    },
    // 重置联系表单
    resetContactForm() {
      this.contactForm = {
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      }
    },
    // 提交联系表单（预留接口请求）
    async submitContactForm() {
      try {
        // 实际项目中替换为真实接口调用
        console.log('提交联系表单:', this.contactForm)
        // const response = await axios.post('/api/contact', this.contactForm);
        this.resetContactForm()
        return true
      } catch (error) {
        console.error('表单提交失败:', error)
        return false
      }
    },
  },
})
