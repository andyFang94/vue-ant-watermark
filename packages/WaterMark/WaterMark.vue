<template>
  <div style="position: relative" class="ant-pro-layout-watermark-wrapper">
    <slot></slot>
    <div
      class="ant-pro-layout-watermark"
      :style="{
        zIndex,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundSize: `${gapX + width}px`,
        pointerEvents: 'none',
        backgroundRepeat: 'repeat',
        backgroundImage: `url('${base64Url}')`,
      }"
    />
  </div>
</template>

<script>
export default {
  name: "WaterMark",
  props: {
    /** 水印之间的水平间距 */
    gapX: {
      type: Number,
      default: 212,
    },
    /** 水印之间的垂直间距 */
    gapY: {
      type: Number,
      default: 222,
    },
    /** 追加的水印元素的z-index */
    zIndex: {
      type: Number,
      default: 9,
    },
    /** 水印的宽度 */
    width: {
      type: Number,
      default: 120,
    },
    /** 水印的高度 */
    height: {
      type: Number,
      default: 64,
    },
    /** 水印绘制时，旋转的角度，单位 ° */
    rotate: {
      type: Number,
      default: -22,
    },
    /** 水印文字内容 */
    content: {
      type: String,
      default: "",
    },
    /** 文字颜色 */
    fontColor: {
      type: String,
      default: "rgba(0,0,0,.15)",
    },
    /** 文字样式 */
    // fontStyle: 'none' | 'normal' | 'italic' | 'oblique';
    fontStyle: {
      type: String,
      default: "normal",
    },
    /** 文字族 */
    fontFamily: {
      type: String,
      default: "sans-serif",
    },
    /** 文字粗细 */
    // fontWeight: 'normal' | 'light' | 'weight' | Number,
    fontWeight: {
      type: String,
      default: "normal",
    },
    /** 文字大小 */
    fontSize: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      base64Url: "",
    };
  },
  mounted() {
    this.buildWaterMark();
  },
  methods: {
    getPixelRatio(context) {
      if (!context) {
        return 1;
      }
      const backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
    buildWaterMark() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const ratio = this.getPixelRatio(ctx);

      const canvasWidth = `${(this.gapX + this.width) * ratio}px`;
      const canvasHeight = `${(this.gapY + this.height) * ratio}px`;
      const canvasOffsetLeft = this.offsetLeft || this.gapX / 2;
      const canvasOffsetTop = this.offsetTop || this.gapY / 2;

      canvas.setAttribute("width", canvasWidth);
      canvas.setAttribute("height", canvasHeight);

      if (ctx) {
        // 旋转字符 rotate
        ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio);
        ctx.rotate((Math.PI / 180) * Number(this.rotate));
        // const markWidth = this.width * ratio
        const markHeight = this.height * ratio;

        if (this.content) {
          const markSize = Number(this.fontSize) * ratio;
          ctx.font = `${this.fontStyle} normal ${this.fontWeight} ${markSize}px/${markHeight}px ${this.fontFamily}`;
          ctx.fillStyle = this.fontColor;
          ctx.fillText(this.content, 0, 0);
          this.base64Url = canvas.toDataURL();
        }
      } else {
        // eslint-disable-next-line no-console
        console.error("当前环境不支持Canvas");
      }
    },
  },
};
</script>

<style lang='less' scoped>
</style>
