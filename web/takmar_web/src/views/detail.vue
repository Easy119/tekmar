<template>
  <div class="news_detail">
    <div>
      <el-form ref="form" :model="newsInfo" label-width="80px" :label-position="labelPosition">
        <el-form-item label="新闻标题">
          <el-input v-model="newsInfo.news_title"></el-input>
        </el-form-item>
        <el-form-item label="新闻描述">
          <el-input v-model="newsInfo.des" type="textarea"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="editor">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
      <button v-on:click="saveHtml">保存</button>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from "quill-image-resize-module";
 Quill.register('modules/imageDrop', ImageDrop)
Quill.register("modules/ImageResize", ImageResize);
import axios from "axios";
import api from "../util/env";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      labelPosition: "left",
      newsInfo: {
        title: "",
        des: "",
        publish_time: ""
      },
      content: `<p>新闻编辑</p>`,
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块

            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向

            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式

            ["clean"], //清除字体样式
            ["image"] //上传图片、上传视频
          ],
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          }
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  created() {
    let new_id = this.$route.query.id;
    axios.get(`${api.dev_url}news/title/detail?id=${new_id}`).then(res => {
      console.log("detail===>", res);
      if (res.data.flag) {
        this.newsInfo = res.data.msg;
      }
    });
  },
  methods: {
    init() {},
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    saveHtml(event) {
      console.log(this.content);
    }
  }
};
</script>

<style lang="scss" scoped>
.news_detail {
  padding: 40px;
  box-sizing: border-box;
}
.editor {
  width: 100%;
  min-height: 485px;
}
.ql-container {
  height: 480px;
}
</style>
