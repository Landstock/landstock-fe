<template>
  <!-- Modal Soạn bài viết -->
  <div
    class="modal fade"
    :class="{ show: showEditor }"
    style="display: block"
    v-if="showEditor"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content p-4">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isEdit ? "✏️ Chỉnh sửa bài viết" : "📝 Soạn thảo bài viết" }}
          </h5>
        </div>
        <div class="modal-body">
          <!-- BẮT ĐẦU editor-wrapper -->
          <div class="editor-wrapper">
            <!-- Toolbar -->
            <div class="toolbar">
              <button @click="setHeading(1)">H1</button>
              <button @click="setHeading(2)">H2</button>
              <button @click="toggleBold"><strong>B</strong></button>
              <button @click="toggleItalic"><em>I</em></button>
              <button @click="toggleBulletList">• Danh sách</button>
              <button @click="toggleOrderedList">1. Danh sách</button>
            </div>

            <!-- Tiêu đề -->
            <input
              v-model="title"
              placeholder="🖊️ Nhập tiêu đề bài viết..."
              class="form-input"
            />

            <!-- Editor -->
            <EditorContent :editor="editor" class="editor-content" />

            <!-- Thêm ảnh & Lưu -->
            <div class="controls">
              <input
                v-model="imageUrl"
                placeholder="Dán URL hình ảnh (nếu có)..."
                class="form-input"
              />
              <button @click="addImage">🖼 Thêm ảnh từ URL</button>

              <label class="upload-label">
                📁 Chọn ảnh từ máy
                <input type="file" @change="handleImageUpload" hidden />
              </label>

              <button
                @click="isEdit ? updatePost() : saveContent()"
                class="save-btn"
              >
                {{ isEdit ? "💾 Cập nhật bài viết" : "💾 Lưu bài viết" }}
              </button>

              <button @click="showEditor = false" class="btn btn-secondary">
                ❌ Huỷ
              </button>
            </div>
          </div>
          <!-- KẾT THÚC editor-wrapper -->
        </div>
      </div>
    </div>
    <!-- Overlay -->
    <div class="modal-backdrop fade show" @click="showEditor = false"></div>
  </div>

  <!-- Danh sách bài viết -->
  <div>
    <div class="d-flex justify-content-between">
      <h2 class="section-title">📄 Danh sách bài viết</h2>
      <div>
        <button class="btn btn-success" @click="openForm(null)">
          ➕ Thêm Tin Tức
        </button>
      </div>
    </div>

    <!-- Thử cách 1: Sử dụng posts trực tiếp (không .value) -->
    <div v-if="posts && posts.length > 0">
      <table class="table table-bordered align-middle text-center">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>📝 Tiêu đề</th>
            <th>🖼 Ảnh đại diện</th>
            <th>⚙️ Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="post.id">
            <td>{{ index + 1 }}</td>
            <td class="text-start">{{ post.title }}</td>
            <td>
              <img
                v-if="extractFirstImage(post.content)"
                :src="extractFirstImage(post.content)"
                alt="Ảnh bài viết"
                style="
                  max-width: 120px;
                  max-height: 80px;
                  object-fit: cover;
                  border-radius: 8px;
                "
              />
              <span v-else class="text-muted">Không có ảnh</span>
            </td>
            <td>
              <button
                class="btn btn-sm btn-warning me-2 px-3"
                @click="editPost(post)"
              >
                ✏️ Sửa
              </button>

              <button
                class="btn btn-sm btn-danger px-3"
                @click="deletePost(post.id)"
              >
                🗑 Xoá
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="no-posts text-center py-4">
      <p class="text-muted">📭 Chưa có bài viết nào.</p>
    </div>

    <!-- Pagination -->
    <nav v-if="totalPages > 1" aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          v-if="currentPage > 1"
          @click="goToPage(currentPage - 1)"
        >
          <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>

        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          v-if="currentPage < totalPages"
          @click="goToPage(currentPage + 1)"
        >
          <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted, nextTick } from "vue";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import axiosInstance from "@/services/AxiosServices";

// Dữ liệu
const imageUrl = ref("");
const title = ref("");
const posts = ref([]);
const isEdit = ref(false);
const showEditor = ref(false);
const renderKey = ref(0);

// const content = ref("");
const slug = ref("");
const postId = ref(null);

// phân trang
const totalPages = ref(1);
const currentPage = ref(1);
const limit = 15;

const openForm = () => {
  title.value = "";
  slug.value = "";
  postId.value = null;
  isEdit.value = false;
  editor.value?.commands.setContent("<p>✍️ Viết nội dung tại đây...</p>");
  showEditor.value = true;
};

// Khởi tạo editor
const editor = useEditor({
  extensions: [StarterKit, Image, ImageResize],
  content: "<p>✍️ Viết nội dung tại đây...</p>",
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

// Thêm ảnh từ URL
const addImage = () => {
  if (imageUrl.value) {
    editor.value?.chain().focus().setImage({ src: imageUrl.value }).run();
    imageUrl.value = "";
  }
};

// Thêm ảnh từ máy
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const tempUrl = URL.createObjectURL(file);
  editor.value?.chain().focus().setImage({ src: tempUrl }).run();
};

// Tạo slug từ tiêu đề
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

// Lưu nội dung
const saveContent = async () => {
  const html = editor.value?.getHTML();
  const slug = generateSlug(title.value);

  if (!title.value.trim()) {
    alert("❗ Vui lòng nhập tiêu đề bài viết!");
    return;
  }

  try {
    await axiosInstance.post("/news/bai-viet-moi", {
      title: title.value,
      content: html,
      slug,
    });
    alert("✅ Lưu bài viết thành công!");
    showEditor.value = false;
    await fetchPosts(); // Reload danh sách
  } catch (err) {
    alert("❌ Có lỗi khi lưu: " + err.message);
  }
};

// Cập nhật bài viết
const updatePost = async () => {
  if (!postId.value) {
    alert("❌ Không tìm thấy ID bài viết!");
    return;
  }

  try {
    await axiosInstance.put(`/news/update/${postId.value}`, {
      title: title.value,
      content: editor.value?.getHTML(),
      slug: slug.value || generateSlug(title.value),
    });
    alert("✅ Cập nhật thành công!");
    showEditor.value = false;
    await fetchPosts();
  } catch (error) {
    console.error("Edit post error:", error);
    alert("❌ Có lỗi xảy ra khi cập nhật!");
  }
};

// Lấy danh sách
const fetchPosts = async (page = 1) => {
  try {
    const res = await axiosInstance.get(
      `/news/all?page=${page}&limit=${limit}`
    );

    console.log("Tất cả response:", res.data);

    const responseData = res.data.data || res.data;
    posts.value = responseData.data || responseData || [];

    totalPages.value = responseData.totalPages || 1;
    currentPage.value = responseData.currentPage || 1;

    // Force re-render
    renderKey.value += 1;

    // console.log(" Danh sách posts:", posts.value);
    // console.log(" Posts length:", posts.value.length);
    // console.log("First post:", posts.value[0]);

    // Force reactivity update
    await nextTick();
  } catch (err) {
    console.error("❌ Lỗi khi lấy danh sách bài viết:", err);
    alert("❌ Lỗi khi lấy danh sách bài viết: " + err.message);
  }
};

const extractFirstImage = (html) => {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchPosts(page);
  }
};

// Khi bấm nút Sửa
const editPost = (post) => {
  postId.value = post.id;
  title.value = post.title;
  slug.value = post.slug || generateSlug(post.title);
  editor.value?.commands.setContent(
    post.content || "<p>✍️ Viết nội dung tại đây...</p>"
  );
  isEdit.value = true;
  showEditor.value = true;
};

const deletePost = async (id) => {
  if (confirm("Bạn có chắc muốn xóa tin tức này không?")) {
    try {
      axiosInstance.delete(`/news/delete/${id}`);
      await fetchPosts();
      alert("Xóa thành công!");
    } catch (error) {
      alert("Xóa không thành công!");
    }
  }
};

onMounted(() => {
  fetchPosts(currentPage.value);
});

// Cleanup
onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  margin: 1.75rem auto;
}

.modal-content {
  z-index: 2;
  background-color: #fff;
  border-radius: 8px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.editor-wrapper {
  padding: 12px;
  margin: auto;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.editor-title {
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.toolbar button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.toolbar button:hover {
  background: #4c934e;
}

.form-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.editor-content {
  border: 1px solid #ccc;
  min-height: 300px;
  padding: 12px;
  border-radius: 6px;
  background-color: #fafafa;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

button:not(.btn),
.upload-label {
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  cursor: pointer;
  transition: background 0.2s;
}

button:not(.btn):hover,
.upload-label:hover {
  background: #43a047;
}

.upload-label {
  display: inline-block;
}

.save-btn {
  background-color: #2196f3;
}
.save-btn:hover {
  background-color: #1e88e5;
}

.list-wrapper {
  margin-top: 40px;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 10px;
}

.section-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-item {
  background: #ffffff;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: box-shadow 0.2s;
}

.post-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.badge {
  background: #e0f7fa;
  color: #00796b;
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 12px;
}

.post-preview {
  margin-top: 10px;
  color: #555;
  font-size: 15px;
  line-height: 1.5;
}

.no-posts {
  background: #fff3cd;
  color: #856404;
  padding: 16px;
  border: 1px solid #ffeeba;
  border-radius: 8px;
}

.debug-info {
  font-family: monospace;
  font-size: 12px;
}
</style>
