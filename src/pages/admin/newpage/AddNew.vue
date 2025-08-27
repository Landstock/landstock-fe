<template>
  <div class="editor-wrapper">
    <h3>✍️ Soạn thảo nội dung bài viết</h3>
    <EditorContent :editor="editor" class="editor-content" />

    <div class="controls">
      <input v-model="imageUrl" placeholder="Dán URL hình ảnh..." />
      <button @click="addImage">🖼 Thêm ảnh</button>
      <input type="file" @change="handleImageUpload" />
      <button @click="saveContent">💾 Lưu nội dung</button>
    </div>
  </div>
</template>

<script>
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import axiosInstance from "@/services/AxiosServices";

export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
      imageUrl: "",
    };
  },
  mounted() {
    this.editor = useEditor({
      extensions: [StarterKit, Image],
      content: "<p>Viết nội dung tại đây...</p>",
    });
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
  methods: {
    addImage() {
      if (this.imageUrl && this.editor) {
        this.editor.chain().focus().setImage({ src: this.imageUrl }).run();
        this.imageUrl = "";
      }
    },
    async handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const { data } = await axiosInstance.post("/upload/s3", formData);
        const imageUrl = data.url;
        this.editor.chain().focus().setImage({ src: imageUrl }).run();
      } catch (err) {
        alert("Lỗi khi upload ảnh: " + err.message);
      }
    },
    async saveContent() {
      const html = this.editor.getHTML();
      try {
        await axiosInstance.post("/news", {
          title: "Tiêu đề bài viết demo",
          content: html,
        });
        alert("✅ Lưu thành công!");
      } catch (err) {
        alert("❌ Lỗi khi lưu: " + err.message);
      }
    },
  },
};
</script>

<style scoped>
.editor-wrapper {
  padding: 20px;
  margin: auto;
}
.editor-content {
  border: 1px solid #ccc;
  min-height: 300px;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 1rem;
}
.controls {
  display: flex;
  gap: 10px;
}
.controls input {
  flex: 1;
  padding: 6px;
}
button {
  padding: 6px 12px;
  cursor: pointer;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
}
button:hover {
  background: #45a049;
}
</style>
