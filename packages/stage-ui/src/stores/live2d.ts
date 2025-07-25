import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLive2d = defineStore('live2d', () => {
  const modelFile = ref<File>()
  const modelUrl = ref<string>('/assets/live2d/models/hiyori_pro_zh.zip')
  const loadSource = ref<'file' | 'url'>('url')
  const loadingModel = ref(false) // if set to true, the model will be loaded
  const position = useLocalStorage('settings/live2d/position', { x: 0, y: 0 }) // position is relative to the center of the screen, units are %
  const positionInPercentageString = computed(() => ({
    x: `${position.value.x}%`,
    y: `${position.value.y}%`,
  }))
  const currentMotion = ref<{ group: string, index?: number }>({ group: 'Idle', index: 0 })
  const availableMotions = ref<{ motionName: string, motionIndex: number, fileName: string }[]>([])
  const motionMap = useLocalStorage<Record<string, string>>('settings/live2d/motion-map', {})
  const scale = useLocalStorage('settings/live2d/scale', 1)

  return {
    modelFile,
    modelUrl,
    loadSource,
    loadingModel,
    position,
    positionInPercentageString,
    currentMotion,
    availableMotions,
    motionMap,
    scale,
  }
})
