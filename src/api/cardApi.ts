import request from '@/utils/request'
import type { ApiResponse } from '@/utils/request'

export const getDayCard = () => {
  return request({
    url: '/attendance/records',
    method: 'get',
  })
}

export const getmonthdate = (year: number, month: number) => {
  return request({
    url: '/attendance/stat/month',
    method: 'POST',
    data: { year, month },
  })
}
export const daCard = (formData: any) => {
  return request({
    url: '/attendance/checkIn',
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
export const filedaCard = (formData: any) => {
  return request({
    url: '/attendance/file/checkin/cert', // 替换为你的文件上传接口地址
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
