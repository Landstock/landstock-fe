<script setup>
import { ref, onBeforeUnmount } from "vue";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import axiosInstance from "@/services/AxiosServices";

const imageUrl = ref("");

const editor = useEditor({
  extensions: [StarterKit, Image, Link.configure({ openOnClick: false })],
  content: "<p>Viết nội dung bài viết tại đây...</p>",
});

// Toolbar actions
const setHeading = (level) =>
  editor.value?.chain().focus().toggleHeading({ level }).run();
const toggleBold = () => editor.value?.chain().focus().toggleBold().run();
const toggleItalic = () => editor.value?.chain().focus().toggleItalic().run();
const toggleBulletList = () =>
  editor.value?.chain().focus().toggleBulletList().run();
const toggleOrderedList = () =>
  editor.value?.chain().focus().toggleOrderedList().run();
const addLink = () => {
  const url = prompt("Nhập URL:");
  if (url) {
    editor.value
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }
};

// Thêm ảnh từ URL
const addImage = () => {
  if (imageUrl.value) {
    editor.value?.chain().focus().setImage({ src: imageUrl.value }).run();
    imageUrl.value = "";
  }
};

// Upload ảnh từ máy
const newPost = ref({
  imageUrls: [],
});

const handleImageUpload = async (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosInstance.post("/s3/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response?.data?.data;
      editor.value?.chain().focus().setImage({ src: imageUrl }).run();
      if (imageUrl) {
        newPost.value.imageUrls.push(imageUrl);
        console.log("Ảnh upload thành công:", imageUrl);
      } else {
        console.error("Response không có imageUrl:", response);
        alert("Không thể upload ảnh. Server trả về kết quả không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
      alert("Không thể upload ảnh. Vui lòng thử lại.");
    }
  }
};

// Lưu bài viết
const saveContent = async () => {
  const html = editor.value?.getHTML();
  try {
    await axiosInstance.post("/news/bai-viet-moi", {
      title: "Tiêu đề bài viết demo",
      content: html,
    });
    alert("✅ Lưu thành công!");
  } catch (err) {
    alert("❌ Lỗi: " + err.message);
  }
};

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<template>
  <div class="editor-wrapper">
    <h2>📰 Soạn bài viết tin tức</h2>

    <!-- Toolbar -->
    <div class="toolbar">
      <button @click="setHeading(1)">H1</button>
      <button @click="setHeading(2)">H2</button>
      <button @click="toggleBold">B</button>
      <button @click="toggleItalic">I</button>
      <button @click="toggleBulletList">• Danh sách</button>
      <button @click="toggleOrderedList">1. Danh sách</button>
      <button @click="addLink">🔗 Link</button>
    </div>

    <!-- Editor -->
    <EditorContent :editor="editor" class="editor-content" />

    <!-- Ảnh -->
    <div class="image-tools">
      <input v-model="imageUrl" placeholder="Dán URL ảnh..." />
      <button @click="addImage">🖼 Thêm ảnh</button>
      <input type="file" @change="handleImageUpload" />
    </div>

    <!-- Lưu -->
    <button class="save-button" @click="saveContent">💾 Lưu bài viết</button>
  </div>
</template>

<style scoped>
.editor-wrapper {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.toolbar button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: #f8f8f8;
  cursor: pointer;
  border-radius: 4px;
}

.editor-content {
  min-height: 300px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.editor-content img {
  max-width: 100%;
  width: 100%;
  height: auto;
  display: block;
  margin: 10px auto;
}

.image-tools {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.image-tools input {
  flex: 1;
  padding: 6px;
}

.save-button {
  background: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.save-button:hover {
  background: #45a049;
}
</style>
