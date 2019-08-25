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
        <el-form-item label="缩略图">
          <label for="inputer" class="inputer">
            <i class="el-icon-close close" @click.prevent="deleteImg" v-if="newsInfo.news_img"></i>
            <i class="el-icon-plus"  v-if="!newsInfo.news_img" style="font-size:24px;color:blue;"></i>
            <img :src="newsInfo.news_img" v-else alt class="thumbnail" />
          </label>
          <input type="file" ref="inputer" @change="upload" id="inputer" />
        </el-form-item>
      </el-form>
    </div>
    <div class="editor">
      <quill-editor
        v-model="newsInfo.content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
      <el-button type="success" round @click="saveHtml">保存</el-button>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageDrop", ImageDrop);
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
        news_title: "",
        des: "",
        publist_time: "",
        thumbnailFile:{},
        content:'<p>新闻编辑</p>',
        news_img:'' // 新闻缩略图
      },
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
            [""] //上传图片、上传视频
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
      if (res.data.flag) {
        this.newsInfo = res.data.msg;
        this.newsInfo.news_img = api.dev_url + this.newsInfo.news_img ;
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
    saveHtml() {
      let fromdata = new FormData();
      if(this.newsInfo.thumbnailFile){
           delete this.newsInfo.news_img
      }
      for(let key in this.newsInfo) {
        fromdata.append(key,this.newsInfo[key])
      }
      axios.post(`${api.dev_url}news/updated`,fromdata).then(res =>{
        console.log(res)
      })
      
    },
    // 上传图片
    upload() {
      let fileInput = this.$refs.inputer;
      let _this = this;
      if (fileInput.files != null && fileInput.files[0] != null) {
        var reader = new FileReader();
        this.newsInfo.thumbnailFile = fileInput.files[0];
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = function(e) {
          _this.newsInfo.news_img = reader.result;
          fileInput.value = "";
        };
      }
    },
    deleteImg(){
      this.newsInfo.news_img = '';
      this.newsInfo.thumbnailFile = {};
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
.inputer {
  display: block;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted blueviolet;
  position: relative;
}
.close {
  font-size: 24px;
  position: absolute;
  right: -24px;
  top: -12px;
}
#inputer {
  display: none;
}
.thumbnail {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
