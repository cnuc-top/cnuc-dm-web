<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.build-item {
  position: relative;

  &:hover {
    .build {
      opacity: 1;
    }

    .build-item__svg {
      opacity: 1;
    }
  }

  &__img {
    display: block;
    width: 100%;
    padding-bottom: 66.666666%;

    >img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
    }
  }

  &.mode-structure {
    .build-item__svg {
      opacity: 1;
      background: #FFF;
      margin-bottom: 70px;
    }

    .build-item__meta {
      background: $color-primary;
    }
  }

  &__svg {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1;
    right: 0px;
    top: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0;
    transition: 0.15s;
    background: rgba(255, 255, 255, 0.8);
  }

  .build {
    transform: scale(0.4);
  }

  &__meta {
    background: rgba($color-primary, 0.7);
    padding: 10px 15px;
    color: #FFF;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    height: 70px;
  }

  &__title {
    font-weight: 500;
    font-size: 18px;
  }

  &__height {
    margin-top: 5px;
    font-weight: 500;
    font-size: 17px;
  }
}
</style>
<template>
  <div @click="handleClick(data)" class="build-item" :class="'mode-' + modeClass">
    <div class="build-item__img">
      {{modeClass}}
      <img class="img" :src="data.picUrl" :alt="data.name">
    </div>
    <div class="build-item__meta">
      <h2 class="build-item__title">{{data.name}}</h2>
      <h3 class="build-item__height">{{data.height}}M</h3>
    </div>
    <div class="build-item__svg">
      <build :data="data" :visibles="visibles"></build>
    </div>
  </div>
</template>

<script>
import Build from '@/components/Build/Build'
import { BUILD_SHOW_MODE, BUILD_SHOW_MODE_DETAIL } from '@/common/const/cnuc'

export default {
  components: { Build },

  props: {
    data: Object,
    showMode: {
      type: Number,
      default: BUILD_SHOW_MODE.MEDIA
    }
  },

  data() {
    return {
      visibles: {
        showFrame: true,
        showBase: true,
        showStructure: true
      }
    }
  },

  computed: {
    modeClass() {
      return BUILD_SHOW_MODE_DETAIL.find(_ => _.id === this.showMode)['class']
    }
  },

  mounted() { },

  methods: {
    handleClick(data) {
      this.$emit('click', data)
    }
  }
}
</script>
