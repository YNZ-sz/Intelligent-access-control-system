<template>
  <nav class="bg-white shadow-sm">
    <div class="container mx-auto px-6 py-3">
      <div class="flex justify-between items-center">
        <a href="/" class="text-xl font-bold text-blue-600">我的项目</a>
        <div class="space-x-6">
          <router-link to="/" class="text-gray-700 hover:text-blue-600">首页</router-link>
          <router-link to="/list" class="text-gray-700 hover:text-blue-600">列表</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup></script>
