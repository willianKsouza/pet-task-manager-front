<template>
  <div class="flex-1 flex flex-col">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-6">
          <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div class="flex items-center space-x-4 text-sm">
            <button class="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded">
              📊 Overview
            </button>
            <button class="text-gray-500 hover:text-gray-700">📈 View All Members</button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 overflow-auto p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.id"
          class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
            </div>
            <div :class="stat.iconBg" class="w-12 h-12 rounded-lg flex items-center justify-center">
              <span class="text-xl">{{ stat.icon }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
          <div class="space-y-4">
            <div
              v-for="member in teamPerformance"
              :key="member.id"
              class="flex items-center justify-between"
            >
              <div class="flex items-center">
                <img :src="member.avatar" :alt="member.name" class="w-8 h-8 rounded-full mr-3" />
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ member.name }}</p>
                  <p class="text-xs text-gray-500">{{ member.role }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ member.completed }}</p>
                <p class="text-xs text-gray-500">tasks completed</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div class="divide-y divide-gray-200">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="px-6 py-4 hover:bg-gray-50"
          >
            <div class="flex items-center space-x-3">
              <img :src="activity.avatar" :alt="activity.user" class="w-8 h-8 rounded-full" />
              <div class="flex-1">
                <p class="text-sm text-gray-900">
                  <span class="font-medium">{{ activity.user }}</span>
                  {{ activity.action }}
                  <span class="font-medium">{{ activity.target }}</span>
                </p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
              <span class="text-sm text-gray-400">{{ activity.type }}</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const stats = [
  {
    id: 1,
    title: 'Total Tasks',
    value: '152',
    icon: '✓',
    iconBg: 'bg-blue-100',
    change: '+12.5%',
    changeColor: 'text-green-600',
  },
  {
    id: 2,
    title: 'In Progress',
    value: '24',
    icon: '⏳',
    iconBg: 'bg-orange-100',
    change: '+8.2%',
    changeColor: 'text-green-600',
  },
  {
    id: 3,
    title: 'Completed',
    value: '98',
    icon: '🎉',
    iconBg: 'bg-green-100',
    change: '+23.1%',
    changeColor: 'text-green-600',
  },
  {
    id: 4,
    title: 'Team Members',
    value: '42',
    icon: '👥',
    iconBg: 'bg-purple-100',
    change: '+2',
    changeColor: 'text-green-600',
  },
]

const teamPerformance = [
  {
    id: 1,
    name: 'Darlene Robertson',
    role: 'Designer',
    avatar: 'https://i.pravatar.cc/32?img=1',
    completed: 23,
  },
  {
    id: 2,
    name: 'Leslie Alexander',
    role: 'Developer',
    avatar: 'https://i.pravatar.cc/32?img=2',
    completed: 19,
  },
  {
    id: 3,
    name: 'Brooklyn Simmons',
    role: 'Manager',
    avatar: 'https://i.pravatar.cc/32?img=3',
    completed: 15,
  },
  {
    id: 4,
    name: 'Savannah Nguyen',
    role: 'Designer',
    avatar: 'https://i.pravatar.cc/32?img=4',
    completed: 12,
  },
]

const recentActivity = [
  {
    id: 1,
    user: 'Darlene Robertson',
    action: 'completed task',
    target: 'Brand Guidelines Design',
    time: '2 hours ago',
    avatar: 'https://i.pravatar.cc/32?img=1',
    type: '✅',
  },
  {
    id: 2,
    user: 'Leslie Alexander',
    action: 'commented on',
    target: 'Login System',
    time: '4 hours ago',
    avatar: 'https://i.pravatar.cc/32?img=2',
    type: '💬',
  },
  {
    id: 3,
    user: 'Brooklyn Simmons',
    action: 'created new task',
    target: 'Component Review',
    time: '6 hours ago',
    avatar: 'https://i.pravatar.cc/32?img=3',
    type: '➕',
  },
  {
    id: 4,
    user: 'Savannah Nguyen',
    action: 'uploaded file to',
    target: 'Design System',
    time: '8 hours ago',
    avatar: 'https://i.pravatar.cc/32?img=4',
    type: '📎',
  },
]
</script>
