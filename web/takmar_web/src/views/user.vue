<template>
  <div class="components-container">
    <div class="editor-container">
      <UE :defaultMsg="defaultMsg" :config="config" :id="ue1" ref="ue"></UE>
    </div>
     <button @click="getUEContent()">获取内容</button>
    <button @click="getUEContentTxt()">获取无文本内容</button>
  </div>
</template>
<style>
.info {
  border-radius: 10px;
  line-height: 20px;
  padding: 10px;
  margin: 10px;
  background-color: #ffffff;
}
</style>
<script>
import UE from "../components/edmitor";
export default {
  components: { UE },
  data() {
    return {
      defaultMsg:
        '<span style="orphans: 2; widows: 2; font-size: 22px; font-family: KaiTi_GB2312; "><strong>成功的投资需具备哪些心态和掌握哪些重要止损位</strong></span>',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      ue1: "ue1", // 不同编辑器必须不同的id
    };
  },
  mounted(){

  },
  methods: {
    getUEContent() {
      let content = this.$refs.ue.getUEContent(); // 调用子组件方法
      this.$notify({
        title: "获取成功，可在控制台查看！",
        message: content,
        type: "success"
      });
      console.log(content);
    },
    getUEContentTxt() {
      let content = this.$refs.ue.getUEContentTxt(); // 调用子组件方法
      this.$notify({
        title: "获取成功，可在控制台查看！",
        message: content,
        type: "success"
      });
      console.log(content);
    }
  }
};
</script>
